import React, { useState } from 'react';
import styles from './LevelHero.module.css';

export function LevelBadge({ level = 5, size = 80, className = '' }) {
  const [imgError, setImgError] = useState(false);
  const formattedLevel = String(level).padStart(2, '0');
  
  // Prefer exact reference image for Level 5, or official SVG badge
  const imgSrc = level === 5 
    ? '/assets/ref_badge_level_05.png' 
    : `/assets/lvl-${level}.svg`;

  return (
    <div 
      className={`${styles.hexBadge} ${className}`}
      style={{ width: `${size}px`, height: `${Math.round(size * 0.95)}px` }}
      title={`Level ${level}`}
    >
      {!imgError ? (
        <img 
          src={imgSrc} 
          alt={`Level ${level} Badge`}
          className={styles.hexBadgeImg}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className={styles.customHex} style={{ width: `${size}px`, height: `${Math.round(size * 1.05)}px` }}>
          <span className={styles.customHexLabel}>LEVEL</span>
          <span className={styles.customHexNum}>{formattedLevel}</span>
        </div>
      )}
    </div>
  );
}
