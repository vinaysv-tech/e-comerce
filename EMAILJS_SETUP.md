# EmailJS Setup Guide for NovaCart Order Notifications

## Overview
This guide will help you set up EmailJS to send order confirmation emails from **vikramsv373@gmail.com** to customers when they place orders.

---

## Step 1: Create EmailJS Account

1. Go to **https://www.emailjs.com/**
2. Click **"Sign Up"** (it's FREE)
3. Sign up with your email or Google account

---

## Step 2: Add Email Service

1. After logging in, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose **"Gmail"**
4. Click **"Connect Account"**
5. Sign in with **vikramsv373@gmail.com**
6. Allow EmailJS to access your Gmail
7. Give it a name: **"NovaCart Orders"**
8. Click **"Create Service"**
9. **COPY the Service ID** (e.g., `service_abc123`)

---

## Step 3: Create Email Template for Order Confirmation

1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Use this template:

### Template Name: `Order Confirmation`

### Subject Line:
```
Order Confirmation - {{order_number}}
```

### Email Body:
```
Hello {{to_name}},

Thank you for your order at NovaCart!

Order Details:
━━━━━━━━━━━━━━━━━━━━━━━
Order Number: {{order_number}}
Order Date: {{order_date}}
Total Amount: {{total_amount}}

Items Ordered:
{{items_list}}

Shipping Address:
{{shipping_address}}

Payment Method: {{payment_method}}

━━━━━━━━━━━━━━━━━━━━━━━

We will process your order shortly and send you a shipping notification once it's on the way.

If you have any questions, please don't hesitate to contact us.

Thank you for shopping with NovaCart!

Best regards,
NovaCart Team
{{from_email}}
```

4. **Settings for the template:**
   - From Name: `NovaCart`
   - From Email: `vikramsv373@gmail.com`
   - To Email: `{{to_email}}`
   - Reply To: `vikramsv373@gmail.com`

5. Click **"Save"**
6. **COPY the Template ID** (e.g., `template_xyz789`)

---

## Step 4: Create Admin Notification Template (Optional)

1. Click **"Create New Template"** again
2. Template Name: `Admin Order Notification`

### Subject Line:
```
New Order Received - {{order_number}}
```

### Email Body:
```
New Order Alert!

A customer has placed a new order:

Order Number: {{order_number}}
Customer: {{customer_name}}
Order Date: {{order_date}}
Total Amount: {{total_amount}}
Items: {{items_count}} item(s)

Log in to the admin dashboard to view details.
```

3. **Settings:**
   - From Name: `NovaCart System`
   - From Email: `vikramsv373@gmail.com`
   - To Email: `vikramsv373@gmail.com`

4. Click **"Save"**
5. **COPY the Template ID**

---

## Step 5: Get Your Public Key

1. Go to **"Account"** (top right)
2. Find **"API Keys"** section
3. **COPY your Public Key** (e.g., `user_abc123xyz`)

---

## Step 6: Update Your Application

1. Open the file: `client/.env`
2. Replace the values:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_EMAILJS_SERVICE_ID=YOUR_SERVICE_ID_HERE
REACT_APP_EMAILJS_TEMPLATE_ID=YOUR_TEMPLATE_ID_HERE
REACT_APP_EMAILJS_PUBLIC_KEY=YOUR_PUBLIC_KEY_HERE
```

**Example:**
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_EMAILJS_SERVICE_ID=service_abc123
REACT_APP_EMAILJS_TEMPLATE_ID=template_xyz789
REACT_APP_EMAILJS_PUBLIC_KEY=user_abc123xyz
```

3. **Restart the application:**
```bash
# Stop the current server (Ctrl+C)
# Then run:
npm run dev
```

---

## Step 7: Test the Email System

1. Go to **http://localhost:3000**
2. **Login** or **Register** an account
3. **Add products** to cart
4. Go to **Checkout**
5. Fill in shipping details
6. Click **"Place Order"**

✅ You should receive:
- **Customer email** confirmation at the registered email
- **Admin notification** at vikramsv373@gmail.com

---

## Troubleshooting

### Issue: Emails not sending

**Check:**
1. ✅ EmailJS Public Key is correct in `.env`
2. ✅ Service ID and Template ID are correct
3. ✅ Gmail account is properly connected to EmailJS
4. ✅ You restarted the app after updating `.env`
5. ✅ Check browser console for errors (F12)

### Issue: Gmail blocks emails

**Solution:**
1. Go to your Gmail settings
2. Enable "Less secure app access" OR
3. Use Gmail App Password (recommended):
   - Go to Google Account → Security
   - Enable 2-Factor Authentication
   - Generate App Password
   - Use this in EmailJS

---

## Free Tier Limits

EmailJS Free Plan:
- ✅ 200 emails per month
- ✅ Perfect for testing and small projects
- ✅ Upgrade available if needed

---

## Email Flow

```
Customer places order
        ↓
Order saved to database
        ↓
Email sent to customer (order confirmation)
        ↓
Email sent to admin (vikramsv373@gmail.com)
        ↓
Cart cleared
        ↓
Redirect to Orders page
```

---

## Important Files Modified

1. ✅ `client/src/services/emailService.js` - Email sending logic
2. ✅ `client/src/pages/Checkout.jsx` - Integrated email on order
3. ✅ `client/.env` - Configuration
4. ✅ Installed `@emailjs/browser` package

---

## Next Steps

1. Set up EmailJS account (5 minutes)
2. Create email templates (5 minutes)
3. Update `.env` file with your keys
4. Test order confirmation
5. Customize email templates as needed

**That's it! Your order notification system is ready!** 🎉
