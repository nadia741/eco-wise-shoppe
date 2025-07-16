
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';

interface RewardsContextType {
  points: number;
  tier: string;
  earnPoints: (amount: number) => void;
  redeemPoints: (amount: number) => boolean;
  getPointsFromPurchase: (purchaseAmount: number) => number;
  tierBenefits: { [key: string]: any };
  availableOffers: string[];
  claimOffer: (offer: string) => void;
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
  const { toast } = useToast();
  const [points, setPoints] = useState(0);
  const [availableOffers, setAvailableOffers] = useState<string[]>([]);

  const tierBenefits = {
    'Seedling': { pointsRequired: 0, multiplier: 1, benefits: ['Welcome bonus', 'Member discounts'] },
    'Sprout': { pointsRequired: 50, multiplier: 1.25, benefits: ['Free shipping', 'Early access'] },
    'Tree': { pointsRequired: 150, multiplier: 1.5, benefits: ['Exclusive products', 'Priority support'] },
    'Forest': { pointsRequired: 300, multiplier: 2, benefits: ['VIP events', 'Personalized service'] }
  };

  const getCurrentTier = () => {
    if (points >= 300) return 'Forest';
    if (points >= 150) return 'Tree';
    if (points >= 50) return 'Sprout';
    return 'Seedling';
  };

  const tier = getCurrentTier();

  const earnPoints = (amount: number) => {
    // Fixed 3 points per product purchase
    const pointsEarned = 3;
    const oldPoints = points;
    const newPoints = oldPoints + pointsEarned;
    
    setPoints(newPoints);
    
    // Check for special discounts every 20 points
    const oldDiscountTier = Math.floor(oldPoints / 20);
    const newDiscountTier = Math.floor(newPoints / 20);
    
    if (newDiscountTier > oldDiscountTier) {
      const newOffers = [];
      for (let i = oldDiscountTier + 1; i <= newDiscountTier; i++) {
        const discountPercent = Math.min(15, i * 5); // 5%, 10%, 15% max
        const offer = `${discountPercent}% OFF your next purchase!`;
        newOffers.push(offer);
      }
      setAvailableOffers(prev => [...prev, ...newOffers]);
      
      toast({
        title: "🎉 Special Discount Unlocked!",
        description: `You've earned ${pointsEarned} points! New discount available: ${newOffers[0]}`,
        duration: 5000,
      });
    } else {
      toast({
        title: "🌱 Points Earned!",
        description: `You earned ${pointsEarned} sustainability points!`,
        duration: 3000,
      });
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
    // Fixed 3 points per product
    return 3;
  };

  const claimOffer = (offer: string) => {
    setAvailableOffers(prev => prev.filter(o => o !== offer));
    toast({
      title: "🎁 Offer Claimed!",
      description: `${offer} has been applied to your account.`,
      duration: 4000,
    });
  };

  useEffect(() => {
    // Load user's points from storage
    if (user) {
      const savedPoints = localStorage.getItem(`rewards_${user.id}`);
      const savedOffers = localStorage.getItem(`offers_${user.id}`);
      if (savedPoints) {
        setPoints(parseInt(savedPoints));
      }
      if (savedOffers) {
        setAvailableOffers(JSON.parse(savedOffers));
      }
    }
  }, [user]);

  useEffect(() => {
    // Save points and offers to storage
    if (user) {
      localStorage.setItem(`rewards_${user.id}`, points.toString());
      localStorage.setItem(`offers_${user.id}`, JSON.stringify(availableOffers));
    }
  }, [points, availableOffers, user]);

  return (
    <RewardsContext.Provider value={{
      points,
      tier,
      earnPoints,
      redeemPoints,
      getPointsFromPurchase,
      tierBenefits,
      availableOffers,
      claimOffer
    }}>
      {children}
    </RewardsContext.Provider>
  );
};
