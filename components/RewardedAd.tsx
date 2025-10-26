
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from './IconSymbol';
import { useAdRevenue } from '@/contexts/AdRevenueContext';

interface RewardedAdProps {
  visible: boolean;
  onAdWatched: () => void;
  onAdClosed: () => void;
  adType: 'match' | 'message';
}

const { width, height } = Dimensions.get('window');

export default function RewardedAd({
  visible,
  onAdWatched,
  onAdClosed,
  adType,
}: RewardedAdProps) {
  const { trackAdView } = useAdRevenue();
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsLoading(true);
      setCountdown(5);
      setCanClose(false);

      // Simulate ad loading
      const loadTimer = setTimeout(() => {
        setIsLoading(false);
        console.log('Rewarded ad loaded');
      }, 1500);

      return () => clearTimeout(loadTimer);
    }
  }, [visible]);

  useEffect(() => {
    if (!isLoading && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (countdown === 0 && !canClose) {
      setCanClose(true);
      console.log('Ad watched completely - reward granted');
      // Track ad view for revenue
      trackAdView(adType);
    }
  }, [countdown, isLoading, canClose, adType, trackAdView]);

  const handleClose = () => {
    if (canClose) {
      onAdWatched();
      onAdClosed();
    }
  };

  const handleSkip = () => {
    console.log('User attempted to skip ad');
    onAdClosed();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={false}
      onRequestClose={handleSkip}
    >
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Loading ad...</Text>
          </View>
        ) : (
          <>
            {/* Ad Content */}
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
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 16,
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
