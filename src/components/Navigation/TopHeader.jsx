import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Bell,
  X,
  Gamepad2,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { getRankData } from '../Common/BlackLabelEmblem';
import styles from './TopHeader.module.css';

export function TopHeader({
  onToggleSidebar,
  onMenuToggle,
  activities = [],
  profile,
  currentLevel = 5,
  currentLevelName = 'Ascendant',
  onLaunchGame,
  onNavigate
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);
  const handleToggle = onToggleSidebar || onMenuToggle;

  // Close notifications on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    }
    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  const unreadCount = Math.min(activities.length, 5);

  return (
    <header className={styles.topHeader}>
      <div className={styles.headerLeft}>
        {/* Mobile Hamburger Drawer Toggle */}
        <button
          className={styles.menuToggleBtn}
          onClick={handleToggle}
          aria-label="Open Navigation Sidebar"
        >
          <Menu size={20} />
        </button>

        {/* Breadcrumb Path */}
        <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
          <span className={styles.breadcrumbRoot}>VELOOP</span>
          <ChevronRight size={14} className={styles.breadcrumbSeparator} />
          <span className={styles.breadcrumbCurrent}>BLACK LABEL</span>
        </nav>

        {/* Backend Live Sync Pill */}
        <div className={styles.syncBadge} title="Real-time Black Label session active">
          <span className={styles.syncDot} />
          <span className={styles.syncLabel}>Black Label Synced</span>
        </div>
      </div>

      <div className={styles.headerRight}>
        {/* Play Arcade Quick Action */}
        <button
          className={styles.arcadeQuickBtn}
          onClick={onLaunchGame}
          aria-label="Launch Royal XP Catcher Challenge"
        >
          <Gamepad2 size={16} />
          <span>Royal Arcade</span>
          <span className={styles.quickMultiplier}>2X</span>
        </button>

        {/* Notifications Dropdown */}
        <div className={styles.notifWrapper} ref={notifRef}>
          <button
            className={`${styles.iconBtn} ${showNotifications ? styles.iconBtnActive : ''}`}
            onClick={() => setShowNotifications(prev => !prev)}
            aria-label="View Recent Activity Updates"
            aria-expanded={showNotifications}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className={styles.notifBadge}>{unreadCount}</span>
            )}
          </button>

          {showNotifications && (
            <div className={styles.notifDropdown}>
              <div className={styles.notifHeader}>
                <div className={styles.notifHeaderLeft}>
                  <span className={styles.notifTitle}>Recent Activity</span>
                  <span className={styles.notifCount}>{activities.length} Events</span>
                </div>
                <button
                  className={styles.notifClose}
                  onClick={() => setShowNotifications(false)}
                  aria-label="Close notifications"
                >
                  <X size={16} />
                </button>
              </div>

              <div className={styles.notifList}>
                {activities.length > 0 ? (
                  activities.slice(0, 6).map((item, index) => (
                    <div key={item.id || index} className={styles.notifItem}>
                      <div className={styles.notifIcon}>
                        <Sparkles size={14} />
                      </div>
                      <div className={styles.notifBody}>
                        <span className={styles.notifItemLabel}>
                          {item.label || 'Reward Earned'}
                        </span>
                        <span className={styles.notifTime}>
                          {item.timestamp ? new Date(item.timestamp).toLocaleDateString() : 'Just now'}
                        </span>
                      </div>
                      {item.xpDelta != null && (
                        <span className={styles.notifXP}>+{item.xpDelta} XP</span>
                      )}
                    </div>
                  ))
                ) : (
                  <div className={styles.emptyNotifs}>
                    <span>No recent activity events recorded.</span>
                  </div>
                )}
              </div>

              {onNavigate && (
                <div className={styles.notifFooter}>
                  <button
                    className={styles.viewAllHistoryBtn}
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigate('activity');
                    }}
                  >
                    <span>View All Activity Feed</span>
                    <ExternalLink size={12} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Profile Capsule */}
        <div
          className={styles.profileCapsule}
          onClick={() => onNavigate && onNavigate('profile')}
          role="button"
          tabIndex={0}
          title="View Profile Details"
        >
          <div className={styles.capsuleAvatar}>
            <img
              src={getRankData(currentLevel).badgeSrc}
              alt={`${currentLevelName} Emblem`}
              className={styles.headerAvatarImg}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div className={styles.capsuleText}>
            <span className={styles.capsuleName}>{profile?.userName || 'VeLooper'}</span>
            <span className={styles.capsuleTier}>Lvl {String(currentLevel).padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopHeader;
