import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  GitBranch,
  Gamepad2,
  Coins,
  Trophy,
  Activity,
  Wallet,
  User,
  Settings,
  X,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Award,
  Zap,
  Gift
} from 'lucide-react';
import styles from './Sidebar.module.css';
import { getRankData } from '../Common/BlackLabelEmblem';

export function Sidebar({
  isOpen = false,
  mobileOpen,
  onClose,
  onMobileClose,
  activeTab,
  activeNav,
  onSelectTab,
  profile,
  currentLevel = 5,
  currentLevelName = 'Ascendant',
  currentXP = 6420,
  requiredXP = 8000,
  progressPct = 80,
  onLaunchGame,
  onViewRewards
}) {
  const navigate = useNavigate();
  const isDrawerOpen = isOpen || mobileOpen || false;
  const handleClose = onClose || onMobileClose;
  const currentTab = activeTab || activeNav || 'dashboard';

  const primaryNav = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
    { id: 'roadmap', label: 'Level Journey', icon: GitBranch },
    { id: 'arcade', label: 'XP Catcher Arcade', icon: Gamepad2, badge: '2X XP' },
    { id: 'rewards', label: 'Milestone Rewards', icon: Gift },
    { id: 'earn', label: 'Earning Hub', icon: Coins },
    { id: 'achievements', label: 'Achievements', icon: Trophy }
  ];

  const secondaryNav = [
    { id: 'activity', label: 'Activity Logs', icon: Activity },
    { id: 'wallet', label: 'Player Wallet', icon: Wallet },
    { id: 'profile', label: 'Player Profile', icon: User },
    { id: 'settings', label: 'System Settings', icon: Settings }
  ];

  const handleNavClick = (id) => {
    if (id === 'arcade') {
      if (onLaunchGame) onLaunchGame();
      if (handleClose) handleClose();
      return;
    }
    if (id === 'rewards') {
      if (onViewRewards) onViewRewards();
      if (handleClose) handleClose();
      return;
    }
    if (id === 'roadmap') {
      const el = document.getElementById('level-journey-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/Lvl-Dashboard');
      }
      if (handleClose) handleClose();
      return;
    }
    if (id === 'achievements') {
      const el = document.getElementById('gaming-achievements-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/Lvl-Dashboard');
      }
      if (handleClose) handleClose();
      return;
    }
    if (id === 'settings') {
      if (onSelectTab) onSelectTab('profile');
      else navigate('/Lvl-Dashboard/profile');
      if (handleClose) handleClose();
      return;
    }

    if (onSelectTab) {
      onSelectTab(id);
    } else {
      // Fallback navigation
      if (id === 'dashboard') navigate('/Lvl-Dashboard');
      else if (id === 'activity') navigate('/Lvl-Dashboard/activity');
      else if (id === 'wallet') navigate('/Lvl-Dashboard/wallet');
      else if (id === 'profile') navigate('/Lvl-Dashboard/profile');
      else if (id === 'earn') navigate('/Lvl-Dashboard');
    }

    if (handleClose) handleClose();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isDrawerOpen && (
        <div
          className={styles.backdrop}
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`${styles.sidebar} ${isDrawerOpen ? styles.sidebarOpen : ''}`}
        aria-label="Sidebar Navigation"
      >
        {/* Brand Header */}
        <div className={styles.brandContainer}>
          <div className={styles.brandRow}>
            <div className={styles.logoBadge}>
              <img
                src="/assets/logo.svg"
                alt="VELOOP Royal Crest"
                className={styles.brandLogo}
                onError={(e) => { e.currentTarget.src = '/assets/premium/svg/veloop_logo.svg'; }}
              />
              <div className={styles.logoHalo} aria-hidden="true" />
            </div>
            <div className={styles.brandTitles}>
              <span className={styles.brandName}>VELOOP</span>
              <span className={styles.brandBadge}>BLACK LABEL</span>
            </div>
          </div>

          {/* Close button for mobile drawer */}
          <button
            className={styles.closeDrawerBtn}
            onClick={handleClose}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Live Realm Status Indicator */}
        <div className={styles.statusPillWrap}>
          <div className={styles.statusPill}>
            <span className={styles.statusPulse} />
            <span className={styles.statusText}>BLACK LABEL • ACTIVE OPERATIVE</span>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className={styles.navSections}>
          {/* Main Navigation */}
          <div className={styles.navGroup}>
            <span className={styles.groupLabel}>EXECUTIVE DOMAIN</span>
            <ul className={styles.navList}>
              {primaryNav.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <li key={item.id}>
                    <button
                      className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                      onClick={() => handleNavClick(item.id)}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <div className={styles.navIcon}>
                        <Icon size={18} strokeWidth={isActive ? 2.4 : 1.8} />
                      </div>
                      <span className={styles.navLabel}>{item.label}</span>
                      {item.badge && (
                        <span className={styles.navItemBadge}>{item.badge}</span>
                      )}
                      {isActive && <div className={styles.activeIndicator} />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Player Inventory & System */}
          <div className={styles.navGroup}>
            <span className={styles.groupLabel}>VAULT & PROTOCOLS</span>
            <ul className={styles.navList}>
              {secondaryNav.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <li key={item.id}>
                    <button
                      className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                      onClick={() => handleNavClick(item.id)}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <div className={styles.navIcon}>
                        <Icon size={18} strokeWidth={isActive ? 2.4 : 1.8} />
                      </div>
                      <span className={styles.navLabel}>{item.label}</span>
                      {isActive && <div className={styles.activeIndicator} />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom User Level Snapshot Widget */}
        <div className={styles.sidebarFooter}>
          <div
            className={styles.userCard}
            onClick={() => handleNavClick('profile')}
            role="button"
            tabIndex={0}
            title="Open Player Dossier"
          >
            <div className={styles.userCardTop}>
              <div className={styles.avatarWrap}>
                <img
                  src={getRankData(currentLevel).badgeSrc}
                  alt={currentLevelName}
                  className={styles.sidebarAvatarBadge}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span className={styles.onlineDot} />
              </div>

              <div className={styles.userInfo}>
                <span className={styles.userName}>
                  {profile?.userName || 'VeLooper'}
                </span>
                <span className={styles.userRankTier}>
                  LVL {String(currentLevel).padStart(2, '0')} • {currentLevelName}
                </span>
              </div>

              <ChevronRight size={14} className={styles.userArrow} />
            </div>

            {/* Mini Progress Bar */}
            <div className={styles.miniProgressWrap}>
              <div className={styles.miniProgressLabels}>
                <span>XP MATRIX</span>
                <span className={styles.miniProgressPct}>{progressPct}%</span>
              </div>
              <div className={styles.miniProgressBarTrack}>
                <div
                  className={styles.miniProgressBarFill}
                  style={{ width: `${Math.min(100, Math.max(0, progressPct))}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
