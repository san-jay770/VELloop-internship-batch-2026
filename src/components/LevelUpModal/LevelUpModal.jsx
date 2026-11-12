import React, { useEffect } from 'react';
import { TrendingUp, Target, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import styles from './LevelUpModal.module.css';

export function LevelUpModal({ 
  level = 5, 
  levelName = "Ascendant",
  veReward = 500, 
  gemReward = 25, 
  onClaim,
  isStandalone = false 
}) {
  useEffect(() => {
    if (!isStandalone) {
      try {
        confetti({
          particleCount: 80,
          spread: 85,
          origin: { y: 0.5 },
          colors: ['#f5b041', '#fbbf24', '#9333ea', '#10b981', '#ffffff']
        });
      } catch {}
    }
  }, [isStandalone]);

  const content = (
    <div className={styles.modalCard} style={isStandalone ? { maxWidth: '100%', background: 'transparent', border: 'none', boxShadow: 'none', padding: '16px 14px' } : {}}>
      <div className={styles.titleArea}>
        <h2 className={styles.levelUpTitle}>LEVEL UP!</h2>
        <p className={styles.levelUpSub}>You've reached</p>
      </div>

      {/* Central Hexagon Badge & 3D Pedestal */}
      <div className={styles.pedestalWrapper}>
        <img 
          src="/assets/ref_level_up_pedestal.png" 
          alt={`Level ${level} Celebration Pedestal`}
          style={{ width: '180px', height: '170px', objectFit: 'contain' }}
          onError={(e) => {
            e.currentTarget.src = '/assets/lvl-5.svg';
          }}
        />
      </div>

      {/* 2-Column Rewards */}
      <div className={styles.rewardsGrid}>
        <div className={styles.rewardItem}>
          <span className={styles.rewardAmount}>+{veReward} VEs</span>
          <img 
            src="/assets/ref_coins_stack.png" 
            alt="VE Coins Stack" 
            className={styles.rewardImg}
            onError={(e) => { e.currentTarget.src = '/assets/gold.svg'; }}
          />
        </div>

        <div className={styles.rewardItem}>
          <span className={styles.rewardAmount}>+{gemReward} Gems</span>
          <img 
            src="/assets/ref_gems_stack.png" 
            alt="Purple Gems" 
            className={styles.rewardImg}
            onError={(e) => { e.currentTarget.src = '/assets/gem.svg'; }}
          />
        </div>
      </div>

      {/* Unlocked Perks */}
      <div className={styles.perksList}>
        <div className={styles.perkRow}>
          <TrendingUp size={18} className={styles.perkIcon} />
          <span>Higher daily XP limit</span>
        </div>

        <div className={styles.perkRow}>
          <Target size={18} className={styles.perkIcon} />
          <span>Access to new challenges</span>
        </div>

        <div className={styles.perkRow}>
          <Gift size={18} className={styles.perkIcon} />
          <span>Better reward opportunities</span>
        </div>
      </div>

      {/* Claim Rewards Button */}
      <button 
        className={styles.claimBtn}
        onClick={onClaim}
      >
        Claim Rewards
      </button>
    </div>
  );

  if (isStandalone) {
    return <div style={{ width: '100%', minHeight: '100%', background: '#090a12' }}>{content}</div>;
  }

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      {content}
    </div>
  );
}
