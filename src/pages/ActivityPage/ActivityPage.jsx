import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { XPActivity } from '../../components/XPActivity/XPActivity';
import { useLevelData } from '../../hooks/useLevelData';

export function ActivityPage() {
  const navigate = useNavigate();
  const { activities, todaysBoost } = useLevelData();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#161827',
      color: '#ffffff',
      padding: '20px',
      maxWidth: '540px',
      margin: '0 auto'
    }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
        <button 
          onClick={() => navigate('/Lvl-Dashboard')}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.06)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Back to Dashboard"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 style={{ fontSize: '18px', fontWeight: '800' }}>All XP Activity</h1>
      </header>

      <XPActivity 
        activities={activities}
        todayXP={todaysBoost.xpEarned}
        todayVE={35}
      />
    </div>
  );
}
