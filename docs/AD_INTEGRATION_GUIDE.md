
# Ad Integration Guide - AdMob & Facebook Audience Network

This guide will help you set up real money-making ads in your dating app using AdMob and Facebook Audience Network.

## 🎯 Overview

Your app is now integrated with:
- **Google AdMob** - Primary ad network (Banner, Rewarded, Interstitial ads)
- **Facebook Audience Network** - Secondary ad network (optional)

## 📱 AdMob Setup (Primary)

### Step 1: Create AdMob Account
1. Go to [admob.google.com](https://admob.google.com)
2. Sign in with your Google account
3. Click "Get Started" and follow the setup wizard

### Step 2: Create Your App in AdMob
1. In AdMob console, click "Apps" → "Add App"
2. Select your platform (iOS/Android)
3. Enter your app name: "Natively Dating"
4. Follow the prompts to complete app setup

### Step 3: Create Ad Units
You need to create 3 types of ad units:

#### Banner Ad Unit
1. Go to "Apps" → Select your app → "Ad units" → "Add ad unit"
2. Select "Banner"
3. Name it: "Dating App Banner"
4. Copy the Ad Unit ID (format: ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY)

#### Rewarded Ad Unit
1. Create another ad unit
2. Select "Rewarded"
3. Name it: "Dating App Rewarded"
4. Copy the Ad Unit ID

#### Interstitial Ad Unit
1. Create another ad unit
2. Select "Interstitial"
3. Name it: "Dating App Interstitial"
4. Copy the Ad Unit ID

### Step 4: Update Your Code
Replace the test ad unit IDs in these files:

**components/AdBanner.tsx:**
```typescript
const ADMOB_BANNER_AD_UNIT_ID = Platform.select({
  ios: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY', // Your iOS Banner ID
  android: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY', // Your Android Banner ID
});
```

**components/RewardedAd.tsx:**
```typescript
const ADMOB_REWARDED_AD_UNIT_ID = Platform.select({
  ios: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY', // Your iOS Rewarded ID
  android: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY', // Your Android Rewarded ID
});
```

**components/InterstitialAdManager.tsx:**
```typescript
const ADMOB_INTERSTITIAL_AD_UNIT_ID = Platform.select({
  ios: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY', // Your iOS Interstitial ID
  android: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY', // Your Android Interstitial ID
});
```

### Step 5: Update app.json
Replace the App IDs in app.json:

```json
{
  "expo": {
    "ios": {
      "infoPlist": {
        "GADApplicationIdentifier": "ca-app-pub-XXXXXXXXXXXXXXXX~ZZZZZZZZZZ"
      }
    },
    "plugins": [
      [
        "react-native-google-mobile-ads",
        {
          "androidAppId": "ca-app-pub-XXXXXXXXXXXXXXXX~ZZZZZZZZZZ",
          "iosAppId": "ca-app-pub-XXXXXXXXXXXXXXXX~ZZZZZZZZZZ"
        }
      ]
    ]
  }
}
```

### Step 6: Set Up Payment
1. In AdMob console, go to "Payments"
2. Click "Add payment method"
3. Choose between:
   - **Bank transfer** (recommended for higher amounts)
   - **PayPal** (faster setup)
4. Enter your payment details
5. Verify your information

**Payment Threshold:**
- Minimum payout: $100 USD
- Payment schedule: Monthly (around 21st of each month)

## 💰 Expected Revenue

Based on industry averages:

| Ad Type | Revenue per View | Use Case |
|---------|-----------------|----------|
| Rewarded (Match) | $0.10 | Before matching with someone |
| Rewarded (Message) | $0.10 | Before sending a message |
| Banner | $0.01 | Displayed on screens |
| Interstitial | $0.05 | Between screen transitions |

**Example Monthly Revenue:**
- 1,000 users × 10 matches/month = 10,000 rewarded ads = $1,000
- 1,000 users × 20 messages/month = 20,000 rewarded ads = $2,000
- Banner impressions = Additional revenue

## 📘 Facebook Audience Network Setup (Optional)

### Step 1: Create Facebook Developer Account
1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Sign up or log in
3. Create a new app

### Step 2: Enable Audience Network
1. In your Facebook app dashboard, add "Audience Network" product
2. Go to Audience Network → Placements
3. Create placements for:
   - Banner ads
   - Rewarded video ads
   - Interstitial ads

### Step 3: Get Your IDs
1. Copy your Facebook App ID
2. Copy your Client Token
3. Copy each Placement ID

### Step 4: Update app.json
```json
{
  "plugins": [
    [
      "react-native-fbsdk-next",
      {
        "appID": "YOUR_FACEBOOK_APP_ID",
        "clientToken": "YOUR_FACEBOOK_CLIENT_TOKEN",
        "displayName": "Natively Dating"
      }
    ]
  ]
}
```

### Step 5: Implement Facebook Ads
Create a new component for Facebook ads or use mediation through AdMob.

## 🚀 Building for Production

### iOS Build
```bash
# Create production build
eas build --platform ios --profile production

# Or using Expo
expo build:ios
```

### Android Build
```bash
# Create production build
eas build --platform android --profile production

# Or using Expo
expo build:android
```

## 📊 Monitoring Revenue

### In the App
- Admin dashboard shows real-time ad statistics
- Track views by ad type
- Monitor daily and total revenue

### In AdMob Console
- View detailed analytics
- See eCPM (effective cost per thousand impressions)
- Track fill rates and click-through rates
- Monitor payment status

### In Facebook Audience Network
- View performance metrics
- Compare with AdMob performance
- Optimize placement strategies

## ⚠️ Important Notes

1. **Test Ads vs Production Ads:**
   - Test ads (TestIds) don't generate revenue
   - Always use production ad unit IDs in released apps
   - Never click your own ads (violates AdMob policy)

2. **Ad Policies:**
   - Review [AdMob policies](https://support.google.com/admob/answer/6128543)
   - Ensure your app complies with content policies
   - Don't encourage users to click ads

3. **User Experience:**
   - Don't show too many ads
   - Rewarded ads should provide clear value
   - Banner ads should not obstruct content

4. **Revenue Optimization:**
   - Test different ad placements
   - Monitor fill rates
   - Use mediation to maximize revenue
   - A/B test ad frequencies

## 🔧 Troubleshooting

### Ads Not Showing
- Check if AdMob is initialized (see admin dashboard)
- Verify ad unit IDs are correct
- Ensure app is built with production configuration
- Check internet connection

### Low Revenue
- Increase user engagement
- Optimize ad placements
- Enable mediation with multiple networks
- Target high-value demographics

### Payment Issues
- Verify payment information is correct
- Ensure you've reached minimum threshold ($100)
- Check for policy violations
- Contact AdMob support if needed

## 📞 Support

- **AdMob Support:** [support.google.com/admob](https://support.google.com/admob)
- **Facebook Audience Network:** [developers.facebook.com/support](https://developers.facebook.com/support)

## 🎉 Next Steps

1. ✅ Complete AdMob account setup
2. ✅ Create and configure ad units
3. ✅ Update code with production ad unit IDs
4. ✅ Set up payment method
5. ✅ Build and test production app
6. ✅ Submit to app stores
7. ✅ Monitor revenue in admin dashboard
8. ✅ Optimize based on performance data

Your app is now ready to generate revenue through ads! 🚀💰
