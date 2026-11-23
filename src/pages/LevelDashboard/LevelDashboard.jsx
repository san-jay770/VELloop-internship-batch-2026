import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Play, Sparkles, Trophy, ArrowRight, Zap } from 'lucide-react';
import { TopNav } from '../../components/Navigation/TopNav';
import { BottomNav } from '../../components/Navigation/BottomNav';
import { LevelHero } from '../../components/LevelHero/LevelHero';
import { LevelProgressionSummary } from '../../components/LevelHero/LevelProgressionSummary';
import { TodaysBoost } from '../../components/TodaysBoost/TodaysBoost';
import { EarnMoreGrid } from '../../components/EarnMoreXP/EarnMoreGrid';
import { LevelRoadmap } from '../../components/LevelRoadmap/LevelRoadmap';
import { XPActivity } from '../../components/XPActivity/XPActivity';
import { XpCatcherGame } from '../../components/PlayAndEarn/XpCatcherGame';
import { ChallengeComplete } from '../../components/PlayAndEarn/ChallengeComplete';
import { EarnAndLevelUpModal } from '../../components/EarnMoreXP/EarnAndLevelUpModal';
import { LevelUpModal } from '../../components/LevelUpModal/LevelUpModal';
import { Skeleton, ErrorState } from '../../components/Common/CommonComponents';
import { useLevelData } from '../../hooks/useLevelData';
import styles from './LevelDashboard.module.css';

export function LevelDashboard() {
  const navigate = useNavigate();

  const {
    profile,
    levels,
    activities,
    todaysBoost,
    isLoading,
    isError,
    levelUpData,
    dismissLevelUp,
    handleGameCompleted,
    handleClaimFeature,
    refetch
  } = useLevelData();

  const [activeNavTab, setActiveNavTab] = useState('rewards');
  const [activeScreen, setActiveScreen] = useState('dashboard');

  const handleNavigation = (tab) => {
    setActiveNavTab(tab);

    if (tab === 'home' || tab === 'rewards') {
      setActiveScreen('dashboard');
      navigate('/Lvl-Dashboard');
    } else if (tab === 'earn') {
      setActiveScreen('earn');
    } else if (tab === 'wallet') {
      navigate('/Lvl-Dashboard/wallet');
    } else if (tab === 'profile') {
      navigate('/Lvl-Dashboard/profile');
    }
  };

  if (isLoading) {
    return (
      <div className={styles.dashboardPage}>
        <TopNav onNavigate={handleNavigation} activities={activities} />
        <div className={styles.skeletonWrapper}>
          <Skeleton height="60px" radius="16px" />
          <Skeleton height="170px" radius="24px" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Skeleton height="90px" radius="16px" />
            <Skeleton height="90px" radius="16px" />
          </div>
          <Skeleton height="140px" radius="20px" />
          <Skeleton height="200px" radius="20px" />
        </div>
        <BottomNav
          activeTab={activeNavTab}
          onSelectTab={handleNavigation}
        />
      </div>
    );
  }

  if (isError && !profile) {
    return (
      <div className={styles.dashboardPage}>
        <TopNav onNavigate={handleNavigation} activities={activities} />
        <ErrorState message="Unable to Load Level Progress" onRetry={refetch} />
        <BottomNav
          activeTab={activeNavTab}
          onSelectTab={handleNavigation}
        />
      </div>
    );
  }

  const currentLevel = profile?.currentLevel || 5;
  const currentLevelName = profile?.currentLevelName || "Ascendant";
  const currentXP = profile?.currentXP ?? 6420;
  const nextLevel = profile?.nextLevel ?? 6;
  const requiredXP = profile?.requiredXP ?? 8000;
  const xpToNext = Math.max(0, requiredXP - currentXP);
  const progressPct = profile?.progressPct ?? 80;
  const nextLevelData = levels.find(item => Number(item.level) === Number(nextLevel));
  const nextLevelReward = nextLevelData?.reward ?? { type: "Spins", amount: 2 };

  return (
    <div className={styles.dashboardPage}>
      {/* Screen 2: XP Catcher Mini-Game */}
      {activeScreen === 'game' && (
        <XpCatcherGame
          onClose={() => setActiveScreen('dashboard')}
          currentLevel={currentLevel}
          currentXP={currentXP}
          requiredXP={requiredXP}
          onGameFinished={(score) => {
            return handleGameCompleted(score);
          }}
        />
      )}

      {/* Screen 3: Challenge Complete */}
      {activeScreen === 'complete' && (
        <ChallengeComplete
          score={92}
          earnedXP={30}
          earnedVEs={12}
          isNewBest
          currentLevel={currentLevel}
          currentXP={currentXP}
          requiredXP={requiredXP}
          onPlayAgain={() => setActiveScreen('game')}
          onBackToDashboard={() => setActiveScreen('dashboard')}
        />
      )}

      {/* Screen 4: Earn & Level Up Modal */}
      {activeScreen === 'earn' && (
        <EarnAndLevelUpModal
          onClose={() => setActiveScreen('dashboard')}
          onLaunchGame={() => setActiveScreen('game')}
          onClaimFeature={handleClaimFeature}
        />
      )}

      {/* Screen 5: Level Up Celebration / Preview Modal */}
      {activeScreen === 'levelup' && (
        <LevelUpModal
          level={nextLevel}
          levelName={nextLevelData?.name || "Vanguard"}
          reward={nextLevelReward}
          isRewardPreview
          onClose={() => setActiveScreen('dashboard')}
        />
      )}

      {/* Screen 6: Recent Activity Standalone View */}
      {activeScreen === 'activity' && (
        <div style={{ padding: '0 0 60px 0', minHeight: '85vh' }}>
          <TopNav
            onNavigate={handleNavigation}
            activities={activities}
          />
          <XPActivity
            activities={activities}
            todayXP={todaysBoost.xpEarned}
            todayVE={0}
            showAll
            onStartEarning={() => navigate('/Lvl-Dashboard')}
          />
          <BottomNav
            activeTab={activeNavTab}
            onSelectTab={handleNavigation}
          />
        </div>
      )}

      {/* Main Redesigned Dashboard View */}
      {activeScreen === 'dashboard' && (
        <>
          <TopNav
            onNavigate={handleNavigation}
            activities={activities}
          />

          <main className={styles.mainLayout}>
            {/* Top Row: Hero Progression & Boost */}
            <div className={styles.topSection}>
              <div className={styles.heroColumn}>
                <LevelHero
                  currentLevel={currentLevel}
                  currentXP={currentXP}
                  nextLevel={nextLevel}
                  requiredXP={requiredXP}
                  xpToNext={xpToNext}
                  progressPct={progressPct}
                />
              </div>

              <div className={styles.boostColumn}>
                <TodaysBoost
                  xpEarned={todaysBoost.xpEarned}
                  tasksDone={todaysBoost.tasksDone}
                  streakDays={todaysBoost.streakDays}
                />
              </div>
            </div>

            {/* Level Progression Key Metrics Bar */}
            <LevelProgressionSummary
              currentLevel={currentLevel}
              currentLevelName={currentLevelName}
              currentXP={currentXP}
              requiredXP={requiredXP}
              xpToNext={xpToNext}
              progressPct={progressPct}
              nextLevel={nextLevel}
              nextLevelName={nextLevelData?.name || "Vanguard"}
              nextLevelReward={nextLevelReward}
              totalLevels={levels.length || 10}
            />

            {/* Middle Section: Full-Width Connected Horizontal Level Journey */}
            <div className={styles.journeySection}>
              <LevelRoadmap
                levels={levels}
                currentLevel={currentLevel}
                currentXP={currentXP}
              />
            </div>

            {/* Bottom Grid: Play & Earn Mini-Game Launcher + Activity + Earning Grid */}
            <div className={styles.bottomSection}>
              <div className={styles.bottomLeftCol}>
                {/* Play & Earn Feature Banner */}
                <section className={styles.arcadeBanner} aria-label="Play and Earn Arcade">
                  <div className={styles.arcadeGlowBackdrop} />
                  <div className={styles.arcadeContent}>
                    <div className={styles.arcadeBadgeRow}>
                      <span className={styles.arcadeLiveBadge}>
                        <Zap size={12} fill="currentColor" />
                        LIVE ARCADE
                      </span>
                      <span className={styles.arcadeScoreTag}>2X Multiplier Active</span>
                    </div>

                    <h3 className={styles.arcadeHeading}>
                      XP CATCHER CHALLENGE
                    </h3>
                    <p className={styles.arcadeSubtext}>
                      Control the 3D golden basket to catch glowing XP orbs and VE coins in a 20-second arcade rush.
                    </p>

                    <div className={styles.arcadeFooter}>
                      <button 
                        type="button" 
                        className={styles.playNowBtn}
                        onClick={() => setActiveScreen('game')}
                      >
                        <Play size={16} fill="currentColor" />
                        <span>PLAY NOW</span>
                      </button>

                      <button 
                        type="button" 
                        className={styles.previewRewardBtn}
                        onClick={() => setActiveScreen('levelup')}
                      >
                        <Trophy size={15} />
                        <span>View Tier Rewards</span>
                      </button>
                    </div>
                  </div>

                  <div className={styles.arcadeIllustrationWrap}>
                    <img 
                      src="/assets/golden_basket_clean.png" 
                      alt="Golden Basket" 
                      className={styles.basketPromoImg}
                      onError={(e) => {
                        e.currentTarget.src = '/assets/golden_basket.svg';
                      }}
                    />
                  </div>
                </section>

                {/* Earn More XP Opportunities */}
                <EarnMoreGrid
                  currentLevel={currentLevel}
                  nextLevel={nextLevel}
                  nextLevelName={nextLevelData?.name}
                  nextLevelReward={nextLevelReward}
                  onLaunchGame={() => setActiveScreen('game')}
                  onViewRewards={() => setActiveScreen('levelup')}
                  onClaimFeature={handleClaimFeature}
                />
              </div>

              <div className={styles.bottomRightCol}>
                <XPActivity
                  activities={activities}
                  todayXP={todaysBoost.xpEarned}
                  todayVE={0}
                  onViewAll={() => navigate('/Lvl-Dashboard/activity')}
                  onStartEarning={() => setActiveScreen('earn')}
                />
              </div>
            </div>
          </main>

          <BottomNav
            activeTab={activeNavTab}
            onSelectTab={handleNavigation}
          />
        </>
      )}

      {/* Real-time Level Up Modal if triggered from backend session */}
      {levelUpData && activeScreen !== 'levelup' && (
        <LevelUpModal
          level={levelUpData?.toLevel || currentLevel}
          levelName={levelUpData?.name || currentLevelName}
          reward={levelUpData?.reward}
          onClose={dismissLevelUp}
        />
      )}
    </div>
  );
}

export default LevelDashboard;
