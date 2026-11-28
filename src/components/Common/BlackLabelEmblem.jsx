import React from 'react';
import styles from './BlackLabelEmblem.module.css';

export const BLACK_LABEL_RANKS = [
  {
    id: 'novice',
    name: 'Novice',
    tier: 1,
    levelRange: 'Lv. 1 - 5',
    color: '#C8A96B',
    material: 'Burnished Bronze & Champagne Gold',
    badgeSrc: '/assets/black_label/rank_01_novice.png',
    xpMin: 0,
    xpMax: 1000,
    description: 'Forged bronze medallion with central five-point star, enclosed in double-stepped beveled gold laurels.'
  },
  {
    id: 'apprentice',
    name: 'Apprentice',
    tier: 2,
    levelRange: 'Lv. 6 - 10',
    color: '#D6D9DF',
    material: 'Polished Titanium Silver',
    badgeSrc: '/assets/black_label/rank_02_apprentice.png',
    xpMin: 1000,
    xpMax: 2500,
    description: 'Hexagonal cold-rolled titanium armor plate centered with an ultra-reflective platinum star.'
  },
  {
    id: 'warrior',
    name: 'Warrior',
    tier: 3,
    levelRange: 'Lv. 11 - 20',
    color: '#C8A96B',
    material: 'Black Titanium & Gold Ingot',
    badgeSrc: '/assets/black_label/rank_03_warrior.png',
    xpMin: 2500,
    xpMax: 5000,
    description: 'Heavy tactical shield constructed from black titanium and fluted champagne gold compass blades.'
  },
  {
    id: 'champion',
    name: 'Champion',
    tier: 4,
    levelRange: 'Lv. 21 - 30',
    color: '#F0DBA5',
    material: '24K Crowned Gold Ingot',
    badgeSrc: '/assets/black_label/rank_04_champion.png',
    xpMin: 5000,
    xpMax: 8000,
    description: 'Crowned diamond-faceted sovereign jewel flanked by raised aerodynamic gold wings.'
  },
  {
    id: 'legend',
    name: 'Legend',
    tier: 5,
    levelRange: 'Lv. 31 - 40',
    color: '#62528C',
    material: 'Royal Violet & Champagne Gold',
    badgeSrc: '/assets/black_label/rank_05_legend.png',
    xpMin: 8000,
    xpMax: 11000,
    description: 'Deep royal amethyst crystal mounted within a hand-engraved gold crown and double-tiered wings.'
  },
  {
    id: 'elite',
    name: 'Elite',
    tier: 6,
    levelRange: 'Lv. 41 - 50',
    color: '#5C9BCE',
    material: 'Crystalline Ice Sapphire & Platinum',
    badgeSrc: '/assets/black_label/rank_06_elite.png',
    xpMin: 11000,
    xpMax: 15000,
    description: 'Stealth faceted sapphire crystal shield crowned with multi-tiered platinum-carbide wing plates.'
  },
  {
    id: 'master',
    name: 'Master',
    tier: 7,
    levelRange: 'Lv. 51 - 60',
    color: '#F0DBA5',
    material: 'Celestial Gold & Platinum Filigree',
    badgeSrc: '/assets/black_label/rank_07_master.png',
    xpMin: 15000,
    xpMax: 20000,
    description: 'Luminescent solar gold diamond enclosed in radiating concentric auric halos and triple wing feathers.'
  },
  {
    id: 'grandmaster',
    name: 'Grandmaster',
    tier: 8,
    levelRange: 'Lv. 61 - 70',
    color: '#62528C',
    material: 'Obsidian Black & Violet Crystal',
    badgeSrc: '/assets/black_label/rank_08_grandmaster.png',
    xpMin: 20000,
    xpMax: 26000,
    description: 'Multi-tiered prismatic violet starburst shielded by segmented obsidian armor scales.'
  },
  {
    id: 'mythic',
    name: 'Mythic',
    tier: 9,
    levelRange: 'Lv. 71 - 80',
    color: '#8C2938',
    material: 'Demonic Titanium & Deep Crimson Ruby',
    badgeSrc: '/assets/black_label/rank_09_mythic.png',
    xpMin: 26000,
    xpMax: 35000,
    description: 'Aggressive dragon-carved black titanium crest with glowing molten ruby core and sharp spikes.'
  },
  {
    id: 'divine',
    name: 'Divine',
    tier: 10,
    levelRange: 'Lv. 81 - 90',
    color: '#C8A96B',
    material: 'Solar Gold & Holy Cross Core',
    badgeSrc: '/assets/black_label/rank_10_divine.png',
    xpMin: 35000,
    xpMax: 50000,
    description: 'Golden astrolabe ring with central mirrored sphere and four-pointed celestial cross.'
  },
  {
    id: 'infinity',
    name: 'Infinity',
    tier: 11,
    levelRange: 'Lv. 91 - 100',
    color: '#62528C',
    material: 'Prismatic Starlight Amethyst Shards',
    badgeSrc: '/assets/black_label/rank_11_infinity.png',
    xpMin: 50000,
    xpMax: 75000,
    description: 'Quantum crystal formation of violet and electric ice shards with infinite refraction facets.'
  },
  {
    id: 'supreme',
    name: 'Supreme',
    tier: 12,
    levelRange: 'Lv. 101+',
    color: '#F0DBA5',
    material: 'Apex Monarch Imperial Gold & Diamond',
    badgeSrc: '/assets/black_label/rank_12_supreme.png',
    xpMin: 75000,
    xpMax: 100000,
    description: 'The pinnacle of achievement: double imperial crown, celestial starburst diamond, and twin golden eagle mantles.'
  }
];

export function getRankData(identifier) {
  if (typeof identifier === 'number') {
    // Map level number to rank tier
    if (identifier <= 5) return BLACK_LABEL_RANKS[0]; // Novice
    if (identifier <= 10) return BLACK_LABEL_RANKS[1]; // Apprentice
    if (identifier <= 20) return BLACK_LABEL_RANKS[2]; // Warrior
    if (identifier <= 30) return BLACK_LABEL_RANKS[3]; // Champion
    if (identifier <= 40) return BLACK_LABEL_RANKS[4]; // Legend
    if (identifier <= 50) return BLACK_LABEL_RANKS[5]; // Elite
    if (identifier <= 60) return BLACK_LABEL_RANKS[6]; // Master
    if (identifier <= 70) return BLACK_LABEL_RANKS[7]; // Grandmaster
    if (identifier <= 80) return BLACK_LABEL_RANKS[8]; // Mythic
    if (identifier <= 90) return BLACK_LABEL_RANKS[9]; // Divine
    if (identifier <= 100) return BLACK_LABEL_RANKS[10]; // Infinity
    return BLACK_LABEL_RANKS[11]; // Supreme
  }

  if (typeof identifier === 'string') {
    const key = identifier.toLowerCase().trim();
    const found = BLACK_LABEL_RANKS.find(r => r.id === key || r.name.toLowerCase() === key);
    if (found) return found;

    // Level string e.g. "Level 5", "5"
    const parsed = parseInt(key.replace(/\D/g, ''), 10);
    if (!isNaN(parsed)) return getRankData(parsed);
  }

  // Fallback to active rank (Novice / Champion)
  return BLACK_LABEL_RANKS[0];
}

export function BlackLabelEmblem({
  rank = 'novice',
  level,
  size = 'md',
  showPedestal = false,
  showGlow = true,
  interactive = false,
  onClick,
  className = ''
}) {
  const rankData = getRankData(level !== undefined ? level : rank);

  const sizeClass = {
    sm: styles.sizeSm,
    md: styles.sizeMd,
    lg: styles.sizeLg,
    xl: styles.sizeXl,
    hero: styles.sizeHero
  }[size] || styles.sizeMd;

  return (
    <div
      className={`${styles.emblemContainer} ${sizeClass} ${interactive ? styles.interactive : ''} ${className}`}
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={`${rankData.name} 3D Metallic Emblem`}
    >
      {/* Studio Lighting Radial Backlight */}
      {showGlow && (
        <div
          className={styles.ambientGlow}
          style={{ background: `radial-gradient(circle, ${rankData.color}33 0%, transparent 70%)` }}
          aria-hidden="true"
        />
      )}

      {/* 3D Master Emblem Artwork */}
      <img
        src={rankData.badgeSrc}
        alt={`${rankData.name} Emblem`}
        className={styles.emblemImage}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = '/assets/black_label/emblems_master.jpg';
        }}
      />

      {/* Optional Pedestal Plaque */}
      {showPedestal && (
        <div className={styles.pedestalPlaque}>
          <span className={styles.plaqueTitle}>{rankData.name.toUpperCase()}</span>
          <span className={styles.plaqueLevel}>{rankData.levelRange}</span>
        </div>
      )}
    </div>
  );
}

export default BlackLabelEmblem;
