import React from 'react';
import { ArrowLeft, Share2 } from 'lucide-react';
import styles from './Game.module.css';

export function ChallengeComplete({
  score = 92,
  earnedXP,
  earnedVEs,
  isNewBest = false,
  currentLevel = 5,
  currentXP = 6420,
  requiredXP = 8000,
  onPlayAgain,
  onBackToDashboard,
  isStandalone = false
}) {
  const pct = Math.min(100, Math.round((currentXP / requiredXP) * 100));

  const screenStyle = isStandalone 
    ? { position: 'relative', width: '100%', minHeight: '100%', zIndex: 1, backgroundColor: '#0b0c14' } 
    : {};

  return (
    <div className={styles.completeScreen} style={screenStyle} role="dialog" aria-modal="true">
      {/* Top Header Icons */}
      <div className={styles.completeTopBar}>
        <button 
          className={styles.headerIconBtn} 
          onClick={onBackToDashboard}
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={22} color="#ffffff" strokeWidth={2} />
        </button>

        <button 
          className={styles.headerIconBtn} 
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
          <Share2 size={20} color="#ffffff" strokeWidth={2} />
        </button>
      </div>

      <div className={styles.completeInnerContent}>
        {/* Title Header */}
        <div className={styles.titleBlock}>
          <span className={styles.challengeWord}>CHALLENGE</span>
          <h2 className={styles.completeWord}>COMPLETE!</h2>
          <span className={styles.outstandingWord}>Outstanding!</span>
        </div>

        {/* Exact Trophy Image uploaded by user */}
        <div className={styles.trophyWrapper}>
          <img 
            src="/assets/trophy_exact.png" 
            alt="Challenge Complete Trophy with Gold Star and Laurel" 
            className={styles.trophyImage}
            onError={(e) => {
              e.currentTarget.src = '/assets/trophy_raw.png';
            }}
          />
        </div>

        {/* Final Score Card */}
        <div className={styles.scoreContainerCard}>
          <span className={styles.finalScoreTag}>FINAL SCORE</span>
          
          <div className={styles.scoreRow}>
            <span className={styles.scoreBigNumber}>{score}</span>
            {isNewBest && <span className={styles.newBestPill}>New Best!</span>}
          </div>

          {(Number(earnedXP) > 0 || Number(earnedVEs) > 0) && (
            <div className={styles.twoColumnRewards}>
              {Number(earnedXP) > 0 && (
                <div className={styles.rewardSubCard}>
                  <span className={styles.rewardVal}>+{earnedXP} XP</span>
                  <span className={styles.rewardSub}>Experience</span>
                </div>
              )}

              {Number(earnedVEs) > 0 && (
                <div className={styles.rewardSubCard}>
                  <span className={styles.rewardVal}>+{earnedVEs} VEs</span>
                  <span className={styles.rewardSub}>Your Reward</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Level Progression */}
        <div className={styles.levelProgressSection}>
          <div className={styles.levelLabelsRow}>
            <span>Level {String(currentLevel).padStart(2, '0')}</span>
            <span>Level {String(currentLevel + 1).padStart(2, '0')}</span>
          </div>

          <div className={styles.progBarTrack}>
            <div 
              className={styles.progBarFill} 
              style={{ width: `${pct}%` }} 
            />
          </div>

          <div className={styles.progRatioText}>
            {currentXP.toLocaleString()} / {requiredXP.toLocaleString()} XP
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.bottomButtonsWrapper}>
          <button 
            className={styles.playAgainBtn}
            onClick={onPlayAgain}
          >
            Play Again
          </button>

          <button 
            className={styles.backDashboardBtn}
            onClick={onBackToDashboard}
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Subtle bottom golden wave motif */}
      <div className={styles.bottomWaveDecoration} />
    </div>
  );
}
