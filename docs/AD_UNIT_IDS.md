
# Ad Unit IDs Configuration

## 📝 Replace These IDs

Before deploying to production, replace all test ad unit IDs with your actual AdMob ad unit IDs.

## 🔍 Where to Find Your Ad Unit IDs

1. Go to [admob.google.com](https://admob.google.com)
2. Click on "Apps" → Select your app
3. Click on "Ad units"
4. Copy each ad unit ID

## 📱 iOS Ad Unit IDs

### App ID
**File:** `app.json` (line 20)
```
Current: ca-app-pub-3940256099942544~1458002511 (TEST)
Replace with: ca-app-pub-XXXXXXXXXXXXXXXX~ZZZZZZZZZZ
```

### Banner Ad Unit
**File:** `components/AdBanner.tsx` (line 13)
```
Current: ca-app-pub-3940256099942544~1458002511 (TEST)
Replace with: ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY
```

### Rewarded Ad Unit
**File:** `components/RewardedAd.tsx` (line 25)
```
Current: ca-app-pub-3940256099942544~1458002511 (TEST)
Replace with: ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY
```

### Interstitial Ad Unit
**File:** `components/InterstitialAdManager.tsx` (line 13)
```
Current: ca-app-pub-3940256099942544~1458002511 (TEST)
Replace with: ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY
```

## 🤖 Android Ad Unit IDs

### App ID
**File:** `app.json` (line 35)
```
Current: ca-app-pub-3940256099942544~3347511713 (TEST)
Replace with: ca-app-pub-XXXXXXXXXXXXXXXX~ZZZZZZZZZZ
```

### Banner Ad Unit
**File:** `components/AdBanner.tsx` (line 14)
```
Current: ca-app-pub-3940256099942544~3347511713 (TEST)
Replace with: ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY
```

### Rewarded Ad Unit
**File:** `components/RewardedAd.tsx` (line 26)
```
Current: ca-app-pub-3940256099942544~3347511713 (TEST)
Replace with: ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY
```

### Interstitial Ad Unit
**File:** `components/InterstitialAdManager.tsx` (line 14)
```
Current: ca-app-pub-3940256099942544~3347511713 (TEST)
Replace with: ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY
```

## 📘 Facebook Audience Network (Optional)

### App ID & Client Token
**File:** `app.json` (lines 42-43)
```
Current: YOUR_FACEBOOK_APP_ID (PLACEHOLDER)
Replace with: Your actual Facebook App ID

Current: YOUR_FACEBOOK_CLIENT_TOKEN (PLACEHOLDER)
Replace with: Your actual Facebook Client Token
```

## ✅ Checklist

Before deploying to production:

- [ ] Created AdMob account
- [ ] Added app to AdMob
- [ ] Created Banner ad unit
- [ ] Created Rewarded ad unit
- [ ] Created Interstitial ad unit
- [ ] Replaced iOS App ID in app.json
- [ ] Replaced Android App ID in app.json
- [ ] Replaced iOS Banner ID in AdBanner.tsx
- [ ] Replaced Android Banner ID in AdBanner.tsx
- [ ] Replaced iOS Rewarded ID in RewardedAd.tsx
- [ ] Replaced Android Rewarded ID in RewardedAd.tsx
- [ ] Replaced iOS Interstitial ID in InterstitialAdManager.tsx
- [ ] Replaced Android Interstitial ID in InterstitialAdManager.tsx
- [ ] Set up payment method in AdMob
- [ ] Built production version of app
- [ ] Tested ads on real device

## ⚠️ Important Notes

1. **Test IDs don't generate revenue** - They're only for testing
2. **Each platform needs its own IDs** - iOS and Android are separate
3. **App ID vs Ad Unit ID** - Don't confuse them:
   - App ID: Identifies your app (ends with ~)
   - Ad Unit ID: Identifies specific ad placement (ends with /)
4. **Keep IDs secure** - Don't share them publicly

## 🔄 After Replacing IDs

1. Remove `__DEV__ ?` checks if you want to test production ads in development
2. Build a new version of your app
3. Test on a real device (not simulator)
4. Verify ads are loading in AdMob console
5. Monitor revenue in admin dashboard

## 📊 Verification

To verify your setup:
1. Build and run the app on a real device
2. Check the admin dashboard - AdMob status should show "Active"
3. Try to match or send a message - rewarded ad should show
4. Check AdMob console for ad requests

---

**Remember: Real revenue only comes from production ad unit IDs!** 💰
