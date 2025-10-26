
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdRevenueData {
  totalViews: number;
  totalRevenue: number;
  todayViews: number;
  todayRevenue: number;
  matchAdViews: number;
  messageAdViews: number;
}

interface AdRevenueContextType {
  adData: AdRevenueData;
  trackAdView: (adType: 'match' | 'message') => void;
  resetDailyStats: () => void;
}

const AdRevenueContext = createContext<AdRevenueContextType | undefined>(undefined);

const AD_REVENUE_PER_VIEW = 0.05; // $0.05 per ad view

export function AdRevenueProvider({ children }: { children: React.ReactNode }) {
  const [adData, setAdData] = useState<AdRevenueData>({
    totalViews: 0,
    totalRevenue: 0,
    todayViews: 0,
    todayRevenue: 0,
    matchAdViews: 0,
    messageAdViews: 0,
  });

  const trackAdView = (adType: 'match' | 'message') => {
    setAdData((prev) => {
      const newData = {
        ...prev,
        totalViews: prev.totalViews + 1,
        totalRevenue: prev.totalRevenue + AD_REVENUE_PER_VIEW,
        todayViews: prev.todayViews + 1,
        todayRevenue: prev.todayRevenue + AD_REVENUE_PER_VIEW,
        matchAdViews: adType === 'match' ? prev.matchAdViews + 1 : prev.matchAdViews,
        messageAdViews: adType === 'message' ? prev.messageAdViews + 1 : prev.messageAdViews,
      };

      console.log('Ad tracked:', {
        type: adType,
        totalRevenue: newData.totalRevenue.toFixed(2),
        totalViews: newData.totalViews,
      });

      // In production, send this data to your backend
      // sendToBackend(newData);

      return newData;
    });
  };

  const resetDailyStats = () => {
    setAdData((prev) => ({
      ...prev,
      todayViews: 0,
      todayRevenue: 0,
    }));
    console.log('Daily stats reset');
  };

  // Reset daily stats at midnight
  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    const timer = setTimeout(() => {
      resetDailyStats();
      // Set up recurring daily reset
      setInterval(resetDailyStats, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AdRevenueContext.Provider value={{ adData, trackAdView, resetDailyStats }}>
      {children}
    </AdRevenueContext.Provider>
  );
}

export function useAdRevenue() {
  const context = useContext(AdRevenueContext);
  if (context === undefined) {
    throw new Error('useAdRevenue must be used within an AdRevenueProvider');
  }
  return context;
}
