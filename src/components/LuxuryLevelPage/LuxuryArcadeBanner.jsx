import React from 'react';
import styles from './LuxuryArcadeBanner.module.css';

export function LuxuryArcadeBanner({
  onLaunchGame,
  onViewRewards
}) {
  return (
    <section className={styles.arcadeCasing} aria-label="Royal XP Trial Arena">
      <div className={styles.casingLighting} aria-hidden="true" />

      <div className={styles.contentGrid}>

        {/* Left: Text & Information */}
        <div className={styles.infoCol}>
          <div className={styles.badgeRow}>
            <span className={styles.liveTag}>LIVE XP TRIAL</span>
            <span className={styles.multiplierTag}>2X MULTIPLIER ACTIVE</span>
          </div>

          <h3 className={styles.title}>ROYAL CHRONO XP CHALLENGE</h3>

          <p className={styles.desc}>
            Test your agility in the precision 20-second sovereign arcade trial. Collect radiant quantum XP orbs and VE treasures with the forged titanium basket to accelerate your next rank milestone.
          </p>

          <div className={styles.buttonRow}>
            <button
              type="button"
              className={styles.primaryTrialBtn}
              onClick={onLaunchGame}
            >
              <span>ENTER XP TRIAL</span>
              <span className={styles.btnArrow}>→</span>
            </button>

            <button
              type="button"
              className={styles.secondaryPreviewBtn}
              onClick={onViewRewards}
            >
              <span>VIEW LEVEL REWARDS</span>
            </button>
          </div>
        </div>

        {/* Right: Visual Metallic Artifact */}
        <div className={styles.artworkCol}>
          <div className={styles.artworkHalo} aria-hidden="true" />
          <img
            src="/assets/golden_basket_clean.png"
            alt="Forged Chrono Basket"
            className={styles.basketImg}
            onError={(e) => {
              e.currentTarget.src = '/assets/trophy_exact.png';
            }}
          />
        </div>

      </div>
    </section>
  );
}

export default LuxuryArcadeBanner;
