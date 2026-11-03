# VELOOP Rewards – Level-Up Dashboard Redesign

> **Task 16:** Complete Level-Up Dashboard Redesign  
> **Project:** Gamified Level Progression, Rewards & Engagement Hub  
> **Official Live Reference:** [https://ve-loop-client.vercel.app/Lvl-Dashboard](https://ve-loop-client.vercel.app/Lvl-Dashboard)  
> **Backend Integration:** [https://veloop-5zm4.onrender.com](https://veloop-5zm4.onrender.com)  

---

## 1. Project Overview

The VELOOP Level-Up Dashboard has been redesigned from a passive metric page into an interactive, fintech-inspired gamification and rewards progression center. It provides users with clear visual progression, actionable earning opportunities, and an engaging mini-game to accelerate their level advancement.

### The Core Engagement Loop
$$\text{Play} \longrightarrow \text{Earn XP} \longrightarrow \text{Progress} \longrightarrow \text{Unlock Reward} \longrightarrow \text{Level Up} \longrightarrow \text{Discover New Opportunities}$$

---

## 2. Level System

The progression architecture features a 10-tier status system with custom badges and milestone rewards:

| Level | Tier Name | Required XP | Milestone Reward | Status Representation |
| :---: | :--- | :---: | :---: | :---: |
| **01** | Starter | 0 | — | Completed |
| **02** | Explorer | 1,000 | 100 VEs | Completed |
| **03** | Achiever | 2,500 | 10 Gems | Completed |
| **04** | Momentum | 5,000 | 250 VEs | Completed |
| **05** | Ascendant | 8,000 | 500 VEs | **Current Tier (You Are Here)** |
| **06** | Vanguard | 11,000 | 2 Spins | Locked Next Goal |
| **07** | Trailblazer | 15,000 | 15 Gems | Locked |
| **08** | Champion | 20,000 | 750 VEs | Locked |
| **09** | Legend | 26,000 | 3 Spins | Locked |
| **10** | Mythic | 35,000 | 1,000 VEs | Locked |

---

## 3. XP System & Progress Metrics

- **Current Level:** Prominently featured with the official hexagonal gold laurel badge.
- **Current XP:** `6,420 XP` (synchronized with the live profile backend).
- **Required XP:** `8,000 XP` to unlock Level 06.
- **XP Needed:** `1,580 XP` remaining.
- **Progress Ratio:** Dynamic filled gold progress bar with shimmer animation (`6,420 / 8,000 XP`, 80%).

---

## 4. Next-Level Rewards & Unlocks

- **Next-Level Reward:** `500 VEs` + `25 Gems`.
- **Perks Unlocked:**
  - 📈 Higher daily XP limit
  - 🎯 Access to new challenges
  - 🎁 Better reward opportunities

---

## 5. Mini-Game: "XP CATCHER"

A 60 FPS interactive canvas mini-game allowing users to actively catch rewards:

- **Mechanics:** User maneuvers a golden wire basket along the bottom of the arena to catch falling items.
- **Controls:**
  - Mouse movement & drag
  - Mobile touch drag
  - Left & Right arrow keys (`←`, `→`) or `A` / `D` keys
- **Collectible Items:**
  - 🟣 **XP Orbs:** +10 XP each
  - 🟡 **VE Coins:** +5 VEs each
  - 🟢 **Emerald Gems:** +20 XP each
- **Duration:** 20-second timed challenge with real-time countdown timer (`00:18`).
- **HUD:** Live score counter, earned VE counter, and 2X multiplier indicator.
- **Session API:** Upon completion, game score is posted to `POST /api/game/session`, awarding verified XP and triggering Level-Up celebration if the threshold is crossed.

---

## 6. Earning Features (Action Hub)

Actionable opportunities accessible via the **EARN MORE** grid and the **EARN & LEVEL UP** modal:

1. **Watch & Earn:** +50 XP (media engagement activities)
2. **Daily Missions:** +30 XP (step goals and daily checklists)
3. **Refer & Earn:** +100 XP (invite colleagues and friends)
4. **Mini Games:** +75 XP (arcade challenges)
5. **Streak Bonus:** +25 XP (continuous daily logins)
6. **XP Catcher:** +10 XP (interactive mini-game)

---

## 7. Technology Stack

- **Frontend Library:** React 18
- **Tooling & Build:** Vite 5
- **Styling:** CSS Modules (`.module.css`) + Bootstrap 5 reboot
- **Icons:** Lucide React (`lucide-react`) & React Icons
- **Effects:** Canvas Confetti (`canvas-confetti`)
- **Theme Variables:** Pure CSS Custom Properties (`#161827` dark theme, gold gradient tokens)
- **API Client:** Fetch API with timeout controller and fallback cache resilience

---

## 8. Folder & Component Architecture

```
src/
├── components/
│   ├── Navigation/
│   │   ├── TopNav.jsx               # Header with menu & notification dot
│   │   ├── BottomNav.jsx            # Persistent 5-tab mobile navigation
│   │   └── Navigation.module.css
│   ├── LevelHero/
│   │   ├── LevelHero.jsx            # Greeting & primary XP progress card
│   │   ├── LevelBadge.jsx           # Hexagonal gold Level badge
│   │   ├── XPProgressBar.jsx        # Animated gold progress bar
│   │   └── LevelHero.module.css
│   ├── TodaysBoost/
│   │   ├── TodaysBoost.jsx          # 3-metric boost row (XP, Tasks, Streak)
│   │   └── TodaysBoost.module.css
│   ├── LevelRoadmap/
│   │   ├── LevelRoadmap.jsx         # 10-level scrollable progression
│   │   └── LevelRoadmap.module.css
│   ├── EarnMoreXP/
│   │   ├── EarnMoreGrid.jsx         # 6-item interactive grid & safe card
│   │   ├── EarnAndLevelUpModal.jsx  # Full-screen Screen 4 earning hub
│   │   └── EarnMore.module.css
│   ├── PlayAndEarn/
│   │   ├── XpCatcherGame.jsx        # 60 FPS Canvas game (Screen 2)
│   │   ├── ChallengeComplete.jsx    # Trophy & score modal (Screen 3)
│   │   └── Game.module.css
│   ├── LevelUpModal/
│   │   ├── LevelUpModal.jsx         # Celebration modal (Screen 5)
│   │   └── LevelUpModal.module.css
│   ├── XPActivity/
│   │   ├── XPActivity.jsx           # Activity feed & summary (Screen 6)
│   │   └── XPActivity.module.css
│   └── Common/
│       ├── CommonComponents.jsx     # Skeleton, ErrorState, EmptyState
│       └── Common.module.css
├── pages/
│   ├── LevelDashboard/
│   │   ├── LevelDashboard.jsx       # Main dashboard layout
│   │   └── LevelDashboard.module.css
│   └── ActivityPage/
│       └── ActivityPage.jsx         # Dedicated /Lvl-Dashboard/activity route
├── services/
│   └── api.js                       # Real backend API client
├── data/
│   └── initialData.js               # Mock / fallback schemas
├── hooks/
│   └── useLevelData.js              # State management & queries
├── styles/
│   └── global.css                   # Theme tokens, font imports & keyframes
├── App.jsx                          # Router configuration
└── main.jsx                         # Application root
```

---

## 9. Responsive Behavior

Tested and optimized across all major breakpoints:
- **320px – 375px:** Mobile screens with compact typography and full-width card touch targets.
- **768px:** Tablet view with proportional 3-column boost cards and smooth horizontal roadmap scrolling.
- **1024px – 1440px:** Desktop 2-column composition separating hero progression and active earning modules.
- **1920px+:** Centered high-density layout with maximum width containment.

---

## 10. Development & Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd "VELloop-Internship 2026"

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 11. Author & Acknowledgments

- **Developer:** Sanjay Senthil Kumar
- **Project:** VELOOP Rewards Internship 2026
- **Task:** Task 16 – Complete Level-Up Dashboard Redesign

