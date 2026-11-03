import React from 'react';
import { ArrowLeft, Share2 } from 'lucide-react';
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
      {/* Top Header */}
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

      {/* Trophy & Heading matching Screen 3 exactly */}
      <div className={styles.trophyContainer}>
        <div style={{ textAlign: 'center', marginBottom: '14px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '900',
            color: '#ffffff',
            letterSpacing: '1px',
            lineHeight: '1.15',
            textTransform: 'uppercase'
          }}>
            CHALLENGE<br />COMPLETE!
          </h2>
          <span style={{
            fontSize: '15px',
            fontWeight: '500',
            color: '#e5e7eb',
            marginTop: '4px',
            display: 'inline-block'
          }}>
            Outstanding!
          </span>
        </div>

        <div className={styles.trophyPedestal} style={{ marginTop: '8px', marginBottom: '20px' }}>
          <img 
            src="/assets/ref_trophy.png" 
            alt="Challenge Complete Trophy with Laurel and Star" 
            style={{ width: '190px', height: '140px', objectFit: 'contain' }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      </div>

      {/* Final Score Block matching Screen 3 */}
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
