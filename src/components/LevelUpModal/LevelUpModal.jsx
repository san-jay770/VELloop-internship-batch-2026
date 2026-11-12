import React, { useEffect } from 'react';
import { Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import styles from './LevelUpModal.module.css';

export function LevelUpModal({ 
  level,
  levelName,
  reward,
  onClose,
  isRewardPreview = false,
  isStandalone = false 
}) {
  useEffect(() => {
    if (!isStandalone && !isRewardPreview) {
      try {
        confetti({
          particleCount: 80,
          spread: 85,
          origin: { y: 0.5 },
          colors: ['#f5b041', '#fbbf24', '#9333ea', '#10b981', '#ffffff']
        });
      } catch {}
    }
  }, [isStandalone, isRewardPreview]);

  const hasReward = reward &&
    typeof reward.type === 'string' &&
    typeof reward.amount === 'number' &&
    Number.isFinite(reward.amount);
  const rewardLabel = hasReward
    ? `${Number(reward.amount).toLocaleString()} ${reward.type}`
    : 'Reward details are not available for this level.';

  const content = (
    <div className={styles.modalCard} style={isStandalone ? { maxWidth: '100%', background: 'transparent', border: 'none', boxShadow: 'none', padding: '16px 14px' } : {}}>
      <div className={styles.titleArea}>
        <h2 className={styles.levelUpTitle}>{isRewardPreview ? 'NEXT LEVEL REWARD' : 'LEVEL UP!'}</h2>
        <p className={styles.levelUpSub}>
          {isRewardPreview
            ? `Reach Level ${String(level).padStart(2, '0')}${levelName ? ` · ${levelName}` : ''} to unlock`
            : `You've reached Level ${String(level).padStart(2, '0')}${levelName ? ` · ${levelName}` : ''}`}
        </p>
      </div>

      <div className={styles.pedestalWrapper}>
        <img 
          src={isRewardPreview ? '/assets/ref_treasure_chest.png' : '/assets/ref_level_up_pedestal.png'}
          alt={isRewardPreview ? `Level ${level} reward chest` : `Level ${level} Celebration Pedestal`}
          style={{ width: '180px', height: '170px', objectFit: 'contain' }}
          onError={(e) => {
            e.currentTarget.src = isRewardPreview ? '/assets/safe-1.svg' : '/assets/lvl-5.svg';
          }}
        />
      </div>

      <div className={styles.rewardsGrid}>
        <div className={styles.rewardItem}>
          <Gift size={26} className={styles.perkIcon} />
          <span className={styles.rewardAmount}>{rewardLabel}</span>
        </div>
      </div>

      <button 
        className={styles.claimBtn}
        onClick={onClose}
      >
        {isRewardPreview ? 'Close' : 'Continue'}
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
