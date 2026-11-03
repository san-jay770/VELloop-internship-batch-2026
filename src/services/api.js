import {
  initialProfile,
  initialLevels,
  initialRecentActivity,
  earningOpportunities
} from '../data/initialData';

const BASE_URL = 'https://veloop-5zm4.onrender.com';
const TIMEOUT_MS = 10000;

let backendOnline = true;

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
    backendOnline = true;
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    backendOnline = false;
    throw error;
  }
}

export const api = {
  getBaseUrl() {
    return BASE_URL;
  },

  isBackendConnected() {
    return backendOnline;
  },

  async getProfile() {
    try {
      const res = await fetchWithTimeout(`${BASE_URL}/api/profile`);
      if (!res.ok) throw new Error('Failed to load profile');
      const data = await res.json();
      console.log('✅ Loaded real profile from backend:', data);
      return data;
    } catch (err) {
      console.warn('Backend unavailable, using fallback profile:', err.message);
      return initialProfile;
    }
  },

  async getLevels() {
    try {
      const res = await fetchWithTimeout(`${BASE_URL}/api/levels`);
      if (!res.ok) throw new Error('Failed to load levels');
      const data = await res.json();
      console.log('✅ Loaded real levels roadmap from backend:', data.levels?.length);
      return data.levels || initialLevels;
    } catch (err) {
      console.warn('Backend unavailable, using fallback levels:', err.message);
      return initialLevels;
    }
  },

  async getActivity(limit = 20) {
    try {
      const res = await fetchWithTimeout(`${BASE_URL}/api/activity?limit=${limit}`);
      if (!res.ok) throw new Error('Failed to load activity');
      const data = await res.json();
      console.log('✅ Loaded real activity from backend:', data.activity?.length);
      return data.activity || initialRecentActivity;
    } catch (err) {
      console.warn('Backend unavailable, using fallback activity:', err.message);
      return initialRecentActivity;
    }
  },

  async getEarningFeatures() {
    try {
      const res = await fetchWithTimeout(`${BASE_URL}/api/earning-features`);
      if (!res.ok) throw new Error('Failed to load earning features');
      const data = await res.json();
      console.log('✅ Loaded real earning features from backend:', data.features?.length);
      return data.features || earningOpportunities;
    } catch (err) {
      console.warn('Backend unavailable, using fallback features:', err.message);
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
      console.warn('Simulated local claim due to backend network:', err.message);
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
      const data = await res.json();
      console.log('✅ Successfully recorded game session on backend:', data);
      return data;
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
