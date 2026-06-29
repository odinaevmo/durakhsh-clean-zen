// Telegram bot configuration.
// Replace these values with your real bot credentials.
// You can also wire BOT_TOKEN to a server-side secret later.

export const TELEGRAM_CONFIG = {
  BOT_TOKEN: "TELEGRAM_BOT_TOKEN", // e.g. "1234567890:AA..."
  CHAT_ID: "-1004433044065",
};

export interface OrderPayload {
  name: string;
  phone: string;
  address: string;
  area: number;
  price: number;
}

export async function sendTelegramOrder(order: OrderPayload): Promise<boolean> {
  const now = new Date();
  const date = now.toLocaleDateString("ru-RU");
  const time = now.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });

  const text =
    `🧹 *Новая заявка*\n\n` +
    `👤 *Имя:* ${order.name}\n` +
    `📞 *Телефон:* ${order.phone}\n` +
    `📍 *Адрес:* ${order.address}\n` +
    `📐 *Площадь:* ${order.area} м²\n` +
    `💰 *Расчетная стоимость:* ${order.price} сомони\n` +
    `📅 *Дата:* ${date}\n` +
    `⏰ *Время:* ${time}`;

  const { BOT_TOKEN, CHAT_ID } = TELEGRAM_CONFIG;

  if (!BOT_TOKEN || BOT_TOKEN === "TELEGRAM_BOT_TOKEN") {
    console.warn("Telegram BOT_TOKEN is not configured. Order:", text);
    return true; // treat as success so UX flows in dev
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "Markdown",
      }),
    });
    return res.ok;
  } catch (e) {
    console.error("Telegram send failed", e);
    return false;
  }
}
