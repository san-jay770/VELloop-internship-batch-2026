
import React, { useEffect, useState } from 'react';
import styles from './LevelHero.module.css';

export function XPProgressBar({
  currentXP = 6420,
  requiredXP = 8000,
  progressPct = 80,
  xpToNext = Math.max(0, requiredXP - currentXP),
  nextLevel = 6
}) {
  const pct = Math.min(100, Math.max(0, progressPct ?? Math.round((currentXP / requiredXP) * 100)));
  const [animatedPct, setAnimatedPct] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setAnimatedPct(pct);
    });

    return () => cancelAnimationFrame(frame);
  }, [pct]);

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
          style={{ width: `${animatedPct}%` }}
        />
      </div>
      <div className={styles.progressLabel}>
        <span>{currentXP.toLocaleString()} / {requiredXP.toLocaleString()} XP</span>
        <span>{xpToNext.toLocaleString()} XP to Level {String(nextLevel).padStart(2, '0')}</span>
      </div>
    </div>
  );
}
