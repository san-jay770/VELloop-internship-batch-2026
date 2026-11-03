import React, { useState } from 'react';
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

export function EarnAndLevelUpModal({ onClose, onLaunchGame, onClaimFeature }) {
  const [claimedMap, setClaimedMap] = useState({});
  const [claimToast, setClaimToast] = useState('');

  const items = [
    {
      id: 'watch_earn',
      title: 'Watch & Earn',
      desc: 'Watch ads and earn',
      reward: '+50 XP',
      icon: Play,
      bg: '#9333ea',
      action: () => handleClaim('watch_earn', 50)
    },
    {
      id: 'daily_tasks',
      title: 'Daily Missions',
      desc: 'Complete daily tasks',
      reward: '+30 XP',
      icon: ClipboardCheck,
      bg: '#10b981',
      action: () => handleClaim('daily_tasks', 30)
    },
    {
      id: 'refer_earn',
      title: 'Refer & Earn',
      desc: 'Invite friends & earn',
      reward: '+100 XP',
      icon: Users,
      bg: '#f59e0b',
      action: () => handleClaim('refer_earn', 100)
    },
    {
      id: 'mini_games',
      title: 'Mini Games',
      desc: 'Play games & win',
      reward: '+75 XP',
      icon: Gamepad2,
      bg: '#6366f1',
      action: () => onLaunchGame && onLaunchGame()
    },
    {
      id: 'streak_bonus',
      title: 'Streak Bonus',
      desc: 'Maintain your streak',
      reward: '+25 XP',
      icon: Flame,
      bg: '#ef4444',
      action: () => handleClaim('streak_bonus', 25)
    },
    {
      id: 'xp_catcher',
      title: 'XP Catcher',
      desc: 'Catch orbs & coins',
      reward: '+10 XP',
      icon: Magnet,
      bg: '#0284c7',
      action: () => onLaunchGame && onLaunchGame()
    }
  ];

  const handleClaim = (key, xp) => {
    if (claimedMap[key]) return;
    setClaimedMap(prev => ({ ...prev, [key]: true }));
    setClaimToast(`Claimed +${xp} XP!`);
    setTimeout(() => setClaimToast(''), 2500);
    if (onClaimFeature) onClaimFeature(key);
  };

  return (
    <div className={styles.fullModalOverlay} role="dialog" aria-modal="true">
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
            background: 'rgba(16, 185, 129, 0.2)',
            border: '1px solid #10b981',
            borderRadius: '12px',
            padding: '10px 16px',
            color: '#34d399',
            fontSize: '13px',
            fontWeight: '600',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <CheckCircle2 size={16} />
            {claimToast}
          </div>
        )}

        {items.map(item => {
          const IconComp = item.icon;
          const isClaimed = claimedMap[item.id];
          return (
            <div 
              key={item.id}
              className={styles.earnListCard}
              onClick={item.action}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && item.action()}
            >
              <div className={styles.cardLeft}>
                <div className={styles.iconBox} style={{ backgroundColor: item.bg }}>
                  <IconComp size={22} color="#ffffff" />
                </div>
                <div className={styles.cardText}>
                  <span className={styles.cardTitle}>{item.title}</span>
                  <span className={styles.cardDesc}>{item.desc}</span>
                </div>
              </div>

              <div className={styles.cardXpBadge}>
                {isClaimed ? (
                  <span style={{ color: '#10b981' }}>Done ✓</span>
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

