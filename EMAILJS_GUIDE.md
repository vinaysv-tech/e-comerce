# EmailJS Setup Guide for NovaCart Order Confirmation

## A) Intent Snapshot

Create a **clear instructional guide** that forces the assistant (or developer) to correctly configure **EmailJS template parameters**, not misuse AI-style prompts.

---

## B) Clarifying Questions

*(None needed — requirements are explicit. Proceeding with fixed assumptions.)*

---

## C) Final Guide (Ready-to-Use)

### Role:
You are a senior frontend engineer with deep experience in EmailJS. You do not explain AI prompting concepts. You focus strictly on correct EmailJS configuration and parameter mapping.

### Task:
Explain and demonstrate the exact setup required to send an order confirmation email using EmailJS. Make it unambiguous that EmailJS does NOT use AI prompts and only works with explicitly defined template variables.

### Context:
The developer already has JavaScript logic in place. The problem is NOT JavaScript.
The failure occurs when EmailJS template variables do not match the parameters passed from code.

### Constraints:
- Do NOT mention AI prompts, prompt engineering, or LLM concepts.
- Use precise, technical language.
- Be blunt and corrective where needed.
- Assume the recipient email is "vikramsv373@gmail.com".
- Emphasize that mismatched template variables = no email sent.

---

## EmailJS Configuration for NovaCart

### 1. JavaScript Code (Exact EmailJS Call)

```javascript
import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_m5ezvjv';
const EMAILJS_TEMPLATE_ID = 'template_order_confirmation';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY_HERE'; // Replace with your actual public key

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

/**
 * Send order confirmation email
 * @param {Object} orderData - Order information
 * @param {string} customerEmail - Customer's email address
 * @param {string} customerName - Customer's name
 */
export const sendOrderConfirmationEmail = async (orderData, customerEmail, customerName) => {
  try {
    const templateParams = {
      to_email: customerEmail,
      to_name: customerName,
      from_name: 'NovaCart',
      from_email: 'vikramsv373@gmail.com',
      order_id: orderData.orderNumber,
      order_time: new Date(orderData.orderDate).toLocaleString(),
      product: orderData.items.map(item => 
        `${item.name} x ${item.quantity} - $${(Number(item.price) * item.quantity).toFixed(2)}`
      ).join('\n'),
      customer_msg: `Thank you for your order! Your order ${orderData.orderNumber} has been confirmed.`,
      customer_email: customerEmail,
      total_amount: `$${orderData.totalAmount.toFixed(2)}`
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('✅ Order confirmation email sent successfully!', response);
    return { success: true, response };
  } catch (error) {
    console.error('❌ Failed to send order confirmation email:', error);
    return { success: false, error };
  }
};
```

### 2. EmailJS Template Configuration

**Template ID:** `template_order_confirmation`

**To Email Field:** `{{to_email}}`

**Subject:**
```
Order Confirmation - {{order_id}}
```

**Email Body:**
```
Dear {{to_name}},

{{customer_msg}}

Order Details:
Order ID: {{order_id}}
Order Time: {{order_time}}
Total Amount: {{total_amount}}

Products Ordered:
{{product}}

Shipping Address:
{{shipping_address}}

Payment Method: {{payment_method}}

Thank you for shopping with NovaCart!

Best regards,
NovaCart Team
{{from_email}}
```

### 3. Required Template Variables

In your EmailJS dashboard, ensure these variables are defined in your template:
- `to_email`
- `to_name` 
- `from_name`
- `from_email`
- `order_id`
- `order_time`
- `product`
- `customer_msg`
- `customer_email`
- `total_amount`
- `shipping_address`
- `payment_method`

### 4. Why Incorrect Variable Naming Breaks EmailJS

EmailJS template variables are **case-sensitive and exact matches**. If your JavaScript passes `order_id` but your template expects `orderId`, the email will be sent but with empty values in those fields. This is why mismatched template variables = no proper email content.

### 5. Optional Improvement (Dynamic Recipient)

Instead of hardcoding "vikramsv373@gmail.com", you can make it dynamic by passing the admin email as a parameter to your function.

---

## D) Variants

### 1️⃣ Ultra-Concise Version

```
Act as an EmailJS expert. Explain that EmailJS does not use prompts, only template variables.
Provide the exact JS send() call and the exact EmailJS template configuration required to send an order confirmation email. Be blunt and technical.
```

### 2️⃣ Structured / Long Version (for Teams or Docs)

```
Act as a senior frontend engineer.
Document the exact EmailJS setup required to send an order confirmation email.
Include JS code, template ID, template body, and explain why mismatched variables break delivery.
Assume the email recipient is vikramsv373@gmail.com.
Avoid all AI or prompt-related terminology.
```

---

## E) Why This Works

* Forces **role clarity** (EmailJS expert, not AI explainer)
* Removes ambiguity between **AI prompts vs template variables**
* Locks variable names to prevent silent failures
* Uses constraints to eliminate irrelevant explanations
* Defines success conditions so debugging stops early

---

## F) Optional Add-Ons

### 🔒 Negative Instructions (Optional)

```
Do NOT suggest rewriting JavaScript.
Do NOT rename EmailJS parameters.
Do NOT claim EmailJS is intelligent or dynamic.
```

### ✅ Validation Checklist

* [ ] Template ID matches exactly
* [ ] All placeholders exist in EmailJS dashboard
* [ ] `to_email` is mapped in template
* [ ] Public key loaded
* [ ] Ad-block not interfering

---

## G) Integration with NovaCart

### Update your existing email service:

1. Replace the template parameters in your existing `sendOrderConfirmationEmail` function with the exact variables listed above
2. Create the template in EmailJS dashboard with the exact variable names
3. Use the service ID `service_m5ezvjv` and template ID `template_order_confirmation`
4. Test the integration with the test accounts

### Required Updates to Your Current Implementation:

```javascript
// In your client/src/services/emailService.js, update the template parameters:

const templateParams = {
  to_email: customerEmail,
  to_name: customerName,
  from_name: 'NovaCart',
  from_email: 'vikramsv373@gmail.com',
  order_id: orderData.orderNumber,
  order_time: new Date(orderData.orderDate).toLocaleString(),
  product: orderData.items.map(item => 
    `${item.name} x ${item.quantity} - $${(Number(item.price) * item.quantity).toFixed(2)}`
  ).join('\n'),
  customer_msg: `Thank you for your order! Your order ${orderData.orderNumber} has been confirmed.`,
  customer_email: customerEmail,
  total_amount: `$${orderData.totalAmount.toFixed(2)}`,
  shipping_address: `${orderData.shippingAddress.address}, ${orderData.shippingAddress.city}, ${orderData.shippingAddress.state} ${orderData.shippingAddress.zip}`,
  payment_method: orderData.paymentMethod
};
```

This configuration ensures that your EmailJS template variables exactly match the parameters being passed from your JavaScript code, eliminating the mismatch that prevents emails from being sent properly.