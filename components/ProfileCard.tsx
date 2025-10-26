
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Pressable } from 'react-native';
import { User } from '@/types/User';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from './IconSymbol';
import { LinearGradient } from 'expo-linear-gradient';

interface ProfileCardProps {
  user: User;
  onLike?: () => void;
  onPass?: () => void;
  showActions?: boolean;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

export default function ProfileCard({ user, onLike, onPass, showActions = true }: ProfileCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: user.photos[0] }}
          style={styles.image}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        >
          <View style={styles.infoContainer}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{user.name}, {user.age}</Text>
            </View>
            {user.distance && (
              <View style={styles.locationRow}>
                <IconSymbol name="location.fill" size={16} color="#FFFFFF" />
                <Text style={styles.location}>{user.distance} miles away</Text>
              </View>
            )}
            <Text style={styles.bio} numberOfLines={2}>{user.bio}</Text>
            <View style={styles.interestsContainer}>
              {user.interests.slice(0, 3).map((interest, index) => (
                <View key={index} style={styles.interestTag}>
                  <Text style={styles.interestText}>{interest}</Text>
                </View>
              ))}
            </View>
          </View>
        </LinearGradient>
      </View>
      
      {showActions && (
        <View style={styles.actionsContainer}>
          <Pressable
            style={[styles.actionButton, styles.passButton]}
            onPress={onPass}
          >
            <IconSymbol name="xmark" size={32} color="#FF6B6B" />
          </Pressable>
          <Pressable
            style={[styles.actionButton, styles.likeButton]}
            onPress={onLike}
          >
            <IconSymbol name="heart.fill" size={32} color={colors.primary} />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 16,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.3,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.card,
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
    elevation: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
  },
  infoContainer: {
    padding: 20,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  bio: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 12,
    lineHeight: 20,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  interestText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 20,
  },
  actionButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  passButton: {
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  likeButton: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
});
