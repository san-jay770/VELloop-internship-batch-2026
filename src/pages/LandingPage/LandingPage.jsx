import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Play,
  ArrowRight,
  Check,
  ShieldCheck,
  Zap,
  Globe,
  Menu,
  X,
  Star,
  Activity,
  Award,
  Lock,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import styles from './LandingPage.module.css';

export function LandingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.landingPage} id="top">

      {/* Background Scientific Telemetry Grid */}
      <div className={styles.ambientTelemetryGrid} aria-hidden="true" />
      <div className={styles.cyanEnergyGlowTop} aria-hidden="true" />
      <div className={styles.goldEnergyGlowRight} aria-hidden="true" />

      {/* -------------------------------------------------------------
         1. NAVBAR
      ------------------------------------------------------------- */}
      <header className={styles.navbarHeader}>
        <div className={styles.container}>
          <div className={styles.navRow}>
            {/* Logo */}
            <a href="#top" className={styles.brandLogoGroup} onClick={(e) => handleNavClick(e, 'top')}>
              <img
                src="/assets/logo.svg"
                alt="VELOOP Logo"
                className={styles.brandLogoImg}
                onError={(e) => { e.currentTarget.src = '/assets/premium/svg/veloop_logo.svg'; }}
              />
              <div className={styles.brandTitleGroup}>
                <span className={styles.brandTitle}>VELOOP</span>
                <span className={styles.quantumBadge}>SCIENTIFIC PROTOCOL</span>
              </div>
            </a>

            {/* Center Navigation Links */}
            <nav className={styles.desktopNav}>
              <a href="#top" className={`${styles.navItem} ${styles.navActive}`} onClick={(e) => handleNavClick(e, 'top')}>
                Overview
              </a>
              <a href="#how-it-works" className={styles.navItem} onClick={(e) => handleNavClick(e, 'how-it-works')}>
                Architecture
              </a>
              <a href="#journey" className={styles.navItem} onClick={(e) => handleNavClick(e, 'journey')}>
                Tier Progression
              </a>
              <a href="#rewards" className={styles.navItem} onClick={(e) => handleNavClick(e, 'rewards')}>
                Reward Protocol
              </a>
              <a href="#why-veloop" className={styles.navItem} onClick={(e) => handleNavClick(e, 'why-veloop')}>
                Telemetry
              </a>
            </nav>

            {/* Right Buttons */}
            <div className={styles.navActions}>
              <button
                type="button"
                className={styles.loginPillBtn}
                onClick={() => setShowLoginModal(true)}
              >
                Access Portal
              </button>
              <button
                type="button"
                className={styles.joinNowCyberBtn}
                onClick={() => navigate('/Lvl-Dashboard')}
              >
                <span>Initialize</span>
                <ArrowRight size={13} className={styles.btnArrow} />
              </button>
              <button
                type="button"
                className={styles.mobileHamburger}
                onClick={() => setMobileMenuOpen(prev => !prev)}
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className={styles.mobileDrawer}>
            <a href="#top" className={styles.mobileItem} onClick={(e) => handleNavClick(e, 'top')}>Overview</a>
            <a href="#how-it-works" className={styles.mobileItem} onClick={(e) => handleNavClick(e, 'how-it-works')}>Architecture</a>
            <a href="#journey" className={styles.mobileItem} onClick={(e) => handleNavClick(e, 'journey')}>Tier Progression</a>
            <a href="#rewards" className={styles.mobileItem} onClick={(e) => handleNavClick(e, 'rewards')}>Reward Protocol</a>
            <a href="#why-veloop" className={styles.mobileItem} onClick={(e) => handleNavClick(e, 'why-veloop')}>Telemetry</a>
            <div className={styles.mobileBtnRow}>
              <button type="button" className={styles.loginPillBtn} style={{ width: '100%' }} onClick={() => { setMobileMenuOpen(false); setShowLoginModal(true); }}>
                Access Portal
              </button>
              <button type="button" className={styles.joinNowCyberBtn} style={{ width: '100%', justifyContent: 'center' }} onClick={() => { setMobileMenuOpen(false); navigate('/Lvl-Dashboard'); }}>
                <span>Initialize</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* -------------------------------------------------------------
         2. HERO SECTION – SCIENTIFIC ENERGY CORE & TELEMETRY
      ------------------------------------------------------------- */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroLayoutGrid}>

            {/* Left Content */}
            <div className={styles.heroLeftCol}>

              {/* Badge: QUANTUM REWARD ECOSYSTEM */}
              <div className={styles.ecosystemBadge}>
                <span className={styles.cyanPulseDot} />
                <span className={styles.badgeText}>QUANTUM ASSET PROTOCOL · V4.8 ONLINE</span>
              </div>

              {/* Headline */}
              <h1 className={styles.heroMainHeadline}>
                <span className={styles.headlineLine1}>LEVEL UP YOUR</span>
                <span className={styles.headlineLine2}>QUANTUM LEGACY.</span>
              </h1>

              {/* Sub-headline */}
              <div className={styles.heroSubHeadline}>
                ANALYZE. PROGRESS. TRANSCEND.
              </div>

              {/* Description */}
              <p className={styles.heroDescription}>
                Welcome to VELOOP — an ultra-premium scientific rewards ecosystem where calibrated gaming interactions
                generate measurable digital assets, physical-grade 3D rank medallions, and sovereign blockchain-grade privileges.
              </p>

              {/* CTA Action Buttons */}
              <div className={styles.heroButtonRow}>
                <button
                  type="button"
                  className={styles.enterCtaCyberBtn}
                  onClick={() => navigate('/Lvl-Dashboard')}
                >
                  <span>ENTER MISSION CONTROL</span>
                  <ArrowRight size={14} className={styles.btnArrow} />
                </button>
                <button
                  type="button"
                  className={styles.exploreTiersGlassBtn}
                  onClick={(e) => handleNavClick(e, 'journey')}
                >
                  <Play size={13} className={styles.playIcon} />
                  <span>EXPLORE 12 TIERS</span>
                </button>
              </div>

              {/* 3 Telemetry Trust Indicators */}
              <div className={styles.heroTrustRow}>
                <div className={styles.trustItem}>
                  <ShieldCheck size={14} color="#19D5E8" />
                  <span>Quantum Encrypted</span>
                </div>
                <div className={styles.trustItem}>
                  <Zap size={14} color="#E5C98D" />
                  <span>Zero Latency Sync</span>
                </div>
                <div className={styles.trustItem}>
                  <Globe size={14} color="#94A3B8" />
                  <span>50K+ Active Operatives</span>
                </div>
              </div>

            </div>

            {/* Right Hero Stage: Animated Scientific Energy Core */}
            <div className={styles.heroRightCol}>
              <div className={styles.energyCoreStage}>

                {/* Orbital Gyroscopic Rings */}
                <div className={styles.orbitalRingOuter} aria-hidden="true" />
                <div className={styles.orbitalRingMiddle} aria-hidden="true" />
                <div className={styles.orbitalRingInner} aria-hidden="true" />

                {/* Central Concentric Light Beam */}
                <div className={styles.coreReactorGlow} aria-hidden="true" />

                {/* Central 3D Centerpiece Emblem */}
                <div className={styles.coreCenterpieceWrap}>
                  <img
                    src="/assets/black_label/rank_04_champion.png"
                    alt="VELOOP Sovereign Champion Medallion"
                    className={styles.coreEmblemImg}
                  />
                  <div className={styles.specularShimmer} aria-hidden="true" />
                </div>

                {/* Floating Telemetry HUD Readouts */}
                <div className={styles.hudTelemetryLeft}>
                  <span className={styles.hudLabel}>CONTAINMENT</span>
                  <span className={styles.hudValue}>99.98% OPTIMAL</span>
                </div>

                <div className={styles.hudTelemetryRight}>
                  <span className={styles.hudLabel}>TELEMETRY RATE</span>
                  <span className={styles.hudValueGold}>432.8 THz SYNC</span>
                </div>

                <div className={styles.hudTelemetryBottom}>
                  <span className={styles.hudStatusDot} />
                  <span>TIER 04 • CHAMPION CLEARANCE</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
         3. STATS STRIP SECTION (Scientific Telemetry Metrics)
      ------------------------------------------------------------- */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsFiligreeFrame}>

            <div className={styles.statCell}>
              <div className={styles.statIconWrapper}>
                <Award size={20} color="#19D5E8" />
              </div>
              <div className={styles.statTextGroup}>
                <span className={styles.statNumber}>12 TIERS</span>
                <span className={styles.statLabel}>Sovereign Milestones</span>
              </div>
            </div>

            <div className={styles.statSeparator} />

            <div className={styles.statCell}>
              <div className={styles.statIconWrapper}>
                <Sparkles size={20} color="#E5C98D" />
              </div>
              <div className={styles.statTextGroup}>
                <span className={styles.statNumber}>100+</span>
                <span className={styles.statLabel}>Protocol Rewards</span>
              </div>
            </div>

            <div className={styles.statSeparator} />

            <div className={styles.statCell}>
              <div className={styles.statIconWrapper}>
                <Zap size={20} color="#19D5E8" />
              </div>
              <div className={styles.statTextGroup}>
                <span className={styles.statNumber}>REAL-TIME</span>
                <span className={styles.statLabel}>XP Synchronization</span>
              </div>
            </div>

            <div className={styles.statSeparator} />

            <div className={styles.statCell}>
              <div className={styles.statIconWrapper}>
                <Globe size={20} color="#94A3B8" />
              </div>
              <div className={styles.statTextGroup}>
                <span className={styles.statNumber}>50,000+</span>
                <span className={styles.statLabel}>Verified Operatives</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
         4. HOW VELOOP WORKS (3-Step Scientific Pipeline)
      ------------------------------------------------------------- */}
      <section className={styles.howItWorksSection} id="how-it-works">
        <div className={styles.container}>

          <div className={styles.sectionTitleBlock}>
            <div className={styles.flourishHeadingRow}>
              <span className={styles.cyanLineLeft} />
              <h2 className={styles.cyberHeading}>HOW VELOOP OPERATES</h2>
              <span className={styles.cyanLineRight} />
            </div>
            <p className={styles.sectionSubtitle}>Calibrated Architecture. Quantum Milestones. Guaranteed Assets.</p>
          </div>

          <div className={styles.stepsCardsRow}>

            {/* Step 1: INITIALIZE & PLAY */}
            <div className={styles.stepCardExact}>
              <div className={styles.stepIconLeft}>
                <div className={styles.stepNumPill}>01</div>
                <Activity size={24} color="#19D5E8" />
              </div>
              <div className={styles.stepContentRight}>
                <h3 className={styles.stepTitle}>INITIALIZE & COMPETE</h3>
                <p className={styles.stepDesc}>Engage in interactive trials and telemetry activities within the VELOOP network.</p>
              </div>
            </div>

            <div className={styles.chevronDivider} aria-hidden="true">
              <span>›</span>
            </div>

            {/* Step 2: QUANTUM LEVEL PROGRESSION */}
            <div className={styles.stepCardExact}>
              <div className={styles.stepIconLeft}>
                <div className={styles.stepNumPill}>02</div>
                <Zap size={24} color="#E5C98D" />
              </div>
              <div className={styles.stepContentRight}>
                <h3 className={styles.stepTitle}>QUANTUM LEVEL UP</h3>
                <p className={styles.stepDesc}>Progress through 12 aerospace tiers and unlock physical-grade 3D collectible medals.</p>
              </div>
            </div>

            <div className={styles.chevronDivider} aria-hidden="true">
              <span>›</span>
            </div>

            {/* Step 3: ASSET EXTRACTION */}
            <div className={styles.stepCardExact}>
              <div className={styles.stepIconLeft}>
                <div className={styles.stepNumPill}>03</div>
                <Award size={24} color="#19D5E8" />
              </div>
              <div className={styles.stepContentRight}>
                <h3 className={styles.stepTitle}>EXTRACT ASSETS</h3>
                <p className={styles.stepDesc}>Claim verified VES digital currency, sapphire canisters, and rare cosmetic frames.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
         5. YOUR LEVEL JOURNEY (Precision Telemetry Rail Lv.1 to Lv.6)
      ------------------------------------------------------------- */}
      <section className={styles.journeySection} id="journey">
        <div className={styles.container}>
          <div className={styles.journeyFlexGrid}>

            {/* Left Column: Title & CTA Button */}
            <div className={styles.journeyLeftPanel}>
              <div className={styles.panelEyebrow}>TIER TELEMETRY</div>
              <h2 className={styles.journeyMainHeading}>
                <span>CALIBRATED</span>
                <span>PROGRESSION RAIL</span>
              </h2>
              <p className={styles.journeySub}>12 Sovereign Tiers. Micro-centered 512px 3D Medallions.</p>
              <button
                type="button"
                className={styles.viewAllLevelsBtn}
                onClick={() => navigate('/Lvl-Dashboard')}
              >
                <span>VIEW ALL 12 TIERS</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {/* Right Column: 6 Level Nodes on Cyan Track */}
            <div className={styles.journeyRightPanel}>
              <div className={styles.nodesTrackContainer}>

                {/* Horizontal Cyan Telemetry Line */}
                <div className={styles.trackConnectorLine} aria-hidden="true" />

                {/* Node 1: Lv.1 Completed */}
                <div className={styles.nodeItem}>
                  <div className={styles.badgeWrap}>
                    <img
                      src="/assets/black_label/rank_01_novice.png"
                      alt="Novice Badge"
                      className={styles.badgeImgSmall}
                    />
                  </div>
                  <span className={styles.nodeLevelTag}>Lv.1</span>
                  <span className={styles.statusCompleted}>
                    <Check size={11} />
                    <span>Unlocked</span>
                  </span>
                </div>

                {/* Node 2: Lv.2 Completed */}
                <div className={styles.nodeItem}>
                  <div className={styles.badgeWrap}>
                    <img
                      src="/assets/black_label/rank_02_apprentice.png"
                      alt="Apprentice Badge"
                      className={styles.badgeImgSmall}
                    />
                  </div>
                  <span className={styles.nodeLevelTag}>Lv.2</span>
                  <span className={styles.statusCompleted}>
                    <Check size={11} />
                    <span>Unlocked</span>
                  </span>
                </div>

                {/* Node 3: Lv.3 Completed */}
                <div className={styles.nodeItem}>
                  <div className={styles.badgeWrap}>
                    <img
                      src="/assets/black_label/rank_03_warrior.png"
                      alt="Warrior Badge"
                      className={styles.badgeImgSmall}
                    />
                  </div>
                  <span className={styles.nodeLevelTag}>Lv.3</span>
                  <span className={styles.statusCompleted}>
                    <Check size={11} />
                    <span>Unlocked</span>
                  </span>
                </div>

                {/* Node 4: Lv.4 CURRENT (Champion) */}
                <div className={`${styles.nodeItem} ${styles.nodeItemCurrent}`}>
                  <div className={styles.currentRadiantHalo} aria-hidden="true" />
                  <div className={styles.badgeWrapCurrent}>
                    <img
                      src="/assets/black_label/rank_04_champion.png"
                      alt="Champion Badge"
                      className={styles.badgeImgCurrent}
                    />
                  </div>
                  <span className={styles.nodeLevelTagCurrent}>Lv.4</span>
                  <span className={styles.statusCurrentPill}>Active Tier</span>
                </div>

                {/* Node 5: Lv.5 Locked */}
                <div className={`${styles.nodeItem} ${styles.nodeItemLocked}`}>
                  <div className={styles.badgeWrap}>
                    <img
                      src="/assets/black_label/rank_05_legend.png"
                      alt="Legend Badge"
                      className={styles.badgeImgSmall}
                    />
                  </div>
                  <span className={styles.nodeLevelTag}>Lv.5</span>
                  <span className={styles.statusLocked}>
                    <Lock size={10} />
                    <span>Encrypted</span>
                  </span>
                </div>

                {/* Node 6: Lv.6 Locked */}
                <div className={`${styles.nodeItem} ${styles.nodeItemLocked}`}>
                  <div className={styles.badgeWrap}>
                    <img
                      src="/assets/black_label/rank_06_elite.png"
                      alt="Elite Badge"
                      className={styles.badgeImgSmall}
                    />
                  </div>
                  <span className={styles.nodeLevelTag}>Lv.6</span>
                  <span className={styles.statusLocked}>
                    <Lock size={10} />
                    <span>Encrypted</span>
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
         6. REWARDS SHOWCASE (Futuristic Vault Artifacts)
      ------------------------------------------------------------- */}
      <section className={styles.rewardsSection} id="rewards">
        <div className={styles.container}>

          <div className={styles.sectionTitleBlock}>
            <div className={styles.flourishHeadingRow}>
              <span className={styles.cyanLineLeft} />
              <h2 className={styles.cyberHeading}>PROTOCOL REWARDS VAULT</h2>
              <span className={styles.cyanLineRight} />
            </div>
            <p className={styles.sectionSubtitle}>Verified physical and digital rewards disbursed through the telemetry chain.</p>
          </div>

          <div className={styles.rewardsGrid}>

            {/* Reward 1: Quantum Chest */}
            <div className={styles.rewardCardExact}>
              <div className={styles.rewardImgWrap}>
                <img
                  src="/assets/premium/png/reward_premium_chest@4x.png"
                  alt="Quantum Chest"
                  className={styles.rewardThumbnail}
                  onError={(e) => { e.currentTarget.src = '/assets/reference/reward_chest.png'; }}
                />
              </div>
              <h4 className={styles.rewardCardTitle}>Quantum Chest</h4>
              <span className={styles.rewardTierReq}>Tier 01+ Clearance</span>
            </div>

            {/* Reward 2: Exclusive Avatar */}
            <div className={styles.rewardCardExact}>
              <div className={styles.rewardImgWrap}>
                <img
                  src="/assets/premium/png/reward_exclusive_avatar@4x.png"
                  alt="Cybernetic Avatar"
                  className={styles.rewardThumbnail}
                  onError={(e) => { e.currentTarget.src = '/assets/reference/reward_avatar.png'; }}
                />
              </div>
              <h4 className={styles.rewardCardTitle}>Cybernetic Frame</h4>
              <span className={styles.rewardTierReq}>Tier 05+ Clearance</span>
            </div>

            {/* Reward 3: Sovereign Badge */}
            <div className={styles.rewardCardExact}>
              <div className={styles.rewardImgWrap}>
                <img
                  src="/assets/black_label/rank_12_supreme.png"
                  alt="Sovereign Crest"
                  className={styles.rewardThumbnail}
                />
              </div>
              <h4 className={styles.rewardCardTitle}>Apex Medallion</h4>
              <span className={styles.rewardTierReq}>Tier 10+ Clearance</span>
            </div>

            {/* Reward 4: Dark Energy Gems */}
            <div className={styles.rewardCardExact}>
              <div className={styles.rewardImgWrap}>
                <img
                  src="/assets/premium/png/reward_gems@4x.png"
                  alt="Sapphire Canisters"
                  className={styles.rewardThumbnail}
                  onError={(e) => { e.currentTarget.src = '/assets/reference/reward_gems.png'; }}
                />
              </div>
              <h4 className={styles.rewardCardTitle}>Sapphire Core</h4>
              <span className={styles.rewardTierReq}>Tier 03+ Clearance</span>
            </div>

            {/* Reward 5: Relic Skin */}
            <div className={styles.rewardCardExact}>
              <div className={styles.rewardImgWrap}>
                <img
                  src="/assets/premium/png/reward_epic_skin@4x.png"
                  alt="Exotic Relic"
                  className={styles.rewardThumbnail}
                  onError={(e) => { e.currentTarget.src = '/assets/reference/reward_skin.png'; }}
                />
              </div>
              <h4 className={styles.rewardCardTitle}>Exotic Relic</h4>
              <span className={styles.rewardTierReq}>Tier 07+ Clearance</span>
            </div>

            {/* Reward 6: Vault Showcase CTA Card */}
            <div className={`${styles.rewardCardExact} ${styles.rewardCtaBanner}`}>
              <div className={styles.vaultCtaContent}>
                <h4 className={styles.vaultTitle}>Access The Master Vault</h4>
                <p className={styles.vaultSub}>Claim daily protocol boosts and milestone crates.</p>
                <button
                  type="button"
                  className={styles.vaultExploreBtn}
                  onClick={() => navigate('/Lvl-Dashboard')}
                >
                  <span>ENTER VAULT</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
         7. CALL TO ACTION BANNER (Futuristic Mission Launch)
      ------------------------------------------------------------- */}
      <section className={styles.ctaArmySection} id="why-veloop">
        <div className={styles.container}>
          <div className={styles.ctaMilitaryCard}>
            <div className={styles.ctaInnerContent}>
              <div className={styles.ctaTag}>TRANSMISSION REVEALED</div>
              <h2 className={styles.ctaHeading}>INITIALIZE YOUR REWARDS TELEMETRY</h2>
              <p className={styles.ctaSub}>Join over 50,000 verified operatives climbing the sovereign tier ladder.</p>
              <button
                type="button"
                className={styles.ctaGoldLaunchBtn}
                onClick={() => navigate('/Lvl-Dashboard')}
              >
                <span>COMMENCE MISSION NOW</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
         8. SCIENTIFIC RESPONSIVE FOOTER (100% SVG-Free)
      ------------------------------------------------------------- */}
      <footer className={styles.footerSection}>
        <div className={styles.container}>
          <div className={styles.footerInner}>

            {/* Left: Brand */}
            <div className={styles.footerBrandCol}>
              <div className={styles.footerLogoRow}>
                <img
                  src="/assets/premium/png/veloop_logo@4x.png"
                  alt="VELOOP"
                  className={styles.footerLogoImg}
                />
                <span className={styles.footerBrandText}>VELOOP</span>
              </div>
              <span className={styles.footerCopyright}>
                © 2026 VELOOP NETWORK. ALL RIGHTS RESERVED. ZERO-SVG QUANTUM PLATFORM.
              </span>
            </div>

            {/* Center: Legal Links */}
            <div className={styles.footerNavLinks}>
              <a href="#top" onClick={(e) => handleNavClick(e, 'top')}>Overview</a>
              <a href="#how-it-works" onClick={(e) => handleNavClick(e, 'how-it-works')}>Architecture</a>
              <a href="#journey" onClick={(e) => handleNavClick(e, 'journey')}>Tiers</a>
              <a href="#rewards" onClick={(e) => handleNavClick(e, 'rewards')}>Vault</a>
              <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Protocol</a>
              <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a>
            </div>

            {/* Right: Scientific Status Badges (Zero SVG) */}
            <div className={styles.footerStatusCol}>
              <div className={styles.systemStatusChip}>
                <span className={styles.systemDot} />
                <span>ALL NODES OPERATIONAL</span>
              </div>
              <div className={styles.footerSocialIcons}>
                <span className={styles.socialCircle} title="Discord Comms">💬</span>
                <span className={styles.socialCircle} title="YouTube Channel">▶</span>
                <span className={styles.socialCircle} title="X Telemetry">𝕏</span>
              </div>
            </div>

          </div>
        </div>
      </footer>

      {/* Login Portal Modal */}
      {showLoginModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowLoginModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>OPERATIVE ACCESS PORTAL</h3>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setShowLoginModal(false)}
              >
                <X size={18} />
              </button>
            </div>
            <p className={styles.modalSub}>Enter your neural credentials to synchronize with VELOOP telemetry.</p>
            <form onSubmit={(e) => { e.preventDefault(); setShowLoginModal(false); navigate('/Lvl-Dashboard'); }}>
              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>OPERATIVE IDENTIFIER</label>
                <input
                  type="text"
                  className={styles.textInput}
                  placeholder="agent@veloop.network"
                  defaultValue="operative_07@veloop.network"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>ENCRYPTION KEY</label>
                <input
                  type="password"
                  className={styles.textInput}
                  placeholder="••••••••••••"
                  defaultValue="cyberquantum2026"
                  required
                />
              </div>
              <button type="submit" className={styles.modalSubmitBtn}>
                AUTHENTICATE & ENTER
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default LandingPage;
