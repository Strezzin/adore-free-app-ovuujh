
# Payment Integration Guide

## Overview

This guide explains how to connect your debit card to collect ad revenue from your dating app.

## Prerequisites

- Admin access to the app
- Valid debit card or bank account
- Email address for Stripe account
- Business information (if applicable)

## Option 1: Stripe Integration (Recommended)

### Why Stripe?

- ✅ Easy integration with React Native
- ✅ Secure payment processing
- ✅ Automatic payouts to debit card
- ✅ Comprehensive dashboard
- ✅ Global support

### Step 1: Create Stripe Account

1. Go to [stripe.com](https://stripe.com)
2. Click "Start now" or "Sign up"
3. Enter your email and create password
4. Verify your email address

### Step 2: Complete Stripe Onboarding

1. **Business Information**:
   - Business type (Individual or Company)
   - Business name
   - Business address
   - Tax ID (if applicable)

2. **Personal Information**:
   - Full legal name
   - Date of birth
   - Phone number
   - Address

3. **Bank Account**:
   - Bank name
   - Account number
   - Routing number
   - Or connect debit card directly

### Step 3: Get Stripe API Keys

1. Go to Stripe Dashboard
2. Click "Developers" → "API keys"
3. Copy your keys:
   - **Publishable key** (starts with `pk_`)
   - **Secret key** (starts with `sk_`)

⚠️ **Keep secret key secure!** Never commit to Git or share publicly.

### Step 4: Install Stripe in Your App

```bash
npx expo install @stripe/stripe-react-native
```

### Step 5: Configure Stripe

Add to your `app.json`:

```json
{
  "expo": {
    "plugins": [
      [
        "@stripe/stripe-react-native",
        {
          "merchantIdentifier": "merchant.com.yourapp.dating",
          "enableGooglePay": true
        }
      ]
    ]
  }
}
```

### Step 6: Set Up Backend

You need a backend server to:
- Store ad revenue data securely
- Process payouts to your account
- Handle Stripe API calls
- Validate ad views

**Recommended Backend Options**:

#### A. Supabase (Easiest)

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Set up database tables:
   ```sql
   CREATE TABLE ad_revenue (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id UUID,
     ad_type TEXT,
     revenue DECIMAL(10,2),
     timestamp TIMESTAMP DEFAULT NOW()
   );
   ```
4. Create Edge Functions for Stripe integration

#### B. Firebase

1. Create Firebase project
2. Enable Cloud Functions
3. Set up Firestore database
4. Deploy payment processing functions

#### C. Custom Backend

1. Set up Node.js/Express server
2. Install Stripe SDK: `npm install stripe`
3. Create API endpoints:
   - `POST /api/track-ad` - Track ad views
   - `POST /api/process-payout` - Process payouts
   - `GET /api/revenue-stats` - Get revenue data

### Step 7: Configure Automatic Payouts

1. Go to Stripe Dashboard
2. Click "Balance" → "Payouts"
3. Set payout schedule:
   - **Daily**: Fastest (available for most accounts)
   - **Weekly**: Every Monday
   - **Monthly**: First of each month

4. Verify bank account:
   - Stripe will send 2 small deposits
   - Confirm amounts in Stripe dashboard
   - Account is now verified

### Step 8: Test Integration

1. Use Stripe test mode
2. Test card: `4242 4242 4242 4242`
3. Verify payouts work
4. Check dashboard for transactions

### Step 9: Go Live

1. Switch to live mode in Stripe
2. Update API keys in your app
3. Test with real transactions
4. Monitor first payout

## Option 2: PayPal Integration

### Why PayPal?

- ✅ Widely recognized
- ✅ Easy for users
- ✅ Quick setup
- ❌ Higher fees than Stripe
- ❌ Less developer-friendly

### Setup Steps

1. Create PayPal Business account
2. Get API credentials
3. Install PayPal SDK
4. Configure payment processing
5. Set up automatic transfers to bank

## Option 3: Direct Bank Transfer

### Manual Process

1. Track revenue in admin dashboard
2. Calculate monthly earnings
3. Manually transfer from ad network
4. Record transactions

⚠️ **Not recommended** - Manual and time-consuming

## Revenue Flow

### How Money Moves

1. **User watches ad** → Ad network pays you
2. **Revenue tracked** → Stored in database
3. **Accumulated earnings** → Held in Stripe balance
4. **Automatic payout** → Transferred to your bank
5. **Money in account** → Usually 2-3 business days

### Example Timeline

- **Day 1**: User watches 100 ads = $5.00
- **Day 2**: Revenue tracked in dashboard
- **Day 3**: Stripe processes payout
- **Day 5**: Money arrives in bank account

## Fees & Costs

### Stripe Fees

- **Payment processing**: 2.9% + $0.30 per transaction
- **Payouts**: Free for standard (2-3 days)
- **Instant payouts**: 1% (min $0.50)
- **International**: Additional 1%

### Example Calculation

Monthly revenue: $1,500
- Stripe fees: ~$45
- **Net earnings**: ~$1,455

### PayPal Fees

- **Standard**: 2.9% + $0.30
- **International**: 4.4% + fixed fee
- **Withdrawal**: Free to bank (3-5 days)

## Security Best Practices

### Protect Your Keys

```javascript
// ❌ NEVER do this
const STRIPE_KEY = "sk_live_abc123...";

// ✅ DO this instead
import { STRIPE_SECRET_KEY } from '@env';
```

### Use Environment Variables

Create `.env` file:
```
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

Add to `.gitignore`:
```
.env
.env.local
```

### Server-Side Validation

Always validate on backend:
- Verify ad was actually watched
- Check user authentication
- Prevent duplicate tracking
- Rate limit requests

## Troubleshooting

### Payouts Not Working

1. **Verify bank account** in Stripe
2. **Check payout schedule** settings
3. **Ensure minimum balance** ($1 usually)
4. **Review account status** (not restricted)

### Revenue Not Tracking

1. **Check backend connection**
2. **Verify API keys** are correct
3. **Test in development** mode first
4. **Review console logs** for errors

### Integration Errors

1. **Update dependencies**: `npm update`
2. **Clear cache**: `npx expo start -c`
3. **Rebuild app**: `npx expo prebuild --clean`
4. **Check Stripe dashboard** for issues

## Tax Considerations

### United States

- Report earnings on Schedule C
- Pay self-employment tax
- Quarterly estimated taxes
- Keep detailed records

### International

- Check local tax laws
- VAT/GST may apply
- Currency conversion
- Cross-border fees

**Consult a tax professional** for your specific situation.

## Monitoring & Analytics

### Track These Metrics

1. **Daily revenue**
2. **Ad view count**
3. **Average revenue per user**
4. **Payout success rate**
5. **Failed transactions**

### Stripe Dashboard

Monitor:
- Total balance
- Pending payouts
- Transaction history
- Dispute/refund rate

## Scaling Up

### As You Grow

1. **Negotiate better rates** with ad networks
2. **Optimize payout schedule** for cash flow
3. **Add multiple revenue streams**
4. **Consider business account** for higher limits

### Enterprise Features

- Stripe Atlas for incorporation
- Multi-currency support
- Advanced fraud detection
- Dedicated account manager

## Support Resources

### Stripe

- Documentation: [stripe.com/docs](https://stripe.com/docs)
- Support: support@stripe.com
- Community: [stripe.com/community](https://stripe.com/community)

### Your App

- Admin dashboard for revenue tracking
- Console logs for debugging
- This documentation

## Summary Checklist

- [ ] Create Stripe account
- [ ] Complete business verification
- [ ] Connect bank account/debit card
- [ ] Get API keys
- [ ] Install Stripe SDK
- [ ] Set up backend server
- [ ] Configure automatic payouts
- [ ] Test in development
- [ ] Go live
- [ ] Monitor first payout

## Estimated Timeline

- **Stripe account setup**: 15 minutes
- **Bank verification**: 2-3 days
- **Backend setup**: 2-4 hours
- **Integration & testing**: 4-6 hours
- **First payout**: 5-7 days after first revenue

**Total time to first payment**: ~1-2 weeks

---

**Ready to start earning?** Follow this guide step-by-step and you'll be collecting ad revenue in no time! 💰
