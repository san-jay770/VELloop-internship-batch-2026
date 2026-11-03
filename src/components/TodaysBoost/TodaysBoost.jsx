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
            <Award size={20} />
          </div>
          <span className={styles.cardLabel}>XP Earned</span>
          <span className={styles.cardValue}>{xpEarned} XP</span>
        </div>

        {/* Tasks Done */}
        <div className={styles.boostCard}>
          <div className={`${styles.iconCircle} ${styles.goldCircle}`}>
            <ClipboardCheck size={20} />
          </div>
          <span className={styles.cardLabel}>Tasks Done</span>
          <span className={styles.cardValue}>{tasksDone}</span>
        </div>

        {/* Streak */}
        <div className={styles.boostCard}>
          <div className={`${styles.iconCircle} ${styles.flameCircle}`}>
            <Flame size={20} fill="#f97316" />
          </div>
          <span className={styles.cardLabel}>Streak</span>
          <span className={styles.cardValue}>{streakDays} Days</span>
        </div>
      </div>
    </section>
  );
}

