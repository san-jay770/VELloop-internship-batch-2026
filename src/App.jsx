
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { LandingPage } from './pages/LandingPage/LandingPage';
import { LevelDashboard } from './pages/LevelDashboard/LevelDashboard';
import { ActivityPage } from './pages/ActivityPage/ActivityPage';
import { WalletPage } from './pages/WalletPage/WalletPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';

export function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* VELOOP Task 16 Dashboard Routes */}
      <Route path="/Lvl-Dashboard" element={<LevelDashboard />} />
      <Route path="/lvl-dashboard" element={<Navigate to="/Lvl-Dashboard" replace />} />
      <Route path="/dashboard" element={<Navigate to="/Lvl-Dashboard" replace />} />
      <Route path="/level-dashboard" element={<Navigate to="/Lvl-Dashboard" replace />} />
      <Route path="/Lvl-Dashboard/activity" element={<ActivityPage />} />
      <Route path="/Lvl-Dashboard/wallet" element={<WalletPage />} />
      <Route path="/Lvl-Dashboard/profile" element={<ProfilePage />} />

      {/* Catch-all Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
