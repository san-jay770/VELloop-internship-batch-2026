import React from 'react';
import styles from './LuxuryHero.module.css';

export function LuxuryHero({
  currentLevel = 5,
  currentLevelName = "Ascendant",
  currentXP = 6420,
  requiredXP = 8000,
  nextLevel = 6,
  nextLevelName = "Vanguard",
  nextLevelReward = { type: "Spins", amount: 2 },
  progressPct = 80,
  onLaunchGame,
  onViewRewards
}) {
  const xpToNext = Math.max(0, requiredXP - currentXP);
  const currentBadgeSrc = `/assets/luxury_3d/badge_level_${String(currentLevel).padStart(2, '0')}.png`;
  const heroMedallionSrc = `/assets/luxury_3d/hero_medallion_3d.png`;

  return (
    <section className={styles.heroSection} aria-label="Level Progression Hero">
      {/* Ambient Luxury Studio Lighting */}
      <div className={styles.studioLightingBackdrop} aria-hidden="true" />
      <div className={styles.spotlightBeam} aria-hidden="true" />

      <div className={styles.heroGrid}>

        {/* Left Column: Editorial Luxury Progression Typography */}
        <div className={styles.leftColumn}>

          {/* Eyebrow Label */}
          <div className={styles.eyebrowTag}>
            <span className={styles.eyebrowDot} />
            <span className={styles.eyebrowText}>LEVEL PROGRESSION</span>
          </div>

          {/* Monumental Headline */}
          <h1 className={styles.headline}>
            RISE ABOVE THE ORDINARY.
          </h1>

          {/* Current Rank & Sub-Standing */}
          <div className={styles.rankStandingRow}>
            <div className={styles.levelPill}>
              LEVEL {String(currentLevel).padStart(2, '0')}
            </div>
            <div className={styles.rankName}>
              {currentLevelName}
            </div>
            <div className={styles.statusBadge}>
              CURRENT RANK
            </div>
          </div>

          {/* Editorial Supporting Description */}
          <p className={styles.supportingText}>
            Every milestone is an enduring physical testament to your mastery. Collect bespoke 3D metallic insignia engineered with aerospace titanium, brushed platinum, and champagne gold.
          </p>

          {/* Quick Metrics Bar */}
          <div className={styles.heroMetricsStrip}>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>CURRENT XP</span>
              <span className={styles.metricValue}>{currentXP.toLocaleString()}</span>
            </div>
            <div className={styles.metricSep} />
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>NEXT MILESTONE</span>
              <span className={styles.metricValue}>{requiredXP.toLocaleString()} XP</span>
            </div>
            <div className={styles.metricSep} />
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>REMAINING</span>
              <span className={styles.metricValueGold}>{xpToNext.toLocaleString()} XP</span>
            </div>
            <div className={styles.metricSep} />
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>PROGRESS</span>
              <span className={styles.metricValueAccent}>{progressPct}%</span>
            </div>
          </div>

          {/* Hero CTAs */}
          <div className={styles.actionsRow}>
            {onLaunchGame && (
              <button
                type="button"
                className={styles.primaryGoldBtn}
                onClick={onLaunchGame}
              >
                <span>ENTER XP TRIAL</span>
                <span className={styles.btnArrow}>→</span>
              </button>
            )}

            {onViewRewards && (
              <button
                type="button"
                className={styles.secondaryTitaniumBtn}
                onClick={onViewRewards}
              >
                <span>LEVEL {String(nextLevel || 6).padStart(2, '0')} REWARD</span>
                <span className={styles.rewardChip}>
                  +{nextLevelReward?.amount || 500} {nextLevelReward?.type || 'VEs'}
                </span>
              </button>
            )}
          </div>

        </div>

        {/* Right Column: Enormous 3D Metallic Medallion on Luxury Pedestal */}
        <div className={styles.rightColumn}>
          <div className={styles.medallionStage}>

            {/* Dramatic Studio Spotlight Rings */}
            <div className={styles.spotlightAura} aria-hidden="true" />
            <div className={styles.pedestalReflection} aria-hidden="true" />

            {/* Realistic 3D Medallion Artifact */}
            <div className={styles.medallionFrame}>
              <img
                src={heroMedallionSrc}
                alt={`${currentLevelName} Level ${currentLevel} 3D Medallion`}
                className={styles.medallionImage}
                onError={(e) => {
                  e.currentTarget.src = currentBadgeSrc;
                }}
              />
            </div>

            {/* Pedestal Nameplate Plaque */}
            <div className={styles.pedestalPlaque}>
              <div className={styles.plaqueInner}>
                <span className={styles.plaqueLevel}>LEVEL {String(currentLevel).padStart(2, '0')}</span>
                <span className={styles.plaqueSep}>•</span>
                <span className={styles.plaqueRank}>{currentLevelName.toUpperCase()}</span>
                <span className={styles.plaqueSep}>•</span>
                <span className={styles.plaqueMaterial}>PLATINUM & TITANIUM</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default LuxuryHero;
