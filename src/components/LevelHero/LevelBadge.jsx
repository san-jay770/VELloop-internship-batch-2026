import React, { useState } from 'react';
import styles from './LevelHero.module.css';

export function LevelBadge({ level = 5, size = 80, className = '' }) {
  const [imgError, setImgError] = useState(false);
  const formattedLevel = String(level).padStart(2, '0');
  const svgSrc = `/assets/lvl-${level}.svg`;

  return (
    <div 
      className={`${styles.hexBadge} ${className}`}
      style={{ width: `${size}px`, height: `${Math.round(size * 1.1)}px` }}
      title={`Level ${level}`}
    >
      {!imgError ? (
        <img 
          src={svgSrc} 
          alt={`Level ${level} Badge`}
          className={styles.hexBadgeImg}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className={styles.customHex} style={{ width: `${size}px`, height: `${Math.round(size * 1.1)}px` }}>
          <span className={styles.customHexLabel}>LEVEL</span>
          <span className={styles.customHexNum}>{formattedLevel}</span>
        </div>
      )}
    </div>
  );
}
