
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopNav } from '../../components/Navigation/TopNav';
import { BottomNav } from '../../components/Navigation/BottomNav';
import { LevelHero } from '../../components/LevelHero/LevelHero';
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <Skeleton height="90px" radius="16px" />
            <Skeleton height="90px" radius="16px" />
            <Skeleton height="90px" radius="16px" />
          </div>
          <Skeleton height="140px" radius="20px" />
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
  const nextLevelReward = nextLevelData?.reward;

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
          currentLevel={currentLevel}
          currentXP={currentXP}
          requiredXP={requiredXP}
          onPlayAgain={() => setActiveScreen('game')}
          onBackToDashboard={() => setActiveScreen('dashboard')}
        />
      )}

      {/* Screen 4: Earn & Level Up */}
      {activeScreen === 'earn' && (
        <EarnAndLevelUpModal
          onClose={() => setActiveScreen('dashboard')}
          onLaunchGame={() => setActiveScreen('game')}
          onClaimFeature={handleClaimFeature}
        />
      )}

      {/* Screen 5: Level Up! Celebration */}
      {activeScreen === 'levelup' && (
        <LevelUpModal
          level={nextLevel}
          levelName={nextLevelData?.name}
          reward={nextLevelReward}
          isRewardPreview
          onClose={() => setActiveScreen('dashboard')}
        />
      )}

      {/* Screen 6: Recent Activity */}
      {activeScreen === 'activity' && (
        <div style={{ padding: '0 0 60px 0', minHeight: '85vh' }}>
          <TopNav
            onNavigate={handleNavigation}
            activities={activities}
          />
          <XPActivity
            activities={activities}
            todayXP={todaysBoost.xpEarned}
            todayVE={35}
            showAll
            onStartEarning={() => navigate('/Lvl-Dashboard')}
          />
          <BottomNav
            activeTab={activeNavTab}
            onSelectTab={handleNavigation}
          />
        </div>
      )}

      {/* Screen 1: Main Dashboard (Default) */}
      {activeScreen === 'dashboard' && (
        <>
          <TopNav
            onNavigate={handleNavigation}
            activities={activities}
          />

          <main className={styles.mainContainer}>
            <div className={styles.leftCol}>
              <LevelHero
                currentLevel={currentLevel}
                currentXP={currentXP}
                nextLevel={nextLevel}
                requiredXP={requiredXP}
                xpToNext={xpToNext}
                progressPct={progressPct}
              />

              <TodaysBoost
                xpEarned={todaysBoost.xpEarned}
                tasksDone={todaysBoost.tasksDone}
                streakDays={todaysBoost.streakDays}
              />

              <LevelRoadmap
                levels={levels}
                currentLevel={currentLevel}
              />
            </div>

            <div className={styles.rightCol}>
              <EarnMoreGrid
                currentLevel={currentLevel}
                nextLevel={nextLevel}
                nextLevelName={nextLevelData?.name}
                nextLevelReward={nextLevelReward}
                onLaunchGame={() => setActiveScreen('game')}
                onViewRewards={() => setActiveScreen('levelup')}
                onClaimFeature={handleClaimFeature}
              />

              <XPActivity
                activities={activities}
                todayXP={todaysBoost.xpEarned}
                todayVE={35}
                onViewAll={() => navigate('/Lvl-Dashboard/activity')}
                onStartEarning={() => setActiveScreen('earn')}
              />
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
