import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wallet,
  ArrowLeft,
  Clock3,
  Info,
  ShieldCheck,
  ArrowUpRight,
  RefreshCw,
  Coins,
  Zap,
  Gamepad2,
  Copy,
  CheckCircle2
} from 'lucide-react';
import { Sidebar } from '../../components/Navigation/Sidebar';
import { TopHeader } from '../../components/Navigation/TopHeader';
import { useLevelData } from '../../hooks/useLevelData';
import styles from './WalletPage.module.css';

export function WalletPage() {
  const navigate = useNavigate();
  const { profile, todaysBoost } = useLevelData();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeLedgerFilter, setActiveLedgerFilter] = useState('all');
  const [copied, setCopied] = useState(false);
  const [actionAlert, setActionAlert] = useState('');

  const vaultAddress = 'VEL-0x8F91...9B72';
  const currentXP = profile?.currentXP || 1420;
  const veTokensBalance = 350; // Current verified VE rewards balance
  const arcadeTokensCount = 12;

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText?.('VEL-0x8F9142A7C38B1E9B72');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTriggerAction = (actionName) => {
    setActionAlert(`${actionName} protocol initialized. Processing through multi-sig smart contract.`);
    setTimeout(() => setActionAlert(''), 4000);
  };

  return (
    <div className={styles.walletDashboard}>
      {/* 1. Global AAA Gaming Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(prev => !prev)}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
        activeNav="wallet"
      />

      {/* 2. Main Content Wrapper */}
      <div className={styles.mainWrapper}>
        <TopHeader
          onMenuToggle={() => setMobileSidebarOpen(prev => !prev)}
          onNotificationClick={() => {}}
          onLaunchGame={() => navigate('/Lvl-Dashboard')}
        />

        <div className={styles.contentContainer}>
          {/* Tactical Header */}
          <header className={styles.pageHeader}>
            <div className={styles.headerLeft}>
              <button
                className={styles.backBtn}
                onClick={() => navigate('/Lvl-Dashboard')}
                aria-label="Back to Command Center"
                title="Return to Level Dashboard"
              >
                <ArrowLeft size={20} />
              </button>
              <div className={styles.titleArea}>
                <div className={styles.badgeTag}>
                  <Wallet size={13} />
                  <span>VELOOP BLACK LABEL • ASSET PROTOCOL</span>
                </div>
                <h1 className={styles.title}>Black Label Sovereign Vault</h1>
              </div>
            </div>

            <div className={styles.vaultSecurityBadge}>
              <span className={styles.pulseDotCyan} />
              <span>MULTI-SIG ARMOR · ONLINE</span>
            </div>
          </header>

          {/* Action Notification Alert */}
          {actionAlert && (
            <div style={{
              background: 'rgba(197, 166, 106, 0.12)',
              border: '1px solid #C5A66A',
              borderRadius: '12px',
              padding: '12px 20px',
              marginBottom: '24px',
              color: '#C5A66A',
              fontFamily: 'var(--font-tech)',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <CheckCircle2 size={18} />
              <span>{actionAlert}</span>
            </div>
          )}

          {/* Vault Hero Grid */}
          <div className={styles.vaultHeroGrid}>
            {/* Primary Armored Card */}
            <div className={styles.armoredVaultCard}>
              <div className={styles.cardHeaderRow}>
                <div className={styles.vaultIdSnippet}>
                  <span>ID: {vaultAddress}</span>
                  <button
                    onClick={handleCopyAddress}
                    className={styles.copyBtn}
                    aria-label="Copy Vault Address"
                    title="Copy full Vault ID"
                  >
                    {copied ? <CheckCircle2 size={14} color="#4DBB87" /> : <Copy size={14} />}
                  </button>
                </div>
                <ShieldCheck size={24} color="#C5A66A" />
              </div>

              <p className={styles.balanceLabel}>Verified Available Vault Balance</p>

              <div className={styles.balanceValueRow}>
                <span className={styles.mainBalanceNumber}>{veTokensBalance.toLocaleString()}</span>
                <span className={styles.tokenTicker}>VE TOKENS</span>
              </div>

              <p className={styles.balanceStatusNote}>
                Tokens are backed by VELOOP Level Reward reserves and redeemable for hardware, gaming passes, and fiat payouts.
              </p>

              <div className={styles.vaultActionsGroup}>
                <button
                  className={styles.actionBtnPrimary}
                  onClick={() => handleTriggerAction('Withdrawal')}
                >
                  <ArrowUpRight size={16} />
                  <span>Withdraw Assets</span>
                </button>
                <button
                  className={styles.actionBtnSecondary}
                  onClick={() => handleTriggerAction('XP Conversion')}
                >
                  <RefreshCw size={15} />
                  <span>Convert XP</span>
                </button>
              </div>
            </div>

            {/* Asset Breakdown Column */}
            <div className={styles.breakdownColumn}>
              <div className={styles.miniAssetCard}>
                <div className={styles.miniLeft}>
                  <div
                    className={styles.miniIcon}
                    style={{ background: 'rgba(197, 166, 106, 0.12)', border: '1px solid rgba(197, 166, 106, 0.25)' }}
                  >
                    <img
                      src="/assets/premium/png/how_it_works_earn_rewards@4x.png"
                      alt="XP Stored"
                      style={{ width: '26px', height: '26px', objectFit: 'contain' }}
                    />
                  </div>
                  <div className={styles.miniDetails}>
                    <span className={styles.miniTitle}>Total XP Stored</span>
                    <span className={styles.miniSub}>Level Progression Fuel</span>
                  </div>
                </div>
                <span className={styles.miniValue}>{currentXP.toLocaleString()} XP</span>
              </div>

              <div className={styles.miniAssetCard}>
                <div className={styles.miniLeft}>
                  <div
                    className={styles.miniIcon}
                    style={{ background: 'rgba(232, 228, 218, 0.12)', border: '1px solid rgba(232, 228, 218, 0.25)' }}
                  >
                    <img
                      src="/assets/premium/png/reward_gems@4x.png"
                      alt="Arcade Passes"
                      style={{ width: '26px', height: '26px', objectFit: 'contain' }}
                    />
                  </div>
                  <div className={styles.miniDetails}>
                    <span className={styles.miniTitle}>Arcade Passes</span>
                    <span className={styles.miniSub}>XP Catcher Mini-Game</span>
                  </div>
                </div>
                <span className={styles.miniValue} style={{ color: '#E8E4DA' }}>{arcadeTokensCount} Passes</span>
              </div>

              <div className={styles.miniAssetCard}>
                <div className={styles.miniLeft}>
                  <div
                    className={styles.miniIcon}
                    style={{ background: 'rgba(197, 166, 106, 0.12)', border: '1px solid rgba(197, 166, 106, 0.25)' }}
                  >
                    <img
                      src="/assets/premium/png/reward_legendary_badge@4x.png"
                      alt="Prestige Multiplier"
                      style={{ width: '26px', height: '26px', objectFit: 'contain' }}
                    />
                  </div>
                  <div className={styles.miniDetails}>
                    <span className={styles.miniTitle}>Prestige Multiplier</span>
                    <span className={styles.miniSub}>Tier Perk Active</span>
                  </div>
                </div>
                <span className={styles.miniValue} style={{ color: '#C5A66A' }}>1.25x</span>
              </div>
            </div>
          </div>

          {/* Ledger Telemetry Section */}
          <section className={styles.ledgerSection}>
            <div className={styles.sectionHeaderRow}>
              <div className={styles.sectionTitleBox}>
                <Clock3 size={20} color="#C5A66A" />
                <h2 className={styles.sectionTitle}>Ledger Telemetry History</h2>
              </div>

              <div className={styles.filterChips}>
                {['all', 'transfers', 'rewards', 'withdrawals'].map(f => (
                  <button
                    key={f}
                    onClick={() => setActiveLedgerFilter(f)}
                    className={`${styles.filterChip} ${activeLedgerFilter === f ? styles.active : ''}`}
                  >
                    {f.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.radarEmptyBox}>
              <div className={styles.radarIconCircle}>
                <Wallet size={28} />
              </div>
              <h3 className={styles.radarTitle}>No Pending Transmissions</h3>
              <p className={styles.radarDesc}>
                Your on-chain ledger records will display here as reward disbursements, conversions, and withdrawals are completed.
              </p>
            </div>
          </section>

          {/* Explanatory Protocol Note */}
          <div className={styles.infoCallout}>
            <Info size={20} />
            <p>
              <strong>Security Protocol Notice:</strong> Level XP progression is stored on the operative gamification server, whereas VE tokens represent spendable cryptographic utility assets redeemable in the VELOOP Store.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletPage;
