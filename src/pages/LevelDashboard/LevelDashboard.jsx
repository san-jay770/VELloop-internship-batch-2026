import React, { useState } from 'react';
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
  const [activeScreen, setActiveScreen] = useState('dashboard'); // 'dashboard' | 'game' | 'complete' | 'earn' | 'levelup' | 'activity'

  const screens = [
    { id: 'dashboard', label: '1: Dashboard' },
    { id: 'game', label: '2: XP Catcher' },
    { id: 'complete', label: '3: Challenge Complete' },
    { id: 'earn', label: '4: Earn & Level Up' },
    { id: 'levelup', label: '5: Level Up!' },
    { id: 'activity', label: '6: Recent Activity' }
  ];

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
      {/* Top Bar: Screen Switcher & Live Backend Indicator */}
      <div style={{
        background: '#0d0f17',
        borderBottom: '1px solid rgba(255, 215, 0, 0.25)',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
        overflowX: 'auto',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexShrink: 0 }}>
          {screens.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveScreen(s.id)}
              style={{
                padding: '4px 10px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: '700',
                whiteSpace: 'nowrap',
                background: activeScreen === s.id ? '#f5b041' : 'rgba(255, 255, 255, 0.08)',
                color: activeScreen === s.id ? '#12131f' : '#d1d5db',
                transition: 'all 0.2s ease'
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Live Backend Indicator */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '10px',
            fontWeight: '600',
            color: '#10b981',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            padding: '3px 8px',
            borderRadius: '999px',
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}
          title="Backend API Connected: https://veloop-5zm4.onrender.com"
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
          Backend Live
        </div>
      </div>

      {/* Screen 2: XP Catcher Mini-Game */}
      {activeScreen === 'game' && (
        <XpCatcherGame 
          onClose={() => setActiveScreen('dashboard')}
          currentLevel={currentLevel}
          currentXP={currentXP}
          requiredXP={requiredXP}
          onGameFinished={(score) => {
            handleGameCompleted(score);
          }}
        />
      )}

      {/* Screen 3: Challenge Complete */}
      {activeScreen === 'complete' && (
        <ChallengeComplete 
          score={92}
          earnedXP={30}
          earnedVEs={12}
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
          level={currentLevel}
          levelName={currentLevelName}
          veReward={500}
          gemReward={25}
          onClaim={() => setActiveScreen('dashboard')}
        />
      )}

      {/* Screen 6: Recent Activity */}
      {activeScreen === 'activity' && (
        <div style={{ padding: '20px 0', minHeight: '85vh' }}>
          <XPActivity 
            activities={activities}
            todayXP={todaysBoost.xpEarned}
            todayVE={35}
          />
        </div>
      )}

      {/* Screen 1: Main Dashboard (Default) */}
      {activeScreen === 'dashboard' && (
        <>
          <TopNav 
            onOpenMenu={() => {}}
            onOpenNotifications={() => {}}
          />

          <main className={styles.mainContainer}>
            <div className={styles.leftCol}>
              <LevelHero 
                currentLevel={currentLevel}
                currentXP={currentXP}
                nextLevel={nextLevel}
                requiredXP={requiredXP}
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
                onLaunchGame={() => setActiveScreen('game')}
                onViewRewards={() => setActiveScreen('levelup')}
                onClaimFeature={handleClaimFeature}
              />

              <XPActivity 
                activities={activities}
                todayXP={todaysBoost.xpEarned}
                todayVE={35}
              />
            </div>
          </main>

          <BottomNav 
            activeTab={activeNavTab} 
            onSelectTab={(tab) => {
              setActiveNavTab(tab);
              if (tab === 'earn') setActiveScreen('earn');
              if (tab === 'rewards') setActiveScreen('dashboard');
            }} 
          />
        </>
      )}

      {/* Real-time Level Up Modal if triggered from backend session */}
      {levelUpData && activeScreen !== 'levelup' && (
        <LevelUpModal 
          level={levelUpData?.toLevel || currentLevel}
          levelName={levelUpData?.name || currentLevelName}
          veReward={levelUpData?.reward?.amount || 500}
          gemReward={25}
          onClaim={dismissLevelUp}
        />
      )}
    </div>
  );
}
