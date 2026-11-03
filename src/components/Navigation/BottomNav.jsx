import React from 'react';
import { Home, CircleDollarSign, Gift, Wallet, User } from 'lucide-react';
import styles from './Navigation.module.css';

export function BottomNav({ activeTab = 'rewards', onSelectTab }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'earn', label: 'Earn', icon: CircleDollarSign },
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className={styles.bottomNav} aria-label="Main Navigation">
      <div className={styles.bottomNavWave} />
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
            onClick={() => onSelectTab && onSelectTab(tab.id)}
            aria-current={isActive ? 'page' : undefined}
          >
            <div className={styles.navIconWrapper}>
              <Icon size={20} strokeWidth={isActive ? 2.3 : 1.8} />
            </div>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
