import React from 'react';
import { Crown, Trophy, Target, Gift, Zap, Gamepad2, ShieldCheck, Flame, Star, Sparkles } from 'lucide-react';
import { LevelBadge, LEGACY_RANKS } from './LevelBadge';
import { XPProgressBar } from './XPProgressBar';
import styles from './LevelHero.module.css';

export function LevelHero({
  currentLevel = 5,
  currentLevelName = "Ascendant",
  currentXP = 6420,
  nextLevel = 6,
  nextLevelName = "Vanguard",
  nextLevelReward = { type: "Spins", amount: 2 },
  requiredXP = 8000,
  xpToNext = Math.max(0, requiredXP - currentXP),
  progressPct = 80,
  userName = "VeLooper",
  onLaunchGame,
  onViewRewards
}) {
  const currentRankInfo = LEGACY_RANKS[currentLevel] || { legacyTitle: "Platinum Guardian", standardTitle: currentLevelName };
  const nextRankInfo = LEGACY_RANKS[nextLevel] || { legacyTitle: "Obsidian Knight", standardTitle: nextLevelName };

  return (
    <section className={styles.heroContainer} aria-label="Level Progression & Legacy Collection Hero">
      {/* Editorial Header Section */}
      <div className={styles.greetingSection}>
        <div className={styles.greetingTopPill}>
          <Crown size={14} className={styles.greetingCrown} />
          <span>VELOOP REWARDS • LEVEL PROGRESSION</span>
        </div>
        <h1 className={styles.greetingTitle}>
          YOUR JOURNEY. <span className={styles.userNameHighlight}>YOUR LEGACY.</span>
        </h1>
        <p className={styles.greetingSub}>
          Every level earned. Every milestone remembered. Build your legacy in the sovereign realm.
        </p>
      </div>

      {/* Main Dark Metallic Showcase Stage Card */}
      <div className={styles.heroCard}>
        {/* Subtle Metallic Filigree Accent Corners */}
        <div className={styles.goldCornerTopLeft} />
        <div className={styles.goldCornerBottomRight} />

        {/* Ambient Spotlight Lighting Behind the Centerpiece */}
        <div className={styles.heroCardGlowGold} aria-hidden="true" />
        <div className={styles.heroCardAtmosphere} aria-hidden="true" />

        <div className={styles.cardMainContent}>
          {/* Prominent Current Rank Badge Centerpiece on Metallic Stage */}
          <div className={styles.badgeSlot}>
            <div className={styles.badgeHaloCircle} />
            <div className={styles.badgeStageReflection} />
            <LevelBadge
              level={currentLevel}
              size={165}
              isCurrent
              showGlow
              animated
              interactive
            />
            <div className={styles.badgeTagWrap}>
              <span className={styles.badgeUnderTitle}>LEVEL {String(currentLevel).padStart(2, '0')}</span>
              <span className={styles.badgeLegacyTag}>{currentRankInfo.legacyTitle}</span>
            </div>
          </div>

          {/* Rank & Stats Slot */}
          <div className={styles.statsSlot}>
            <div className={styles.rankBadgeRow}>
              <span className={styles.rankPrestigeTag}>
                <Crown size={13} />
                SOVEREIGN PRESTIGE
              </span>
              <span className={styles.tierStatusPill}>TIER {String(currentLevel).padStart(2, '0')} OF 10</span>
              <span className={styles.liveStatusTag}>
                <span className={styles.liveBeacon} />
                REALM SYNCED
              </span>
            </div>

            <div className={styles.titleWithSubtitle}>
              <h2 className={styles.currentRankTitle}>{currentRankInfo.legacyTitle.toUpperCase()}</h2>
              <span className={styles.standardTitleMuted}>({currentLevelName})</span>
            </div>

            <div className={styles.xpRow}>
              <div className={styles.xpBigWrap}>
                <span className={styles.xpNumber}>{currentXP.toLocaleString()}</span>
                <span className={styles.xpUnit}>ROYAL XP</span>
              </div>
              <span className={styles.xpTotalLabel}>TOTAL ACCUMULATED PRESTIGE XP</span>
            </div>

            {/* Next Milestone Summary Chips */}
            <div className={styles.milestoneChipsRow}>
              <div className={styles.chipItem}>
                <Target size={13} className={styles.chipTargetIcon} />
                <span>Next: <strong>Level {String(nextLevel || 6).padStart(2, '0')} • {nextRankInfo.legacyTitle}</strong></span>
              </div>
              <div className={styles.chipItemAmber}>
                <Zap size={13} />
                <span><strong>{xpToNext.toLocaleString()} XP</strong> to ascend</span>
              </div>
              {nextLevelReward && (
                <div className={styles.chipItemPurple}>
                  <Gift size={13} />
                  <span>+{nextLevelReward.amount} {nextLevelReward.type} Milestone Reward</span>
                </div>
              )}
            </div>

            {/* Quick Hero Actions */}
            <div className={styles.heroActionsRow}>
              {onLaunchGame && (
                <button
                  type="button"
                  className={styles.heroPlayBtn}
                  onClick={onLaunchGame}
                  aria-label="Launch XP Catcher Arcade Challenge"
                >
                  <Gamepad2 size={16} />
                  <span>PLAY XP CATCHER</span>
                  <span className={styles.heroActionBadge}>2X BOOST</span>
                </button>
              )}
              {onViewRewards && (
                <button
                  type="button"
                  className={styles.heroRewardBtn}
                  onClick={onViewRewards}
                  aria-label="View Milestone Perks"
                >
                  <Trophy size={14} />
                  <span>View Sovereign Perks</span>
                </button>
              )}
            </div>
          </div>

          {/* 3D Black Eagle Master Artwork Column */}
          <div className={styles.heroEagleCol} aria-hidden="true">
            <div className={styles.heroEagleHalo} />
            <img
              src="/assets/premium/png/hero_eagle_emblem@4x.png"
              alt="Royal Golden-Crested Black Eagle Masterpiece"
              className={styles.heroEagleImg}
              onError={(e) => { e.currentTarget.src = '/assets/reference/hero_eagle.png'; }}
            />
          </div>
        </div>

        {/* Enhanced Royal Gold XP Progress Bar */}
        <div className={styles.progressSection}>
          <XPProgressBar
            currentXP={currentXP}
            requiredXP={requiredXP}
            xpToNext={xpToNext}
            nextLevel={nextLevel}
            progressPct={progressPct}
          />
        </div>
      </div>
    </section>
  );
}

export default LevelHero;
