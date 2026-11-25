import React, { useState, useEffect, useRef } from 'react';
import logo from '../../assets/logo.svg';
import styles from './LandingIntro.module.css';

// In-memory flag that resets on every browser page refresh (F5 / reload)
let introCompletedInMemory = false;

export function hasCompletedIntro() {
  return introCompletedInMemory;
}

export function markIntroCompleted() {
  introCompletedInMemory = true;
}

/**
 * Premium 4-Second Animated Intro Screen for VELOOP Rewards
 *
 * Animation Sequence:
 * 1. Full-screen dark purple background.
 * 2. VELOOP logo reveal with golden and purple neon glow.
 * 3. Glowing purple and golden energy rings revolving around logo.
 * 4. Floating golden particles and sparkling star bursts.
 * 5. Tagline "PLAY • EARN • WIN" with smooth fade-in and golden shimmer.
 * 6. Brief hold phase of complete composition in full splendor.
 * 7. Smooth fade-out transition.
 * 8. Dashboard reveals with premium fade-in and slide-up effect.
 */
export function LandingIntro({ onComplete }) {
  const [fadingOut, setFadingOut] = useState(false);
  const completedRef = useRef(false);

  const finishIntro = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    markIntroCompleted();
    if (onComplete) {
      onComplete();
    }
  };

  useEffect(() => {
    // Accessibility: Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia) {
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (motionQuery.matches) {
        finishIntro();
        return;
      }
    }

    // 4-Second Intro Sequence:
    // 0.0s - 3.4s: Full animation sequence & hold phase
    // 3.4s - 4.0s: Smooth fade-out of intro screen
    // 4.0s: Complete intro and reveal dashboard
    const fadeTimer = setTimeout(() => {
      setFadingOut(true);
    }, 3400);

    const finishTimer = setTimeout(() => {
      finishIntro();
    }, 4000);

    // Fallback safety timer (4.8s) guarantees transition can never get stuck
    const safetyTimer = setTimeout(() => {
      finishIntro();
    }, 4800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
      clearTimeout(safetyTimer);
    };
  }, []);

  const handleSkip = () => {
    setFadingOut(true);
    setTimeout(() => {
      finishIntro();
    }, 150);
  };

  return (
    <div
      className={`${styles.introContainer} ${fadingOut ? styles.fadeOut : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to VELOOP Rewards"
    >
      {/* 1. Full-screen Dark Purple Ambient Glows */}
      <div className={styles.ambientPurpleGlow} aria-hidden="true" />
      <div className={styles.ambientGoldGlow} aria-hidden="true" />

      {/* 4. Floating Golden Particles and Sparkling Star Effects */}
      <div className={styles.particlesContainer} aria-hidden="true">
        {/* 4-Point Golden Star Sparkles */}
        <span className={`${styles.sparkle} ${styles.sparkle1}`} />
        <span className={`${styles.sparkle} ${styles.sparkle2}`} />
        <span className={`${styles.sparkle} ${styles.sparkle3}`} />
        <span className={`${styles.sparkle} ${styles.sparkle4}`} />
        <span className={`${styles.sparkle} ${styles.sparkle5}`} />
        <span className={`${styles.sparkle} ${styles.sparkle6}`} />

        {/* Floating Warm Golden Embers */}
        <span className={`${styles.particle} ${styles.particle1}`} />
        <span className={`${styles.particle} ${styles.particle2}`} />
        <span className={`${styles.particle} ${styles.particle3}`} />
        <span className={`${styles.particle} ${styles.particle4}`} />
        <span className={`${styles.particle} ${styles.particle5}`} />
      </div>

      <div className={styles.centerStage}>
        {/* 3. Glowing Purple and Golden Energy Rings Around Logo */}
        <div className={styles.energyRingsWrapper} aria-hidden="true">
          <div className={styles.outerPurpleNeonRing} />
          <div className={styles.innerGoldEnergyRing} />
          <div className={styles.pulseShockwave} />
        </div>

        {/* 2. VELOOP Logo with Golden and Purple Neon Glow */}
        <div className={styles.logoContainer}>
          <div className={styles.logoBacklight} aria-hidden="true" />
          <img
            src={logo}
            alt="VELOOP Rewards Logo"
            className={styles.veloopLogo}
          />
        </div>

        {/* Brand Header */}
        <div className={styles.brandContainer}>
          <h1 className={styles.brandTitle}>
            VELOOP <span className={styles.brandTitleBadge}>REWARDS</span>
          </h1>
        </div>

        {/* 5. Tagline "PLAY • EARN • WIN" with Smooth Fade-in */}
        <div className={styles.taglineContainer}>
          <div className={styles.taglineLineLeft} aria-hidden="true" />
          <span className={styles.taglineText}>PLAY • EARN • WIN</span>
          <div className={styles.taglineLineRight} aria-hidden="true" />
        </div>
      </div>

      {/* Skip Button (Ensures animation never gets stuck) */}
      <button
        className={styles.skipButton}
        onClick={handleSkip}
        aria-label="Skip animation and enter dashboard"
      >
        <span>Skip</span>
      </button>
    </div>
  );
}

export default LandingIntro;
