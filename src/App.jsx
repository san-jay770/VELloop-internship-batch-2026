
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { LevelDashboard } from './pages/LevelDashboard/LevelDashboard';
import { ActivityPage } from './pages/ActivityPage/ActivityPage';
import { WalletPage } from './pages/WalletPage/WalletPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Lvl-Dashboard" replace />} />

      <Route path="/Lvl-Dashboard" element={<LevelDashboard />} />
      <Route path="/Lvl-Dashboard/activity" element={<ActivityPage />} />
      <Route path="/Lvl-Dashboard/wallet" element={<WalletPage />} />
      <Route path="/Lvl-Dashboard/profile" element={<ProfilePage />} />

      <Route path="*" element={<Navigate to="/Lvl-Dashboard" replace />} />
    </Routes>
  );
}

export default App;
