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
      const earnedXP = Number(result?.reward?.xp);

      if (!result || typeof result !== 'object' || !Number.isFinite(earnedXP) || earnedXP <= 0) {
        throw new Error('Game reward was not confirmed by the backend.');
      }

      if (result.profile) {
        setProfile(result.profile);
      } else {
        setProfile(prev => {
          if (!prev) return prev;
          const newXP = prev.currentXP + earnedXP;
          const req = prev.requiredXP || 8000;
          return {
            ...prev,
            currentXP: newXP,
            xpToNext: Math.max(0, req - newXP),
            progressPct: Math.min(100, Math.round((newXP / req) * 100))
          };
        });
      }

      const newAct = result.activity || {
        id: `game-${Date.now()}`,
        type: 'game',
        label: 'Mini-Game Challenge | VE Coin Catch',
        xpDelta: earnedXP,
        timestamp: new Date().toISOString()
      };
      setActivities(prev => [newAct, ...prev]);

      setTodaysBoost(prev => ({
        ...prev,
        xpEarned: prev.xpEarned + earnedXP
      }));

      if (result.levelUp) {
        setLevelUpData(result.levelUp);
      }

      return result;
    } catch (err) {
      console.error('Error recording game session:', err);
      throw err;
    }
  };

  // Claim feature
  const handleClaimFeature = async (featureKey) => {
    const res = await api.claimEarningFeature(featureKey);
    const added = Number(res?.xpAwarded ?? res?.xpAdded);

    if (!Number.isFinite(added) || added <= 0) {
      throw new Error('Claim was not confirmed by the backend.');
    }

    setProfile(prev => {
      if (!prev) return prev;

      const serverProfile = res.profile || {};
      const newXP = Number(serverProfile.currentXP ?? (prev.currentXP + added));
      const req = Number(serverProfile.requiredXP ?? prev.requiredXP ?? 8000);

      return {
        ...prev,
        ...serverProfile,
        currentXP: newXP,
        requiredXP: req,
        xpToNext: Number(serverProfile.xpToNext ?? Math.max(0, req - newXP)),
        progressPct: Number(serverProfile.progressPct ?? Math.min(100, Math.round((newXP / req) * 100)))
      };
    });

    setTodaysBoost(prev => ({
      ...prev,
      xpEarned: Number(prev.xpEarned || 0) + added
    }));

    setActivities(prev => [
      res.activity || {
        id: `claim-${Date.now()}`,
        type: featureKey,
        label: `Completed | ${featureKey.replace('_', ' ').toUpperCase()}`,
        xpDelta: added,
        timestamp: new Date().toISOString()
      },
      ...prev
    ]);

    if (res.levelUp) {
      setLevelUpData(res.levelUp);
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

