
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ActivityIndicator,
  Dimensions,
  Platform,
} from 'react-native';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from './IconSymbol';
import { useAdRevenue } from '@/contexts/AdRevenueContext';
import {
  RewardedAd as GoogleRewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

interface RewardedAdProps {
  visible: boolean;
  onAdWatched: () => void;
  onAdClosed: () => void;
  adType: 'match' | 'message';
}

const { width, height } = Dimensions.get('window');

// AdMob Rewarded Ad Unit IDs
// IMPORTANT: Replace these with your actual Ad Unit IDs from AdMob console
const ADMOB_REWARDED_AD_UNIT_ID = Platform.select({
  ios: __DEV__ ? TestIds.REWARDED : 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
  android: __DEV__ ? TestIds.REWARDED : 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
  default: TestIds.REWARDED,
});

// Create rewarded ad instance
let rewardedAd: GoogleRewardedAd | null = null;

export default function RewardedAd({
  visible,
  onAdWatched,
  onAdClosed,
  adType,
}: RewardedAdProps) {
  const { trackAdView } = useAdRevenue();
  const [isLoading, setIsLoading] = useState(true);
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [canClose, setCanClose] = useState(false);
  const [rewardEarned, setRewardEarned] = useState(false);

  // Initialize and load rewarded ad
  useEffect(() => {
    if (Platform.OS === 'web') {
      // Web fallback - use simulated ad
      setIsLoading(false);
      setAdLoaded(true);
      return;
    }

    if (visible && !rewardedAd) {
      console.log('Creating rewarded ad instance...');
      rewardedAd = GoogleRewardedAd.createForAdRequest(ADMOB_REWARDED_AD_UNIT_ID, {
        requestNonPersonalizedAdsOnly: false,
      });

      // Set up event listeners
      const loadedListener = rewardedAd.addAdEventListener(
        RewardedAdEventType.LOADED,
        () => {
          console.log('Rewarded ad loaded successfully');
          setAdLoaded(true);
          setIsLoading(false);
          setAdError(false);
        }
      );

      const earnedRewardListener = rewardedAd.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD,
        (reward) => {
          console.log('User earned reward:', reward);
          setRewardEarned(true);
          trackAdView(adType);
        }
      );

      const closedListener = rewardedAd.addAdEventListener(
        RewardedAdEventType.CLOSED,
        () => {
          console.log('Rewarded ad closed');
          if (rewardEarned) {
            onAdWatched();
          }
          onAdClosed();
          // Clean up for next ad
          rewardedAd = null;
          setRewardEarned(false);
        }
      );

      const errorListener = rewardedAd.addAdEventListener(
        RewardedAdEventType.ERROR,
        (error) => {
          console.log('Rewarded ad error:', error);
          setAdError(true);
          setIsLoading(false);
        }
      );

      // Load the ad
      rewardedAd.load();

      return () => {
        loadedListener();
        earnedRewardListener();
        closedListener();
        errorListener();
      };
    }
  }, [visible, adType, trackAdView, onAdWatched, onAdClosed, rewardEarned]);

  // Show ad when loaded
  useEffect(() => {
    if (visible && adLoaded && rewardedAd && Platform.OS !== 'web') {
      console.log('Showing rewarded ad...');
      rewardedAd.show();
    }
  }, [visible, adLoaded]);

  // Web/Fallback countdown timer
  useEffect(() => {
    if (Platform.OS === 'web' && visible && !isLoading && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (countdown === 0 && !canClose) {
      setCanClose(true);
      console.log('Ad watched completely - reward granted');
      trackAdView(adType);
    }
  }, [countdown, isLoading, canClose, adType, trackAdView, visible]);

  const handleClose = () => {
    if (canClose || Platform.OS === 'web') {
      onAdWatched();
      onAdClosed();
    }
  };

  const handleSkip = () => {
    console.log('User cancelled ad');
    onAdClosed();
    if (rewardedAd) {
      rewardedAd = null;
    }
  };

  // For native platforms, the ad is shown natively, so we don't need to render anything
  if (Platform.OS !== 'web' && !adError) {
    return (
      <Modal
        visible={visible && isLoading}
        animationType="fade"
        transparent={true}
        onRequestClose={handleSkip}
      >
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Loading ad...</Text>
            <Pressable style={styles.cancelButton} onPress={handleSkip}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  }

  // Web fallback or error state
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={false}
      onRequestClose={handleSkip}
    >
      <View style={styles.container}>
        {isLoading && !adError ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Loading ad...</Text>
          </View>
        ) : adError ? (
          <View style={styles.errorContainer}>
            <IconSymbol name="exclamationmark.triangle" size={60} color={colors.primary} />
            <Text style={styles.errorTitle}>Ad Unavailable</Text>
            <Text style={styles.errorText}>
              Unable to load ad at this time. Please try again later.
            </Text>
            <Pressable style={styles.errorButton} onPress={handleSkip}>
              <Text style={styles.errorButtonText}>Close</Text>
            </Pressable>
          </View>
        ) : (
          <>
            {/* Web Fallback Ad Content */}
            <View style={styles.adContent}>
              <View style={styles.adBadge}>
                <Text style={styles.adBadgeText}>SPONSORED AD</Text>
              </View>

              {/* Simulated Ad Content */}
              <View style={styles.adDisplay}>
                <IconSymbol
                  name="heart.circle.fill"
                  size={80}
                  color={colors.primary}
                />
                <Text style={styles.adTitle}>Premium Dating Experience</Text>
                <Text style={styles.adDescription}>
                  Unlock unlimited matches and exclusive features!
                </Text>
                <View style={styles.adCTA}>
                  <Text style={styles.adCTAText}>Learn More</Text>
                </View>
              </View>

              {/* Countdown Timer */}
              {!canClose && (
                <View style={styles.countdownContainer}>
                  <Text style={styles.countdownText}>
                    Watch for {countdown} more {countdown === 1 ? 'second' : 'seconds'}
                  </Text>
                </View>
              )}
            </View>

            {/* Close Button */}
            {canClose ? (
              <Pressable style={styles.closeButton} onPress={handleClose}>
                <IconSymbol name="xmark.circle.fill" size={44} color="#FFFFFF" />
                <Text style={styles.closeButtonText}>Continue</Text>
              </Pressable>
            ) : (
              <Pressable style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipButtonText}>Cancel</Text>
              </Pressable>
            )}
          </>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 32,
    borderRadius: 16,
  },
  loadingText: {
    color: colors.text,
    fontSize: 16,
    marginTop: 16,
  },
  cancelButton: {
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: colors.highlight,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  errorContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 12,
    opacity: 0.8,
  },
  errorButton: {
    marginTop: 32,
    backgroundColor: colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 25,
  },
  errorButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  adContent: {
    flex: 1,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  adBadge: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  adBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  adDisplay: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 40,
    width: '100%',
  },
  adTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 24,
    textAlign: 'center',
  },
  adDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 12,
    textAlign: 'center',
    opacity: 0.9,
  },
  adCTA: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
    marginTop: 24,
  },
  adCTAText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  countdownContainer: {
    position: 'absolute',
    bottom: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  countdownText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  closeButton: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  skipButton: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  skipButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
