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
  currentLevel = 5 
}) {
  const [showFullEarnModal, setShowFullEarnModal] = useState(false);

  const activities = [
    {
      id: 'watch_earn',
      label: 'Watch & Earn',
      icon: Play,
      bg: '#9333ea',
      action: () => onClaimFeature && onClaimFeature('watch_earn')
    },
    {
      id: 'daily_tasks',
      label: 'Daily Tasks',
      icon: ClipboardCheck,
      bg: '#f59e0b',
      action: () => onClaimFeature && onClaimFeature('daily_tasks')
    },
    {
      id: 'refer_earn',
      label: 'Refer & Earn',
      icon: Users,
      bg: '#d97706',
      action: () => onClaimFeature && onClaimFeature('refer_earn')
    },
    {
      id: 'xp_catcher',
      label: 'XP Catcher',
      icon: Magnet,
      bg: '#0284c7',
      action: () => onLaunchGame && onLaunchGame()
    },
    {
      id: 'mini_games',
      label: 'Mini Games',
      icon: Gamepad2,
      bg: '#6366f1',
      action: () => onLaunchGame && onLaunchGame()
    },
    {
      id: 'streak_bonus',
      label: 'Streak Bonus',
      icon: Flame,
      bg: '#ef4444',
      action: () => onClaimFeature && onClaimFeature('streak_xp')
    }
  ];

  return (
    <section className={styles.earnMoreSection} aria-label="Earn More Activities">
      <div className={styles.headerRow}>
        <h2 className={styles.sectionTitle}>EARN MORE</h2>
        <button 
          className={styles.arrowBtn}
          aria-label="View all earning opportunities"
          onClick={() => setShowFullEarnModal(true)}
        >
          <ArrowRight size={18} />
        </button>
      </div>

      <p className={styles.sectionSub}>
        Explore fun activities and earn exciting rewards.
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
              onKeyDown={(e) => e.key === 'Enter' && item.action()}
            >
              <div className={styles.iconBox} style={{ backgroundColor: item.bg }}>
                <IconComponent size={22} color="#ffffff" />
              </div>
              <span className={styles.itemLabel}>{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Level 05 Rewards Card with Exact Treasure Chest Illustration */}
      <div 
        className={styles.rewardCard} 
        onClick={onViewRewards}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onViewRewards && onViewRewards()}
      >
        <div className={styles.rewardCardContent}>
          <h3 className={styles.rewardCardTitle}>
            Level {String(currentLevel).padStart(2, '0')} Rewards
          </h3>
          <p className={styles.rewardCardSub}>
            Amazing rewards await you!
          </p>
          <div className={styles.viewRewardsLink}>
            <span>View Rewards</span>
            <ChevronRight size={16} />
          </div>
        </div>

        <img 
          src="/assets/ref_treasure_chest.png" 
          alt="Level Rewards Treasure Chest"
          className={styles.rewardCardImg}
          onError={(e) => {
            e.currentTarget.src = '/assets/safe-1.svg';
          }}
        />
      </div>

      {/* Screen 4 Full Earn & Level Up Modal */}
      {showFullEarnModal && (
        <EarnAndLevelUpModal 
          onClose={() => setShowFullEarnModal(false)}
          onLaunchGame={() => {
            setShowFullEarnModal(false);
            if (onLaunchGame) onLaunchGame();
          }}
          onClaimFeature={(key) => {
            if (onClaimFeature) onClaimFeature(key);
          }}
        />
      )}
    </section>
  );
}
