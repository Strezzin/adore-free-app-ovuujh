
# Quick Start - Making Money with Ads

## 🚀 Get Started in 5 Minutes

Your dating app is already integrated with AdMob! Follow these steps to start making money:

## Step 1: Create AdMob Account (2 minutes)

1. Visit [admob.google.com](https://admob.google.com)
2. Click "Get Started"
3. Sign in with your Google account
4. Complete the registration

## Step 2: Add Your App (1 minute)

1. Click "Apps" → "Add App"
2. Choose your platform (iOS or Android)
3. Enter app name: "Natively Dating"
4. Click "Add"

## Step 3: Create Ad Units (2 minutes)

Create these 3 ad units:

### Banner Ad
- Click "Ad units" → "Add ad unit" → "Banner"
- Name: "Dating Banner"
- Copy the Ad Unit ID

### Rewarded Ad
- Click "Add ad unit" → "Rewarded"
- Name: "Dating Rewarded"
- Copy the Ad Unit ID

### Interstitial Ad
- Click "Add ad unit" → "Interstitial"
- Name: "Dating Interstitial"
- Copy the Ad Unit ID

## Step 4: Update Your Code

Open these files and replace the test IDs:

**components/AdBanner.tsx** (line 12):
```typescript
ios: 'YOUR_IOS_BANNER_ID_HERE',
android: 'YOUR_ANDROID_BANNER_ID_HERE',
```

**components/RewardedAd.tsx** (line 24):
```typescript
ios: 'YOUR_IOS_REWARDED_ID_HERE',
android: 'YOUR_ANDROID_REWARDED_ID_HERE',
```

**components/InterstitialAdManager.tsx** (line 12):
```typescript
ios: 'YOUR_IOS_INTERSTITIAL_ID_HERE',
android: 'YOUR_ANDROID_INTERSTITIAL_ID_HERE',
```

**app.json** (lines 20 and 35):
```json
"GADApplicationIdentifier": "YOUR_IOS_APP_ID_HERE"
"androidAppId": "YOUR_ANDROID_APP_ID_HERE",
"iosAppId": "YOUR_IOS_APP_ID_HERE"
```

## Step 5: Set Up Payment

1. In AdMob, go to "Payments"
2. Click "Add payment method"
3. Enter your bank account or PayPal
4. Verify your information

**You'll receive payments when you reach $100!**

## 💰 How Much Will You Make?

### Revenue Per Ad:
- **Match Ads (Rewarded):** $0.10 per view
- **Message Ads (Rewarded):** $0.10 per view
- **Banner Ads:** $0.01 per view
- **Interstitial Ads:** $0.05 per view

### Example Monthly Revenue:
With 1,000 active users:
- 10,000 match ads = $1,000
- 20,000 message ads = $2,000
- 50,000 banner views = $500
- **Total: $3,500/month**

With 10,000 active users:
- **Potential: $35,000/month**

## 📱 How Ads Work in Your App

### Users Must Watch Ads To:
1. **Match with someone** → Rewarded ad plays
2. **Send a message** → Rewarded ad plays

### Ads Also Show:
- **Banner ads** at bottom of screens
- **Interstitial ads** between screens (optional)

## 🎯 Build & Deploy

### For iOS:
```bash
eas build --platform ios
```

### For Android:
```bash
eas build --platform android
```

### Or use Expo:
```bash
expo build:ios
expo build:android
```

## 📊 Track Your Revenue

### In Your App:
1. Go to Profile tab
2. Tap "Admin Access"
3. Login with: admin / admin123
4. View real-time revenue dashboard

### In AdMob:
- Visit [admob.google.com](https://admob.google.com)
- Check "Reports" for detailed analytics
- Monitor daily earnings

## ⚠️ Important Rules

1. **Never click your own ads** - This violates AdMob policy
2. **Use production IDs** - Test IDs don't generate revenue
3. **Don't encourage clicks** - Let users click naturally
4. **Follow policies** - Review AdMob content policies

## 🎉 You're Ready!

Your app is configured to make money immediately once you:
1. ✅ Replace test ad unit IDs with your production IDs
2. ✅ Build the app for production
3. ✅ Deploy to app stores
4. ✅ Users start watching ads

## 💡 Tips to Maximize Revenue

1. **Get more users** - More users = more ad views
2. **Encourage engagement** - More matches/messages = more ads
3. **Optimize placement** - Test different ad frequencies
4. **Use mediation** - Add Facebook Audience Network for higher fill rates

## 📞 Need Help?

- **AdMob Support:** [support.google.com/admob](https://support.google.com/admob)
- **Full Guide:** See `AD_INTEGRATION_GUIDE.md`

---

**Start making money today! 🚀💰**
