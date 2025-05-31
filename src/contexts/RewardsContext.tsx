
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface RewardsContextType {
  points: number;
  tier: string;
  earnPoints: (amount: number) => void;
  redeemPoints: (amount: number) => boolean;
  getPointsFromPurchase: (purchaseAmount: number) => number;
  tierBenefits: { [key: string]: any };
}

const RewardsContext = createContext<RewardsContextType | undefined>(undefined);

export const useRewards = () => {
  const context = useContext(RewardsContext);
  if (context === undefined) {
    throw new Error('useRewards must be used within a RewardsProvider');
  }
  return context;
};

export const RewardsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [points, setPoints] = useState(0);

  const tierBenefits = {
    'Seedling': { pointsRequired: 0, multiplier: 1, benefits: ['Welcome bonus', 'Member discounts'] },
    'Sprout': { pointsRequired: 500, multiplier: 1.25, benefits: ['Free shipping', 'Early access'] },
    'Tree': { pointsRequired: 1500, multiplier: 1.5, benefits: ['Exclusive products', 'Priority support'] },
    'Forest': { pointsRequired: 3000, multiplier: 2, benefits: ['VIP events', 'Personalized service'] }
  };

  const getCurrentTier = () => {
    if (points >= 3000) return 'Forest';
    if (points >= 1500) return 'Tree';
    if (points >= 500) return 'Sprout';
    return 'Seedling';
  };

  const tier = getCurrentTier();

  const earnPoints = (amount: number) => {
    const multiplier = tierBenefits[tier].multiplier;
    const pointsEarned = Math.floor(amount * multiplier);
    setPoints(prev => prev + pointsEarned);
    
    // Show tier upgrade notification if applicable
    const newTier = getCurrentTier();
    if (newTier !== tier) {
      // Tier upgrade notification would go here
    }
  };

  const redeemPoints = (amount: number): boolean => {
    if (points >= amount) {
      setPoints(prev => prev - amount);
      return true;
    }
    return false;
  };

  const getPointsFromPurchase = (purchaseAmount: number): number => {
    const multiplier = tierBenefits[tier].multiplier;
    return Math.floor(purchaseAmount * multiplier);
  };

  useEffect(() => {
    // Load user's points from storage or API
    if (user) {
      const savedPoints = localStorage.getItem(`rewards_${user.id}`);
      if (savedPoints) {
        setPoints(parseInt(savedPoints));
      }
    }
  }, [user]);

  useEffect(() => {
    // Save points to storage
    if (user) {
      localStorage.setItem(`rewards_${user.id}`, points.toString());
    }
  }, [points, user]);

  return (
    <RewardsContext.Provider value={{
      points,
      tier,
      earnPoints,
      redeemPoints,
      getPointsFromPurchase,
      tierBenefits
    }}>
      {children}
    </RewardsContext.Provider>
  );
};
