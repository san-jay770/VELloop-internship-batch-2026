import React, { useState } from 'react';
import {
  Filter,
  Users,
  ClipboardCheck,
  Gamepad2,
  Flame,
  Coins,
  ChevronRight
} from 'lucide-react';
import { EmptyState } from '../Common/CommonComponents';
import styles from './XPActivity.module.css';

export function XPActivity({
  activities = [],
  todayXP = 215,
  todayVE = 35,
  showAll = false,
  onViewAll,
  onStartEarning
}) {
  const [filterType, setFilterType] = useState('all');

  const getIconForType = (type) => {
    switch (type) {
      case 'refer_earn':
        return { icon: Users, bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' };
      case 'daily_tasks':
        return { icon: ClipboardCheck, bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981' };
      case 'game':
        return { icon: Gamepad2, bg: 'rgba(197, 166, 106, 0.15)', color: '#C5A66A' };
      case 'xp_catcher':
        return { icon: Coins, bg: 'rgba(245, 176, 65, 0.15)', color: '#f5b041' };
      case 'streak':
      case 'streak_bonus':
        return { icon: Flame, bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' };
      default:
        return { icon: Coins, bg: 'rgba(255, 255, 255, 0.08)', color: '#e5e7eb' };
    }
  };

  const filtered = filterType === 'all'
    ? activities
    : activities.filter(a => a.type === filterType);

  return (
    <section className={styles.activitySection} aria-label="Recent Activity">
      <div className={styles.headerRow}>
        <div className={styles.titleWrap}>
          <span className={styles.gamingBadge}>SESSION TELEMETRY</span>
          <h2 className={styles.title}>RECENT ACTIVITY</h2>
        </div>
        <div className={styles.headerActions}>
          {onViewAll && (
            <button className={styles.viewAllBtn} onClick={onViewAll}>
              View all
              <ChevronRight size={16} />
            </button>
          )}
          <button
            className={styles.filterBtn}
            aria-label="Filter activities"
            onClick={() => {
              const types = ['all', 'game', 'daily_tasks', 'refer_earn'];
              const nextIdx = (types.indexOf(filterType) + 1) % types.length;
              setFilterType(types[nextIdx]);
            }}
            title={`Filter: ${filterType}`}
          >
            <Filter size={16} />
          </button>
        </div>
      </div>

      <p className={styles.sectionSub}>
        Live audit feed of completed mission milestones and earned reward tokens.
      </p>

      <div className={styles.activityList}>
        {(showAll ? filtered : filtered.slice(0, 5)).map(item => {
          const conf = getIconForType(item.type);
          const IconComp = conf.icon;
          const isVE = item.unit === 'VEs' || (item.label && item.label.includes('VE'));
          const unit = isVE ? 'VEs' : 'XP';

          return (
            <div key={item.id} className={styles.activityRow}>
              <div className={styles.rowLeft}>
                <div
                  className={styles.iconCircle}
                  style={{ backgroundColor: conf.bg, color: conf.color }}
                >
                  <IconComp size={20} />
                </div>
                <div className={styles.rowText}>
                  <span className={styles.rewardText}>+{item.xpDelta} {unit}</span>
                  <span className={styles.activityLabel}>{item.label}</span>
                  <span className={styles.timestamp}>{item.timestamp || 'Today'}</span>
                </div>
              </div>

              <ChevronRight size={18} className={styles.rowChevron} />
            </div>
          );
        })}
        {filtered.length === 0 && (
          <EmptyState
            message={activities.length === 0 ? 'Your XP journey starts here.' : 'No XP activity matches this filter.'}
            onCta={onStartEarning}
          />
        )}
      </div>

      {activities.length > 0 && (
        <div className={styles.summaryCard}>
          <h3 className={styles.summaryTitle}>Today's Summary</h3>
          <div className={styles.summaryGrid}>
            <div className={styles.summaryItem}>
              <div
                className={styles.summaryBadgeIcon}
                style={{ background: 'rgba(197, 166, 106, 0.2)', color: '#C5A66A', border: '1px solid rgba(197, 166, 106, 0.3)' }}
              >
                XP
              </div>
              <div className={styles.summaryDetails}>
                <span className={styles.summaryValue}>{todayXP} XP</span>
                <span className={styles.summaryLabel}>Total Earned</span>
              </div>
            </div>

            <div className={styles.summaryItem}>
              <div
                className={styles.summaryBadgeIcon}
                style={{ background: 'rgba(245, 176, 65, 0.2)', color: '#fcd34d', border: '1px solid rgba(245, 176, 65, 0.3)' }}
              >
                V
              </div>
              <div className={styles.summaryDetails}>
                <span className={styles.summaryValue}>{todayVE} VEs</span>
                <span className={styles.summaryLabel}>Total Earned</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
