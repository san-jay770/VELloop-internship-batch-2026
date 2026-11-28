import React, { useState } from 'react';
import { BLACK_LABEL_RANKS, BlackLabelEmblem, getRankData } from '../Common/BlackLabelEmblem';
import styles from './EmblemsGallery.module.css';

export function EmblemsGallery({
  currentLevel = 5,
  currentXP = 6420
}) {
  const [inspectedRank, setInspectedRank] = useState(null);
  const currentRank = getRankData(currentLevel);

  return (
    <section className={styles.gallerySection} aria-label="The Legacy Chamber 12 Emblems Museum Gallery">

      {/* Header */}
      <div className={styles.galleryHeader}>
        <div className={styles.headerEyebrow}>
          <span className={styles.goldLine} />
          <span className={styles.eyebrowText}>THE MASTER COLLECTION</span>
          <span className={styles.goldLine} />
        </div>
        <h2 className={styles.galleryHeading}>12 BESPOKE 3D METALLIC EMBLEMS</h2>
        <p className={styles.gallerySubtext}>
          Rare physical collectible championship medals engineered with sculpted royal shields, black titanium armor, and luxury horology crystals.
        </p>
      </div>

      {/* 12 Collectible Trophy Cards Grid */}
      <div className={styles.emblemsGrid}>
        {BLACK_LABEL_RANKS.map((r) => {
          const isCurrent = r.id === currentRank.id;
          const isCompleted = r.tier < currentRank.tier;
          const isLocked = r.tier > currentRank.tier;

          let cardClass = styles.emblemCard;
          if (isCurrent) cardClass = `${styles.emblemCard} ${styles.cardCurrent}`;
          else if (isCompleted) cardClass = `${styles.emblemCard} ${styles.cardCompleted}`;
          else cardClass = `${styles.emblemCard} ${styles.cardLocked}`;

          return (
            <div
              key={r.id}
              className={cardClass}
              onClick={() => setInspectedRank(r)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setInspectedRank(r);
                }
              }}
            >
              {/* Current Active Spotlight */}
              {isCurrent && <div className={styles.activeAura} aria-hidden="true" />}

              {/* Card Header Status */}
              <div className={styles.cardTopRow}>
                <span className={styles.tierTag}>TIER {String(r.tier).padStart(2, '0')}</span>
                <span className={styles.statusChip}>
                  {isCurrent ? 'ACTIVE' : isCompleted ? 'UNLOCKED' : 'LOCKED'}
                </span>
              </div>

              {/* 3D Master Emblem Artwork */}
              <div className={styles.emblemArtContainer}>
                <img
                  src={r.badgeSrc}
                  alt={`${r.name} 3D Emblem`}
                  className={styles.emblemThumbnail}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/black_label/emblems_master.jpg';
                  }}
                />
              </div>

              {/* Rank Plaque & Metal Specs */}
              <div className={styles.cardDetails}>
                <h3 className={styles.rankHeading}>{r.name.toUpperCase()}</h3>
                <span className={styles.levelRangeTag}>{r.levelRange}</span>
                <span className={styles.materialSpec}>{r.material}</span>
              </div>

              {/* Divider */}
              <div className={styles.cardDivider} />

              {/* Threshold & Action */}
              <div className={styles.cardFooter}>
                <div className={styles.thresholdCol}>
                  <span className={styles.thresholdLabel}>THRESHOLD</span>
                  <span className={styles.thresholdVal}>{r.xpMin.toLocaleString()} XP</span>
                </div>
                <span className={styles.inspectHint}>INSPECT →</span>
              </div>

            </div>
          );
        })}
      </div>

      {/* Interactive Museum Emblem Inspection Modal */}
      {inspectedRank && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setInspectedRank(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={styles.modalContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setInspectedRank(null)}
              aria-label="Close Inspection Modal"
            >
              ✕
            </button>

            <div className={styles.modalGrid}>

              {/* Left Column: 3D Grand Display Pedestal */}
              <div className={styles.modalDisplaySide}>
                <div
                  className={styles.displayAura}
                  style={{ background: `radial-gradient(circle, ${inspectedRank.color}35 0%, transparent 70%)` }}
                  aria-hidden="true"
                />
                <img
                  src={inspectedRank.badgeSrc}
                  alt={inspectedRank.name}
                  className={styles.modalEmblemLarge}
                />
                <div className={styles.modalPedestalPlaque}>
                  <span>TIER {inspectedRank.tier} • {inspectedRank.name.toUpperCase()} • {inspectedRank.levelRange}</span>
                </div>
              </div>

              {/* Right Column: Specification & Lore */}
              <div className={styles.modalInfoSide}>
                <div className={styles.modalEyebrow}>MUSEUM SPECIFICATION • NO. {String(inspectedRank.tier).padStart(2, '0')}</div>
                <h3 className={styles.modalTitle}>{inspectedRank.name}</h3>
                <div className={styles.modalMaterial}>{inspectedRank.material}</div>

                <p className={styles.modalDesc}>{inspectedRank.description}</p>

                <div className={styles.specsRow}>
                  <div className={styles.specBox}>
                    <span className={styles.specBoxLabel}>LEVEL RANGE</span>
                    <span className={styles.specBoxVal}>{inspectedRank.levelRange}</span>
                  </div>
                  <div className={styles.specBox}>
                    <span className={styles.specBoxLabel}>THRESHOLD ACCRUAL</span>
                    <span className={styles.specBoxVal}>{inspectedRank.xpMin.toLocaleString()} XP</span>
                  </div>
                </div>

                <div className={styles.perksBox}>
                  <span className={styles.perksBoxTitle}>OPERATIVE PRIVILEGES</span>
                  <span className={styles.perksBoxText}>
                    Access to Tier {inspectedRank.tier} Black Label Vaults, dedicated sovereign multiplier, priority daily contract allocation.
                  </span>
                </div>

                <button
                  type="button"
                  className={styles.dismissBtn}
                  onClick={() => setInspectedRank(null)}
                >
                  RETURN TO MUSEUM
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}

export default EmblemsGallery;
