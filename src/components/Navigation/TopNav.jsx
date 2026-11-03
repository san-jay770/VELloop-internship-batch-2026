import React, { useState } from 'react';
import { Menu, Bell, X, Shield, Sparkles, Award } from 'lucide-react';
import styles from './Navigation.module.css';

export function TopNav({ onOpenMenu, onOpenNotifications }) {
  const [hasNotif, setHasNotif] = useState(true);

  return (
    <header className={styles.topNav}>
      <button 
        className={styles.iconBtn} 
        aria-label="Open Navigation Menu"
        onClick={onOpenMenu}
      >
        <Menu size={22} />
      </button>

      <button 
        className={styles.iconBtn} 
        aria-label="View Notifications"
        onClick={() => {
          setHasNotif(false);
          if (onOpenNotifications) onOpenNotifications();
        }}
      >
        <Bell size={22} />
        {hasNotif && <span className={styles.notifDot} />}
      </button>
    </header>
  );
}
