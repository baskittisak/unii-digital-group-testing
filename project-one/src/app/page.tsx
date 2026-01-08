import { getOrderSummary } from "@/services/order-summary.service";
import Home from "@/components/Home";

export default async function HomePage() {
  const orderSummary = await getOrderSummary();

  return <Home orderSummary={orderSummary} />;
}
