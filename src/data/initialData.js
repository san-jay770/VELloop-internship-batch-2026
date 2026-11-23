export const initialProfile = {
  currentLevel: 5,
  currentLevelName: "Ascendant",
  currentXP: 6420,
  nextLevel: 6,
  requiredXP: 8000,
  xpToNext: 1580,
  nextLevelReward: {
    type: "VEs",
    amount: 500
  },
  progressPct: 80
};

export const LEVEL_XP_REQUIREMENTS = {
  1: 0,
  2: 1000,
  3: 2500,
  4: 5000,
  5: 8000,
  6: 11000,
  7: 15000,
  8: 20000,
  9: 26000,
  10: 35000
};

export const initialLevels = [
  { level: 1, name: "Starter", reward: null, xpRequired: 0, status: "completed" },
  { level: 2, name: "Explorer", reward: { type: "VEs", amount: 100 }, xpRequired: 1000, status: "completed" },
  { level: 3, name: "Achiever", reward: { type: "Gems", amount: 10 }, xpRequired: 2500, status: "completed" },
  { level: 4, name: "Momentum", reward: { type: "VEs", amount: 250 }, xpRequired: 5000, status: "completed" },
  { level: 5, name: "Ascendant", reward: { type: "VEs", amount: 500 }, xpRequired: 8000, status: "current" },
  { level: 6, name: "Vanguard", reward: { type: "Spins", amount: 2 }, xpRequired: 11000, status: "locked" },
  { level: 7, name: "Trailblazer", reward: { type: "Gems", amount: 15 }, xpRequired: 15000, status: "locked" },
  { level: 8, name: "Champion", reward: { type: "VEs", amount: 750 }, xpRequired: 20000, status: "locked" },
  { level: 9, name: "Legend", reward: { type: "Spins", amount: 3 }, xpRequired: 26000, status: "locked" },
  { level: 10, name: "Mythic", reward: { type: "VEs", amount: 1000 }, xpRequired: 35000, status: "locked" }
];

export const initialTodaysBoost = {
  xpEarned: 215,
  tasksDone: "4 / 8",
  streakDays: 7
};

export const initialRecentActivity = [
  {
    id: "act-1",
    type: "refer_earn",
    label: "Referral Bonus",
    subtext: "Veloop Invite",
    xpDelta: 20,
    unit: "XP",
    timestamp: "Today, 10:45 AM"
  },
  {
    id: "act-2",
    type: "daily_tasks",
    label: "Daily Mission Completed",
    subtext: "Goal: Reach 10k steps",
    xpDelta: 50,
    unit: "XP",
    timestamp: "Today, 09:12 AM"
  },
  {
    id: "act-3",
    type: "game",
    label: "Mini Game Win",
    subtext: "Score: 120 (Rank A)",
    xpDelta: 75,
    unit: "XP",
    timestamp: "Today, 08:30 AM"
  },
  {
    id: "act-4",
    type: "xp_catcher",
    label: "XP Catcher Reward",
    subtext: "Bonus VE coins",
    xpDelta: 10,
    unit: "VEs",
    timestamp: "Today, 07:50 AM"
  },
  {
    id: "act-5",
    type: "streak",
    label: "Streak Bonus",
    subtext: "7-Day Consistent Login",
    xpDelta: 25,
    unit: "XP",
    timestamp: "Today, 07:20 AM"
  }
];

export const earningOpportunities = [
  {
    id: "watch_earn",
    title: "Watch & Earn",
    subtitle: "Watch ads and earn",
    xpReward: 50,
    category: "Media",
    iconType: "video",
    color: "#9333ea",
    status: "available"
  },
  {
    id: "daily_tasks",
    title: "Daily Missions",
    subtitle: "Complete daily tasks",
    xpReward: 30,
    category: "Missions",
    iconType: "clipboard",
    color: "#10b981",
    status: "available"
  },
  {
    id: "refer_earn",
    title: "Refer & Earn",
    subtitle: "Invite friends & earn",
    xpReward: 100,
    category: "Social",
    iconType: "users",
    color: "#f59e0b",
    status: "available"
  },
  {
    id: "mini_games",
    title: "Mini Games",
    subtitle: "Play games & win",
    xpReward: 75,
    category: "Arcade",
    iconType: "gamepad",
    color: "#6366f1",
    status: "available"
  },
  {
    id: "streak_bonus",
    title: "Streak Bonus",
    subtitle: "Maintain your streak",
    xpReward: 25,
    category: "Daily",
    iconType: "flame",
    color: "#ef4444",
    status: "available"
  },
  {
    id: "xp_catcher",
    title: "XP Catcher",
    subtitle: "Catch orbs & coins",
    xpReward: 10,
    category: "Game",
    iconType: "magnet",
    color: "#0284c7",
    status: "available"
  }
];

