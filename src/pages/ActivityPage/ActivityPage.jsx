import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Activity,
  Zap,
  Coins,
  ShieldCheck,
  Flame,
  Gamepad2
} from 'lucide-react';
import { Sidebar } from '../../components/Navigation/Sidebar';
import { TopHeader } from '../../components/Navigation/TopHeader';
import { XPActivity } from '../../components/XPActivity/XPActivity';
import { useLevelData } from '../../hooks/useLevelData';
import styles from './ActivityPage.module.css';

export function ActivityPage() {
  const navigate = useNavigate();
  const { activities, todaysBoost, profile } = useLevelData();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Derive telemetry metrics
  const todayXP = todaysBoost?.xpEarned || 215;
  const todayVE = 35;
  const completedMissionsCount = activities.filter(a => a.type === 'daily_tasks').length || 4;

  return (
    <div className={styles.activityDashboard}>
      {/* 1. Global AAA Gaming Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(prev => !prev)}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
        activeNav="activity"
      />

      {/* 2. Main Content Wrapper */}
      <div className={styles.mainWrapper}>
        <TopHeader
          onMenuToggle={() => setMobileSidebarOpen(prev => !prev)}
          onNotificationClick={() => {}}
          onLaunchGame={() => navigate('/Lvl-Dashboard')}
        />

        <div className={styles.contentContainer}>
          {/* Page Tactical Header */}
          <header className={styles.pageHeader}>
            <div className={styles.headerLeft}>
              <button
                onClick={() => navigate('/Lvl-Dashboard')}
                className={styles.backBtn}
                aria-label="Back to Command Center"
                title="Return to Level Dashboard"
              >
                <ArrowLeft size={20} />
              </button>
              <div className={styles.titleArea}>
                <div className={styles.badgeTag}>
                  <Activity size={13} />
                  <span>VELOOP BLACK LABEL • TELEMETRY</span>
                </div>
                <h1 className={styles.title}>Black Label Activity & Reward Ledger</h1>
              </div>
            </div>

            <div className={styles.headerRight}>
              <div className={styles.telemetryBeacon}>
                <span className={styles.pulseDot} />
                <span>LIVE FEED SYNCHRONIZED</span>
              </div>
            </div>
          </header>

          {/* Telemetry Metric HUD Cards */}
          <div className={styles.statsHudGrid}>
            <div className={styles.hudCard}>
              <div
                className={styles.hudIconBox}
                style={{ background: 'rgba(197, 166, 106, 0.12)', color: '#C5A66A', border: '1px solid rgba(197, 166, 106, 0.25)' }}
              >
                <Zap size={26} />
              </div>
              <div className={styles.hudMeta}>
                <span className={styles.hudLabel}>Today's Harvest</span>
                <span className={styles.hudValue}>+{todayXP} XP</span>
              </div>
            </div>

            <div className={styles.hudCard}>
              <div
                className={styles.hudIconBox}
                style={{ background: 'rgba(226, 200, 145, 0.12)', color: '#E2C891', border: '1px solid rgba(226, 200, 145, 0.25)' }}
              >
                <Coins size={26} />
              </div>
              <div className={styles.hudMeta}>
                <span className={styles.hudLabel}>VE Tokens Minted</span>
                <span className={styles.hudValue}>+{todayVE} VEs</span>
              </div>
            </div>

            <div className={styles.hudCard}>
              <div
                className={styles.hudIconBox}
                style={{ background: 'rgba(232, 228, 218, 0.12)', color: '#E8E4DA', border: '1px solid rgba(232, 228, 218, 0.25)' }}
              >
                <ShieldCheck size={26} />
              </div>
              <div className={styles.hudMeta}>
                <span className={styles.hudLabel}>Directives Executed</span>
                <span className={styles.hudValue}>{completedMissionsCount} Cleared</span>
              </div>
            </div>
          </div>

          {/* Full Activity Feed Frame */}
          <div className={styles.feedFrame}>
            <XPActivity
              activities={activities}
              todayXP={todayXP}
              todayVE={todayVE}
              showAll={true}
              onStartEarning={() => navigate('/Lvl-Dashboard')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityPage;
