
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

// AdMob Interstitial Ad Unit IDs
// IMPORTANT: Replace these with your actual Ad Unit IDs from AdMob console
const ADMOB_INTERSTITIAL_AD_UNIT_ID = Platform.select({
  ios: __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
  android: __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
  default: TestIds.INTERSTITIAL,
});

let interstitialAd: InterstitialAd | null = null;
let isAdLoaded = false;

export const useInterstitialAd = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web') {
      return;
    }

    // Create and load interstitial ad
    interstitialAd = InterstitialAd.createForAdRequest(ADMOB_INTERSTITIAL_AD_UNIT_ID, {
      requestNonPersonalizedAdsOnly: false,
    });

    const loadedListener = interstitialAd.addAdEventListener(
      AdEventType.LOADED,
      () => {
        console.log('Interstitial ad loaded');
        isAdLoaded = true;
        setLoaded(true);
      }
    );

    const closedListener = interstitialAd.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        console.log('Interstitial ad closed');
        isAdLoaded = false;
        setLoaded(false);
        // Preload next ad
        if (interstitialAd) {
          interstitialAd.load();
        }
      }
    );

    const errorListener = interstitialAd.addAdEventListener(
      AdEventType.ERROR,
      (error) => {
        console.log('Interstitial ad error:', error);
        isAdLoaded = false;
        setLoaded(false);
      }
    );

    // Load the ad
    interstitialAd.load();

    return () => {
      loadedListener();
      closedListener();
      errorListener();
    };
  }, []);

  const showInterstitialAd = () => {
    if (Platform.OS === 'web') {
      console.log('Interstitial ads not supported on web');
      return;
    }

    if (interstitialAd && isAdLoaded) {
      console.log('Showing interstitial ad');
      interstitialAd.show();
    } else {
      console.log('Interstitial ad not ready yet');
    }
  };

  return { loaded, showInterstitialAd };
};
