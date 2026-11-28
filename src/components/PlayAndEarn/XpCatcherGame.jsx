import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, Info, Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ChallengeComplete } from './ChallengeComplete';
import styles from './Game.module.css';

export function XpCatcherGame({
  onClose,
  onGameFinished,
  currentLevel = 5,
  currentXP = 6420,
  requiredXP = 8000,
  isStandalone = false
}) {
  // 'ready' | 'playing' | 'paused' | 'submitting' | 'completed' | 'error'
  const [gameState, setGameState] = useState('ready');
  const [timeLeft, setTimeLeft] = useState(20);
  const [score, setScore] = useState(0);
  const [multiplier, setMultiplier] = useState(2);
  const [floatPops, setFloatPops] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [basketPos, setBasketPos] = useState(170);
  const [gameResult, setGameResult] = useState(null);
  const [gameError, setGameError] = useState('');
  const [itemsCaught, setItemsCaught] = useState({ xp: 0, ve: 0, gem: 0 });

  const canvasRef = useRef(null);
  const scoreRef = useRef(0);
  const finishStartedRef = useRef(false);
  const basketX = useRef(170);
  const animFrameId = useRef(null);
  const objectsRef = useRef([]);
  const lastSpawnRef = useRef(0);
  const keyStateRef = useRef({ left: false, right: false });

  const triggerWinParticles = useCallback(() => {
    try {
      confetti({
        particleCount: 90,
        spread: 90,
        origin: { y: 0.4 },
        colors: ['#f5b041', '#fbbf24', '#9333ea', '#10b981']
      });
    } catch {}
  }, []);

  const startGame = () => {
    scoreRef.current = 0;
    finishStartedRef.current = false;
    setScore(0);
    setTimeLeft(20);
    setMultiplier(2);
    setFloatPops([]);
    setGameResult(null);
    setGameError('');
    setItemsCaught({ xp: 0, ve: 0, gem: 0 });
    objectsRef.current = [];
    lastSpawnRef.current = 0;
    setGameState('playing');
  };

  const togglePause = () => {
    if (gameState === 'playing') {
      setGameState('paused');
    } else if (gameState === 'paused') {
      setGameState('playing');
    }
  };

  // Timer countdown
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft === 0) {
      finishGame();
    }
  }, [timeLeft, gameState]);

  const finishGame = async () => {
    if (finishStartedRef.current || gameState !== 'playing') return;

    finishStartedRef.current = true;
    setGameState('submitting');

    try {
      if (typeof onGameFinished !== 'function') {
        throw new Error('Game submission service is unavailable.');
      }

      const finalScore = Math.max(scoreRef.current, 10);
      const result = await onGameFinished(finalScore);
      const confirmedXP = Number(result?.reward?.xp);

      if (!result || !Number.isFinite(confirmedXP) || confirmedXP <= 0) {
        throw new Error('The backend did not confirm the game reward.');
      }

      setGameResult(result);
      setGameState('completed');
      triggerWinParticles();
    } catch (err) {
      console.error('Game completion was not confirmed:', err);
      setGameError(err?.message || 'Could not confirm your game result. Please return to the dashboard.');
      setGameState('error');
    }
  };

  const restartGame = () => {
    startGame();
  };

  // Keyboard navigation listeners (Arrows + A/D)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keyStateRef.current.left = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keyStateRef.current.right = true;
      }
      if (e.key === 'Escape' || e.key === 'p' || e.key === 'P') {
        togglePause();
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keyStateRef.current.left = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keyStateRef.current.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  // Canvas loop for falling orbs & coins with physics and controls
  useEffect(() => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      if (basketX.current > rect.width - 65) {
        basketX.current = rect.width / 2;
        setBasketPos(rect.width / 2);
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    if (basketX.current <= 0) {
      basketX.current = canvas.width / 2;
      setBasketPos(canvas.width / 2);
    }

    const basketCatchWidth = 110;

    const types = [
      { type: 'xp', label: 'XP', color: '#9333ea', radius: 15, points: 10, isVE: false },
      { type: 've', label: 'V', color: '#f59e0b', radius: 14, points: 5, isVE: true },
      { type: 'gem', label: '◆', color: '#10b981', radius: 13, points: 20, isVE: false }
    ];

    let lastTime = performance.now();

    const loop = (currentTime) => {
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // Handle keyboard movement smoothly
      const speed = 380; // px per second
      if (keyStateRef.current.left) {
        basketX.current = Math.max(65, basketX.current - speed * dt);
        setBasketPos(basketX.current);
      }
      if (keyStateRef.current.right) {
        basketX.current = Math.min(canvas.width - 65, basketX.current + speed * dt);
        setBasketPos(basketX.current);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn falling objects (slightly faster as time runs down)
      const spawnInterval = timeLeft < 8 ? 320 : 420;
      if (currentTime - lastSpawnRef.current > spawnInterval) {
        const template = types[Math.floor(Math.random() * types.length)];
        objectsRef.current.push({
          x: Math.random() * (canvas.width - 80) + 40,
          y: -20,
          speed: Math.random() * 90 + 120,
          ...template
        });
        lastSpawnRef.current = currentTime;
      }

      // The top rim is around canvas.height - 115
      const basketRimY = canvas.height - 115;

      // Update & Draw falling objects
      for (let i = objectsRef.current.length - 1; i >= 0; i--) {
        const obj = objectsRef.current[i];
        obj.y += obj.speed * dt;

        // Glowing circular orb
        ctx.save();
        ctx.shadowColor = obj.color;
        ctx.shadowBlur = 16;

        ctx.beginPath();
        ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
        ctx.fillStyle = obj.color;
        ctx.fill();

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px Montserrat, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(obj.label, obj.x, obj.y);
        ctx.restore();

        // Check catch at the basket rim
        const inX = obj.x >= (basketX.current - basketCatchWidth / 2) && obj.x <= (basketX.current + basketCatchWidth / 2);
        const inY = obj.y >= basketRimY && obj.y <= (basketRimY + 45);

        if (inX && inY) {
          const pts = obj.points * multiplier;
          scoreRef.current += pts;
          setScore(scoreRef.current);

          setItemsCaught(prev => ({
            ...prev,
            [obj.type]: (prev[obj.type] || 0) + 1
          }));

          setFloatPops(prev => [
            ...prev.slice(-3),
            {
              id: Date.now() + Math.random(),
              x: obj.x,
              y: basketRimY - 10,
              text: `+${pts} Points`
            }
          ]);

          objectsRef.current.splice(i, 1);
          continue;
        }

        if (obj.y > canvas.height + 30) {
          objectsRef.current.splice(i, 1);
        }
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [gameState, multiplier, timeLeft]);

  const updateBasketPos = (clientX, rect) => {
    const x = clientX - rect.left;
    const clamped = Math.max(65, Math.min(rect.width - 65, x));
    basketX.current = clamped;
    setBasketPos(clamped);
  };

  const handlePointerMove = (e) => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    updateBasketPos(clientX, rect);
  };

  const overlayStyle = isStandalone
    ? { position: 'relative', width: '100%', height: '100%', zIndex: 1 }
    : {};

  return (
    <div className={styles.gameModalOverlay} style={overlayStyle} role="dialog" aria-modal="true">
      {/* Top Header */}
      <header className={styles.gameHeader}>
        <button
          className={styles.infoBtn}
          onClick={onClose}
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={22} color="#ffffff" />
        </button>

        <div className={styles.gameHeaderCenter}>
          <span className={styles.gameTitle}>XP CATCHER</span>
          <button
            className={styles.infoBtn}
            onClick={() => setShowInfo(!showInfo)}
            aria-label="Game Info"
          >
            <Info size={16} />
          </button>
        </div>

        <div className={styles.headerRightControls}>
          {gameState === 'playing' && (
            <button
              className={styles.pauseBtn}
              onClick={togglePause}
              aria-label="Pause game"
              title="Pause game"
            >
              <Pause size={15} />
            </button>
          )}

          <div className={`${styles.timerPill} ${timeLeft <= 5 && gameState === 'playing' ? styles.timerWarning : ''}`}>
            <span>⏱</span>
            <span>00:{String(timeLeft).padStart(2, '0')}</span>
          </div>
        </div>
      </header>

      {/* Subtitle */}
      <div className={styles.gameSubtext}>
        Catch XP orbs & coins • Score high for verified rewards!
      </div>

      {/* Info Tooltip Overlay */}
      {showInfo && (
        <div className={styles.infoTooltipCard}>
          <h4 style={{ margin: '0 0 8px 0', color: '#f5b041', fontSize: '14px', fontWeight: '800' }}>
            🎮 XP CATCHER GAME RULES
          </h4>
          <p style={{ margin: '0 0 8px 0', fontSize: '12px', lineHeight: 1.4, color: '#e5e7eb' }}>
            Maneuver your 3D golden basket along the bottom of the arena to catch falling reward items before the 20-second timer runs out.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px', fontSize: '11px' }}>
            <span style={{ color: '#E2C891' }}>✨ Gold Orb = +10 XP</span>
            <span style={{ color: '#fcd34d' }}>🟡 VE Coin = +5 VEs</span>
            <span style={{ color: '#4DBB87' }}>🟢 Emerald = +20 Points</span>
            <span style={{ color: '#C5A66A' }}>🚀 2X Multiplier active</span>
          </div>
          <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 10px 0' }}>
            <strong>Controls:</strong> Left/Right Arrow keys, A/D keys, or drag with touch/mouse.
          </p>
          <button
            className={styles.closeTooltipBtn}
            onClick={() => setShowInfo(false)}
          >
            Got It
          </button>
        </div>
      )}

      {/* START SCREEN OVERLAY */}
      {gameState === 'ready' && (
        <div className={styles.introOverlay}>
          <div className={styles.introCard}>
            <div className={styles.introBadgeWrap}>
              <Sparkles size={28} className={styles.sparkleIcon} />
            </div>

            <span className={styles.introTag}>DAILY ARCADE CHALLENGE</span>
            <h2 className={styles.introTitle}>XP CATCHER</h2>
            <p className={styles.introDesc}>
              Catch falling reward orbs and coins into your golden basket to boost your level progress!
            </p>

            <div className={styles.introRewardGrid}>
              <div className={styles.introRewardItem}>
                <span className={styles.rewardGemPurple}>🟣</span>
                <span className={styles.introRewardText}>XP Orbs</span>
                <span className={styles.introRewardPoints}>+10 XP</span>
              </div>
              <div className={styles.introRewardItem}>
                <span className={styles.rewardGemGold}>🟡</span>
                <span className={styles.introRewardText}>VE Coins</span>
                <span className={styles.introRewardPoints}>+5 VEs</span>
              </div>
              <div className={styles.introRewardItem}>
                <span className={styles.rewardGemGreen}>🟢</span>
                <span className={styles.introRewardText}>Gems</span>
                <span className={styles.introRewardPoints}>+20 Pts</span>
              </div>
            </div>

            <div className={styles.introControlsHint}>
              <span>⌨️ Desktop: Arrow Keys (← / →) or (A / D)</span>
              <span>📱 Mobile: Drag finger across the arena</span>
            </div>

            <button
              type="button"
              className={styles.startGameBtn}
              onClick={startGame}
            >
              <Play size={18} fill="currentColor" />
              <span>START CHALLENGE</span>
            </button>
          </div>
        </div>
      )}

      {/* PAUSE OVERLAY */}
      {gameState === 'paused' && (
        <div className={styles.pauseOverlay}>
          <div className={styles.pauseCard}>
            <Pause size={32} style={{ color: '#f5b041', margin: '0 auto' }} />
            <h3 style={{ color: '#ffffff', margin: '10px 0 4px 0', fontSize: '20px', fontWeight: '800' }}>GAME PAUSED</h3>
            <p style={{ color: '#9ca3af', fontSize: '13px', margin: '0 0 16px 0' }}>Score: {score} • Time Remaining: {timeLeft}s</p>
            <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
              <button
                className={styles.resumeBtn}
                onClick={togglePause}
              >
                Resume
              </button>
              <button
                className={styles.quitBtn}
                onClick={onClose}
              >
                Quit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game arena with canvas and golden basket overlay */}
      <div
        className={styles.arenaContainer}
        onPointerDown={handlePointerMove}
        onPointerMove={handlePointerMove}
        onTouchMove={handlePointerMove}
      >
        <canvas ref={canvasRef} className={styles.canvas} />

        {/* Floating popups */}
        {floatPops.map(p => (
          <div
            key={p.id}
            className={styles.floatFeedback}
            style={{ left: `${p.x - 20}px`, top: `${p.y - 20}px` }}
          >
            {p.text}
          </div>
        ))}

        {/* EXACT 3D GOLDEN WIRE BASKET */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: `${basketPos}px`,
            transform: 'translateX(-50%)',
            width: '124px',
            height: '118px',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: 'drop-shadow(0 0 20px rgba(245, 176, 65, 0.75))',
            transition: 'transform 0.04s ease-out'
          }}
        >
          <img
            src="/assets/golden_basket_clean.png"
            alt="User Golden Basket"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            onError={(e) => {
              e.currentTarget.src = '/assets/golden_basket_clean.png';
            }}
          />
        </div>
      </div>

      {/* Bottom stats matching Screen 2 */}
      <footer className={styles.gameFooter}>
        <span className={styles.scoreLabel}>YOUR SCORE</span>
        <span className={styles.scoreValue}>{score}</span>

        <div className={styles.pillsRow}>
          <div className={styles.statPill}>
            <span>🟣 {itemsCaught.xp}</span>
            <span>🟡 {itemsCaught.ve}</span>
            <span>🟢 {itemsCaught.gem}</span>
          </div>

          <div className={styles.statPill} style={{ borderColor: 'rgba(245, 176, 65, 0.4)' }}>
            <span>🚀</span>
            <span style={{ color: '#f5b041' }}>{multiplier}X Multiplier</span>
          </div>
        </div>
      </footer>

      {/* SUBMITTING OVERLAY */}
      {gameState === 'submitting' && (
        <div className={styles.submittingOverlay}>
          <div className={styles.spinner} />
          <strong>Verifying Challenge Result...</strong>
          <span>Synchronizing with VELOOP rewards backend</span>
        </div>
      )}

      {/* ERROR OVERLAY */}
      {gameState === 'error' && (
        <div className={styles.errorOverlay}>
          <strong>Session Not Confirmed</strong>
          <p>{gameError}</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={restartGame} className={styles.retryBtn}>
              <RotateCcw size={14} /> Try Again
            </button>
            <button onClick={onClose} className={styles.backBtn}>
              Back to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* CHALLENGE COMPLETE SCREEN */}
      {gameState === 'completed' && gameResult && (
        <ChallengeComplete
          score={score}
          earnedXP={Number(gameResult.reward?.xp ?? 30)}
          earnedVEs={Number(gameResult.reward?.ve ?? gameResult.reward?.ves ?? 12)}
          isNewBest={score >= 90}
          currentLevel={currentLevel}
          currentXP={currentXP}
          requiredXP={requiredXP}
          onPlayAgain={restartGame}
          onBackToDashboard={onClose}
        />
      )}
    </div>
  );
}

export default XpCatcherGame;
