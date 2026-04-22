/**
 * Firebase Cloud Function: Sync Clover Payments to Firebase
 * Triggered every 5-10 minutes via Cloud Scheduler
 * 
 * This function:
 * 1. Queries Clover API for recent orders
 * 2. Matches order amounts to tier pricing
 * 3. Stores payment status in Firebase
 * 4. Unlocks course content when payment is verified
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

// Initialize Firebase Admin
admin.initializeApp();
const database = admin.database();

// Clover API Configuration
const CLOVER_MERCHANT_ID = "534701149754384";
const CLOVER_PRIVATE_API = "8c9496d7-ab5f-acc2-3c63-8483905b2e46";
const CLOVER_API_URL = `https://api.clover.com/v3/merchants/${CLOVER_MERCHANT_ID}`;

// Tier Pricing (must match your Clover checkout amounts)
const TIER_PRICING = {
  tier1: 150,
  tier2: 213,
  tier3: 263,
  tier4: 117,
};

/**
 * Cloud Scheduler Trigger: Sync payments every 5 minutes
 */
exports.syncCloverPayments = functions.pubsub
  .schedule("every 5 minutes")
  .onRun(async (context) => {
    console.log("🔄 Starting Clover payment sync...");

    try {
      // 1. Get recent orders from Clover (last 1 hour)
      const orders = await fetchRecentOrders();
      console.log(`📦 Found ${orders.length} recent orders`);

      // 2. Process each order
      for (const order of orders) {
        await processOrder(order);
      }

      console.log("✅ Clover sync completed successfully");
      return { success: true, ordersProcessed: orders.length };
    } catch (error) {
      console.error("❌ Error syncing Clover payments:", error);
      return { success: false, error: error.message };
    }
  });

/**
 * Fetch recent orders from Clover API
 */
async function fetchRecentOrders() {
  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const response = await axios.get(
      `${CLOVER_API_URL}/orders?filter=createdTime>="${oneHourAgo}"`,
      {
        headers: {
          Authorization: `Bearer ${CLOVER_PRIVATE_API}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.elements || [];
  } catch (error) {
    console.error("Failed to fetch orders from Clover:", error.message);
    throw error;
  }
}

/**
 * Process individual order and store payment in Firebase
 */
async function processOrder(order) {
  try {
    // Skip if order is not closed/paid
    if (order.state !== "OPEN") {
      console.log(`Skipping order ${order.id} - state: ${order.state}`);
      return;
    }

    // Get order total in cents and convert to dollars
    const totalInDollars = (order.total || 0) / 100;

    // Match order amount to tier
    const tier = matchOrderToTier(totalInDollars);
    if (!tier) {
      console.log(
        `⚠️ Order ${order.id} amount ($${totalInDollars}) doesn't match any tier`
      );
      return;
    }

    // Get customer info
    const customerEmail = order.customer?.primaryTenderEmail || "unknown";
    const customerName = order.customer?.firstName || "Customer";

    // Create or update payment record in Firebase
    const paymentRecord = {
      tier: tier,
      amount: totalInDollars,
      orderId: order.id,
      customerName: customerName,
      customerEmail: customerEmail,
      paidAt: new Date().toISOString(),
      cloverOrderId: order.id,
      status: "verified",
    };

    // Store in Firebase under payments/{email}/{tier}
    const safeName = customerEmail.replace(/[.@#$/\[\]]/g, "_");
    await database
      .ref(`payments/${safeName}/${tier}`)
      .set(paymentRecord);

    console.log(
      `✅ Recorded payment: ${customerName} (${customerEmail}) - ${tier}`
    );
  } catch (error) {
    console.error(`Error processing order ${order.id}:`, error.message);
  }
}

/**
 * Match order amount to tier
 */
function matchOrderToTier(amount) {
  // Allow $5 tolerance for rounding/fees
  const tolerance = 5;

  for (const [tier, price] of Object.entries(TIER_PRICING)) {
    if (Math.abs(amount - price) <= tolerance) {
      return tier;
    }
  }

  return null;
}

module.exports = { syncCloverPayments };
