import React from 'react';
import styles from './LuxuryXpRail.module.css';

export function LuxuryXpRail({
  currentLevel = 5,
  currentXP = 6420,
  requiredXP = 8000,
  nextLevel = 6,
  progressPct = 80,
  levels = []
}) {
  const milestoneLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const xpToNext = Math.max(0, requiredXP - currentXP);

  return (
    <section className={styles.railContainer} aria-label="Metallic XP Progression Rail">
      {/* Rail Header Row */}
      <div className={styles.railHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.railTag}>XP ACCELERATOR</div>
          <h2 className={styles.railTitle}>CHRONO PROGRESSION GAUGE</h2>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.xpReadout}>
            <span className={styles.xpCurrent}>{currentXP.toLocaleString()}</span>
            <span className={styles.xpSep}>/</span>
            <span className={styles.xpTarget}>{requiredXP.toLocaleString()} XP</span>
          </div>
          <div className={styles.percentagePill}>
            {progressPct}% COMPLETE
          </div>
        </div>
      </div>

      {/* Physical Metallic Rail Track */}
      <div className={styles.trackWrapper}>
        <div className={styles.trackBezel}>
          {/* Brushed Champagne Gold Fill Bar */}
          <div
            className={styles.trackFill}
            style={{ width: `${Math.min(100, Math.max(0, progressPct))}%` }}
          >
            <div className={styles.specularShimmer} />
            <div className={styles.leadingIndicator}>
              <div className={styles.indicatorCore} />
            </div>
          </div>
        </div>
      </div>

      {/* 10 Milestone Markers */}
      <div className={styles.milestonesGrid}>
        {milestoneLevels.map((lvl) => {
          const isCompleted = lvl < currentLevel;
          const isCurrent = lvl === currentLevel;
          const isLocked = lvl > currentLevel;

          let nodeClass = styles.milestoneNode;
          if (isCurrent) nodeClass = `${styles.milestoneNode} ${styles.nodeCurrent}`;
          else if (isCompleted) nodeClass = `${styles.milestoneNode} ${styles.nodeCompleted}`;
          else nodeClass = `${styles.milestoneNode} ${styles.nodeLocked}`;

          return (
            <div key={lvl} className={nodeClass}>
              <div className={styles.markerPin}>
                <span className={styles.pinNumber}>{String(lvl).padStart(2, '0')}</span>
              </div>
              <span className={styles.markerLabel}>
                {isCurrent ? 'CURRENT' : isCompleted ? 'PASSED' : 'LOCKED'}
              </span>
            </div>
          );
        })}
      </div>

      {/* Rail Footer Subtext */}
      <div className={styles.railFooter}>
        <div className={styles.footerNote}>
          <span className={styles.goldBullet}>◆</span>
          <span>Earn <strong>{xpToNext.toLocaleString()} more XP</strong> to unlock Level {String(nextLevel || 6).padStart(2, '0')} Vanguard rank & claim 2 Spins.</span>
        </div>
        <div className={styles.tierStatus}>
          AEROSPACE METRIC · CLASS V ASCENDANT
        </div>
      </div>
    </section>
  );
}

export default LuxuryXpRail;
