import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, Info } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ChallengeComplete } from './ChallengeComplete';
import styles from './Game.module.css';

export function XpCatcherGame({ 
  onClose, 
  onGameFinished, 
  currentLevel = 5,
  currentXP = 6420,
  requiredXP = 8000 
}) {
  const [gameState, setGameState] = useState('playing'); // 'playing' | 'completed'
  const [timeLeft, setTimeLeft] = useState(20);
  const [score, setScore] = useState(120);
  const [earnedVEs, setEarnedVEs] = useState(5);
  const [multiplier, setMultiplier] = useState(2);
  const [floatPops, setFloatPops] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [basketPos, setBasketPos] = useState(170);

  const canvasRef = useRef(null);
  const basketX = useRef(170);
  const animFrameId = useRef(null);
  const objectsRef = useRef([]);
  const lastSpawnRef = useRef(0);

  const triggerWinParticles = useCallback(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 85,
        origin: { y: 0.4 },
        colors: ['#f5b041', '#fbbf24', '#9333ea', '#10b981']
      });
    } catch {}
  }, []);

  // Timer countdown
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  const finishGame = () => {
    setGameState('completed');
    triggerWinParticles();
    if (onGameFinished) {
      onGameFinished(score);
    }
  };

  const restartGame = () => {
    setTimeLeft(20);
    setScore(0);
    setEarnedVEs(0);
    setMultiplier(2);
    setFloatPops([]);
    objectsRef.current = [];
    setGameState('playing');
  };

  // Canvas loop for falling orbs & coins
  useEffect(() => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      if (basketX.current > rect.width) {
        basketX.current = rect.width / 2;
        setBasketPos(rect.width / 2);
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    basketX.current = canvas.width / 2;
    setBasketPos(canvas.width / 2);

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

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn falling objects
      if (currentTime - lastSpawnRef.current > 380) {
        const template = types[Math.floor(Math.random() * types.length)];
        objectsRef.current.push({
          x: Math.random() * (canvas.width - 80) + 40,
          y: -20,
          speed: Math.random() * 90 + 130,
          ...template
        });
        lastSpawnRef.current = currentTime;
      }

      // Basket is 115px high, resting 15px above bottom. The top rim is at: canvas.height - 110 to -80
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
          setScore(s => s + pts);
          if (obj.isVE) {
            setEarnedVEs(v => v + 5);
          }

          setFloatPops(prev => [
            ...prev.slice(-4),
            {
              id: Date.now() + Math.random(),
              x: obj.x,
              y: basketRimY - 10,
              text: `+${pts} ${obj.isVE ? 'VEs' : 'XP'}`
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
  }, [gameState, multiplier]);

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== 'playing') return;
      const canvas = canvasRef.current;
      const maxW = canvas ? canvas.width - 65 : 300;
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        const next = Math.max(65, basketX.current - 26);
        basketX.current = next;
        setBasketPos(next);
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        const next = Math.min(maxW, basketX.current + 26);
        basketX.current = next;
        setBasketPos(next);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  return (
    <div className={styles.gameModalOverlay} role="dialog" aria-modal="true">
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

        <div className={styles.timerPill}>
          <span>⏱</span>
          <span>00:{String(timeLeft).padStart(2, '0')}</span>
        </div>
      </header>

      {/* Subtitle */}
      <div className={styles.gameSubtext}>
        Catch XP orbs & coins<br />Score high for better rewards!
      </div>

      {/* Tooltip info */}
      {showInfo && (
        <div style={{
          position: 'absolute',
          top: '75px',
          left: '20px',
          right: '20px',
          background: '#1c1e32',
          border: '1px solid #f5b041',
          borderRadius: '14px',
          padding: '16px',
          zIndex: 40,
          color: '#ffffff',
          fontSize: '13px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.6)'
        }}>
          <strong>Rules:</strong> Drag the golden basket horizontally or use Arrow Keys to catch falling items before the 20-second timer runs out!
          <div style={{ marginTop: '10px' }}>
            <button onClick={() => setShowInfo(false)} style={{ color: '#f5b041', fontWeight: '700' }}>
              Close
            </button>
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

        {/* USER'S EXACT 3D GOLDEN WIRE BASKET */}
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
              e.currentTarget.src = '/assets/golden_basket.svg';
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
            <span>🪙</span>
            <span>+{earnedVEs} VEs</span>
          </div>

          <div className={styles.statPill} style={{ borderColor: 'rgba(245, 176, 65, 0.4)' }}>
            <span>🚀</span>
            <span style={{ color: '#f5b041' }}>{multiplier}X Multiplier</span>
          </div>
        </div>
      </footer>

      {/* Screen 3: Challenge Complete Modal */}
      {gameState === 'completed' && (
        <ChallengeComplete 
          score={score}
          earnedXP={30}
          earnedVEs={12}
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
