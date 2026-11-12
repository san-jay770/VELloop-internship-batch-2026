
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLevelData } from '../../hooks/useLevelData';
import {
  UserRound,
  ArrowLeft,
  Mail,
  ShieldCheck,
  Info,
  Camera
} from 'lucide-react';
import { BottomNav } from '../../components/Navigation/BottomNav';
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
      errors.fullName = 'Enter your full name.';
    }
    if (!email.trim()) {
      errors.email = 'Enter your email address.';
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
      'Profile saving is not available yet. Your changes have not been permanently saved.'
    );
  };

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
            {photoUrl ? (
              <img src={photoUrl} alt="Selected profile photo preview" />
            ) : (
              <UserRound size={38} />
            )}
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
              className={styles.secondaryButton}
              type="button"
              onClick={() => photoInputRef.current?.click()}
            >
              <Camera size={16} />
              {photoUrl ? 'Change Photo' : 'Upload Photo'}
            </button>
            {photoUrl && (
              <button
                className={styles.textButton}
                type="button"
                onClick={() => {
                  setPhotoUrl('');
                  setPhotoError('');
                }}
              >
                Remove Photo
              </button>
            )}
          </div>
          {photoError && (
            <p className={styles.fieldError} role="alert">
              {photoError}
            </p>
          )}
          <p className={styles.photoNote}>Preview only. Photos are not uploaded or saved.</p>

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
          <div className={styles.sectionHeading}>
            <h2>Account Information</h2>
            {!isEditing && (
              <button
                className={styles.secondaryButton}
                type="button"
                onClick={handleEditProfile}
              >
                Edit Profile
              </button>
            )}
          </div>

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

          {isEditing && (
            <form className={styles.editForm} onSubmit={handleSaveChanges} noValidate>
              <h3>Edit Profile</h3>
              <div className={styles.formField}>
                <label htmlFor="profile-full-name">Full Name</label>
                <input
                  id="profile-full-name"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  onChange={(event) => {
                    setFullName(event.target.value);
                    setFieldErrors((current) => ({ ...current, fullName: '' }));
                    setSaveMessage('');
                  }}
                  aria-invalid={Boolean(fieldErrors.fullName)}
                  aria-describedby={fieldErrors.fullName ? 'profile-name-error' : undefined}
                />
                {fieldErrors.fullName && (
                  <span className={styles.fieldError} id="profile-name-error" role="alert">
                    {fieldErrors.fullName}
                  </span>
                )}
              </div>

              <div className={styles.formField}>
                <label htmlFor="profile-email">Email</label>
                <input
                  id="profile-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setFieldErrors((current) => ({ ...current, email: '' }));
                    setSaveMessage('');
                  }}
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? 'profile-email-error' : undefined}
                />
                {fieldErrors.email && (
                  <span className={styles.fieldError} id="profile-email-error" role="alert">
                    {fieldErrors.email}
                  </span>
                )}
              </div>

              <div className={styles.formActions}>
                <button className={styles.primaryButton} type="submit">
                  Save Changes
                </button>
                <button
                  className={styles.secondaryButton}
                  type="button"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
              {saveMessage && (
                <p className={styles.saveMessage} role="status">
                  {saveMessage}
                </p>
              )}
            </form>
          )}
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
