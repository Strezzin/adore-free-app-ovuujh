
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '@/styles/commonStyles';

interface AdBannerProps {
  position?: 'top' | 'bottom';
}

export default function AdBanner({ position = 'bottom' }: AdBannerProps) {
  const handleAdPress = () => {
    console.log('Ad clicked - would open advertiser content');
  };

  return (
    <Pressable onPress={handleAdPress}>
      <View style={[styles.container, position === 'top' && styles.topPosition]}>
        <View style={styles.adLabel}>
          <Text style={styles.adLabelText}>Ad</Text>
        </View>
        <Text style={styles.adText}>
          Premium Dating Features - Upgrade Now!
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.highlight,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.primary,
  },
  topPosition: {
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
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
});
