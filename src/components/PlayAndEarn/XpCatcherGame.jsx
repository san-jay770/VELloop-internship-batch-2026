import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, Info, HelpCircle } from 'lucide-react';
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
  const [score, setScore] = useState(0);
  const [earnedVEs, setEarnedVEs] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [floatPops, setFloatPops] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  const canvasRef = useRef(null);
  const basketX = useRef(150);
  const isDragging = useRef(false);
  const animFrameId = useRef(null);
  const objectsRef = useRef([]);
  const lastSpawnRef = useRef(0);

  // Soundless visual particle celebration on complete
  const triggerWinParticles = useCallback(() => {
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.4 },
        colors: ['#f5b041', '#fbbf24', '#9333ea', '#10b981']
      });
    } catch {
      // safe fallback if confetti not loaded
    }
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

  // Finish Game logic
  const finishGame = () => {
    setGameState('completed');
    triggerWinParticles();
    if (onGameFinished) {
      onGameFinished(score);
    }
  };

  // Restart Game
  const restartGame = () => {
    setTimeLeft(20);
    setScore(0);
    setEarnedVEs(0);
    setMultiplier(1);
    setFloatPops([]);
    objectsRef.current = [];
    setGameState('playing');
  };

  // Canvas render & animation loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Handle high DPI
    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      if (basketX.current > rect.width) {
        basketX.current = rect.width / 2;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initial center position
    basketX.current = canvas.width / 2;

    const basketWidth = 74;
    const basketHeight = 44;

    const types = [
      { type: 'xp', label: 'XP', color: '#9333ea', radius: 14, points: 10, isVE: false },
      { type: 've', label: 'V', color: '#f59e0b', radius: 13, points: 5, isVE: true },
      { type: 'gem', label: '◆', color: '#10b981', radius: 12, points: 20, isVE: false }
    ];

    let lastTime = performance.now();

    const loop = (currentTime) => {
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle background starry dust
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      for (let i = 0; i < 15; i++) {
        ctx.fillRect((i * 47) % canvas.width, (i * 91) % canvas.height, 2, 2);
      }

      // Spawn falling objects
      if (currentTime - lastSpawnRef.current > 420) {
        const template = types[Math.floor(Math.random() * types.length)];
        objectsRef.current.push({
          x: Math.random() * (canvas.width - 60) + 30,
          y: -20,
          speed: Math.random() * 80 + 140,
          ...template
        });
        lastSpawnRef.current = currentTime;
      }

      const basketY = canvas.height - basketHeight - 16;

      // Update & Draw falling objects
      for (let i = objectsRef.current.length - 1; i >= 0; i--) {
        const obj = objectsRef.current[i];
        obj.y += obj.speed * dt;

        // Draw item glow
        ctx.save();
        ctx.shadowColor = obj.color;
        ctx.shadowBlur = 12;

        ctx.beginPath();
        ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
        ctx.fillStyle = obj.color;
        ctx.fill();

        // Draw inner ring / text
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px Montserrat, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(obj.label, obj.x, obj.y);
        ctx.restore();

        // Collision with basket
        const inX = obj.x >= (basketX.current - basketWidth / 2) && obj.x <= (basketX.current + basketWidth / 2);
        const inY = obj.y >= basketY && obj.y <= (basketY + basketHeight);

        if (inX && inY) {
          // Catch item!
          const pts = obj.points * multiplier;
          setScore(s => s + pts);
          if (obj.isVE) {
            setEarnedVEs(v => v + 5);
          }

          // Trigger float popup
          setFloatPops(prev => [
            ...prev.slice(-4),
            {
              id: Date.now() + Math.random(),
              x: obj.x,
              y: basketY,
              text: `+${pts} ${obj.isVE ? 'VEs' : 'XP'}`
            }
          ]);

          objectsRef.current.splice(i, 1);
          continue;
        }

        // Out of screen
        if (obj.y > canvas.height + 30) {
          objectsRef.current.splice(i, 1);
        }
      }

      // Draw Golden Basket
      ctx.save();
      const bx = basketX.current;
      const by = basketY;

      // Glow behind basket
      ctx.shadowColor = '#f5b041';
      ctx.shadowBlur = 18;

      // Basket rim (ellipse)
      ctx.strokeStyle = '#fcd34d';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(bx, by, basketWidth / 2, 8, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Golden wire mesh / net
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(245, 176, 65, 0.7)';
      ctx.beginPath();
      ctx.moveTo(bx - basketWidth / 2, by);
      ctx.quadraticCurveTo(bx - basketWidth / 4, by + basketHeight, bx, by + basketHeight);
      ctx.quadraticCurveTo(bx + basketWidth / 4, by + basketHeight, bx + basketWidth / 2, by);
      ctx.stroke();

      // Net cross hatching
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(253, 216, 53, 0.4)';
      for (let offset = -basketWidth / 2 + 10; offset < basketWidth / 2; offset += 12) {
        ctx.beginPath();
        ctx.moveTo(bx + offset, by + 4);
        ctx.lineTo(bx + offset * 0.4, by + basketHeight);
        ctx.stroke();
      }

      ctx.restore();

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [gameState, multiplier]);

  // Handle pointer / touch movement for moving the basket
  const handlePointerMove = (e) => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    basketX.current = Math.max(40, Math.min(rect.width - 40, x));
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== 'playing') return;
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        basketX.current = Math.max(40, basketX.current - 24);
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        const canvas = canvasRef.current;
        const maxW = canvas ? canvas.width - 40 : 300;
        basketX.current = Math.min(maxW, basketX.current + 24);
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

      {/* Subtext bar */}
      <div className={styles.gameSubtext}>
        Catch XP orbs & coins. Score high for better rewards!
      </div>

      {/* Info tooltip modal if opened */}
      {showInfo && (
        <div style={{
          position: 'absolute',
          top: '70px',
          left: '20px',
          right: '20px',
          background: '#1c1e32',
          border: '1px solid rgba(245, 176, 65, 0.4)',
          borderRadius: '14px',
          padding: '16px',
          zIndex: 40,
          color: '#e5e7eb',
          fontSize: '13px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.6)'
        }}>
          <strong>How to Play:</strong>
          <p style={{ marginTop: '6px', color: '#9ca3af' }}>
            Drag the golden basket horizontally or use Arrow Keys to catch falling XP orbs (+10 XP), gold V coins (+5 VEs), and emerald gems (+20 XP)!
          </p>
          <button 
            onClick={() => setShowInfo(false)}
            style={{ marginTop: '10px', color: '#f5b041', fontWeight: '700' }}
          >
            Got it!
          </button>
        </div>
      )}

      {/* Arena Canvas */}
      <div 
        className={styles.arenaContainer}
        onPointerDown={handlePointerMove}
        onPointerMove={handlePointerMove}
        onTouchMove={handlePointerMove}
      >
        <canvas ref={canvasRef} className={styles.canvas} />

        {/* Floating feedback scores */}
        {floatPops.map(p => (
          <div 
            key={p.id} 
            className={styles.floatFeedback}
            style={{ left: `${p.x - 20}px`, top: `${p.y - 20}px` }}
          >
            {p.text}
          </div>
        ))}
      </div>

      {/* Footer Controls / Live Score */}
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
          earnedXP={Math.max(25, Math.round(score * 0.35))}
          earnedVEs={Math.max(10, earnedVEs || Math.round(score * 0.15))}
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
