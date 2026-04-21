# CLOVER PAYMENT SETUP INSTRUCTIONS

## What You Need to Do:

1. **Log into your Clover account** at https://clover.com

2. **Create 4 payment links** (one for each course tier):
   - **Tier 1** - $150
   - **Tier 2** - $200
   - **Tier 3** - $250
   - **Tier 4** - $100

3. **For each link, set up:**
   - Product name (e.g., "Beginner Barber Course - Lifetime Access")
   - Price
   - Description mentioning they'll receive an unlock code via email after payment

4. **Get the payment links** from Clover (they'll look like https://clover.com/checkout/...)

5. **Send those 4 links to the developer** to add to the code

## How It Currently Works:

1. Customer clicks "Start Learning" on a course
2. They enter their email
3. They're told they'll be redirected to Clover
4. After payment on Clover, they receive an unlock code via email
5. They go to course-unlock.html
6. Enter their code
7. Code is saved to their browser localStorage
8. They have lifetime access to that course tier

## The Unlock Code System:

- Each code is tied to the tier (TIER1, TIER2, TIER3, TIER4)
- Customers get their code in the Clover order confirmation email
- One-time use per browser
- Stored locally so they don't need to log in
- Automatically remembers them for 1 year in browser cache

## What Needs to be Added:

When you have the Clover links, we'll update the `purchaseTier()` function in index.html to redirect to your actual Clover payment page instead of the placeholder.

Replace this line with your actual Clover link:
```
window.location.href = 'course-unlock.html?tier=' + tier + '&email=' + encodeURIComponent(email);
```

Should become:
```
window.location.href = 'https://clover.com/checkout/YOUR-TIER-LINK-HERE';
```
