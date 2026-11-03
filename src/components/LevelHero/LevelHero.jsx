import React from 'react';
import { LevelBadge } from './LevelBadge';
import { XPProgressBar } from './XPProgressBar';
import styles from './LevelHero.module.css';

export function LevelHero({ 
  currentLevel = 5, 
  currentXP = 6420, 
  nextLevel = 6, 
  requiredXP = 8000, 
  progressPct = 80,
  userName = "VeLooper" 
}) {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.greetingSection}>
        <h1 className={styles.greetingTitle}>
          Good Morning, {userName}! 👋
        </h1>
        <p className={styles.greetingSub}>
          Level up your journey and unlock epic rewards every day.
        </p>
      </div>

      <div className={styles.heroCard}>
        <div className={styles.cardTopRow}>
          <div className={styles.badgeSlot}>
            <LevelBadge level={currentLevel} size={78} />
          </div>

          <div className={styles.statsSlot}>
            <span className={styles.xpNumber}>{currentXP.toLocaleString()} XP</span>
            <span className={styles.xpSubtext}>to reach Level {String(nextLevel).padStart(2, '0')}</span>
          </div>
        </div>

        <XPProgressBar 
          currentXP={currentXP} 
          requiredXP={requiredXP} 
          progressPct={progressPct} 
        />
      </div>
    </section>
  );
}
