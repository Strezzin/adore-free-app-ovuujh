
import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Match } from '@/types/User';
import { colors } from '@/styles/commonStyles';
import { router } from 'expo-router';

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
  const handlePress = () => {
    router.push(`/chat/${match.id}`);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: match.user.photos[0] }}
          style={styles.image}
          resizeMode="cover"
        />
        {match.unreadCount && match.unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{match.unreadCount}</Text>
          </View>
        )}
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.topRow}>
          <Text style={styles.name}>{match.user.name}</Text>
          <Text style={styles.time}>{formatTime(match.matchedAt)}</Text>
        </View>
        {match.lastMessage && (
          <Text style={styles.lastMessage} numberOfLines={1}>
            {match.lastMessage}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.highlight,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.primary,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  time: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  lastMessage: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
