import React, { useState } from 'react';
import {
  ArrowRight,
  Play,
  ClipboardCheck,
  Users,
  Magnet,
  Gamepad2,
  Flame,
  ChevronRight
} from 'lucide-react';
import { EarnAndLevelUpModal } from './EarnAndLevelUpModal';
import styles from './EarnMore.module.css';

export function EarnMoreGrid({
  onLaunchGame,
  onViewRewards,
  onClaimFeature,
  currentLevel = 5,
  nextLevel = currentLevel + 1,
  nextLevelName,
  nextLevelReward
}) {
  const [showFullEarnModal, setShowFullEarnModal] = useState(false);

  const activities = [
    {
      id: 'watch_earn',
      label: 'Watch & Earn',
      xpTag: '+50 XP',
      icon: Play,
      image: '/assets/operations/op_watch_earn.svg',
      action: () => onClaimFeature && onClaimFeature('watch_earn')
    },
    {
      id: 'daily_tasks',
      label: 'Daily Tasks',
      xpTag: '+30 XP',
      icon: ClipboardCheck,
      image: '/assets/operations/op_daily_tasks.svg',
      action: () => onClaimFeature && onClaimFeature('daily_tasks')
    },
    {
      id: 'refer_earn',
      label: 'Refer & Earn',
      xpTag: '+100 XP',
      icon: Users,
      image: '/assets/operations/op_refer_earn.svg',
      action: () => onClaimFeature && onClaimFeature('refer_earn')
    },
    {
      id: 'xp_catcher',
      label: 'XP Catcher',
      xpTag: '2X Orbs',
      icon: Magnet,
      image: '/assets/operations/op_xp_catcher.svg',
      action: () => onLaunchGame && onLaunchGame()
    },
    {
      id: 'mini_games',
      label: 'Mini Games',
      xpTag: '+75 XP',
      icon: Gamepad2,
      image: '/assets/operations/op_mini_games.svg',
      action: () => onLaunchGame && onLaunchGame()
    },
    {
      id: 'streak_bonus',
      label: 'Streak Bonus',
      xpTag: '+25 XP',
      icon: Flame,
      image: '/assets/operations/op_streak_bonus.svg',
      action: () => onClaimFeature && onClaimFeature('streak_xp')
    }
  ];

  return (
    <section id="gaming-rewards-section" className={styles.earnMoreSection} aria-label="Earn More Activities">
      <div className={styles.headerRow}>
        <div className={styles.titleWrap}>
          <span className={styles.gamingBadge}>TACTICAL REWARDS</span>
          <h2 className={styles.sectionTitle}>EARNING OPERATIONS</h2>
        </div>
        <button
          className={styles.arrowBtn}
          aria-label="View all earning opportunities"
          onClick={() => setShowFullEarnModal(true)}
        >
          <ArrowRight size={18} />
        </button>
      </div>

      <p className={styles.sectionSub}>
        Complete active field operations and tactical challenges to earn verified XP rewards.
      </p>

      {/* 2x3 Grid */}
      <div className={styles.grid}>
        {activities.map(item => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className={styles.gridItem}
              onClick={item.action}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  item.action();
                }
              }}
            >
              <div className={styles.iconBox}>
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.label}
                    className={styles.activity3DImg}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                ) : (
                  <IconComponent size={22} color="#ffffff" />
                )}
              </div>
              <div className={styles.itemContent}>
                <span className={styles.itemLabel}>{item.label}</span>
                {item.xpTag && <span className={styles.itemXpTag}>{item.xpTag}</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Level Rewards Card with Exact Treasure Chest Illustration */}
      <div
        className={styles.rewardCard}
        onClick={onViewRewards}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && onViewRewards) {
            e.preventDefault();
            onViewRewards();
          }
        }}
      >
        <div className={styles.rewardCardContent}>
          <h3 className={styles.rewardCardTitle}>
            Level {String(nextLevel).padStart(2, '0')} Reward
          </h3>
          <p className={styles.rewardCardSub}>
            {nextLevelReward &&
            typeof nextLevelReward.type === 'string' &&
            typeof nextLevelReward.amount === 'number' &&
            Number.isFinite(nextLevelReward.amount)
              ? `${nextLevelReward.amount.toLocaleString()} ${nextLevelReward.type}${nextLevelName ? ` at ${nextLevelName}` : ''}`
              : 'Reward details are not available.'}
          </p>
          <div className={styles.viewRewardsLink}>
            <span>View Rewards</span>
            <ChevronRight size={16} />
          </div>
        </div>

        <div className={styles.chestWrapper}>
          {/* Glowing Pedestal Platform at Base */}
          <div className={styles.pedestalContainer} aria-hidden="true">
            <div className={styles.pedestalOuterRing} />
            <div className={styles.pedestalInnerDisc} />
            <div className={styles.pedestalSpotlight} />
          </div>

          {/* Golden Ambient Glow Behind Chest */}
          <div className={styles.chestGlow} aria-hidden="true" />

          {/* 3D Rotating Magical Golden Light Rings Below/Around Chest */}
          <div className={`${styles.orbitRing} ${styles.orbitRing1}`} aria-hidden="true" />
          <div className={`${styles.orbitRing} ${styles.orbitRing2}`} aria-hidden="true" />

          {/* Inner Golden Light Ray Beam */}
          <div className={styles.chestLidGleam} aria-hidden="true" />

          {/* Floating Sparkling 4-Point Golden Stars */}
          <span className={`${styles.sparkle} ${styles.sparkle1}`} aria-hidden="true" />
          <span className={`${styles.sparkle} ${styles.sparkle2}`} aria-hidden="true" />
          <span className={`${styles.sparkle} ${styles.sparkle3}`} aria-hidden="true" />
          <span className={`${styles.sparkle} ${styles.sparkle4}`} aria-hidden="true" />
          <span className={`${styles.sparkle} ${styles.sparkle5}`} aria-hidden="true" />

          {/* Floating 3D Treasure Chest */}
          <div className={styles.chestFloatingContainer}>
            <img
              src="/assets/premium/png/reward_showcase_chest_clean.png"
              alt="Level 05 Rewards Treasure Chest"
              className={styles.rewardCardImg}
              onError={(e) => {
                e.currentTarget.src = '/assets/reference/reward_big_chest.png';
              }}
            />
          </div>
        </div>
      </div>

      {/* Screen 4 Full Earn & Level Up Modal */}
      {showFullEarnModal && (
        <EarnAndLevelUpModal
          onClose={() => setShowFullEarnModal(false)}
          onLaunchGame={() => {
            setShowFullEarnModal(false);
            if (onLaunchGame) onLaunchGame();
          }}
          onClaimFeature={(key) => onClaimFeature?.(key)}
        />
      )}
    </section>
  );
}
