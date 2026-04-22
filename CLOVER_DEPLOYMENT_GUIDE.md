# Deploying Clover Payment Sync to Firebase

## Step 1: Deploy the Cloud Function

### Option A: Using Firebase CLI (Recommended)

1. **Install Firebase CLI** (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. **Navigate to your project folder**:
   ```bash
   cd c:\Users\josh\Downloads\school
   ```

3. **Initialize Firebase Functions** (if not done):
   ```bash
   firebase init functions
   ```
   - Choose: Node.js
   - Say YES to ESLint

4. **Copy the function code**:
   - Replace the contents of `functions/index.js` with the code from `clover-sync-function.js`

5. **Install dependencies**:
   ```bash
   cd functions
   npm install axios
   cd ..
   ```

6. **Deploy**:
   ```bash
   firebase deploy --only functions
   ```

### Option B: Using Firebase Console

1. Go to: https://console.firebase.google.com/project/smithbarberinstitutionpb
2. Click **Functions** in the left menu
3. Click **Create Function**
4. Set up:
   - **Name**: `syncCloverPayments`
   - **Trigger**: Cloud Pub/Sub
   - **Create a new topic**: `clover-sync-trigger`
5. Paste the function code from `clover-sync-function.js`
6. Click **Deploy**

---

## Step 2: Set Up Cloud Scheduler (Automated Trigger)

1. Go to: https://console.cloud.google.com/cloudscheduler?project=smithbarberinstitutionpb

2. Click **Create Job**

3. Configure:
   - **Name**: `clover-sync-scheduler`
   - **Frequency**: `*/5 * * * *` (every 5 minutes)
   - **Timezone**: Your timezone
   - **Execution Timeout**: 540 seconds

4. Click **Create**

5. Click the job name, then **Edit**

6. Set **Execution settings**:
   - **Type**: Pub/Sub
   - **Topic**: `clover-sync-trigger` (or the topic you created)
   - **Message body**: `{}`

7. Click **Save**

---

## Step 3: Test the Function

1. Go to Firebase Console → Functions
2. Find `syncCloverPayments`
3. Click the **Testing** tab
4. Manually trigger it to test
5. Check **Logs** tab for output

**Expected success log:**
```
🔄 Starting Clover payment sync...
📦 Found X recent orders
✅ Clover sync completed successfully
```

---

## Step 4: Monitor in Production

**View Logs:**
- Firebase Console → Functions → `syncCloverPayments` → Logs tab
- Or: `firebase functions:log --only syncCloverPayments`

**Check Firebase Data:**
- Go to: https://console.firebase.google.com/project/smithbarberinstitutionpb/database/data
- Look for a new path: `payments/{email}/{tier}`
- Each payment record shows: `{tier, amount, orderId, paidAt, status}`

---

## Troubleshooting

**Function fails with 403 error:**
- Check that you're using the correct `CLOVER_PRIVATE_API` key
- Verify Merchant ID is correct

**No orders being found:**
- Clover API might have different rate limits
- Check the Clover API logs in their dashboard

**Payment not showing in Firebase:**
- Verify the order state is "OPEN" (not "CLOSED")
- Check that the order amount exactly matches a tier price

---

## How It Works

1. **Every 5 minutes**: Cloud Scheduler triggers the function
2. **Function runs**: Queries Clover for orders from the last hour
3. **Matches amounts**: Compares order total to tier prices (with $5 tolerance)
4. **Stores in Firebase**: Creates a record at `payments/{email}/{tier}`
5. **Frontend checks**: When loading courses, checks if payment exists before unlocking

---

## Payment Data Structure

```
payments/
├── user1_example.com/
│   ├── tier1: {
│   │   tier: "tier1",
│   │   amount: 150,
│   │   orderId: "abc123",
│   │   paidAt: "2026-04-22T10:30:00Z",
│   │   status: "verified"
│   │ }
│   └── tier3: { ... }
└── user2_example.com/
    └── tier2: { ... }
```

Email addresses are converted to safe format (dots and @ replaced with underscores).
