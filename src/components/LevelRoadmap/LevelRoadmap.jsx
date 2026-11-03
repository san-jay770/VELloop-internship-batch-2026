import React from 'react';
import { Check, Lock } from 'lucide-react';
import { LevelBadge } from '../LevelHero/LevelBadge';
import styles from './LevelRoadmap.module.css';

export function LevelRoadmap({ levels = [], currentLevel = 5 }) {
  return (
    <section className={styles.roadmapContainer} aria-label="Level Progression Roadmap">
      <div className={styles.roadmapHeader}>
        <h2 className={styles.roadmapTitle}>LEVEL ROADMAP</h2>
      </div>

      <div className={styles.trackScroll}>
        {levels.map(item => {
          const isCompleted = item.level < currentLevel;
          const isCurrent = item.level === currentLevel;
          const isLocked = item.level > currentLevel;

          let statusClass = styles.nodeLocked;
          if (isCurrent) statusClass = styles.nodeCurrent;

          return (
            <div 
              key={item.level} 
              className={`${styles.nodeCard} ${statusClass}`}
              title={`Level ${item.level}: ${item.name}`}
            >
              <LevelBadge level={item.level} size={50} />

              <span style={{ fontSize: '13px', fontWeight: '700', marginTop: '6px', color: '#ffffff' }}>
                Lvl {String(item.level).padStart(2, '0')}
              </span>
              <span style={{ fontSize: '11px', color: '#9ca3af' }}>{item.name}</span>

              {/* Status Tag */}
              {isCompleted && (
                <div className={`${styles.statusTag} ${styles.tagCompleted}`}>
                  <Check size={10} style={{ display: 'inline', marginRight: '3px' }} />
                  Completed
                </div>
              )}

              {isCurrent && (
                <div className={`${styles.statusTag} ${styles.tagCurrent}`}>
                  You Are Here
                </div>
              )}

              {isLocked && (
                <div className={`${styles.statusTag} ${styles.tagLocked}`}>
                  <Lock size={10} style={{ display: 'inline', marginRight: '3px' }} />
                  Locked
                </div>
              )}

              {/* Reward info */}
              {item.reward && (
                <div className={styles.rewardInfo}>
                  <span>🎁</span>
                  <span>{item.reward.amount} {item.reward.type}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

