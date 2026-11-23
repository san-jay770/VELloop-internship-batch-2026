import React from 'react';
import { 
  CheckCircle2, 
  Lock, 
  Target, 
  Sparkles, 
  Gift, 
  Flame,
  ArrowUpRight
} from 'lucide-react';
import styles from './LevelProgressionSummary.module.css';

export function LevelProgressionSummary({
  currentLevel = 5,
  currentLevelName = "Ascendant",
  currentXP = 6420,
  requiredXP = 8000,
  xpToNext = 1580,
  progressPct = 80,
  nextLevel = 6,
  nextLevelName = "Vanguard",
  nextLevelReward = { type: "Spins", amount: 2 },
  totalLevels = 10,
  onViewRoadmap
}) {
  const completedCount = Math.max(0, currentLevel - 1);
  const lockedCount = Math.max(0, totalLevels - currentLevel);

  return (
    <div className={styles.summaryContainer} aria-label="Level Progression Summary">
      <div className={styles.summaryGrid}>
        {/* Metric 1: Current Status */}
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricIconWrapGold}>
              <Sparkles size={16} />
            </span>
            <span className={styles.metricLabel}>CURRENT STATUS</span>
          </div>
          <div className={styles.metricValueRow}>
            <span className={styles.metricBigText}>Level {String(currentLevel).padStart(2, '0')}</span>
            <span className={styles.tierNamePill}>{currentLevelName}</span>
          </div>
          <span className={styles.metricSub}>
            {currentXP.toLocaleString()} Total XP Accumulated
          </span>
        </div>

        {/* Metric 2: Completed Tiers */}
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricIconWrapGreen}>
              <CheckCircle2 size={16} />
            </span>
            <span className={styles.metricLabel}>COMPLETED TIERS</span>
          </div>
          <div className={styles.metricValueRow}>
            <span className={styles.metricBigText}>{completedCount} <span className={styles.denomText}>/ {totalLevels}</span></span>
            <span className={styles.statusPillGreen}>40% Complete</span>
          </div>
          <span className={styles.metricSub}>
            Levels 01 – {String(completedCount).padStart(2, '0')} Mastered
          </span>
        </div>

        {/* Metric 3: Next Milestone Goal */}
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricIconWrapAmber}>
              <Target size={16} />
            </span>
            <span className={styles.metricLabel}>NEXT MILESTONE</span>
          </div>
          <div className={styles.metricValueRow}>
            <span className={styles.metricBigText}>Level {String(nextLevel).padStart(2, '0')}</span>
            <span className={styles.targetPill}>{nextLevelName}</span>
          </div>
          <span className={styles.metricSubWarning}>
            {xpToNext.toLocaleString()} XP Remaining ({progressPct}% done)
          </span>
        </div>

        {/* Metric 4: Upcoming Reward & Locked Tiers */}
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricIconWrapPurple}>
              <Gift size={16} />
            </span>
            <span className={styles.metricLabel}>NEXT UNLOCK REWARD</span>
          </div>
          <div className={styles.metricValueRow}>
            <span className={styles.metricRewardText}>
              +{nextLevelReward?.amount ?? 2} {nextLevelReward?.type ?? "Spins"}
            </span>
            <span className={styles.lockedPill}>
              <Lock size={10} />
              {lockedCount} Locked
            </span>
          </div>
          <span className={styles.metricSub}>
            Unlocks new challenges & daily XP cap
          </span>
        </div>
      </div>
    </div>
  );
}

export default LevelProgressionSummary;

