import React, { useState } from 'react';
import {
  Trophy,
  Award,
  Flame,
  Zap,
  Target,
  Shield,
  Star,
  Lock,
  CheckCircle2,
  Sparkles,
  Gamepad2,
  Crown
} from 'lucide-react';
import styles from './GamingAchievements.module.css';

export function GamingAchievements({
  currentLevel = 5,
  currentXP = 6420,
  streakDays = 7,
  tasksDone = '4 / 8',
  onLaunchGame,
  onViewRewards
}) {
  const [filterRarity, setFilterRarity] = useState('all');

  const achievements = [
    {
      id: 'ach-starter',
      title: 'SOVEREIGN INITIATE',
      desc: 'Completed Level 01 royal orientation and activated player profile.',
      rarity: 'common',
      unlocked: currentLevel >= 1,
      progress: '100%',
      icon: Shield,
      image: '/assets/premium/png/reward_premium_chest@4x.png',
      reward: 'Profile Active'
    },
    {
      id: 'ach-momentum',
      title: 'RUNIC MOMENTUM',
      desc: 'Harnessed ancient arcane power past 5,000 accumulated Royal XP.',
      rarity: 'rare',
      unlocked: currentLevel >= 4,
      progress: '100%',
      icon: Zap,
      image: '/assets/premium/png/reward_exclusive_avatar@4x.png',
      reward: '+250 VEs'
    },
    {
      id: 'ach-streak',
      title: 'STREAK SENTINEL',
      desc: `Maintained a continuous ${streakDays}-day sovereign allegiance streak.`,
      rarity: 'legendary',
      unlocked: streakDays >= 5,
      progress: `${streakDays} Days`,
      icon: Flame,
      image: '/assets/premium/png/reward_gems@4x.png',
      reward: '1.2X Streak Multiplier'
    },
    {
      id: 'ach-ascendant',
      title: 'ASCENDANT SOVEREIGN',
      desc: 'Ascended to Level 05 Prestige Tier. Claimed high-tier royal bounties.',
      rarity: 'epic',
      unlocked: currentLevel >= 5,
      progress: 'ACTIVE',
      icon: Trophy,
      image: '/assets/premium/png/reward_legendary_badge@4x.png',
      reward: '+500 VEs & 25 Gems'
    },
    {
      id: 'ach-arcade',
      title: 'ARCADE VAULT HUNTER',
      desc: 'Maneuvered golden wire basket in XP Catcher mini-game trial.',
      rarity: 'epic',
      unlocked: true,
      progress: 'UNLOCKED',
      icon: Gamepad2,
      image: '/assets/premium/png/how_it_works_play@4x.png',
      reward: '2X XP Orbs'
    },
    {
      id: 'ach-missions',
      title: 'REALM SPECIALIST',
      desc: `Cleared daily realm challenges and tactical missions (${tasksDone} cleared).`,
      rarity: 'rare',
      unlocked: false,
      progress: tasksDone,
      icon: Target,
      image: '/assets/premium/png/how_it_works_level_up@4x.png',
      reward: '+30 Daily XP'
    },
    {
      id: 'ach-vanguard',
      title: 'DRAGON-FORGED VANGUARD',
      desc: 'Ascend to Level 06 milestone. Reach 8,000 required XP threshold.',
      rarity: 'epic',
      unlocked: currentLevel >= 6,
      progress: `${Math.min(100, Math.round((currentXP / 8000) * 100))}%`,
      icon: Award,
      image: '/assets/premium/png/reward_epic_skin@4x.png',
      reward: '+2 Wheel Spins'
    },
    {
      id: 'ach-mythic',
      title: 'MYTHIC EMPEROR',
      desc: 'Conquer all 10 progression tiers and claim the ultimate 35,000 XP crown.',
      rarity: 'mythic',
      unlocked: currentLevel >= 10,
      progress: 'Tier 10 Locked',
      icon: Crown,
      image: '/assets/premium/png/reward_showcase_chest@4x.png',
      reward: '+1,000 VEs Drop'
    }
  ];

  const filtered = filterRarity === 'all'
    ? achievements
    : achievements.filter(a => a.rarity === filterRarity);

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <section className={styles.achievementsSection} aria-label="Player Gaming Achievements">
      {/* Section Header */}
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <div className={styles.badgeRow}>
            <span className={styles.sectionBadge}>
              <Sparkles size={13} />
              COLLECTIBLE TROPHIES
            </span>
            <span className={styles.counterText}>
              {unlockedCount} / {achievements.length} Unlocked
            </span>
          </div>
          <h2 className={styles.title}>GAMING ACHIEVEMENTS</h2>
          <p className={styles.subtitle}>
            Battle-tested player milestones and unlocked prestige accolades.
          </p>
        </div>

        {/* Rarity Filter Tabs */}
        <div className={styles.filterPills}>
          {['all', 'rare', 'epic', 'legendary', 'mythic'].map(rarity => (
            <button
              key={rarity}
              className={`${styles.filterBtn} ${filterRarity === rarity ? styles.filterBtnActive : ''}`}
              onClick={() => setFilterRarity(rarity)}
            >
              {rarity.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Collectible Cards */}
      <div className={styles.cardsGrid}>
        {filtered.map(item => {
          const Icon = item.icon;
          const rarityClass = styles[`rarity_${item.rarity}`] || '';
          return (
            <div
              key={item.id}
              className={`${styles.achCard} ${rarityClass} ${item.unlocked ? styles.unlocked : styles.locked}`}
            >
              {/* Tech Corner Accent */}
              <div className={styles.techCornerTopRight} />

              <div className={styles.cardHeader}>
                <span className={`${styles.rarityTag} ${styles[`tag_${item.rarity}`]}`}>
                  {item.rarity.toUpperCase()}
                </span>
                {item.unlocked ? (
                  <span className={styles.unlockedTag}>
                    <CheckCircle2 size={12} />
                    CLAIMED
                  </span>
                ) : (
                  <span className={styles.lockedTag}>
                    <Lock size={12} />
                    LOCKED
                  </span>
                )}
              </div>

              <div className={styles.cardBody}>
                <div className={`${styles.iconHalo} ${styles[`halo_${item.rarity}`]}`}>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className={styles.ach3DImg}
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  ) : (
                    <Icon size={24} strokeWidth={2} />
                  )}
                </div>
                <div className={styles.cardInfo}>
                  <h3 className={styles.achTitle}>{item.title}</h3>
                  <p className={styles.achDesc}>{item.desc}</p>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.progressCol}>
                  <span className={styles.progressLabel}>STATUS</span>
                  <span className={styles.progressValue}>{item.progress}</span>
                </div>
                <div className={styles.rewardCol}>
                  <span className={styles.rewardLabel}>REWARD</span>
                  <span className={styles.rewardValue}>{item.reward}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default GamingAchievements;
