import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLevelData } from '../../hooks/useLevelData';
import {
  UserRound,
  ArrowLeft,
  Mail,
  ShieldCheck,
  Info,
  Camera,
  Edit3,
  Award,
  Zap,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { Sidebar } from '../../components/Navigation/Sidebar';
import { TopHeader } from '../../components/Navigation/TopHeader';
import { BlackLabelEmblem } from '../../components/Common/BlackLabelEmblem';
import { LevelBadge } from '../../components/LevelHero/LevelBadge';
import styles from './ProfilePage.module.css';

const MAX_PHOTO_SIZE = 5 * 1024 * 1024;
const ALLOWED_PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export function ProfilePage() {
  const navigate = useNavigate();
  const { profile, isLoading } = useLevelData();
  const photoInputRef = useRef(null);
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoError, setPhotoError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [saveMessage, setSaveMessage] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    return () => {
      if (photoUrl) {
        URL.revokeObjectURL(photoUrl);
      }
    };
  }, [photoUrl]);

  const handlePhotoSelect = (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) return;

    if (!ALLOWED_PHOTO_TYPES.includes(file.type)) {
      setPhotoError('Choose a JPG, PNG, WebP, or GIF image.');
      return;
    }

    if (file.size > MAX_PHOTO_SIZE) {
      setPhotoError('The photo must be 5 MB or smaller.');
      return;
    }

    setPhotoError('');
    setPhotoUrl(URL.createObjectURL(file));
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    setFullName(prev => prev || profile?.name || 'Operative Agent');
    setEmail(prev => prev || profile?.email || 'agent@veloop.network');
    setFieldErrors({});
    setSaveMessage('');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFullName('');
    setEmail('');
    setFieldErrors({});
    setSaveMessage('');
  };

  const handleSaveChanges = (event) => {
    event.preventDefault();

    const errors = {};
    if (!fullName.trim()) {
      errors.fullName = 'Enter your operative name.';
    }
    if (!email.trim()) {
      errors.email = 'Enter your neural comms email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Enter a valid email address.';
    }

    setSaveMessage('');

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setSaveMessage(
      'Operative dossier cache updated. Backend database synchronization pending.'
    );
  };

  const currentLevelNum = profile?.currentLevel || 5;
  const currentLevelName = profile?.currentLevelName || 'Ascendant';
  const currentXP = profile?.currentXP || 6420;
  const progressPct = profile?.progressPct || 80;

  return (
    <div className={styles.profileDashboard}>
      {/* 1. Global AAA Gaming Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(prev => !prev)}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
        activeNav="profile"
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
                  <UserRound size={13} />
                  <span>OPERATIVE CLASSIFIED DOSSIER</span>
                </div>
                <h1 className={styles.title}>Operative Profile & Credentials</h1>
              </div>
            </div>

            <div className={styles.clearanceBadge}>
              <span className={styles.pulseDotViolet} />
              <span>CLEARANCE: LEVEL {currentLevelNum} OPERATIVE</span>
            </div>
          </header>

          {/* Dossier Grid */}
          <div className={styles.dossierGrid}>
            {/* Operative Identity Card */}
            <div className={styles.operativeCard}>
              <div className={styles.avatarContainer}>
                <div className={styles.avatar}>
                  {photoUrl ? (
                    <img src={photoUrl} alt="Selected profile preview" />
                  ) : (
                    <UserRound size={48} />
                  )}
                </div>
                <div className={styles.avatarBadge} title="Active Operative Status">
                  <CheckCircle2 size={16} />
                </div>
              </div>

              <div className={styles.photoActions}>
                <input
                  ref={photoInputRef}
                  className={styles.fileInput}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handlePhotoSelect}
                  aria-label="Choose a profile photo"
                />
                <button
                  className={styles.uploadBtn}
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                >
                  <Camera size={14} />
                  {photoUrl ? 'Change Avatar' : 'Upload Avatar'}
                </button>
                {photoUrl && (
                  <button
                    className={styles.removePhotoBtn}
                    type="button"
                    onClick={() => {
                      setPhotoUrl('');
                      setPhotoError('');
                    }}
                  >
                    Reset
                  </button>
                )}
              </div>
              {photoError && (
                <p className={styles.fieldError} role="alert">
                  {photoError}
                </p>
              )}

              {/* 3D Black Label Rank Emblem Showcase */}
              <div style={{ margin: '14px 0 8px 0' }}>
                <BlackLabelEmblem level={currentLevelNum} size="lg" showPedestal={true} />
              </div>

              <h2 className={styles.operativeTitle}>
                {isLoading ? 'Decrypting...' : `Level ${String(currentLevelNum).padStart(2, '0')} · ${currentLevelName}`}
              </h2>
              <p className={styles.operativeSubtitle}>
                VELOOP BLACK LABEL • EXECUTIVE OPERATIVE
              </p>

              {/* XP Progress Indicator */}
              <div className={styles.dossierProgressTrack}>
                <div
                  className={styles.dossierProgressFill}
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              <div className={styles.dossierMetaRow}>
                <span>{currentXP.toLocaleString()} Mastery XP</span>
                <span style={{ color: '#C8A96B' }}>{progressPct}% to Next Rank</span>
              </div>

              <div className={styles.dossierStatusPill}>
                <ShieldCheck size={14} />
                <span>BLACK LABEL VERIFIED • ACTIVE</span>
              </div>
            </div>

            {/* Information Column */}
            <div className={styles.infoColumn}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Operative Dossier Data</h3>
                {!isEditing && (
                  <button
                    className={styles.editTriggerBtn}
                    type="button"
                    onClick={handleEditProfile}
                  >
                    <Edit3 size={14} />
                    <span>Edit Dossier</span>
                  </button>
                )}
              </div>

              <div className={styles.infoCardsGrid}>
                <div className={styles.hudDataCard}>
                  <div
                    className={styles.hudIconBox}
                    style={{ background: 'rgba(197, 166, 106, 0.12)', color: '#C5A66A', border: '1px solid rgba(197, 166, 106, 0.25)' }}
                  >
                    <UserRound size={22} />
                  </div>
                  <div className={styles.hudMeta}>
                    <span className={styles.hudFieldLabel}>Codename / Full Name</span>
                    <strong className={styles.hudFieldValue}>{fullName || 'Operative Agent'}</strong>
                  </div>
                </div>

                <div className={styles.hudDataCard}>
                  <div
                    className={styles.hudIconBox}
                    style={{ background: 'rgba(232, 228, 218, 0.12)', color: '#E8E4DA', border: '1px solid rgba(232, 228, 218, 0.25)' }}
                  >
                    <Mail size={22} />
                  </div>
                  <div className={styles.hudMeta}>
                    <span className={styles.hudFieldLabel}>Neural Comms Email</span>
                    <strong className={styles.hudFieldValue}>{email || 'agent@veloop.network'}</strong>
                  </div>
                </div>

                <div className={styles.hudDataCard}>
                  <div
                    className={styles.hudIconBox}
                    style={{ background: 'rgba(216, 180, 90, 0.12)', border: '1px solid rgba(216, 180, 90, 0.3)' }}
                  >
                    <LevelBadge
                      level={currentLevelNum}
                      size={28}
                      showGlow={false}
                      animated={false}
                    />
                  </div>
                  <div className={styles.hudMeta}>
                    <span className={styles.hudFieldLabel}>Prestige Standing</span>
                    <strong className={styles.hudFieldValue}>Rank #{profile?.rank || 42} Worldwide</strong>
                  </div>
                </div>

                <div className={styles.hudDataCard}>
                  <div
                    className={styles.hudIconBox}
                    style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.25)' }}
                  >
                    <Lock size={22} />
                  </div>
                  <div className={styles.hudMeta}>
                    <span className={styles.hudFieldLabel}>Security Encryption</span>
                    <strong className={styles.hudFieldValue}>256-Bit Quantum Guard</strong>
                  </div>
                </div>
              </div>

              {/* Interactive Edit Form */}
              {isEditing && (
                <form className={styles.editForm} onSubmit={handleSaveChanges} noValidate>
                  <div className={styles.formField}>
                    <label className={styles.formLabel} htmlFor="profile-full-name">
                      Operative Full Name
                    </label>
                    <input
                      id="profile-full-name"
                      name="fullName"
                      type="text"
                      className={styles.formInput}
                      placeholder="e.g. Commander Alex Vance"
                      value={fullName}
                      onChange={(event) => {
                        setFullName(event.target.value);
                        setFieldErrors((current) => ({ ...current, fullName: '' }));
                        setSaveMessage('');
                      }}
                    />
                    {fieldErrors.fullName && (
                      <span className={styles.fieldError} role="alert">
                        {fieldErrors.fullName}
                      </span>
                    )}
                  </div>

                  <div className={styles.formField}>
                    <label className={styles.formLabel} htmlFor="profile-email">
                      Comms Email Address
                    </label>
                    <input
                      id="profile-email"
                      name="email"
                      type="email"
                      className={styles.formInput}
                      placeholder="e.g. commander@veloop.network"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        setFieldErrors((current) => ({ ...current, email: '' }));
                        setSaveMessage('');
                      }}
                    />
                    {fieldErrors.email && (
                      <span className={styles.fieldError} role="alert">
                        {fieldErrors.email}
                      </span>
                    )}
                  </div>

                  <div className={styles.formActions}>
                    <button className={styles.primarySaveBtn} type="submit">
                      Save Dossier
                    </button>
                    <button
                      className={styles.secondaryCancelBtn}
                      type="button"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </div>

                  {saveMessage && (
                    <div className={styles.saveMessageAlert} role="status">
                      {saveMessage}
                    </div>
                  )}
                </form>
              )}

              {/* Explanatory Protocol Note */}
              <div className={styles.infoCallout}>
                <Info size={20} />
                <p>
                  <strong>Dossier Synchronizer:</strong> Live combat rank, level achievements, and XP statistics are continuously verified by the VELOOP backend engine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
