import React from 'react';
import {
  ShieldCheck,
  Zap,
  TrendingUp,
  Target,
  Gift,
  ArrowUpRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { LevelBadge } from '../LevelHero/LevelBadge';
import styles from './SummaryCards.module.css';

export function SummaryCards({
  currentLevel = 5,
  currentLevelName = 'Ascendant',
  currentXP = 6420,
  nextLevel = 6,
  nextLevelName = 'Vanguard',
  requiredXP = 8000,
  xpToNext = 1580,
  progressPct = 80,
  nextLevelReward = { type: 'Spins', amount: 2 },
  todayXP = 215,
  onViewRewards,
  onLaunchGame
}) {
  return (
    <section className={styles.summarySection} aria-label="Dashboard Overview Metrics">
      <div className={styles.cardsGrid}>
        {/* Card 1: Current Level & Tier */}
        <div className={`${styles.card} ${styles.cardGold}`}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTag}>CURRENT SOVEREIGN RANK</span>
            <div className={`${styles.iconWrap} ${styles.iconWrapGold}`}>
              <LevelBadge level={currentLevel} size={32} showGlow={false} animated={false} />
            </div>
          </div>

          <div className={styles.cardMain}>
            <div className={styles.metricRow}>
              <span className={styles.metricValue}>Level {String(currentLevel).padStart(2, '0')}</span>
            </div>
            <span className={styles.metricSub}>{currentLevelName} Sovereign</span>
          </div>

          <div className={styles.cardFooter}>
            <span className={styles.footerPill}>Tier {currentLevel} of 10</span>
            <span className={styles.footerNote}>Active Prestige Status</span>
          </div>
        </div>

        {/* Card 2: Total Accumulated XP */}
        <div className={`${styles.card} ${styles.cardAmber}`}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTag}>ROYAL ACCUMULATED XP</span>
            <div className={`${styles.iconWrap} ${styles.iconWrapAmber}`}>
              <img
                src="/assets/xp-1.svg"
                alt="XP Rewards"
                className={styles.summary3DIcon}
                onError={(e) => { e.currentTarget.src = '/assets/premium/svg/how_it_works_earn_rewards.svg'; }}
              />
            </div>
          </div>

          <div className={styles.cardMain}>
            <div className={styles.metricRow}>
              <span className={styles.metricValue}>{currentXP.toLocaleString()}</span>
              <span className={styles.metricUnit}>XP</span>
            </div>
            <div className={styles.metricDeltaRow}>
              <span className={styles.deltaBadge}>+{todayXP} XP</span>
              <span className={styles.metricSub}>earned today</span>
            </div>
          </div>

          <div className={styles.cardFooter}>
            <span className={styles.footerPillGreen}>Realm Synced</span>
            <span className={styles.footerNote}>Verified by Smart Contract</span>
          </div>
        </div>

        {/* Card 3: Level Progress */}
        <div className={`${styles.card} ${styles.cardViolet}`}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTag}>PRESTIGE PROGRESSION</span>
            <div className={`${styles.iconWrap} ${styles.iconWrapViolet}`}>
              <img
                src="/assets/premium/svg/how_it_works_level_up.svg"
                alt="Ascension Crest"
                className={styles.summary3DIcon}
                onError={(e) => { e.currentTarget.src = '/assets/gold.svg'; }}
              />
            </div>
          </div>

          <div className={styles.cardMain}>
            <div className={styles.metricRow}>
              <span className={styles.metricValue}>{progressPct}%</span>
              <span className={styles.metricUnit}>Ascended</span>
            </div>
            <span className={styles.metricSub}>
              {xpToNext.toLocaleString()} XP remaining to ascend
            </span>
          </div>

          {/* Mini Track */}
          <div className={styles.gaugeTrack}>
            <div
              className={styles.gaugeFill}
              style={{ width: `${Math.min(100, Math.max(0, progressPct))}%` }}
            />
          </div>

          <div className={styles.cardFooter}>
            <span className={styles.footerPill}>{currentXP.toLocaleString()} / {requiredXP.toLocaleString()} XP</span>
          </div>
        </div>

        {/* Card 4: Next Level Milestone */}
        <div className={`${styles.card} ${styles.cardCyan}`}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTag}>NEXT SOVEREIGN TARGET</span>
            <div className={`${styles.iconWrap} ${styles.iconWrapCyan}`}>
              <LevelBadge level={nextLevel} size={32} isLocked showGlow={false} animated={false} />
            </div>
          </div>

          <div className={styles.cardMain}>
            <div className={styles.metricRow}>
              <span className={styles.metricValue}>
                {nextLevel ? `Level ${String(nextLevel).padStart(2, '0')}` : 'Max Level'}
              </span>
            </div>
            <span className={styles.metricSub}>{nextLevelName}</span>
          </div>

          <div className={styles.cardFooter}>
            <span className={styles.footerPill}>{requiredXP.toLocaleString()} XP Goal</span>
            <span className={styles.footerNote}>Next Tier Ascension</span>
          </div>
        </div>

        {/* Card 5: Available Milestone Reward */}
        <div
          className={`${styles.card} ${styles.cardPurple} ${styles.cardInteractive}`}
          onClick={onViewRewards}
          role="button"
          tabIndex={0}
          title="Click to view reward details"
        >
          <div className={styles.cardHeader}>
            <span className={styles.cardTag}>ROYAL MILESTONE REWARD</span>
            <div className={`${styles.iconWrap} ${styles.iconWrapPurple}`}>
              <img
                src="/assets/premium/svg/reward_premium_chest.svg"
                alt="Gift Chest"
                className={styles.summary3DIcon}
                onError={(e) => { e.currentTarget.src = '/assets/safe-1.svg'; }}
              />
            </div>
          </div>

          <div className={styles.cardMain}>
            <div className={styles.metricRow}>
              <span className={styles.metricValueHighlight}>
                {nextLevelReward
                  ? `+${nextLevelReward.amount} ${nextLevelReward.type}`
                  : 'Milestone Perk'}
              </span>
            </div>
            <span className={styles.metricSub}>
              Unlocks with Level {String(nextLevel || 6).padStart(2, '0')}
            </span>
          </div>

          <div className={styles.cardFooterAction}>
            <span>Inspect Royal Reward</span>
            <ChevronRight size={14} className={styles.actionArrow} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SummaryCards;
