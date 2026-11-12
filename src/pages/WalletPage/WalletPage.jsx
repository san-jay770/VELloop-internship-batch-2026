
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, ArrowLeft, Clock3, Info } from 'lucide-react';
import { BottomNav } from '../../components/Navigation/BottomNav';
import styles from './WalletPage.module.css';

export function WalletPage() {
  const navigate = useNavigate();

  const handleTabSelect = (tab) => {
    if (tab === 'home' || tab === 'rewards') {
      navigate('/Lvl-Dashboard');
    } else if (tab === 'wallet') {
      navigate('/Lvl-Dashboard/wallet');
    } else if (tab === 'profile') {
      navigate('/Lvl-Dashboard/profile');
    } else if (tab === 'earn') {
      navigate('/Lvl-Dashboard');
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
          <h1>My Wallet</h1>
        </div>
        <Wallet className={styles.headerIcon} size={25} />
      </header>

      <main className={styles.content}>
        <section className={styles.balanceCard}>
          <div className={styles.cardLabel}>
            <Wallet size={18} />
            <span>Available Balance</span>
          </div>

          <h2>Not available</h2>
          <p>
            Your live wallet balance is not currently provided by the
            connected backend.
          </p>

          <div className={styles.cardFooter}>
            <span>Wallet status</span>
            <span className={styles.status}>Awaiting backend data</span>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <h2>Transaction History</h2>
            <Clock3 size={19} />
          </div>

          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Wallet size={28} />
            </div>
            <h3>No wallet transactions available</h3>
            <p>
              Transaction history will appear here when the wallet
              transaction API is connected.
            </p>
          </div>
        </section>

        <div className={styles.infoNote}>
          <Info size={18} />
          <p>
            XP activity and VE wallet transactions are different.
            Dashboard XP records are not displayed as wallet transactions.
          </p>
        </div>
      </main>

      <BottomNav
        activeTab="wallet"
        onSelectTab={handleTabSelect}
      />
    </div>
  );
}

export default WalletPage;
