import {
  initialProfile,
  initialLevels,
  initialRecentActivity,
  earningOpportunities
} from '../data/initialData';

const BASE_URL = 'https://veloop-5zm4.onrender.com';
const TIMEOUT_MS = 6000;

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export const api = {
  async getProfile() {
    try {
      const res = await fetchWithTimeout(`${BASE_URL}/api/profile`);
      if (!res.ok) throw new Error('Failed to load profile');
      return await res.json();
    } catch (err) {
      console.warn('Backend unavailable, using profile fallback:', err.message);
      return initialProfile;
    }
  },

  async getLevels() {
    try {
      const res = await fetchWithTimeout(`${BASE_URL}/api/levels`);
      if (!res.ok) throw new Error('Failed to load levels');
      const data = await res.json();
      return data.levels || initialLevels;
    } catch (err) {
      console.warn('Backend unavailable, using levels fallback:', err.message);
      return initialLevels;
    }
  },

  async getActivity(limit = 20) {
    try {
      const res = await fetchWithTimeout(`${BASE_URL}/api/activity?limit=${limit}`);
      if (!res.ok) throw new Error('Failed to load activity');
      const data = await res.json();
      return data.activity || initialRecentActivity;
    } catch (err) {
      console.warn('Backend unavailable, using activity fallback:', err.message);
      return initialRecentActivity;
    }
  },

  async getEarningFeatures() {
    try {
      const res = await fetchWithTimeout(`${BASE_URL}/api/earning-features`);
      if (!res.ok) throw new Error('Failed to load earning features');
      const data = await res.json();
      return data.features || earningOpportunities;
    } catch (err) {
      console.warn('Backend unavailable, using features fallback:', err.message);
      return earningOpportunities;
    }
  },

  async claimEarningFeature(featureKey) {
    try {
      const res = await fetchWithTimeout(`${BASE_URL}/api/earning-features/${featureKey}/claim`, {
        method: 'POST'
      });
      if (!res.ok) throw new Error('Failed to claim reward');
      return await res.json();
    } catch (err) {
      console.warn('Claim simulated locally due to network:', err.message);
      return { success: true, claimedKey: featureKey, xpAdded: 30 };
    }
  },

  async submitGameSession(score) {
    try {
      const res = await fetchWithTimeout(`${BASE_URL}/api/game/session`, {
        method: 'POST',
        body: JSON.stringify({ score })
      });
      if (!res.ok) throw new Error('Failed to record game session');
      return await res.json();
    } catch (err) {
      console.warn('Local simulation of game score:', err.message);
      const earnedXP = Math.round(score * 0.35);
      const earnedVE = Math.round(score * 0.15);
      return {
        score,
        reward: { xp: earnedXP, ve: earnedVE },
        playsRemainingToday: 3,
        levelUp: null
      };
    }
  }
};
