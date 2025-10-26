
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { colors } from '@/styles/commonStyles';

interface AdBannerProps {
  position?: 'top' | 'bottom';
}

// Conditionally import AdMob components only on native platforms
let BannerAd: any;
let BannerAdSize: any;
let TestIds: any;

if (Platform.OS === 'ios' || Platform.OS === 'android') {
  const googleAds = require('react-native-google-mobile-ads');
  BannerAd = googleAds.BannerAd;
  BannerAdSize = googleAds.BannerAdSize;
  TestIds = googleAds.TestIds;
}

// AdMob Banner Ad Unit IDs
// IMPORTANT: Replace these with your actual Ad Unit IDs from AdMob console
const ADMOB_BANNER_AD_UNIT_ID = Platform.select({
  ios: __DEV__ && TestIds ? TestIds.BANNER : 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
  android: __DEV__ && TestIds ? TestIds.BANNER : 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
  default: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
});

export default function AdBanner({ position = 'bottom' }: AdBannerProps) {
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);

  const handleAdLoaded = () => {
    console.log('Banner ad loaded successfully');
    setAdLoaded(true);
    setAdError(false);
  };

  const handleAdFailedToLoad = (error: any) => {
    console.log('Banner ad failed to load:', error);
    setAdError(true);
    setAdLoaded(false);
  };

  const handleAdOpened = () => {
    console.log('Banner ad opened');
  };

  const handleAdClosed = () => {
    console.log('Banner ad closed');
  };

  return (
    <View style={[styles.container, position === 'top' && styles.topPosition]}>
      {Platform.OS !== 'web' && BannerAd ? (
        <BannerAd
          unitId={ADMOB_BANNER_AD_UNIT_ID}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: false,
          }}
          onAdLoaded={handleAdLoaded}
          onAdFailedToLoad={handleAdFailedToLoad}
          onAdOpened={handleAdOpened}
          onAdClosed={handleAdClosed}
        />
      ) : (
        <View style={styles.webPlaceholder}>
          <View style={styles.adLabel}>
            <Text style={styles.adLabelText}>Ad</Text>
          </View>
          <Text style={styles.adText}>
            Ads are displayed on mobile devices
          </Text>
        </View>
      )}
      
      {adError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Ad temporarily unavailable</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.primary,
    minHeight: 50,
  },
  topPosition: {
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  webPlaceholder: {
    backgroundColor: colors.highlight,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  adLabel: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  adLabelText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  adText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  errorContainer: {
    padding: 8,
    backgroundColor: colors.highlight,
    width: '100%',
    alignItems: 'center',
  },
  errorText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
});
