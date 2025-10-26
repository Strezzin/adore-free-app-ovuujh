
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  Platform,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { useAdRevenue } from '@/contexts/AdRevenueContext';

export default function AdminDashboardScreen() {
  const { adData } = useAdRevenue();
  const [paymentConnected, setPaymentConnected] = useState(false);

  const handleConnectPayment = () => {
    Alert.alert(
      'Connect Payment Method',
      'To collect ad revenue, you need to integrate a payment provider like Stripe.\n\n' +
      'Steps:\n' +
      '1. Create a Stripe account\n' +
      '2. Get your API keys\n' +
      '3. Set up a backend server\n' +
      '4. Configure automatic payouts\n\n' +
      'Would you like to see the integration guide?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'View Guide',
          onPress: () => {
            console.log('Opening payment integration guide');
            Alert.alert(
              'Payment Integration',
              'Install Stripe:\nnpx expo install @stripe/stripe-react-native\n\n' +
              'Then configure your backend to handle payouts to your debit card.'
            );
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
          console.log('Admin logged out');
          router.back();
        },
      },
    ]);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Admin Dashboard',
          headerBackTitle: 'Back',
          headerRight: () => (
            <Pressable onPress={handleLogout}>
              <Text style={{ color: colors.primary, fontSize: 16 }}>Logout</Text>
            </Pressable>
          ),
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Revenue Dashboard</Text>
          <Text style={styles.subtitle}>Track your ad earnings</Text>
        </View>

        {/* Payment Status */}
        <View style={[styles.card, !paymentConnected && styles.warningCard]}>
          <View style={styles.cardHeader}>
            <IconSymbol
              name={paymentConnected ? 'checkmark.circle.fill' : 'exclamationmark.triangle.fill'}
              size={24}
              color={paymentConnected ? '#4CAF50' : '#FF9800'}
            />
            <Text style={styles.cardTitle}>Payment Method</Text>
          </View>
          {paymentConnected ? (
            <Text style={styles.cardText}>
              ✓ Connected to Stripe{'\n'}
              Payouts: Weekly to •••• 1234
            </Text>
          ) : (
            <>
              <Text style={styles.cardText}>
                No payment method connected yet
              </Text>
              <Pressable style={styles.connectButton} onPress={handleConnectPayment}>
                <Text style={styles.connectButtonText}>Connect Debit Card</Text>
              </Pressable>
            </>
          )}
        </View>

        {/* Revenue Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <IconSymbol name="dollarsign.circle.fill" size={32} color={colors.primary} />
            <Text style={styles.statValue}>${adData.totalRevenue.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Total Revenue</Text>
          </View>

          <View style={styles.statCard}>
            <IconSymbol name="eye.fill" size={32} color={colors.primary} />
            <Text style={styles.statValue}>{adData.totalViews}</Text>
            <Text style={styles.statLabel}>Total Ad Views</Text>
          </View>

          <View style={styles.statCard}>
            <IconSymbol name="calendar" size={32} color={colors.primary} />
            <Text style={styles.statValue}>${adData.todayRevenue.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Today&apos;s Revenue</Text>
          </View>

          <View style={styles.statCard}>
            <IconSymbol name="chart.bar.fill" size={32} color={colors.primary} />
            <Text style={styles.statValue}>{adData.todayViews}</Text>
            <Text style={styles.statLabel}>Today&apos;s Views</Text>
          </View>
        </View>

        {/* Ad Type Breakdown */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ad Type Breakdown</Text>
          <View style={styles.breakdownRow}>
            <View style={styles.breakdownItem}>
              <IconSymbol name="heart.fill" size={20} color={colors.primary} />
              <Text style={styles.breakdownLabel}>Match Ads</Text>
            </View>
            <Text style={styles.breakdownValue}>{adData.matchAdViews} views</Text>
          </View>
          <View style={styles.breakdownRow}>
            <View style={styles.breakdownItem}>
              <IconSymbol name="message.fill" size={20} color={colors.primary} />
              <Text style={styles.breakdownLabel}>Message Ads</Text>
            </View>
            <Text style={styles.breakdownValue}>{adData.messageAdViews} views</Text>
          </View>
        </View>

        {/* Revenue Info */}
        <View style={styles.infoCard}>
          <IconSymbol name="info.circle.fill" size={24} color={colors.primary} />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>How Ad Revenue Works</Text>
            <Text style={styles.infoText}>
              - Users watch ads before matching or messaging{'\n'}
              - You earn approximately $0.05 per ad view{'\n'}
              - Revenue is tracked in real-time{'\n'}
              - Payouts are processed weekly via Stripe{'\n'}
              - Connect your debit card to receive payments
            </Text>
          </View>
        </View>

        {/* Integration Guide */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Next Steps</Text>
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepText}>
              Connect your payment method to receive revenue
            </Text>
          </View>
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepText}>
              Integrate real ad networks (AdMob, Facebook Audience Network)
            </Text>
          </View>
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepText}>
              Set up backend server for payment processing
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  warningCard: {
    borderWidth: 2,
    borderColor: '#FF9800',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 8,
  },
  cardText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  connectButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 12,
    alignItems: 'center',
  },
  connectButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
    marginBottom: 16,
  },
  statCard: {
    width: '50%',
    padding: 8,
  },
  statCardInner: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  breakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breakdownLabel: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 8,
  },
  breakdownValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  infoCard: {
    backgroundColor: colors.highlight,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    paddingTop: 4,
  },
});
