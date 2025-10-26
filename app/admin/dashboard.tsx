
import React, { useState } from 'react';
import { Stack, router } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { useAdRevenue } from '@/contexts/AdRevenueContext';

export default function AdminDashboardScreen() {
  const { adData, isAdMobInitialized } = useAdRevenue();
  const [paymentConnected, setPaymentConnected] = useState(false);

  const handleConnectPayment = () => {
    Alert.alert(
      'Connect Payment Method',
      'To receive ad revenue, you need to:\n\n' +
      '1. Set up AdMob account at admob.google.com\n' +
      '2. Add payment information in AdMob console\n' +
      '3. Configure your bank account or PayPal\n' +
      '4. Replace test ad unit IDs with your production IDs\n\n' +
      'Would you like to open AdMob console?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Open AdMob',
          onPress: () => {
            Linking.openURL('https://admob.google.com');
          },
        },
      ]
    );
  };

  const handleFacebookAudienceNetwork = () => {
    Alert.alert(
      'Facebook Audience Network',
      'To enable Facebook Audience Network:\n\n' +
      '1. Create a Facebook Developer account\n' +
      '2. Set up Audience Network in Meta Business Suite\n' +
      '3. Create placement IDs for your ads\n' +
      '4. Update app.json with your Facebook App ID\n' +
      '5. Implement Facebook ad components\n\n' +
      'Would you like to open Facebook for Developers?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Open Facebook',
          onPress: () => {
            Linking.openURL('https://developers.facebook.com/docs/audience-network');
          },
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          router.replace('/admin/login');
        },
      },
    ]);
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Admin Dashboard',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerRight: () => (
            <Pressable onPress={handleLogout} style={{ marginRight: 8 }}>
              <IconSymbol name="rectangle.portrait.and.arrow.right" size={24} color={colors.text} />
            </Pressable>
          ),
        }}
      />
      <ScrollView style={styles.container}>
        {/* AdMob Status */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <IconSymbol
              name={isAdMobInitialized ? 'checkmark.circle.fill' : 'exclamationmark.circle.fill'}
              size={24}
              color={isAdMobInitialized ? '#4CAF50' : '#FF9800'}
            />
            <Text style={styles.statusTitle}>
              AdMob Status: {isAdMobInitialized ? 'Active' : 'Initializing'}
            </Text>
          </View>
          {Platform.OS === 'web' && (
            <Text style={styles.statusNote}>
              Note: Ads are only displayed on mobile devices (iOS/Android)
            </Text>
          )}
        </View>

        {/* Revenue Overview */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Revenue Overview</Text>
          
          <View style={styles.revenueRow}>
            <View style={styles.revenueItem}>
              <Text style={styles.revenueLabel}>Total Revenue</Text>
              <Text style={styles.revenueAmount}>
                {formatCurrency(adData.totalRevenue)}
              </Text>
            </View>
            <View style={styles.revenueItem}>
              <Text style={styles.revenueLabel}>Today&apos;s Revenue</Text>
              <Text style={styles.revenueAmount}>
                {formatCurrency(adData.todayRevenue)}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{adData.totalViews}</Text>
              <Text style={styles.statLabel}>Total Ad Views</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{adData.todayViews}</Text>
              <Text style={styles.statLabel}>Today&apos;s Views</Text>
            </View>
          </View>
        </View>

        {/* Ad Type Breakdown */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ad Performance by Type</Text>
          
          <View style={styles.adTypeRow}>
            <View style={styles.adTypeItem}>
              <IconSymbol name="heart.fill" size={24} color={colors.primary} />
              <Text style={styles.adTypeLabel}>Match Ads</Text>
              <Text style={styles.adTypeValue}>{adData.matchAdViews}</Text>
              <Text style={styles.adTypeRevenue}>
                {formatCurrency(adData.matchAdViews * 0.10)}
              </Text>
            </View>

            <View style={styles.adTypeItem}>
              <IconSymbol name="message.fill" size={24} color={colors.primary} />
              <Text style={styles.adTypeLabel}>Message Ads</Text>
              <Text style={styles.adTypeValue}>{adData.messageAdViews}</Text>
              <Text style={styles.adTypeRevenue}>
                {formatCurrency(adData.messageAdViews * 0.10)}
              </Text>
            </View>
          </View>

          <View style={styles.adTypeRow}>
            <View style={styles.adTypeItem}>
              <IconSymbol name="rectangle.fill" size={24} color={colors.primary} />
              <Text style={styles.adTypeLabel}>Banner Ads</Text>
              <Text style={styles.adTypeValue}>{adData.bannerAdViews}</Text>
              <Text style={styles.adTypeRevenue}>
                {formatCurrency(adData.bannerAdViews * 0.01)}
              </Text>
            </View>

            <View style={styles.adTypeItem}>
              <IconSymbol name="square.fill" size={24} color={colors.primary} />
              <Text style={styles.adTypeLabel}>Interstitial</Text>
              <Text style={styles.adTypeValue}>{adData.interstitialAdViews}</Text>
              <Text style={styles.adTypeRevenue}>
                {formatCurrency(adData.interstitialAdViews * 0.05)}
              </Text>
            </View>
          </View>
        </View>

        {/* Payment Setup */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment Setup</Text>
          
          <Pressable
            style={[styles.button, paymentConnected && styles.buttonConnected]}
            onPress={handleConnectPayment}
          >
            <IconSymbol
              name={paymentConnected ? 'checkmark.circle.fill' : 'creditcard.fill'}
              size={24}
              color="#FFFFFF"
            />
            <Text style={styles.buttonText}>
              {paymentConnected ? 'Payment Connected' : 'Connect AdMob Payment'}
            </Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.buttonSecondary]}
            onPress={handleFacebookAudienceNetwork}
          >
            <IconSymbol name="globe" size={24} color={colors.text} />
            <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
              Setup Facebook Audience Network
            </Text>
          </Pressable>
        </View>

        {/* Setup Instructions */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Setup Instructions</Text>
          
          <View style={styles.instructionItem}>
            <View style={styles.instructionNumber}>
              <Text style={styles.instructionNumberText}>1</Text>
            </View>
            <View style={styles.instructionContent}>
              <Text style={styles.instructionTitle}>Create AdMob Account</Text>
              <Text style={styles.instructionText}>
                Sign up at admob.google.com and create your app
              </Text>
            </View>
          </View>

          <View style={styles.instructionItem}>
            <View style={styles.instructionNumber}>
              <Text style={styles.instructionNumberText}>2</Text>
            </View>
            <View style={styles.instructionContent}>
              <Text style={styles.instructionTitle}>Get Ad Unit IDs</Text>
              <Text style={styles.instructionText}>
                Create ad units and replace test IDs in the code
              </Text>
            </View>
          </View>

          <View style={styles.instructionItem}>
            <View style={styles.instructionNumber}>
              <Text style={styles.instructionNumberText}>3</Text>
            </View>
            <View style={styles.instructionContent}>
              <Text style={styles.instructionTitle}>Add Payment Method</Text>
              <Text style={styles.instructionText}>
                Configure bank account or PayPal in AdMob
              </Text>
            </View>
          </View>

          <View style={styles.instructionItem}>
            <View style={styles.instructionNumber}>
              <Text style={styles.instructionNumberText}>4</Text>
            </View>
            <View style={styles.instructionContent}>
              <Text style={styles.instructionTitle}>Build & Deploy</Text>
              <Text style={styles.instructionText}>
                Create production build and submit to app stores
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  statusCard: {
    backgroundColor: colors.highlight,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  statusNote: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
  },
  card: {
    backgroundColor: colors.highlight,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  revenueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  revenueItem: {
    flex: 1,
  },
  revenueLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  revenueAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.primary,
    opacity: 0.2,
    marginVertical: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  adTypeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  adTypeItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.background,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  adTypeLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 8,
    marginBottom: 4,
  },
  adTypeValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  adTypeRevenue: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  buttonConnected: {
    backgroundColor: '#4CAF50',
  },
  buttonSecondary: {
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextSecondary: {
    color: colors.text,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  instructionNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  instructionNumberText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  instructionContent: {
    flex: 1,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  instructionText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
