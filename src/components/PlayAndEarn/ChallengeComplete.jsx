import React from 'react';
import { ArrowLeft, Share2, Star } from 'lucide-react';
import styles from './Game.module.css';

export function ChallengeComplete({
  score = 92,
  earnedXP = 30,
  earnedVEs = 12,
  currentLevel = 5,
  currentXP = 6420,
  requiredXP = 8000,
  onPlayAgain,
  onBackToDashboard
}) {
  const pct = Math.min(100, Math.round((currentXP / requiredXP) * 100));

  return (
    <div className={styles.completeScreen} role="dialog" aria-modal="true">
      {/* Header */}
      <div className={styles.completeHeader}>
        <button 
          className={styles.infoBtn} 
          onClick={onBackToDashboard}
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={22} color="#ffffff" />
        </button>

        <button 
          className={styles.infoBtn} 
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'VeLoop Rewards',
                text: `I just scored ${score} in VeLoop XP Catcher! Come play with me!`
              }).catch(() => {});
            }
          }}
          aria-label="Share score"
        >
          <Share2 size={20} color="#ffffff" />
        </button>
      </div>

      {/* Trophy & Heading */}
      <div className={styles.trophyContainer}>
        <div className={styles.trophyPedestal}>
          {/* Golden Laurel Wreath and 3D Star */}
          <div className={styles.wreathGold}>
            <svg viewBox="0 0 120 120" width="130" height="130" fill="none">
              <defs>
                <linearGradient id="goldWreath" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#b45309" />
                </linearGradient>
              </defs>
              {/* Left laurel branch */}
              <path d="M 30,95 C 15,70 18,35 45,20 C 35,32 35,50 42,70" stroke="url(#goldWreath)" strokeWidth="3" fill="none" />
              <circle cx="26" cy="75" r="4" fill="url(#goldWreath)" />
              <circle cx="21" cy="55" r="4" fill="url(#goldWreath)" />
              <circle cx="28" cy="38" r="4" fill="url(#goldWreath)" />
              <circle cx="42" cy="24" r="4" fill="url(#goldWreath)" />

              {/* Right laurel branch */}
              <path d="M 90,95 C 105,70 102,35 75,20 C 85,32 85,50 78,70" stroke="url(#goldWreath)" strokeWidth="3" fill="none" />
              <circle cx="94" cy="75" r="4" fill="url(#goldWreath)" />
              <circle cx="99" cy="55" r="4" fill="url(#goldWreath)" />
              <circle cx="92" cy="38" r="4" fill="url(#goldWreath)" />
              <circle cx="78" cy="24" r="4" fill="url(#goldWreath)" />

              {/* Central Hexagon Plaque */}
              <polygon points="60,30 85,45 85,75 60,90 35,75 35,45" fill="#201a14" stroke="url(#goldWreath)" strokeWidth="3" />
            </svg>

            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <Star size={34} fill="#fcd34d" color="#d97706" />
            </div>
          </div>

          <div className={styles.pedestalBase} />
        </div>

        <h2 className={styles.completeTitle}>CHALLENGE COMPLETE!</h2>
        <span className={styles.completeSub}>Outstanding!</span>
      </div>

      {/* Final Score */}
      <div className={styles.scoreCardBlock}>
        <span className={styles.finalScoreTitle}>FINAL SCORE</span>
        <div className={styles.finalScoreNumRow}>
          <span className={styles.finalScoreNum}>{score}</span>
          <span className={styles.bestPill}>New Best!</span>
        </div>
      </div>

      {/* 2-Column Rewards */}
      <div className={styles.rewardsGrid}>
        <div className={styles.rewardBox}>
          <span className={styles.rewardBoxVal}>+{earnedXP} XP</span>
          <span className={styles.rewardBoxLabel}>Experience</span>
        </div>

        <div className={styles.rewardBox}>
          <span className={styles.rewardBoxVal}>+{earnedVEs} VEs</span>
          <span className={styles.rewardBoxLabel}>Your Reward</span>
        </div>
      </div>

      {/* Level Progress */}
      <div className={styles.resultProgressCard}>
        <div className={styles.resultProgHeader}>
          <span>Level {String(currentLevel).padStart(2, '0')}</span>
          <span>Level {String(currentLevel + 1).padStart(2, '0')}</span>
        </div>

        <div style={{
          width: '100%',
          height: '8px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '999px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${pct}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)',
            borderRadius: '999px'
          }} />
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '8px',
          fontSize: '11px',
          fontWeight: '600',
          color: '#9ca3af'
        }}>
          {currentXP.toLocaleString()} / {requiredXP.toLocaleString()} XP
        </div>
      </div>

      {/* Action Buttons */}
      <div className={styles.buttonsGroup}>
        <button 
          className={styles.btnPrimaryGold}
          onClick={onPlayAgain}
        >
          Play Again
        </button>

        <button 
          className={styles.btnSecondaryDark}
          onClick={onBackToDashboard}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
