import React from 'react';
import styles from './Common.module.css';

export function Skeleton({ width = '100%', height = '20px', radius = '8px', style = {} }) {
  return (
    <div 
      className={styles.skeleton}
      style={{
        width,
        height,
        borderRadius: radius,
        ...style
      }}
      aria-hidden="true"
    />
  );
}

export function ErrorState({ message = "Unable to Load Level Progress", onRetry }) {
  return (
    <div className={styles.errorContainer} role="alert">
      <div style={{ color: '#ef4444', fontSize: '32px' }}>⚠️</div>
      <h3 className={styles.errorTitle}>{message}</h3>
      <p className={styles.errorDesc}>We couldn't load your level information right now.</p>
      {onRetry && (
        <button className={styles.retryBtn} onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

export function EmptyState({ message = "Your XP journey starts here.", onCta, ctaText = "Start Earning XP →" }) {
  return (
    <div className={styles.emptyContainer}>
      <p className={styles.emptyText}>{message}</p>
      {onCta && (
        <button className={styles.emptyCta} onClick={onCta}>
          {ctaText}
        </button>
      )}
    </div>
  );
}

