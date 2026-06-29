import { sendTelegramOrderFn, type OrderPayload } from "./telegram.functions";

export type { OrderPayload };

export async function sendTelegramOrder(order: OrderPayload): Promise<boolean> {
  try {
    const result = await sendTelegramOrderFn({ data: order });
    return result.ok;
  } catch (e) {
    console.error("sendTelegramOrder failed", e);
    return false;
  }
}
