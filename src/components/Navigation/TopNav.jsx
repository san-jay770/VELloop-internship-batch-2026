
import React, { useState } from 'react';
import {
  Menu, Bell, X, Home, Coins, Gift, Wallet, UserRound
} from 'lucide-react';
import styles from './Navigation.module.css';

export function TopNav({ onNavigate, activities = [] }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'earn', label: 'Earn', icon: Coins },
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'profile', label: 'Profile', icon: UserRound },
  ];

  const handleNavigation = (tab) => {
    setIsDrawerOpen(false);
    if (onNavigate) onNavigate(tab);
  };

  return (
    <>
      <header className={styles.topNav}>
        <button
          className={styles.iconBtn}
          aria-label="Open Navigation Menu"
          onClick={() => setIsDrawerOpen(true)}
        >
          <Menu size={22} />
        </button>

        <button
          className={styles.iconBtn}
          aria-label="View Recent Updates"
          aria-expanded={isNotificationsOpen}
          onClick={() => setIsNotificationsOpen(prev => !prev)}
        >
          <Bell size={22} />
          {activities.length > 0 && <span className={styles.notifDot} />}
        </button>
      </header>

      {isNotificationsOpen && (
        <section className={styles.notificationPanel}>
          <div className={styles.notificationHeader}>
            <h3>Recent Updates</h3>
            <button
              className={styles.drawerClose}
              aria-label="Close notifications"
              onClick={() => setIsNotificationsOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {activities.length > 0 ? (
            <div className={styles.notificationList}>
              {activities.slice(0, 10).map((activity, index) => (
                <div
                  className={styles.notificationItem}
                  key={activity.id || index}
                >
                  <div className={styles.notificationContent}>
                    <strong>
                      {activity.label || 'Activity update'}
                    </strong>

                    {activity.subtext && (
                      <p>{activity.subtext}</p>
                    )}

                    <small>
                      {activity.timestamp || 'Recent activity'}
                    </small>
                  </div>

                  {activity.xpDelta != null && (
                    <span className={styles.notificationReward}>
                      +{activity.xpDelta} {activity.unit || 'XP'}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noNotifications}>
              No recent updates available.
            </p>
          )}
        </section>
      )}

      {isDrawerOpen && (
        <>
          <div
            className={styles.drawerOverlay}
            onClick={() => setIsDrawerOpen(false)}
          />

          <aside className={styles.sideDrawer}>
            <div className={styles.drawerHeader}>
              <span>VELOOP Menu</span>
              <button
                className={styles.drawerClose}
                aria-label="Close menu"
                onClick={() => setIsDrawerOpen(false)}
              >
                <X size={22} />
              </button>
            </div>

            <nav>
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    className={styles.drawerItem}
                    onClick={() => handleNavigation(item.id)}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>
        </>
      )}
    </>
  );
}
