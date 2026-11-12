
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLevelData } from '../../hooks/useLevelData';
import {
  UserRound,
  ArrowLeft,
  Mail,
  ShieldCheck,
  Info
} from 'lucide-react';
import { BottomNav } from '../../components/Navigation/BottomNav';
import styles from './ProfilePage.module.css';

export function ProfilePage() {
  const navigate = useNavigate();
  const { profile, isLoading } = useLevelData();

  const handleTabSelect = (tab) => {
    if (tab === 'home' || tab === 'rewards' || tab === 'earn') {
      navigate('/Lvl-Dashboard');
    } else if (tab === 'wallet') {
      navigate('/Lvl-Dashboard/wallet');
    } else if (tab === 'profile') {
      navigate('/Lvl-Dashboard/profile');
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button
          className={styles.backButton}
          onClick={() => navigate('/Lvl-Dashboard')}
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <p className={styles.eyebrow}>VELOOP REWARDS</p>
          <h1>My Profile</h1>
        </div>

        <UserRound className={styles.headerIcon} size={25} />
      </header>

      <main className={styles.content}>
        <section className={styles.profileCard}>
          <div className={styles.avatar}>
            <UserRound size={38} />
          </div>

          <h2>
            {isLoading
              ? 'Loading profile...'
              : profile
                ? `Level ${profile.currentLevel} - ${profile.currentLevelName}`
                : 'Profile information unavailable'}
          </h2>

          <p>
            {isLoading
              ? 'Please wait while your profile loads.'
              : profile
                ? `${profile.currentXP} XP earned · ${profile.progressPct}% progress`
                : 'Profile information could not be loaded.'}
          </p>
        </section>

        <section className={styles.section}>
          <h2>Account Information</h2>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <UserRound size={19} />
            </div>
            <div>
              <span>Full Name</span>
              <strong>Not provided by backend</strong>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <Mail size={19} />
            </div>
            <div>
              <span>Email Address</span>
              <strong>Not provided by backend</strong>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <ShieldCheck size={19} />
            </div>
            <div>
              <span>Account Status</span>
              <strong>Not verified by backend</strong>
            </div>
          </div>
        </section>

        <div className={styles.infoNote}>
          <Info size={18} />
          <p>
            Your level and XP details are loaded from the connected
            profile API. Personal account details are not currently
            available from the backend.
          </p>
        </div>
      </main>

      <BottomNav
        activeTab="profile"
        onSelectTab={handleTabSelect}
      />
    </div>
  );
}

export default ProfilePage;
