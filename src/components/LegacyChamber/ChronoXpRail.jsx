import React from 'react';
import { BLACK_LABEL_RANKS } from '../Common/BlackLabelEmblem';
import styles from './ChronoXpRail.module.css';

export function ChronoXpRail({
  currentLevel = 5,
  currentXP = 6420,
  requiredXP = 8000,
  nextLevel = 6,
  progressPct = 80
}) {
  const xpToNext = Math.max(0, requiredXP - currentXP);

  return (
    <section className={styles.railContainer} aria-label="Chrono XP Progression Rail">
      {/* Header */}
      <div className={styles.railHeader}>
        <div className={styles.headerLeft}>
          <span className={styles.eyebrowTag}>VELOOP BLACK LABEL • TELEMETRY</span>
          <h2 className={styles.railTitle}>CHRONO XP PROGRESSION RAIL</h2>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.xpReadout}>
            <span className={styles.xpCurrent}>{currentXP.toLocaleString()}</span>
            <span className={styles.xpSep}>/</span>
            <span className={styles.xpTarget}>{requiredXP.toLocaleString()} XP</span>
          </div>
          <div className={styles.percentagePill}>
            {progressPct}% REVEALED
          </div>
        </div>
      </div>

      {/* Metallic Rail Track */}
      <div className={styles.trackWrapper}>
        <div className={styles.trackBezel}>
          <div
            className={styles.trackFill}
            style={{ width: `${Math.min(100, Math.max(0, progressPct))}%` }}
          >
            <div className={styles.shimmerHighlight} />
            <div className={styles.leadingPin}>
              <div className={styles.pinGlow} />
            </div>
          </div>
        </div>
      </div>

      {/* 12 Rank Milestones Track Grid */}
      <div className={styles.milestonesTrack}>
        {BLACK_LABEL_RANKS.map((r, idx) => {
          const isCurrent = (currentLevel >= 1 && currentLevel <= 5 && r.id === 'novice') ||
                            (currentLevel > 5 && r.tier === Math.ceil(currentLevel / 10));
          const isCompleted = r.tier < (isCurrent ? r.tier : (currentLevel <= 5 ? 1 : 2));

          let markerClass = styles.milestoneMarker;
          if (isCurrent) markerClass = `${styles.milestoneMarker} ${styles.markerCurrent}`;
          else if (isCompleted) markerClass = `${styles.milestoneMarker} ${styles.markerCompleted}`;
          else markerClass = `${styles.milestoneMarker} ${styles.markerLocked}`;

          return (
            <div key={r.id} className={markerClass}>
              <div className={styles.markerPinCircle}>
                <img
                  src={r.badgeSrc}
                  alt={r.name}
                  className={styles.miniMarkerBadge}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <span className={styles.pinNumber}>T{String(idx + 1).padStart(2, '0')}</span>
              <span className={styles.markerRankTitle}>{r.name}</span>
              <span className={styles.markerRange}>{r.levelRange}</span>
            </div>
          );
        })}
      </div>

      {/* Footer Note */}
      <div className={styles.railFooter}>
        <div className={styles.footerNote}>
          <span className={styles.goldDiamond}>◆</span>
          <span>Next rank threshold: Earn <strong>{xpToNext.toLocaleString()} more XP</strong> to unlock Apprentice (Lv. 6-10) with 2 Free Spins.</span>
        </div>
        <div className={styles.classificationTag}>
          AEROSPACE GRADE METALLURGY · 12 SOVEREIGN TIERS
        </div>
      </div>
    </section>
  );
}

export default ChronoXpRail;
