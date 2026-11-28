import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/Navigation/Sidebar';
import { TopHeader } from '../../components/Navigation/TopHeader';
import { BottomNav } from '../../components/Navigation/BottomNav';
import { LegacyChamberHero } from '../../components/LegacyChamber/LegacyChamberHero';
import { ChronoXpRail } from '../../components/LegacyChamber/ChronoXpRail';
import { EmblemsGallery } from '../../components/LegacyChamber/EmblemsGallery';
import { LuxuryStatsBar } from '../../components/LuxuryLevelPage/LuxuryStatsBar';
import { LuxuryArcadeBanner } from '../../components/LuxuryLevelPage/LuxuryArcadeBanner';
import { EarnMoreGrid } from '../../components/EarnMoreXP/EarnMoreGrid';
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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const [activeNavTab, setActiveNavTab] = useState('dashboard');
  const [activeScreen, setActiveScreen] = useState('dashboard');

  const handleNavigation = (tab) => {
    setActiveNavTab(tab);
    setIsSidebarOpen(false);

    if (tab === 'dashboard' || tab === 'home' || tab === 'rewards') {
      setActiveScreen('dashboard');
      navigate('/Lvl-Dashboard');
    } else if (tab === 'earn') {
      setActiveScreen('earn');
    } else if (tab === 'activity') {
      setActiveScreen('activity');
    } else if (tab === 'wallet') {
      navigate('/Lvl-Dashboard/wallet');
    } else if (tab === 'profile') {
      navigate('/Lvl-Dashboard/profile');
    }
  };

  if (isLoading) {
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.mainWrapper}>
          <div className={styles.skeletonWrapper}>
            <Skeleton height="60px" radius="14px" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
              <Skeleton height="110px" radius="14px" />
              <Skeleton height="110px" radius="14px" />
              <Skeleton height="110px" radius="14px" />
              <Skeleton height="110px" radius="14px" />
            </div>
            <Skeleton height="200px" radius="20px" />
            <Skeleton height="140px" radius="16px" />
            <Skeleton height="240px" radius="16px" />
          </div>
        </div>
      </div>
    );
  }

  if (isError && !profile) {
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.mainWrapper}>
          <ErrorState message="Unable to Load Level Progress" onRetry={refetch} />
        </div>
      </div>
    );
  }

  // Safe data derivation
  const currentLevel = profile?.currentLevel || 5;
  const currentLevelData = levels?.find(item => Number(item.level) === Number(currentLevel));
  const currentLevelName = profile?.currentLevelName || currentLevelData?.name || "Ascendant";
  const currentXP = profile?.currentXP ?? 6420;
  const nextLevel = profile?.nextLevel ?? (currentLevel < (levels?.length || 10) ? currentLevel + 1 : null);
  const requiredXP = profile?.requiredXP ?? 8000;
  const xpToNext = Math.max(0, requiredXP - currentXP);
  const progressPct = profile?.progressPct ?? 80;

  const nextLevelData = nextLevel ? levels?.find(item => Number(item.level) === Number(nextLevel)) : null;
  const nextLevelName = profile?.nextLevelName
    || nextLevelData?.name
    || (nextLevel ? `Level ${String(nextLevel).padStart(2, '0')}` : "Max Level Reached");
  const nextLevelReward = profile?.nextLevelReward
    || nextLevelData?.reward
    || (nextLevel ? { type: "Spins", amount: 2 } : null);

  return (
    <div className={`${styles.dashboardContainer} ${styles.dashboardReveal}`}>
      {/* 1. Desktop & Mobile Modern Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeTab={activeNavTab}
        onSelectTab={handleNavigation}
        profile={profile}
        currentLevel={currentLevel}
        currentLevelName={currentLevelName}
        currentXP={currentXP}
        requiredXP={requiredXP}
        progressPct={progressPct}
        onLaunchGame={() => setActiveScreen('game')}
        onViewRewards={() => setActiveScreen('levelup')}
      />

      {/* 2. Main Application Workspace Area */}
      <div className={styles.mainWrapper}>
        {/* Modern Top Header Bar */}
        <TopHeader
          onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
          activities={activities}
          profile={profile}
          currentLevel={currentLevel}
          currentLevelName={currentLevelName}
          onLaunchGame={() => setActiveScreen('game')}
          onNavigate={handleNavigation}
        />

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
            level={nextLevel || currentLevel}
            levelName={nextLevelName}
            reward={nextLevelReward}
            isRewardPreview
            onClose={() => setActiveScreen('dashboard')}
          />
        )}

        {/* Screen 6: Recent Activity Standalone View */}
        {activeScreen === 'activity' && (
          <div style={{ padding: '24px 28px 80px 28px', minHeight: '85vh' }}>
            <XPActivity
              activities={activities}
              todayXP={todaysBoost?.xpEarned || 215}
              todayVE={0}
              showAll
              onViewAll={() => {}}
              onStartEarning={() => setActiveScreen('earn')}
            />
          </div>
        )}

        {/* Main Ultra-Premium Luxury Level Progression Content */}
        {activeScreen === 'dashboard' && (
          <main className={styles.dashboardMain}>

            {/* 1. The Legacy Chamber Hero Showcase with 3D Centerpiece */}
            <LegacyChamberHero
              currentLevel={currentLevel}
              currentXP={currentXP}
              requiredXP={requiredXP}
              nextLevel={nextLevel}
              progressPct={progressPct}
              onLaunchGame={() => setActiveScreen('game')}
              onViewRewards={() => setActiveScreen('levelup')}
            />

            {/* 2. Horology-Inspired Standing Metric Strip */}
            <LuxuryStatsBar
              currentLevel={currentLevel}
              currentLevelName={currentLevelName}
              currentXP={currentXP}
              requiredXP={requiredXP}
              nextLevel={nextLevel}
              nextLevelName={nextLevelName}
              nextLevelReward={nextLevelReward}
              todayXP={todaysBoost?.xpEarned || 215}
              onViewRewards={() => setActiveScreen('levelup')}
            />

            {/* 3. Custom Metallic Chrono Progression Rail */}
            <ChronoXpRail
              currentLevel={currentLevel}
              currentXP={currentXP}
              requiredXP={requiredXP}
              nextLevel={nextLevel}
              progressPct={progressPct}
            />

            {/* 4. The Master Collection: 12 Bespoke 3D Metallic Emblems Gallery */}
            <EmblemsGallery
              currentLevel={currentLevel}
              currentXP={currentXP}
            />

            {/* 5. Live Chrono Arcade XP Challenge Banner */}
            <LuxuryArcadeBanner
              onLaunchGame={() => setActiveScreen('game')}
              onViewRewards={() => setActiveScreen('levelup')}
            />

            {/* 6. Precision Earning Hub & Session Activity Feed */}
            <div className={styles.bottomSection}>
              <div className={styles.bottomLeftCol}>
                <EarnMoreGrid
                  currentLevel={currentLevel}
                  nextLevel={nextLevel}
                  nextLevelName={nextLevelName}
                  nextLevelReward={nextLevelReward}
                  onLaunchGame={() => setActiveScreen('game')}
                  onViewRewards={() => setActiveScreen('levelup')}
                  onClaimFeature={handleClaimFeature}
                />
              </div>

              <div className={styles.bottomRightCol}>
                <XPActivity
                  activities={activities}
                  todayXP={todaysBoost?.xpEarned || 215}
                  todayVE={0}
                  onViewAll={() => setActiveScreen('activity')}
                  onStartEarning={() => setActiveScreen('earn')}
                />
              </div>
            </div>

          </main>
        )}

        {/* Mobile Persistent Navigation */}
        <BottomNav
          activeTab={activeNavTab}
          onSelectTab={handleNavigation}
        />
      </div>

      {/* Real-time Level Up Celebration Modal */}
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
