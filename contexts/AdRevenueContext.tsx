
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import mobileAds from 'react-native-google-mobile-ads';

interface AdRevenueData {
  totalViews: number;
  totalRevenue: number;
  todayViews: number;
  todayRevenue: number;
  matchAdViews: number;
  messageAdViews: number;
  bannerAdViews: number;
  interstitialAdViews: number;
}

interface AdRevenueContextType {
  adData: AdRevenueData;
  trackAdView: (adType: 'match' | 'message' | 'banner' | 'interstitial') => void;
  resetDailyStats: () => void;
  isAdMobInitialized: boolean;
}

const AdRevenueContext = createContext<AdRevenueContextType | undefined>(undefined);

// Revenue rates per ad type (estimated)
const AD_REVENUE_RATES = {
  match: 0.10,        // Rewarded ads pay more
  message: 0.10,      // Rewarded ads pay more
  banner: 0.01,       // Banner ads pay less
  interstitial: 0.05, // Interstitial ads moderate
};

export function AdRevenueProvider({ children }: { children: React.ReactNode }) {
  const [isAdMobInitialized, setIsAdMobInitialized] = useState(false);
  const [adData, setAdData] = useState<AdRevenueData>({
    totalViews: 0,
    totalRevenue: 0,
    todayViews: 0,
    todayRevenue: 0,
    matchAdViews: 0,
    messageAdViews: 0,
    bannerAdViews: 0,
    interstitialAdViews: 0,
  });

  // Initialize AdMob
  useEffect(() => {
    if (Platform.OS !== 'web') {
      console.log('Initializing AdMob...');
      mobileAds()
        .initialize()
        .then((adapterStatuses) => {
          console.log('AdMob initialized successfully:', adapterStatuses);
          setIsAdMobInitialized(true);
        })
        .catch((error) => {
          console.error('AdMob initialization error:', error);
        });

      // Set request configuration
      mobileAds()
        .setRequestConfiguration({
          // Maximum Ad Content Rating
          maxAdContentRating: 'T',
          // Tag for child-directed treatment
          tagForChildDirectedTreatment: false,
          // Tag for under age of consent
          tagForUnderAgeOfConsent: false,
        })
        .then(() => {
          console.log('AdMob request configuration set');
        });
    } else {
      setIsAdMobInitialized(true); // Web doesn't need initialization
    }
  }, []);

  const trackAdView = (adType: 'match' | 'message' | 'banner' | 'interstitial') => {
    const revenue = AD_REVENUE_RATES[adType];
    
    setAdData((prev) => {
      const newData = {
        ...prev,
        totalViews: prev.totalViews + 1,
        totalRevenue: prev.totalRevenue + revenue,
        todayViews: prev.todayViews + 1,
        todayRevenue: prev.todayRevenue + revenue,
        matchAdViews: adType === 'match' ? prev.matchAdViews + 1 : prev.matchAdViews,
        messageAdViews: adType === 'message' ? prev.messageAdViews + 1 : prev.messageAdViews,
        bannerAdViews: adType === 'banner' ? prev.bannerAdViews + 1 : prev.bannerAdViews,
        interstitialAdViews: adType === 'interstitial' ? prev.interstitialAdViews + 1 : prev.interstitialAdViews,
      };

      console.log('Ad tracked:', {
        type: adType,
        revenue: revenue.toFixed(2),
        totalRevenue: newData.totalRevenue.toFixed(2),
        totalViews: newData.totalViews,
      });

      // In production, send this data to your backend for analytics
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
    <AdRevenueContext.Provider value={{ adData, trackAdView, resetDailyStats, isAdMobInitialized }}>
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
