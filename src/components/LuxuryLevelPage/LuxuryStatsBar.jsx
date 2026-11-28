import React from 'react';
import styles from './LuxuryStatsBar.module.css';

export function LuxuryStatsBar({
  currentLevel = 5,
  currentLevelName = "Ascendant",
  currentXP = 6420,
  requiredXP = 8000,
  nextLevel = 6,
  nextLevelName = "Vanguard",
  nextLevelReward = { type: "Spins", amount: 2 },
  todayXP = 215,
  onViewRewards
}) {
  const xpToNext = Math.max(0, requiredXP - currentXP);
  const badgeImgSrc = `/assets/luxury_3d/badge_level_${String(currentLevel).padStart(2, '0')}.png`;

  return (
    <section className={styles.statsBarContainer} aria-label="Luxury Horology Metric Strip">

      {/* Metric 1: Current Rank */}
      <div className={styles.statPillar}>
        <div className={styles.pillarIconWrap}>
          <img
            src={badgeImgSrc}
            alt="Current Rank"
            className={styles.pillarBadgeImg}
          />
        </div>
        <div className={styles.pillarContent}>
          <span className={styles.pillarLabel}>ACTIVE SOVEREIGN RANK</span>
          <span className={styles.pillarValueGold}>LEVEL {String(currentLevel).padStart(2, '0')} · {currentLevelName.toUpperCase()}</span>
          <span className={styles.pillarSub}>Verified Player Standing</span>
        </div>
      </div>

      <div className={styles.pillarDivider} />

      {/* Metric 2: Accrued XP */}
      <div className={styles.statPillar}>
        <div className={styles.pillarContent}>
          <span className={styles.pillarLabel}>ACCRUED MASTERY XP</span>
          <div className={styles.valWithTag}>
            <span className={styles.pillarValue}>{currentXP.toLocaleString()} XP</span>
            <span className={styles.boostPill}>+{todayXP} TODAY</span>
          </div>
          <span className={styles.pillarSub}>Live Session Accrual</span>
        </div>
      </div>

      <div className={styles.pillarDivider} />

      {/* Metric 3: Next Threshold */}
      <div className={styles.statPillar}>
        <div className={styles.pillarContent}>
          <span className={styles.pillarLabel}>NEXT THRESHOLD</span>
          <span className={styles.pillarValue}>{requiredXP.toLocaleString()} XP</span>
          <span className={styles.pillarSubGold}>{xpToNext.toLocaleString()} XP to Level {String(nextLevel || 6).padStart(2, '0')}</span>
        </div>
      </div>

      <div className={styles.pillarDivider} />

      {/* Metric 4: Next Rank Reward */}
      <div className={styles.statPillar}>
        <div className={styles.pillarContent}>
          <span className={styles.pillarLabel}>UPCOMING MILESTONE REWARD</span>
          <span className={styles.pillarValueReward}>
            +{nextLevelReward?.amount || 2} {nextLevelReward?.type || 'Spins'}
          </span>
          {onViewRewards && (
            <button
              type="button"
              className={styles.previewBtn}
              onClick={onViewRewards}
            >
              PREVIEW REWARD →
            </button>
          )}
        </div>
      </div>

    </section>
  );
}

export default LuxuryStatsBar;
