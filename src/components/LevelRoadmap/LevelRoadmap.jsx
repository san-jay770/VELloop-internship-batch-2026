import React, { useRef, useState, useEffect } from 'react';
import { 
  Check, 
  Lock, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Target, 
  Award, 
  Gift, 
  Info, 
  X,
  TrendingUp
} from 'lucide-react';
import { LevelBadge } from '../LevelHero/LevelBadge';
import { LEVEL_XP_REQUIREMENTS } from '../../data/initialData';
import styles from './LevelRoadmap.module.css';

const TIER_PERKS = {
  1: ["Standard daily XP earning limit", "Access to base arcade games", "Welcome bonus profile setup"],
  2: ["+100 VEs milestone reward", "Access to Daily Mission challenges", "Unlock custom avatar frames"],
  3: ["+10 Gems milestone reward", "+5% XP boost on arcade mini-games", "Special achievement showcase"],
  4: ["+250 VEs milestone reward", "Higher daily XP earning cap (500 XP/day)", "Unlock XP Catcher 2X multiplier"],
  5: ["+500 VEs milestone reward", "+25 Bonus Gems", "Higher daily XP limit (1,000 XP/day)", "Access to advanced weekly challenges", "Priority reward opportunities"],
  6: ["+2 Lucky Wheel Spins", "Exclusive Vanguard chat badge", "Unlocks specialized quest tracks", "+10% streak bonus multiplier"],
  7: ["+15 Gems milestone reward", "Access to Golden Safe vaults", "High-tier challenge access"],
  8: ["+750 VEs milestone reward", "Champion badge & profile banner", "+15% arcade XP reward rate"],
  9: ["+3 Lucky Wheel Spins", "Legendary safe vault cracking", "Early access to new arcade titles"],
  10: ["+1,000 VEs Mythic drop", "Permanent 1.5X XP boost", "Exclusive Mythic Hall of Fame title"]
};

export function LevelRoadmap({ 
  levels = [], 
  currentLevel = 5, 
  currentXP = 6420 
}) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [levels]);

  const scroll = (direction) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = direction === 'left' ? -320 : 320;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const scrollToCurrentLevel = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const currentCard = el.querySelector(`[data-level="${currentLevel}"]`);
    if (currentCard) {
      currentCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  return (
    <section className={styles.roadmapSection} aria-label="Level Progression Journey">
      {/* Header with Title and Scroll Controls */}
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <div className={styles.badgeRow}>
            <span className={styles.sectionBadge}>
              <TrendingUp size={12} />
              PRESTIGE TIERS
            </span>
            <span className={styles.tierCount}>10 Progression Milestones</span>
          </div>
          <h2 className={styles.title}>LEVEL JOURNEY & MILESTONES</h2>
          <p className={styles.subtitle}>
            Scroll horizontally to track your path from Starter to Mythic. Click any tier to inspect unlocked rewards and benefits.
          </p>
        </div>

        <div className={styles.controlsGroup}>
          <button 
            type="button" 
            className={styles.jumpBtn}
            onClick={scrollToCurrentLevel}
            title="Jump to current level"
          >
            <Sparkles size={14} />
            <span>You Are Here</span>
          </button>

          <div className={styles.arrowGroup}>
            <button
              type="button"
              className={`${styles.arrowBtn} ${!canScrollLeft ? styles.arrowDisabled : ''}`}
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className={`${styles.arrowBtn} ${!canScrollRight ? styles.arrowDisabled : ''}`}
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Journey */}
      <div className={styles.scrollWrapper}>
        <div 
          className={styles.trackScroll} 
          ref={scrollContainerRef}
          role="region"
          aria-label="Level cards carousel"
        >
          {levels.map((item, idx) => {
            const lvlNum = Number(item.level);
            const isCompleted = lvlNum < currentLevel;
            const isCurrent = lvlNum === currentLevel;
            const isNext = lvlNum === currentLevel + 1;
            const isLocked = lvlNum > currentLevel;
            const xpReq = item.xpRequired ?? LEVEL_XP_REQUIREMENTS[lvlNum] ?? (lvlNum * 2000);

            // Progress percentage for current level
            let nodePct = 0;
            if (isCompleted) nodePct = 100;
            else if (isCurrent) {
              const nextReq = LEVEL_XP_REQUIREMENTS[lvlNum + 1] ?? xpReq;
              const prevReq = xpReq;
              const range = Math.max(1, nextReq - prevReq);
              const progressInRange = Math.max(0, currentXP - prevReq);
              nodePct = Math.min(100, Math.round((progressInRange / range) * 100));
            }

            let cardStatusClass = styles.cardLocked;
            if (isCompleted) cardStatusClass = styles.cardCompleted;
            if (isCurrent) cardStatusClass = styles.cardCurrent;
            if (isNext) cardStatusClass = styles.cardNextMilestone;

            return (
              <div 
                key={lvlNum}
                data-level={lvlNum}
                className={`${styles.levelCard} ${cardStatusClass}`}
                onClick={() => setSelectedLevel(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedLevel(item);
                  }
                }}
                aria-label={`Level ${lvlNum} ${item.name}: ${isCurrent ? 'Current level' : isCompleted ? 'Completed' : 'Locked'}`}
              >
                {/* Pipeline Node Connector Dot */}
                <div className={styles.pipelineNode}>
                  <div className={styles.nodePoint} />
                  {idx < levels.length - 1 && (
                    <div 
                      className={`${styles.nodeConnectorLine} ${
                        lvlNum < currentLevel ? styles.lineCompleted : 
                        lvlNum === currentLevel ? styles.lineCurrent : styles.lineLocked
                      }`} 
                    />
                  )}
                </div>

                {/* Level Card Header */}
                <div className={styles.cardHeader}>
                  <span className={styles.levelNum}>LEVEL {String(lvlNum).padStart(2, '0')}</span>
                  {isCompleted && (
                    <span className={styles.statusCompletedBadge}>
                      <Check size={11} strokeWidth={3} />
                      Done
                    </span>
                  )}
                  {isCurrent && (
                    <span className={styles.statusCurrentBadge}>
                      <Sparkles size={11} />
                      Current
                    </span>
                  )}
                  {isNext && (
                    <span className={styles.statusNextBadge}>
                      <Target size={11} />
                      Next
                    </span>
                  )}
                  {isLocked && !isNext && (
                    <span className={styles.statusLockedBadge}>
                      <Lock size={10} />
                      Locked
                    </span>
                  )}
                </div>

                {/* Unique Badge */}
                <div className={styles.badgeContainer}>
                  <LevelBadge level={lvlNum} size={64} />
                  {isCurrent && <div className={styles.badgeHalo} />}
                </div>

                {/* Tier Title */}
                <h3 className={styles.tierName}>{item.name}</h3>

                {/* XP Requirement */}
                <div className={styles.xpBlock}>
                  <span className={styles.xpLabel}>Required XP</span>
                  <span className={styles.xpValue}>{xpReq.toLocaleString()} XP</span>
                </div>

                {/* Progress bar for current node */}
                {isCurrent && (
                  <div className={styles.microProgressArea}>
                    <div className={styles.microTrack}>
                      <div className={styles.microFill} style={{ width: `${nodePct}%` }} />
                    </div>
                    <span className={styles.microText}>{nodePct}% to Lvl {String(lvlNum + 1).padStart(2, '0')}</span>
                  </div>
                )}

                {/* Reward Preview */}
                <div className={styles.rewardBox}>
                  <Gift size={13} className={styles.rewardIcon} />
                  {item.reward ? (
                    <span className={styles.rewardText}>
                      +{item.reward.amount} {item.reward.type}
                    </span>
                  ) : (
                    <span className={styles.rewardTextMuted}>Starter Tier</span>
                  )}
                </div>

                {/* Hover / Action Hint */}
                <div className={styles.inspectHint}>
                  <Info size={11} />
                  <span>Inspect Perks</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Level Detail Inspection Modal */}
      {selectedLevel && (
        <div 
          className={styles.modalOverlay}
          onClick={() => setSelectedLevel(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="perk-modal-title"
        >
          <div 
            className={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              type="button" 
              className={styles.modalCloseBtn}
              onClick={() => setSelectedLevel(null)}
              aria-label="Close details"
            >
              <X size={20} />
            </button>

            <div className={styles.modalTopRow}>
              <LevelBadge level={Number(selectedLevel.level)} size={80} />
              <div className={styles.modalTitleBlock}>
                <span className={styles.modalLvlTag}>
                  LEVEL {String(selectedLevel.level).padStart(2, '0')}
                </span>
                <h3 id="perk-modal-title" className={styles.modalTierName}>
                  {selectedLevel.name}
                </h3>
                <span className={styles.modalXPReq}>
                  {(selectedLevel.xpRequired ?? LEVEL_XP_REQUIREMENTS[selectedLevel.level] ?? 8000).toLocaleString()} XP Required
                </span>
              </div>
            </div>

            <div className={styles.modalRewardHighlight}>
              <Award size={18} className={styles.modalAwardIcon} />
              <div className={styles.modalRewardInfo}>
                <span className={styles.modalRewardHeading}>Milestone Reward</span>
                <span className={styles.modalRewardValue}>
                  {selectedLevel.reward 
                    ? `+${selectedLevel.reward.amount} ${selectedLevel.reward.type}` 
                    : 'Initial Starter Access'}
                </span>
              </div>
            </div>

            <div className={styles.perksListContainer}>
              <h4 className={styles.perksTitle}>Unlocked Benefits & Features</h4>
              <ul className={styles.perksList}>
                {(TIER_PERKS[selectedLevel.level] || [
                  "Higher daily XP threshold",
                  "Access to exclusive challenges",
                  "Better reward multipliers"
                ]).map((perk, i) => (
                  <li key={i} className={styles.perkItem}>
                    <Check size={14} className={styles.perkCheck} />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button 
              type="button" 
              className={styles.modalDoneBtn}
              onClick={() => setSelectedLevel(null)}
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default LevelRoadmap;
