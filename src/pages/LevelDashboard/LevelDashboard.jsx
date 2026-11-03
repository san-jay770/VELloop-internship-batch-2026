import React, { useState } from 'react';
import { TopNav } from '../../components/Navigation/TopNav';
import { BottomNav } from '../../components/Navigation/BottomNav';
import { LevelHero } from '../../components/LevelHero/LevelHero';
import { TodaysBoost } from '../../components/TodaysBoost/TodaysBoost';
import { EarnMoreGrid } from '../../components/EarnMoreXP/EarnMoreGrid';
import { LevelRoadmap } from '../../components/LevelRoadmap/LevelRoadmap';
import { XPActivity } from '../../components/XPActivity/XPActivity';
import { XpCatcherGame } from '../../components/PlayAndEarn/XpCatcherGame';
import { LevelUpModal } from '../../components/LevelUpModal/LevelUpModal';
import { Skeleton, ErrorState } from '../../components/Common/CommonComponents';
import { useLevelData } from '../../hooks/useLevelData';
import styles from './LevelDashboard.module.css';

export function LevelDashboard() {
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
  const [showGame, setShowGame] = useState(false);
  const [showRewardsModal, setShowRewardsModal] = useState(false);

  // If loading
  if (isLoading) {
    return (
      <div className={styles.dashboardPage}>
        <TopNav />
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
        <BottomNav activeTab={activeNavTab} onSelectTab={setActiveNavTab} />
      </div>
    );
  }

  // If error
  if (isError && !profile) {
    return (
      <div className={styles.dashboardPage}>
        <TopNav />
        <ErrorState message="Unable to Load Level Progress" onRetry={refetch} />
        <BottomNav activeTab={activeNavTab} onSelectTab={setActiveNavTab} />
      </div>
    );
  }

  const currentLevel = profile?.currentLevel || 5;
  const currentLevelName = profile?.currentLevelName || "Ascendant";
  const currentXP = profile?.currentXP || 6420;
  const nextLevel = profile?.nextLevel || 6;
  const requiredXP = profile?.requiredXP || 8000;
  const progressPct = profile?.progressPct || 80;

  return (
    <div className={styles.dashboardPage}>
      {/* Top Navigation */}
      <TopNav 
        onOpenMenu={() => {}}
        onOpenNotifications={() => {}}
      />

      {/* Main Container */}
      <main className={styles.mainContainer}>
        {/* Left column on desktop / full on mobile */}
        <div className={styles.leftCol}>
          {/* Main Level Hero */}
          <LevelHero 
            currentLevel={currentLevel}
            currentXP={currentXP}
            nextLevel={nextLevel}
            requiredXP={requiredXP}
            progressPct={progressPct}
          />

          {/* Today's Boost */}
          <TodaysBoost 
            xpEarned={todaysBoost.xpEarned}
            tasksDone={todaysBoost.tasksDone}
            streakDays={todaysBoost.streakDays}
          />

          {/* Level Progression Roadmap */}
          <LevelRoadmap 
            levels={levels}
            currentLevel={currentLevel}
          />
        </div>

        {/* Right column on desktop / sequential on mobile */}
        <div className={styles.rightCol}>
          {/* Earn More Activity Grid & Rewards Chest Card */}
          <EarnMoreGrid 
            currentLevel={currentLevel}
            onLaunchGame={() => setShowGame(true)}
            onViewRewards={() => setShowRewardsModal(true)}
            onClaimFeature={handleClaimFeature}
          />

          {/* Recent Activity & Today's Summary */}
          <XPActivity 
            activities={activities}
            todayXP={todaysBoost.xpEarned}
            todayVE={35}
          />
        </div>
      </main>

      {/* Persistent Bottom Navigation */}
      <BottomNav 
        activeTab={activeNavTab} 
        onSelectTab={setActiveNavTab} 
      />

      {/* XP Catcher Mini-Game Modal */}
      {showGame && (
        <XpCatcherGame 
          onClose={() => setShowGame(false)}
          currentLevel={currentLevel}
          currentXP={currentXP}
          requiredXP={requiredXP}
          onGameFinished={(score) => {
            handleGameCompleted(score);
          }}
        />
      )}

      {/* Level-Up Celebration Modal (Triggered when level threshold crossed or view rewards clicked) */}
      {(levelUpData || showRewardsModal) && (
        <LevelUpModal 
          level={levelUpData?.toLevel || currentLevel}
          levelName={levelUpData?.name || currentLevelName}
          veReward={levelUpData?.reward?.amount || 500}
          gemReward={25}
          onClaim={() => {
            dismissLevelUp();
            setShowRewardsModal(false);
          }}
        />
      )}
    </div>
  );
}
