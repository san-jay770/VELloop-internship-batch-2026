import React from 'react';
import { BlackLabelEmblem, getRankData } from '../Common/BlackLabelEmblem';
import styles from './LegacyChamberHero.module.css';

export function LegacyChamberHero({
  currentLevel = 5,
  currentXP = 6420,
  requiredXP = 8000,
  nextLevel = 6,
  progressPct = 80,
  onLaunchGame,
  onViewRewards
}) {
  const currentRank = getRankData(currentLevel);
  const nextRank = getRankData(nextLevel);
  const xpToNext = Math.max(0, requiredXP - currentXP);

  return (
    <section className={styles.heroSection} aria-label="The Legacy Chamber Hero Showcase">
      {/* Museum Ambient Studio Lighting */}
      <div className={styles.studioLighting} aria-hidden="true" />
      <div className={styles.lightBeam} aria-hidden="true" />

      <div className={styles.heroGrid}>

        {/* Left Column: Editorial & Standing */}
        <div className={styles.leftCol}>

          <div className={styles.eyebrowTag}>
            <span className={styles.goldDot} />
            <span className={styles.eyebrowText}>THE LEGACY CHAMBER</span>
          </div>

          <h1 className={styles.mainTitle}>
            EVERY LEVEL HAS A LEGACY.
          </h1>

          <div className={styles.rankBadgeRow}>
            <span className={styles.levelPill}>LEVEL {String(currentLevel).padStart(2, '0')}</span>
            <span className={styles.rankName}>{currentRank.name.toUpperCase()}</span>
            <span className={styles.currentStatusPill}>ACTIVE RANK</span>
          </div>

          <p className={styles.editorialLead}>
            Welcome to the Executive Trophy Museum. Each tier is a rare physical collectible engineered with black titanium, brushed platinum, and champagne gold.
          </p>

          {/* Precision Horology Metrics */}
          <div className={styles.horologyMetricsStrip}>
            <div className={styles.metricCell}>
              <span className={styles.cellLabel}>CURRENT XP</span>
              <span className={styles.cellValue}>{currentXP.toLocaleString()}</span>
            </div>
            <div className={styles.cellSep} />
            <div className={styles.metricCell}>
              <span className={styles.cellLabel}>NEXT MILESTONE</span>
              <span className={styles.cellValue}>{requiredXP.toLocaleString()} XP</span>
            </div>
            <div className={styles.cellSep} />
            <div className={styles.metricCell}>
              <span className={styles.cellLabel}>REQUIRED</span>
              <span className={styles.cellValueGold}>{xpToNext.toLocaleString()} XP</span>
            </div>
            <div className={styles.cellSep} />
            <div className={styles.metricCell}>
              <span className={styles.cellLabel}>PROGRESS</span>
              <span className={styles.cellValueAccent}>{progressPct}%</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtonsRow}>
            {onLaunchGame && (
              <button
                type="button"
                className={styles.goldCtaBtn}
                onClick={onLaunchGame}
              >
                <span>ENTER XP CHALLENGE</span>
                <span className={styles.btnArrow}>→</span>
              </button>
            )}

            {onViewRewards && (
              <button
                type="button"
                className={styles.titaniumOutlineBtn}
                onClick={onViewRewards}
              >
                <span>NEXT: {nextRank.name.toUpperCase()} REWARD</span>
                <span className={styles.rewardChip}>+2 SPINS</span>
              </button>
            )}
          </div>

        </div>

        {/* Right Column: Centerpiece 3D Rank Emblem on Museum Pedestal */}
        <div className={styles.rightCol}>
          <div className={styles.pedestalStage}>

            {/* Dramatic Spotlight Rings */}
            <div className={styles.pedestalHalo} aria-hidden="true" />
            <div className={styles.pedestalGleam} aria-hidden="true" />

            {/* Enormous 3D Emblem Artifact */}
            <div className={styles.emblemArtWrap}>
              <BlackLabelEmblem
                rank={currentRank.id}
                size="hero"
                showGlow={true}
              />
            </div>

            {/* Museum Display Pedestal Base */}
            <div className={styles.displayPedestalBase}>
              <div className={styles.pedestalRim} />
              <div className={styles.pedestalPlaque}>
                <span className={styles.plaqueTier}>TIER {currentRank.tier}</span>
                <span className={styles.plaqueDot}>•</span>
                <span className={styles.plaqueTitle}>{currentRank.name.toUpperCase()}</span>
                <span className={styles.plaqueDot}>•</span>
                <span className={styles.plaqueRange}>{currentRank.levelRange}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default LegacyChamberHero;
