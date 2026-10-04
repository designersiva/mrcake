import { CartItem, CustomCakeRequest, Order } from '../types';

export const DEFAULT_WHATSAPP_NUMBER = '919876543210'; // Representative business number for Mr. Cake Dharavi

export function formatWhatsAppUrl(phoneNumber: string, message: string): string {
  // Clean phone number (digits only)
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}

export function generateProductWhatsAppMessage(params: {
  productName: string;
  size: string;
  quantity: number;
  price: number;
  isEggless?: boolean;
  date?: string;
  time?: string;
  customMessage?: string;
}): string {
  return `Hello Mr. Cake,

I would like to place an order from your website.

🎂 Product: ${params.productName}
⚖️ Size: ${params.size}
🔢 Quantity: ${params.quantity}
🌱 Type: ${params.isEggless ? 'Eggless (100% Veg)' : 'Regular / Contains Egg'}
💰 Price: ₹${params.price * params.quantity}
${params.customMessage ? `✍️ Message on Cake: "${params.customMessage}"\n` : ''}${params.date ? `📅 Preferred Date: ${params.date}\n` : ''}${params.time ? `⏰ Preferred Time: ${params.time}\n` : ''}
Please confirm availability and order booking. Thank you!`;
}

export function generateCustomCakeWhatsAppMessage(request: CustomCakeRequest): string {
  return `Hello Mr. Cake,

I would like to request a custom dream cake! 🎂

🎉 Occasion / Type: ${request.cakeType}
🍫 Flavour: ${request.flavour}
⚖️ Size: ${request.size}
✍️ Message on Cake: "${request.cakeMessage || 'None'}"
📅 Preferred Date: ${request.preferredDate}
⏰ Preferred Time: ${request.preferredTime}
🚚 Fulfillment: ${request.deliveryOption}
${request.deliveryAddress ? `📍 Delivery Address: ${request.deliveryAddress}\n` : ''}
🖼️ Reference Image: ${request.referenceImage ? 'Attached/Specified in request' : 'No photo, please suggest design'}
${request.additionalNotes ? `📝 Additional Notes: ${request.additionalNotes}\n` : ''}
💰 Estimated Budget: ₹${request.estimatedPrice}

👤 Customer Name: ${request.customerName}
📞 Phone: ${request.phone}

Please contact me with the design confirmation and price quote. Thank you!`;
}

export function generateCartOrderWhatsAppMessage(order: Order): string {
  const itemsText = order.items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.product.name} (${item.selectedSize}) x${item.quantity} - ₹${item.unitPrice * item.quantity}${
          item.isEggless ? ' [Eggless]' : ''
        }${item.customMessage ? ` (Msg: "${item.customMessage}")` : ''}`
    )
    .join('\n');

  return `Hello Mr. Cake,

I have placed an order on your website! 🛍️
📋 Order ID: #${order.id}

--- ORDER ITEMS ---
${itemsText}

--- BILL DETAILS ---
Subtotal: ₹${order.subtotal}
${order.discount > 0 ? `Discount: -₹${order.discount}\n` : ''}Delivery Fee: ₹${order.deliveryFee === 0 ? 'FREE' : order.deliveryFee}
*TOTAL PAYABLE: ₹${order.total}*

--- CUSTOMER DETAILS ---
👤 Name: ${order.customerName}
📞 Phone: ${order.phone}
🚚 Order Type: ${order.deliveryType}
📍 Address: ${order.address || 'Pickup at Dharavi Store'}
🕒 Preferred Slot: ${order.deliverySlot || 'Earliest available'}
💳 Payment Preference: ${order.paymentMethod}
${order.notes ? `📝 Special Note: ${order.notes}\n` : ''}
Please confirm my order and share the payment/preparation updates. Thank you!`;
}

export function generateReservationWhatsAppMessage(params: {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequest?: string;
}): string {
  return `Hello Mr. Cake,

I would like to reserve a table at your Dharavi restaurant cafe! 🍽️

👤 Name: ${params.name}
📞 Phone: ${params.phone}
📅 Date: ${params.date}
⏰ Time: ${params.time}
👥 Number of Guests: ${params.guests}
${params.specialRequest ? `✨ Special Request: ${params.specialRequest}\n` : ''}
Please confirm table availability. Thank you!`;
}
