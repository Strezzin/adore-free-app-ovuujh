
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import ProfileCard from '@/components/ProfileCard';
import AdBanner from '@/components/AdBanner';
import { mockUsers } from '@/data/mockUsers';
import { User } from '@/types/User';

export default function HomeScreen() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLike = () => {
    console.log('Liked:', users[currentIndex].name);
    Alert.alert('It&apos;s a Match! 💕', `You and ${users[currentIndex].name} liked each other!`);
    moveToNext();
  };

  const handlePass = () => {
    console.log('Passed:', users[currentIndex].name);
    moveToNext();
  };

  const moveToNext = () => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      Alert.alert('No More Profiles', 'Check back later for more matches!');
    }
  };

  const currentUser = users[currentIndex];

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Discover',
            headerLargeTitle: true,
          }}
        />
      )}
      <View style={styles.container}>
        <AdBanner position="top" />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.contentContainer,
            Platform.OS !== 'ios' && styles.contentContainerWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          {currentUser ? (
            <>
              <ProfileCard
                user={currentUser}
                onLike={handleLike}
                onPass={handlePass}
              />
              <View style={styles.statsContainer}>
                <Text style={styles.statsText}>
                  {currentIndex + 1} of {users.length} profiles
                </Text>
              </View>
            </>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No More Profiles</Text>
              <Text style={styles.emptyText}>
                Check back later for more potential matches!
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 8,
  },
  contentContainerWithTabBar: {
    paddingBottom: 100,
  },
  statsContainer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  statsText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
