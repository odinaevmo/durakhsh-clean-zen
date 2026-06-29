import { createServerFn } from "@tanstack/react-start";

export interface OrderPayload {
  name: string;
  phone: string;
  address: string;
  area: number;
  price: number;
}

export const sendTelegramOrderFn = createServerFn({ method: "POST" })
  .inputValidator((data: OrderPayload) => data)
  .handler(async ({ data: order }) => {
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = "-1004433044065";

    if (!BOT_TOKEN) {
      console.error("TELEGRAM_BOT_TOKEN is not configured");
      return { ok: false as const, error: "bot_token_missing" };
    }

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

    try {
      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "Markdown" }),
      });
      if (!res.ok) {
        const body = await res.text();
        console.error("Telegram API error", res.status, body);
        return { ok: false as const, error: `telegram_${res.status}` };
      }
      return { ok: true as const };
    } catch (e) {
      console.error("Telegram send failed", e);
      return { ok: false as const, error: "network_error" };
    }
  });
