import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import levelFiveBadge from '../../assets/ref_badge_level_05.png';
import gameBasket from '../../assets/golden_basket.svg';
import { 
  Sparkles, 
  Gamepad2, 
  CheckCircle2, 
  Trophy, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Coins, 
  Flame, 
  Gift, 
  Wallet, 
  Users, 
  Menu, 
  X, 
  TrendingUp, 
  Play, 
  Star,
  Layers,
  Clock3
} from 'lucide-react';
import styles from './LandingPage.module.css';
import { LandingIntro, hasCompletedIntro, markIntroCompleted } from '../../components/Common/LandingIntro';

export function LandingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // In-memory state: plays on every page refresh / load, but persists across tab navigation
  const [introSeen, setIntroSeen] = useState(() => hasCompletedIntro());

  const handleIntroComplete = () => {
    markIntroCompleted();
    setIntroSeen(true);
    navigate('/Lvl-Dashboard');
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Play landing intro animation first on initial load before transitioning to dashboard
  if (!introSeen) {
    return <LandingIntro onComplete={handleIntroComplete} />;
  }

  return (
    <div className={styles.landingPage} id="top">
      {/* -------------------------------------------------------------
         A. NAVIGATION HEADER
      ------------------------------------------------------------- */}
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerInner}>
            {/* Branding */}
            <a href="#top" className={styles.brand} onClick={(e) => handleNavClick(e, 'top')}>
              <img 
                src={logo}
                alt="VELOOP Rewards Logo" 
                className={styles.brandLogo}
              />
              <span className={styles.brandName}>VELOOP</span>
              <span className={styles.brandBadge}>Rewards</span>
            </a>

            {/* Desktop Navigation Links */}
            <nav aria-label="Main Navigation">
              <ul className={styles.navLinks}>
                <li>
                  <a href="#top" className={styles.navLink} onClick={(e) => handleNavClick(e, 'top')}>
                    Home
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className={styles.navLink} onClick={(e) => handleNavClick(e, 'how-it-works')}>
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#features" className={styles.navLink} onClick={(e) => handleNavClick(e, 'features')}>
                    Features
                  </a>
                </li>
                <li>
                  <a href="#rewards" className={styles.navLink} onClick={(e) => handleNavClick(e, 'rewards')}>
                    Rewards
                  </a>
                </li>
                <li>
                  <a href="#why-veloop" className={styles.navLink} onClick={(e) => handleNavClick(e, 'why-veloop')}>
                    About
                  </a>
                </li>
              </ul>
            </nav>

            {/* Header Action Buttons */}
            <div className={styles.headerActions}>
              <button 
                className={styles.loginBtn}
                onClick={() => setShowLoginModal(true)}
                aria-label="Account Login"
              >
                Login
              </button>
              <button 
                className={styles.getStartedBtn}
                onClick={() => navigate('/Lvl-Dashboard')}
                aria-label="Get Started with VELOOP Dashboard"
              >
                <span>Get Started</span>
                <ArrowRight size={16} />
              </button>
              <button 
                className={styles.hamburgerBtn}
                onClick={() => setMobileMenuOpen(prev => !prev)}
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <>
            <div 
              className={styles.mobileMenuOverlay} 
              onClick={() => setMobileMenuOpen(false)} 
            />
            <div className={styles.mobileMenu}>
              <a href="#top" className={styles.mobileNavLink} onClick={(e) => handleNavClick(e, 'top')}>
                Home
              </a>
              <a href="#how-it-works" className={styles.mobileNavLink} onClick={(e) => handleNavClick(e, 'how-it-works')}>
                How It Works
              </a>
              <a href="#features" className={styles.mobileNavLink} onClick={(e) => handleNavClick(e, 'features')}>
                Features
              </a>
              <a href="#rewards" className={styles.mobileNavLink} onClick={(e) => handleNavClick(e, 'rewards')}>
                Rewards
              </a>
              <a href="#why-veloop" className={styles.mobileNavLink} onClick={(e) => handleNavClick(e, 'why-veloop')}>
                About
              </a>
              <div className={styles.mobileActions}>
                <button 
                  className={styles.loginBtn} 
                  style={{ width: '100%', textAlign: 'center' }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowLoginModal(true);
                  }}
                >
                  Login
                </button>
                <button 
                  className={styles.getStartedBtn} 
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/Lvl-Dashboard');
                  }}
                >
                  <span>Get Started</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </header>

      {/* -------------------------------------------------------------
         B. HERO SECTION
      ------------------------------------------------------------- */}
      <section className={styles.heroSection}>
        <img
          src={gameBasket}
          alt=""
          aria-hidden="true"
          className={styles.heroGameShadow}
        />
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <div className={styles.heroPill}>
                <Sparkles size={14} />
                <span>Next-Generation Gamified Rewards</span>
              </div>

              <h1 className={styles.heroTitle}>
                Level Up Your Journey. <br />
                <span className={styles.heroTitleGradient}>Unlock Epic Rewards.</span>
              </h1>

              <p className={styles.heroDesc}>
                Experience a premium fintech-inspired rewards ecosystem. Complete daily missions, test your skills in the XP Catcher arcade, climb through 10 prestige tiers, and unlock exclusive digital milestone perks.
              </p>

              <div className={styles.heroCtas}>
                <button 
                  className={styles.primaryCta}
                  onClick={() => navigate('/Lvl-Dashboard')}
                >
                  <span>Get Started</span>
                  <ArrowRight size={18} />
                </button>
                <a 
                  href="#rewards" 
                  className={styles.secondaryCta}
                  onClick={(e) => handleNavClick(e, 'rewards')}
                >
                  <span>Explore Rewards</span>
                </a>
              </div>

              <div className={styles.heroStatsRow}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>10</span>
                  <span className={styles.statLabel}>Prestige Levels</span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>60 FPS</span>
                  <span className={styles.statLabel}>Mini-Game Engine</span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>100%</span>
                  <span className={styles.statLabel}>Live Connected</span>
                </div>
              </div>
            </div>

            {/* Interactive Hero Visual Showcase */}
            <div className={styles.heroVisual}>
              <div className={styles.showcaseCard}>
                <div className={styles.showcaseBadgeRow}>
                  <img 
                    src={levelFiveBadge}
                    alt="Level 05 Ascendant Badge" 
                    className={styles.showcaseBadgeImg}
                  />
                  <div className={styles.showcaseBadgeMeta}>
                    <span className={styles.showcaseLevelName}>Tier 05 · Ascendant</span>
                    <span className={styles.showcaseXpBig}>6,420 XP</span>
                    <span className={styles.showcaseXpSub}>1,580 XP to Level 06</span>
                  </div>
                </div>

                <div className={styles.showcaseProgressTrack}>
                  <div className={styles.showcaseProgressFill} />
                </div>
                <div className={styles.showcaseProgressMeta}>
                  <span>6,420 / 8,000 XP</span>
                  <span style={{ color: '#f5b041' }}>80% Progress</span>
                </div>

                <div className={styles.showcaseFeaturePills}>
                  <div className={styles.featurePillMini}>
                    <Gamepad2 size={16} color="#9333ea" />
                    <span>XP Catcher</span>
                  </div>
                  <div className={styles.featurePillMini}>
                    <Trophy size={16} color="#f5b041" />
                    <span>500 VEs Reward</span>
                  </div>
                </div>

                {/* Live Floating Badge */}
                <div className={styles.floatingBadge}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                  <span>Live Backend Connected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
         C. HOW IT WORKS
      ------------------------------------------------------------- */}
      <section className={styles.sectionBlock} id="how-it-works">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>Progression Loop</span>
            <h2 className={styles.sectionHeading}>How VELOOP Rewards Works</h2>
            <p className={styles.sectionLead}>
              A seamless, motivation-driven progression framework designed to reward your daily engagement without hidden mechanics.
            </p>
          </div>

          <div className={styles.stepsGrid}>
            {/* Step 1 */}
            <div className={styles.stepCard}>
              <span className={styles.stepNumber}>STEP 01</span>
              <div className={styles.stepIconBox} style={{ background: 'rgba(147, 51, 234, 0.15)', color: '#c084fc' }}>
                <Zap size={28} />
              </div>
              <h3 className={styles.stepTitle}>Complete Activities</h3>
              <p className={styles.stepDesc}>
                Engage in daily tasks, referral bonuses, media tasks, or jump straight into the skill-based XP Catcher mini-game.
              </p>
            </div>

            {/* Step 2 */}
            <div className={styles.stepCard}>
              <span className={styles.stepNumber}>STEP 02</span>
              <div className={styles.stepIconBox} style={{ background: 'rgba(245, 176, 65, 0.15)', color: '#f5b041' }}>
                <TrendingUp size={28} />
              </div>
              <h3 className={styles.stepTitle}>Earn XP & Level Up</h3>
              <p className={styles.stepDesc}>
                Every activity grants verified experience points that fill your level gauge and advance you along the 10-tier roadmap.
              </p>
            </div>

            {/* Step 3 */}
            <div className={styles.stepCard}>
              <span className={styles.stepNumber}>STEP 03</span>
              <div className={styles.stepIconBox} style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
                <Gift size={28} />
              </div>
              <h3 className={styles.stepTitle}>Unlock Tier Rewards</h3>
              <p className={styles.stepDesc}>
                Unlock milestone treasure chests, VE tokens, sparkling gems, game spins, and elevated daily earning limits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
         D. FEATURES SECTION
      ------------------------------------------------------------- */}
      <section className={styles.sectionBlock} id="features" style={{ background: '#07080e' }}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>Core Capabilities</span>
            <h2 className={styles.sectionHeading}>Engineered for Gamified Progression</h2>
            <p className={styles.sectionLead}>
              Explore the full suite of interactive tools built into the VELOOP Level-Up Dashboard.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {/* Feature 1 */}
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper} style={{ background: 'rgba(147, 51, 234, 0.15)', color: '#c084fc' }}>
                <Play size={24} />
              </div>
              <h3 className={styles.featureCardTitle}>Earn More XP</h3>
              <p className={styles.featureCardDesc}>
                Six distinct earning modules including Watch & Earn, Daily Missions, and Refer & Earn to accelerate your tier growth.
              </p>
              <div className={styles.featureCardMeta}>
                <span>+15 to +50 XP per activity</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper} style={{ background: 'rgba(245, 176, 65, 0.15)', color: '#f5b041' }}>
                <Layers size={24} />
              </div>
              <h3 className={styles.featureCardTitle}>10-Tier Level Roadmap</h3>
              <p className={styles.featureCardDesc}>
                A clear visual hierarchy from Starter (Lvl 01) to Mythic (Lvl 10) with completed, current, and locked state badges.
              </p>
              <div className={styles.featureCardMeta}>
                <span>Horizontal scroll track</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper} style={{ background: 'rgba(2, 132, 199, 0.15)', color: '#38bdf8' }}>
                <Gamepad2 size={24} />
              </div>
              <h3 className={styles.featureCardTitle}>XP Catcher Mini-Game</h3>
              <p className={styles.featureCardDesc}>
                A smooth 60 FPS Canvas arcade challenge featuring the 3D golden basket, falling orbs, timer, and score multipliers.
              </p>
              <div className={styles.featureCardMeta}>
                <span>Keyboard, touch & mouse</span>
              </div>
            </div>

            {/* Feature 4 */}
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper} style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}>
                <Flame size={24} />
              </div>
              <h3 className={styles.featureCardTitle}>Daily Tasks & Streaks</h3>
              <p className={styles.featureCardDesc}>
                Build your daily streak, complete mission checklists, and maintain momentum to earn loyalty bonus multipliers.
              </p>
              <div className={styles.featureCardMeta}>
                <span>Streak tracking & bonus</span>
              </div>
            </div>

            {/* Feature 5 */}
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper} style={{ background: 'rgba(245, 176, 65, 0.15)', color: '#fcd34d' }}>
                <Trophy size={24} />
              </div>
              <h3 className={styles.featureCardTitle}>Rewards & Celebrations</h3>
              <p className={styles.featureCardDesc}>
                Milestone treasure chests, celebration modals with 3D pedestal, confetti effects, and transparent perk previews.
              </p>
              <div className={styles.featureCardMeta}>
                <span>VEs, Gems & Spins</span>
              </div>
            </div>

            {/* Feature 6 */}
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper} style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
                <Wallet size={24} />
              </div>
              <h3 className={styles.featureCardTitle}>Smart Wallet & Profile</h3>
              <p className={styles.featureCardDesc}>
                Dedicated balance overview, photo upload preview, profile editor with validation, and comprehensive activity history.
              </p>
              <div className={styles.featureCardMeta}>
                <span>Instant profile updates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
         E. REWARDS SECTION
      ------------------------------------------------------------- */}
      <section className={styles.sectionBlock} id="rewards">
        <div className={styles.container}>
          <div className={styles.rewardsShowcase}>
            <div className={styles.sectionHeader} style={{ marginBottom: '32px' }}>
              <span className={styles.sectionEyebrow}>Milestone Rewards</span>
              <h2 className={styles.sectionHeading}>Tier Rewards Overview</h2>
              <p className={styles.sectionLead}>
                Every level you achieve unlocks tangible platform perks. Progress through tiers to multiply your rewards.
              </p>
            </div>

            <div className={styles.rewardTiersGrid}>
              {/* Tier 02 */}
              <div className={styles.tierCard}>
                <img src="/assets/lvl-2.svg" alt="Level 02 Badge" className={styles.tierBadgeImg} />
                <span className={styles.tierLevelTag}>Level 02</span>
                <h4 className={styles.tierName}>Explorer</h4>
                <div className={styles.tierRewardPill}>
                  <Coins size={14} />
                  <span>100 VEs</span>
                </div>
              </div>

              {/* Tier 04 */}
              <div className={styles.tierCard}>
                <img src="/assets/lvl-4.svg" alt="Level 04 Badge" className={styles.tierBadgeImg} />
                <span className={styles.tierLevelTag}>Level 04</span>
                <h4 className={styles.tierName}>Momentum</h4>
                <div className={styles.tierRewardPill}>
                  <Coins size={14} />
                  <span>250 VEs</span>
                </div>
              </div>

              {/* Tier 05 (Active) */}
              <div className={`${styles.tierCard} ${styles.tierCardActive}`}>
                <img 
                  src="/assets/ref_badge_level_05.png" 
                  alt="Level 05 Badge" 
                  className={styles.tierBadgeImg}
                  onError={(e) => { e.currentTarget.src = '/assets/lvl-5.svg'; }}
                />
                <span className={styles.tierLevelTag} style={{ color: '#f5b041' }}>Level 05 (Current)</span>
                <h4 className={styles.tierName}>Ascendant</h4>
                <div className={styles.tierRewardPill} style={{ background: '#f5b041', color: '#090a12' }}>
                  <Gift size={14} />
                  <span>500 VEs + 25 Gems</span>
                </div>
              </div>

              {/* Tier 06 */}
              <div className={styles.tierCard}>
                <img src="/assets/lvl-6.svg" alt="Level 06 Badge" className={styles.tierBadgeImg} />
                <span className={styles.tierLevelTag}>Level 06</span>
                <h4 className={styles.tierName}>Vanguard</h4>
                <div className={styles.tierRewardPill}>
                  <Star size={14} />
                  <span>2 Lucky Spins</span>
                </div>
              </div>
            </div>

            <p className={styles.rewardsDisclaimer}>
              *Displayed rewards represent the current platform tier configurations. Progression rewards are unlocked sequentially upon attaining the required XP threshold.
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
         F. WHY VELOOP
      ------------------------------------------------------------- */}
      <section className={styles.sectionBlock} id="why-veloop">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>The VELOOP Advantage</span>
            <h2 className={styles.sectionHeading}>Why Choose VELOOP Rewards?</h2>
            <p className={styles.sectionLead}>
              Designed from the ground up to unite fintech discipline with rewarding gamification mechanics.
            </p>
          </div>

          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <div className={styles.whyIconBox}>
                <ShieldCheck size={26} />
              </div>
              <div className={styles.whyCardContent}>
                <h3>Fintech-Grade Integrity</h3>
                <p>
                  No casino or gambling styling. We deliver clean, trustworthy, and transparent reward mechanics with verifiable progress tracking.
                </p>
              </div>
            </div>

            <div className={styles.whyCard}>
              <div className={styles.whyIconBox}>
                <Gamepad2 size={26} />
              </div>
              <div className={styles.whyCardContent}>
                <h3>Interactive Skill Arcade</h3>
                <p>
                  Instead of passive waiting, test your reflexes in the 60 FPS XP Catcher mini-game with custom 3D basket physics and live scoring.
                </p>
              </div>
            </div>

            <div className={styles.whyCard}>
              <div className={styles.whyIconBox}>
                <TrendingUp size={26} />
              </div>
              <div className={styles.whyCardContent}>
                <h3>Action-Driven Progress</h3>
                <p>
                  Never guess what comes next. The dashboard clearly exposes your current XP, remaining XP needed, next level, and unlockable rewards.
                </p>
              </div>
            </div>

            <div className={styles.whyCard}>
              <div className={styles.whyIconBox}>
                <Zap size={26} />
              </div>
              <div className={styles.whyCardContent}>
                <h3>Real-Time Synchronization</h3>
                <p>
                  Connected directly to the live VELOOP backend, your session scores, completed tasks, and tier advancements are updated instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
         G. FINAL CALL TO ACTION
      ------------------------------------------------------------- */}
      <section className={styles.finalCtaSection}>
        <div className={styles.container}>
          <div className={styles.finalCtaCard}>
            <h2 className={styles.finalCtaHeading}>
              Ready to Level Up Your Rewards Journey?
            </h2>
            <p className={styles.finalCtaSub}>
              Step into the full VELOOP Level-Up Dashboard now. Play the mini-game, complete missions, and claim your milestone rewards.
            </p>
            <button 
              className={styles.finalCtaBtn}
              onClick={() => navigate('/Lvl-Dashboard')}
            >
              <span>Launch Dashboard Now</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
         H. FOOTER
      ------------------------------------------------------------- */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrandCol}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img 
                  src="/assets/logo.svg" 
                  alt="VELOOP Logo" 
                  style={{ width: '30px', height: '30px', borderRadius: '8px' }}
                  onError={(e) => { e.currentTarget.src = '/assets/lvl-5.svg'; }}
                />
                <span style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff' }}>VELOOP</span>
              </div>
              <p className={styles.footerBrandDesc}>
                Gamified Level Progression, Rewards & Engagement Hub built for modern digital platforms.
              </p>
              <div className={styles.footerBackendPill}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                <span>Backend: veloop-5zm4.onrender.com</span>
              </div>
            </div>

            {/* Column 2: Dashboard Navigation */}
            <div>
              <h4 className={styles.footerColTitle}>Navigation</h4>
              <ul className={styles.footerNavList}>
                <li><a href="#top" className={styles.footerLink} onClick={(e) => handleNavClick(e, 'top')}>Home</a></li>
                <li><a href="#how-it-works" className={styles.footerLink} onClick={(e) => handleNavClick(e, 'how-it-works')}>How It Works</a></li>
                <li><a href="#features" className={styles.footerLink} onClick={(e) => handleNavClick(e, 'features')}>Features</a></li>
                <li><a href="#rewards" className={styles.footerLink} onClick={(e) => handleNavClick(e, 'rewards')}>Rewards</a></li>
                <li><a href="#why-veloop" className={styles.footerLink} onClick={(e) => handleNavClick(e, 'why-veloop')}>About</a></li>
              </ul>
            </div>

            {/* Column 3: Platform Routes */}
            <div>
              <h4 className={styles.footerColTitle}>Platform Hub</h4>
              <ul className={styles.footerNavList}>
                <li><a href="/Lvl-Dashboard" className={styles.footerLink} onClick={(e) => { e.preventDefault(); navigate('/Lvl-Dashboard'); }}>Level Dashboard</a></li>
                <li><a href="/Lvl-Dashboard/activity" className={styles.footerLink} onClick={(e) => { e.preventDefault(); navigate('/Lvl-Dashboard/activity'); }}>Recent Activity</a></li>
                <li><a href="/Lvl-Dashboard/wallet" className={styles.footerLink} onClick={(e) => { e.preventDefault(); navigate('/Lvl-Dashboard/wallet'); }}>My Wallet</a></li>
                <li><a href="/Lvl-Dashboard/profile" className={styles.footerLink} onClick={(e) => { e.preventDefault(); navigate('/Lvl-Dashboard/profile'); }}>User Profile</a></li>
              </ul>
            </div>

            {/* Column 4: Project Info */}
            <div>
              <h4 className={styles.footerColTitle}>Task 16 Info</h4>
              <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: '1.6' }}>
                VELOOP Rewards Internship 2026<br />
                Stack: React 18 · Vite · CSS Modules<br />
                Status: Production Verified
              </p>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <span>&copy; {new Date().getFullYear()} VELOOP Rewards. All rights reserved.</span>
            <span>Task 16 Level-Up Dashboard Implementation</span>
          </div>
        </div>
      </footer>

      {/* -------------------------------------------------------------
         DEMO AUTH MODAL (Safe authentication handler)
      ------------------------------------------------------------- */}
      {showLoginModal && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <div className={styles.modalContent}>
            <button 
              className={styles.modalCloseBtn}
              onClick={() => setShowLoginModal(false)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div style={{ display: 'inline-flex', padding: '14px', borderRadius: '50%', background: 'rgba(245, 176, 65, 0.15)', color: '#f5b041', marginBottom: '16px' }}>
              <ShieldCheck size={36} />
            </div>

            <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff', marginBottom: '8px' }}>
              Active Demo Session
            </h3>

            <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: '1.5', marginBottom: '24px' }}>
              You are currently authenticated as demo member <strong>VeLooper</strong> (Level 05 · Ascendant) connected to the live backend.
            </p>

            <button 
              className={styles.primaryCta}
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => {
                setShowLoginModal(false);
                navigate('/Lvl-Dashboard');
              }}
            >
              <span>Enter Level Dashboard</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
