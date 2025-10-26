
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { useRouter, usePathname } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { BlurView } from 'expo-blur';
import { colors } from '@/styles/commonStyles';

export interface TabBarItem {
  name: string;
  route: string;
  icon: string;
  label: string;
}

interface FloatingTabBarProps {
  tabs: TabBarItem[];
  containerWidth?: number;
  borderRadius?: number;
  bottomMargin?: number;
}

export default function FloatingTabBar({
  tabs,
  containerWidth = Dimensions.get('window').width - 32,
  borderRadius = 24,
  bottomMargin = 16,
}: FloatingTabBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const animatedIndex = useSharedValue(0);

  const handleTabPress = (route: string, index: number) => {
    animatedIndex.value = withSpring(index);
    router.push(route as any);
  };

  const getActiveIndex = () => {
    const index = tabs.findIndex((tab) => {
      if (tab.name === '(home)') {
        return pathname === '/' || pathname.startsWith('/(tabs)/(home)');
      }
      return pathname.includes(tab.name);
    });
    return index >= 0 ? index : 0;
  };

  const activeIndex = getActiveIndex();

  const indicatorStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      animatedIndex.value,
      tabs.map((_, i) => i),
      tabs.map((_, i) => (containerWidth / tabs.length) * i)
    );

    return {
      transform: [{ translateX }],
    };
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={[styles.container, { width: containerWidth, borderRadius, marginBottom: bottomMargin }]}>
        <BlurView intensity={80} tint="light" style={styles.blurView}>
          <Animated.View
            style={[
              styles.indicator,
              {
                width: containerWidth / tabs.length,
                borderRadius: borderRadius - 4,
              },
              indicatorStyle,
            ]}
          />
          {tabs.map((tab, index) => {
            const isActive = index === activeIndex;
            return (
              <TouchableOpacity
                key={tab.name}
                style={styles.tab}
                onPress={() => handleTabPress(tab.route, index)}
                activeOpacity={0.7}
              >
                <IconSymbol
                  name={tab.icon as any}
                  size={24}
                  color={isActive ? colors.primary : colors.text}
                />
                <Text
                  style={[
                    styles.label,
                    { color: isActive ? colors.primary : colors.text },
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </BlurView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  container: {
    overflow: 'hidden',
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
    elevation: 8,
  },
  blurView: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  indicator: {
    position: 'absolute',
    height: '100%',
    backgroundColor: colors.highlight,
    top: 0,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
  },
});
