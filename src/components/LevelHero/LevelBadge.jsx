import React from 'react';
import { Lock } from 'lucide-react';
import { BLACK_LABEL_RANKS, getRankData } from '../Common/BlackLabelEmblem';
import styles from './LevelBadge.module.css';

export { BLACK_LABEL_RANKS as LEGACY_RANKS };

/**
 * LevelBadge — 100% SVG-FREE 3D METALLIC RANK EMBLEM
 * Renders high-definition centered 3D metallic collectible medallions.
 */
export function LevelBadge({
  level = 5,
  size = 80,
  className = '',
  isLocked = false,
  isCurrent = false,
  showGlow = true,
  interactive = false,
  animated = true,
  onClick
}) {
  const lvlNum = Math.min(12, Math.max(1, Number(level) || 1));
  const rankInfo = getRankData(lvlNum);

  const targetWidth = typeof size === 'number' ? size : 80;
  const targetHeight = targetWidth;

  const glowClass = styles[`glowLvl${Math.min(10, lvlNum)}`] || styles.glowLvl5;

  return (
    <div
      className={`${styles.badgeRoot} ${interactive ? styles.interactive : ''} ${className}`}
      style={{
        width: `${targetWidth}px`,
        height: `${targetHeight}px`
      }}
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      title={`Level ${lvlNum} — ${rankInfo.name} (${rankInfo.levelRange})`}
      data-level={lvlNum}
    >
      {/* Dynamic Ambient Glow Behind Emblem */}
      {showGlow && (
        <div className={`${styles.ambientGlow} ${glowClass}`} aria-hidden="true" />
      )}

      {/* Emblem 3D Container with smooth MMORPG floating motion */}
      <div
        className={`${styles.svgEmblem} ${animated ? styles.floating : ''} ${isLocked ? styles.lockedBadge : ''} ${isCurrent ? styles.currentBadge : ''}`}
        style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}
      >
        <img
          src={rankInfo.badgeSrc}
          alt={rankInfo.name}
          style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }}
          onError={(e) => { e.currentTarget.src = '/assets/black_label/rank_01_novice.png'; }}
        />
      </div>

      {/* Subtle, Non-Intrusive Locked Indicator */}
      {isLocked && (
        <div className={styles.lockedOverlay} aria-hidden="true">
          <div className={styles.lockPill}>
            <Lock size={Math.max(10, Math.round(targetWidth * 0.18))} />
          </div>
        </div>
      )}
    </div>
  );
}

export default LevelBadge;
