import React, { useState } from 'react';
import { BLACK_LABEL_RANKS } from '../Common/BlackLabelEmblem';
import styles from './LuxuryBadgeGallery.module.css';

const LUXURY_LEVEL_SPECS = [
  {
    level: 1,
    name: "Starter",
    legacyName: "Iron Initiate",
    material: "Cold-Forged Titanium Steel",
    xpRequired: 0,
    rewardText: "Access to Realm Trials",
    perks: "Basic Quest Access · Level 1 Reward Crates · Standard XP Accrual"
  },
  {
    level: 2,
    name: "Explorer",
    legacyName: "Bronze Vanguard",
    material: "Antique Brushed Bronze & Copper",
    xpRequired: 1000,
    rewardText: "+100 VEs",
    perks: "Tier 1 Daily Boosts · Unlocked Community Missions · +100 VE Bonus"
  },
  {
    level: 3,
    name: "Achiever",
    legacyName: "Silver Sentinel",
    material: "Polished Mirror Titanium Silver",
    xpRequired: 2500,
    rewardText: "+10 Gems",
    perks: "5% XP Accrual Boost · Exclusive Blue Gem Vaults · Tier 2 Quests"
  },
  {
    level: 4,
    name: "Momentum",
    legacyName: "Gold Elite",
    material: "Champagne Gold & Titanium Inlay",
    xpRequired: 5000,
    rewardText: "+250 VEs",
    perks: "10% XP Multiplier · Gold Tier Challenge Access · +250 VE Bonus"
  },
  {
    level: 5,
    name: "Ascendant",
    legacyName: "Platinum Guardian",
    material: "Brushed Platinum & Aerospace Alloy",
    xpRequired: 8000,
    rewardText: "+500 VEs",
    perks: "15% Sovereign XP Boost · VIP Arcade Tournaments · Platinum Status"
  },
  {
    level: 6,
    name: "Vanguard",
    legacyName: "Obsidian Knight",
    material: "Midnight Obsidian & Emerald Facet",
    xpRequired: 11000,
    rewardText: "+2 Spins",
    perks: "Stealth Reward Chests · Double Spin Lucky Wheel · Priority Quests"
  },
  {
    level: 7,
    name: "Trailblazer",
    legacyName: "Diamond Sovereign",
    material: "Swiss Horology Diamond Steel",
    xpRequired: 15000,
    rewardText: "+15 Gems",
    perks: "Diamond Vault Access · 20% Permanent Multiplier · Rare Skins"
  },
  {
    level: 8,
    name: "Champion",
    legacyName: "Royal Ascendant",
    material: "Royal Violet Metal & 24K Gold",
    xpRequired: 20000,
    rewardText: "+750 VEs",
    perks: "Imperial Honor Insignia · Exclusive Discord Role · +750 VE Bonus"
  },
  {
    level: 9,
    name: "Legend",
    legacyName: "Celestial Legend",
    material: "Astral Navy & Starlight Silver",
    xpRequired: 26000,
    rewardText: "+3 Spins",
    perks: "Triple Cosmic Wheel · Starlight Avatar Frame · 25% XP Boost"
  },
  {
    level: 10,
    name: "Mythic",
    legacyName: "VELOP Immortal",
    material: "Imperial Black Titanium & Sovereign Gold",
    xpRequired: 35000,
    rewardText: "+1000 VEs",
    perks: "Apex Immortal Status · Lifetime Hall of Fame · Supreme Crown"
  }
];

export function LuxuryBadgeGallery({
  currentLevel = 5,
  currentXP = 6420,
  levels = []
}) {
  const [selectedBadge, setSelectedBadge] = useState(null);

  return (
    <section className={styles.gallerySection} aria-label="Exclusive 3D Badge Gallery">

      {/* Gallery Header */}
      <div className={styles.galleryHeaderBlock}>
        <div className={styles.eyebrowRow}>
          <span className={styles.goldLine} />
          <span className={styles.eyebrow}>THE EXCLUSIVE BADGE GALLERY</span>
          <span className={styles.goldLine} />
        </div>
        <h2 className={styles.galleryTitle}>BESPOKE 3D METALLIC INSIGNIA</h2>
        <p className={styles.gallerySubtitle}>
          Ten individually engineered physical trophies. Each rank is sculpted in aerospace titanium, brushed platinum, and champagne gold.
        </p>
      </div>

      {/* 10 Collectible Cards Grid */}
      <div className={styles.cardsGrid}>
        {LUXURY_LEVEL_SPECS.map((item) => {
          const isCompleted = item.level < currentLevel;
          const isCurrent = item.level === currentLevel;
          const isLocked = item.level > currentLevel;

          const pad = String(item.level).padStart(2, '0');
          const rankObj = BLACK_LABEL_RANKS[item.level - 1] || BLACK_LABEL_RANKS[0];
          const badgeImgSrc = rankObj.badgeSrc;

          let cardClass = styles.luxuryCard;
          if (isCurrent) cardClass = `${styles.luxuryCard} ${styles.cardCurrent}`;
          else if (isCompleted) cardClass = `${styles.luxuryCard} ${styles.cardCompleted}`;
          else cardClass = `${styles.luxuryCard} ${styles.cardLocked}`;

          return (
            <div
              key={item.level}
              className={cardClass}
              onClick={() => setSelectedBadge(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedBadge(item);
                }
              }}
            >
              {/* Spotlight Glow for Current Rank */}
              {isCurrent && <div className={styles.currentCardSpotlight} aria-hidden="true" />}

              {/* Status Header */}
              <div className={styles.cardHeaderRow}>
                <span className={styles.levelCode}>LEVEL {pad}</span>
                <span className={styles.statusPill}>
                  {isCurrent ? 'CURRENT' : isCompleted ? 'UNLOCKED' : 'LOCKED'}
                </span>
              </div>

              {/* 3D Badge Artwork Centerpiece */}
              <div className={styles.badgeImageWrap}>
                <img
                  src={badgeImgSrc}
                  alt={`Level ${pad} ${item.name} 3D Badge`}
                  className={styles.badgeImg}
                  loading="lazy"
                />
              </div>

              {/* Title & Metal Material */}
              <div className={styles.cardMetaBlock}>
                <h3 className={styles.rankTitle}>{item.name}</h3>
                <span className={styles.legacySub}>{item.legacyName}</span>
                <span className={styles.materialTag}>{item.material}</span>
              </div>

              {/* Divider Line */}
              <div className={styles.cardDivider} />

              {/* Threshold & Reward */}
              <div className={styles.cardFooter}>
                <div className={styles.footerCol}>
                  <span className={styles.colLabel}>THRESHOLD</span>
                  <span className={styles.colVal}>{item.xpRequired.toLocaleString()} XP</span>
                </div>
                <div className={styles.footerColRight}>
                  <span className={styles.colLabel}>REWARD</span>
                  <span className={styles.colValReward}>{item.rewardText}</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Collectible Inspection Modal */}
      {selectedBadge && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setSelectedBadge(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.modalCloseBtn}
              onClick={() => setSelectedBadge(null)}
              aria-label="Close Inspection Modal"
            >
              ✕
            </button>

            <div className={styles.modalBodyGrid}>

              {/* Left: Enormous 3D Medallion Showcase */}
              <div className={styles.modalArtworkSide}>
                <div className={styles.modalArtworkHalo} aria-hidden="true" />
                <img
                  src={`/assets/luxury_3d/badge_level_${String(selectedBadge.level).padStart(2, '0')}.png`}
                  alt={selectedBadge.name}
                  className={styles.modalLargeBadge}
                />
                <div className={styles.modalPlaque}>
                  <span>LEVEL {String(selectedBadge.level).padStart(2, '0')} · {selectedBadge.name.toUpperCase()}</span>
                </div>
              </div>

              {/* Right: Technical Metallurgy & Perks */}
              <div className={styles.modalInfoSide}>
                <div className={styles.modalEyebrow}>COLLECTIBLE SPECIFICATION</div>
                <h3 className={styles.modalTitle}>{selectedBadge.legacyName}</h3>
                <div className={styles.modalMaterialLine}>{selectedBadge.material}</div>

                <div className={styles.modalSpecsGrid}>
                  <div className={styles.modalSpecBox}>
                    <span className={styles.specBoxLabel}>REQUIRED THRESHOLD</span>
                    <span className={styles.specBoxVal}>{selectedBadge.xpRequired.toLocaleString()} XP</span>
                  </div>
                  <div className={styles.modalSpecBox}>
                    <span className={styles.specBoxLabel}>RANK STANDING</span>
                    <span className={styles.specBoxValGold}>
                      {selectedBadge.level < currentLevel ? 'Unlocked' : selectedBadge.level === currentLevel ? 'Active Player Rank' : 'Locked Milestone'}
                    </span>
                  </div>
                </div>

                <div className={styles.modalPerksBlock}>
                  <span className={styles.perksHeading}>UNLOCKED PRIVILEGES & PERKS</span>
                  <p className={styles.perksText}>{selectedBadge.perks}</p>
                </div>

                <div className={styles.modalRewardBlock}>
                  <span className={styles.rewardBlockLabel}>RANK COMPLETION REWARD</span>
                  <span className={styles.rewardBlockVal}>{selectedBadge.rewardText}</span>
                </div>

                <button
                  type="button"
                  className={styles.modalDismissBtn}
                  onClick={() => setSelectedBadge(null)}
                >
                  RETURN TO GALLERY
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}

export default LuxuryBadgeGallery;
