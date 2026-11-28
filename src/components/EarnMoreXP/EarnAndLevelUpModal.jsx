import React, { useRef, useState } from 'react';
import {
  ArrowLeft,
  Play,
  ClipboardCheck,
  Users,
  Gamepad2,
  Flame,
  Magnet,
  ChevronRight,
  BarChart2,
  CheckCircle2
} from 'lucide-react';
import styles from './EarnMore.module.css';

export function EarnAndLevelUpModal({ onClose, onLaunchGame, onClaimFeature, isStandalone = false }) {
  const [claimedMap, setClaimedMap] = useState({});
  const [pendingMap, setPendingMap] = useState({});
  const [claimToast, setClaimToast] = useState('');
  const [claimToastType, setClaimToastType] = useState('success');
  const pendingClaims = useRef(new Set());

  const items = [
    {
      id: 'watch_earn',
      title: 'Watch & Earn',
      desc: 'Watch ads and earn',
      reward: '+15 XP',
      icon: Play,
      image: '/assets/operations/op_watch_earn.svg',
      action: () => handleClaim('watch_earn')
    },
    {
      id: 'daily_tasks',
      title: 'Daily Missions',
      desc: 'Complete daily tasks',
      reward: '+30 XP',
      icon: ClipboardCheck,
      image: '/assets/operations/op_daily_tasks.svg',
      action: () => handleClaim('daily_tasks')
    },
    {
      id: 'refer_earn',
      title: 'Refer & Earn',
      desc: 'Invite friends & earn',
      reward: '+50 XP',
      icon: Users,
      image: '/assets/operations/op_refer_earn.svg',
      action: () => handleClaim('refer_earn')
    },
    {
      id: 'mini_games',
      title: 'Mini Games',
      desc: 'Play games & win',
      reward: '+75 XP',
      icon: Gamepad2,
      image: '/assets/operations/op_mini_games.svg',
      action: () => onLaunchGame && onLaunchGame()
    },
    {
      id: 'streak_bonus',
      title: 'Streak Bonus',
      desc: 'Maintain your streak',
      reward: '+25 XP',
      icon: Flame,
      image: '/assets/operations/op_streak_bonus.svg',
      disabled: true,
      action: () => {}
    },
    {
      id: 'xp_catcher',
      title: 'XP Catcher',
      desc: 'Catch orbs & coins',
      reward: '+10 XP',
      icon: Magnet,
      image: '/assets/operations/op_xp_catcher.svg',
      action: () => onLaunchGame && onLaunchGame()
    }
  ];

  const handleClaim = async (key) => {
    if (claimedMap[key] || pendingClaims.current.has(key)) return;

    pendingClaims.current.add(key);
    setPendingMap(prev => ({ ...prev, [key]: true }));
    setClaimToast('');

    try {
      if (typeof onClaimFeature !== 'function') {
        throw new Error('Claim service is unavailable.');
      }

      const result = await onClaimFeature(key);
      const xpAdded = Number(result?.xpAdded);

      if (result?.success !== true || !Number.isFinite(xpAdded) || xpAdded <= 0) {
        throw new Error('Backend did not confirm this claim.');
      }

      setClaimedMap(prev => ({ ...prev, [key]: true }));
      setClaimToast(`Claimed +${xpAdded} XP!`);
      setClaimToastType('success');
    } catch (error) {
      setClaimToast(error?.message || 'Claim failed. Please try again.');
      setClaimToastType('error');
    } finally {
      pendingClaims.current.delete(key);
      setPendingMap(prev => ({ ...prev, [key]: false }));
    }
  };

  const containerStyle = isStandalone
    ? { position: 'relative', minHeight: '100%', zIndex: 1, background: '#090a12', animation: 'none' }
    : {};

  return (
    <div className={styles.fullModalOverlay} style={containerStyle} role="dialog" aria-modal="true">
      <div className={styles.modalHeader}>
        <button
          className={styles.backBtn}
          onClick={onClose}
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h2 className={styles.modalTitle}>EARN & LEVEL UP</h2>
          <p className={styles.modalSub}>
            Complete activities. Earn XP. Climb levels. Get rewards.
          </p>
        </div>
      </div>

      <div className={styles.modalBody}>
        {claimToast && (
          <div style={{
            background: claimToastType === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.15)',
            border: `1px solid ${claimToastType === 'success' ? '#10b981' : '#ef4444'}`,
            borderRadius: '12px',
            padding: '10px 16px',
            color: claimToastType === 'success' ? '#34d399' : '#f87171',
            fontSize: '13px',
            fontWeight: '600',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            {claimToastType === 'success' ? <CheckCircle2 size={16} /> : null}
            {claimToast}
          </div>
        )}

        {items.map(item => {
          const IconComp = item.icon;
          const isClaimed = Boolean(claimedMap[item.id]);
          const isPending = Boolean(pendingMap[item.id]);
          const isDisabled = Boolean(item.disabled || isClaimed || isPending);
          return (
            <div
              key={item.id}
              className={styles.earnListCard}
              onClick={() => {
                if (!isDisabled) item.action();
              }}
              role="button"
              aria-disabled={isDisabled}
              tabIndex={isDisabled ? -1 : 0}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !isDisabled) {
                  e.preventDefault();
                  item.action();
                }
              }}
            >
              <div className={styles.cardLeft}>
                <div className={styles.iconBox}>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className={styles.activity3DImg}
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  ) : (
                    <IconComp size={22} color="#ffffff" />
                  )}
                </div>
                <div className={styles.cardText}>
                  <span className={styles.cardTitle}>{item.title}</span>
                  <span className={styles.cardDesc}>{item.desc}</span>
                </div>
              </div>

              <div className={styles.cardXpBadge}>
                {isPending ? (
                  <span>Claiming...</span>
                ) : isClaimed ? (
                  <span style={{ color: '#10b981' }}>Done ?</span>
                ) : item.disabled ? (
                  <span>Coming soon</span>
                ) : (
                  <span>{item.reward}</span>
                )}
                <ChevronRight size={18} color="#6b7280" />
              </div>
            </div>
          );
        })}

        {/* Motivational Banner */}
        <div className={styles.motivationBanner}>
          <span className={styles.motivationText}>
            Keep going! You're doing great!
          </span>
          <BarChart2 size={24} color="#f5b041" />
        </div>
      </div>
    </div>
  );
}
