import React from 'react';
import styles from './LevelHero.module.css';

export function XPProgressBar({ currentXP = 6420, requiredXP = 8000, progressPct = 80 }) {
  const pct = Math.min(100, Math.max(0, progressPct || Math.round((currentXP / requiredXP) * 100)));

  return (
    <div className={styles.progressWrapper}>
      <div 
        className={styles.progressBarTrack}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div 
          className={styles.progressBarFill} 
          style={{ width: `${pct}%` }} 
        />
      </div>
      <div className={styles.progressLabel}>
        <span>{currentXP.toLocaleString()} / {requiredXP.toLocaleString()} XP</span>
      </div>
    </div>
  );
}

