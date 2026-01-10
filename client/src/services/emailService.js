import emailjs from '@emailjs/browser';

// EmailJS configuration from environment variables
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_m5ezvjv';
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_order_confirmation';
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || '';

// Initialize EmailJS only if public key is available
if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

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
      total_amount: `$${orderData.totalAmount.toFixed(2)}`,
      shipping_address: `${orderData.shippingAddress.address}, ${orderData.shippingAddress.city}, ${orderData.shippingAddress.state} ${orderData.shippingAddress.zip}`,
      payment_method: orderData.paymentMethod
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

/**
 * Send admin notification email
 * @param {Object} orderData - Order information
 */
export const sendAdminNotification = async (orderData) => {
  try {
    const templateParams = {
      to_email: 'vikramsv373@gmail.com',
      to_name: 'Admin',
      from_name: 'NovaCart System',
      order_id: orderData.orderNumber,
      customer_name: orderData.customerName || 'Customer',
      order_time: new Date(orderData.orderDate).toLocaleString(),
      total_amount: `$${orderData.totalAmount.toFixed(2)}`,
      items_count: orderData.items.length
    };

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      'template_admin_notify',
      templateParams
    );

    console.log('✅ Admin notification sent successfully!');
  } catch (error) {
    console.error('❌ Failed to send admin notification:', error);
  }
};
