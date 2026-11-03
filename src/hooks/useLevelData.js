import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { initialTodaysBoost } from '../data/initialData';

export function useLevelData() {
  const [profile, setProfile] = useState(null);
  const [levels, setLevels] = useState([]);
  const [activities, setActivities] = useState([]);
  const [earningFeatures, setEarningFeatures] = useState([]);
  const [todaysBoost, setTodaysBoost] = useState(initialTodaysBoost);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [levelUpData, setLevelUpData] = useState(null); // When level up modal should open

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const [profRes, lvlsRes, actRes, earnRes] = await Promise.all([
        api.getProfile(),
        api.getLevels(),
        api.getActivity(10),
        api.getEarningFeatures()
      ]);

      setProfile(profRes);
      setLevels(lvlsRes);
      setActivities(actRes);
      setEarningFeatures(earnRes);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle game completion
  const handleGameCompleted = async (score) => {
    try {
      const result = await api.submitGameSession(score);
      
      // Update profile XP if provided by backend
      if (result.profile) {
        setProfile(result.profile);
      } else {
        // Optimistic local update
        setProfile(prev => {
          if (!prev) return prev;
          const newXP = prev.currentXP + (result.reward?.xp || 25);
          const req = prev.requiredXP || 8000;
          const pct = Math.min(100, Math.round((newXP / req) * 100));
          return {
            ...prev,
            currentXP: newXP,
            xpToNext: Math.max(0, req - newXP),
            progressPct: pct
          };
        });
      }

      // Add activity
      const newAct = result.activity || {
        id: `game-${Date.now()}`,
        type: 'game',
        label: 'Mini-Game Challenge | VE Coin Catch',
        xpDelta: result.reward?.xp || 25,
        timestamp: new Date().toISOString()
      };
      setActivities(prev => [newAct, ...prev]);

      // Update today's boost
      setTodaysBoost(prev => ({
        ...prev,
        xpEarned: prev.xpEarned + (result.reward?.xp || 25)
      }));

      // Check level-up
      if (result.levelUp) {
        setLevelUpData(result.levelUp);
      }

      return result;
    } catch (err) {
      console.error('Error recording game session:', err);
      return null;
    }
  };

  // Claim feature
  const handleClaimFeature = async (featureKey) => {
    const res = await api.claimEarningFeature(featureKey);
    if (res.success || res.xpAdded) {
      const added = res.xpAdded || 30;
      setProfile(prev => {
        if (!prev) return prev;
        const newXP = prev.currentXP + added;
        const req = prev.requiredXP || 8000;
        return {
          ...prev,
          currentXP: newXP,
          xpToNext: Math.max(0, req - newXP),
          progressPct: Math.min(100, Math.round((newXP / req) * 100))
        };
      });

      setTodaysBoost(prev => ({
        ...prev,
        xpEarned: prev.xpEarned + added
      }));

      setActivities(prev => [
        {
          id: `claim-${Date.now()}`,
          type: featureKey,
          label: `Completed | ${featureKey.replace('_', ' ').toUpperCase()}`,
          xpDelta: added,
          timestamp: new Date().toISOString()
        },
        ...prev
      ]);
    }
    return res;
  };

  // Clear level-up modal
  const dismissLevelUp = () => {
    setLevelUpData(null);
  };

  return {
    profile,
    levels,
    activities,
    earningFeatures,
    todaysBoost,
    isLoading,
    isError,
    levelUpData,
    setLevelUpData,
    dismissLevelUp,
    handleGameCompleted,
    handleClaimFeature,
    refetch: fetchData
  };
}

