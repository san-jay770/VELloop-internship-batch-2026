import React from 'react';
import styles from './PhoneMockup.module.css';

export function PhoneMockup({ children, className = '', style = {} }) {
  return (
    <div className={`${styles.phoneFrame} ${className}`} style={style}>
      {/* Top Dynamic Island Notch */}
      <div className={styles.dynamicIsland}>
        <div className={styles.cameraLens} />
      </div>

      {/* Screen viewport */}
      <div className={styles.screenViewport}>
        {children}
      </div>
    </div>
  );
}
