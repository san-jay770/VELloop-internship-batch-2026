import React from 'react';
import { Zap, Award, ClipboardCheck, Flame } from 'lucide-react';
import styles from './TodaysBoost.module.css';

export function TodaysBoost({ xpEarned = 215, tasksDone = "4 / 8", streakDays = 7 }) {
  return (
    <section className={styles.boostSection} aria-label="Today's Boost Metrics">
      <div className={styles.sectionHeader}>
        <Zap size={16} className={styles.headerIcon} fill="#f59e0b" />
        <span>TODAY'S BOOST</span>
      </div>

      <div className={styles.boostGrid}>
        {/* XP Earned */}
        <div className={styles.boostCard}>
          <div className={`${styles.iconCircle} ${styles.purpleCircle}`}>
            <img
              src="/assets/premium/png/how_it_works_earn_rewards@4x.png"
              alt="XP Earned"
              className={styles.boost3DImg}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <span className={styles.cardLabel}>XP Earned</span>
          <span className={styles.cardValue}>+{xpEarned} XP</span>
        </div>

        {/* Tasks Done */}
        <div className={styles.boostCard}>
          <div className={`${styles.iconCircle} ${styles.goldCircle}`}>
            <img
              src="/assets/premium/png/how_it_works_level_up@4x.png"
              alt="Tasks Done"
              className={styles.boost3DImg}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <span className={styles.cardLabel}>Tasks Done</span>
          <span className={styles.cardValue}>{tasksDone}</span>
        </div>

        {/* Streak */}
        <div className={styles.boostCard}>
          <div className={`${styles.iconCircle} ${styles.flameCircle}`}>
            <img
              src="/assets/premium/png/reward_gems@4x.png"
              alt="Streak"
              className={styles.boost3DImg}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <span className={styles.cardLabel}>Allegiance Streak</span>
          <span className={styles.cardValue}>{streakDays} Days</span>
        </div>
      </div>
    </section>
  );
}

