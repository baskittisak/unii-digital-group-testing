import { getOrderSummary } from "@/services/order-summary.service";
import Home from "@/components/Home";

export default async function HomePage() {
  const orderSummary = await getOrderSummary({
    // orderId: "CUNIIPRO20240409110012",
    // dateFrom: "2024-04-09",
    // dateTo: "2024-04-31",
    // categoryId: "01",
    // subCategoryId: "0101",
     grade: "D",
  });

  return <Home orderSummary={orderSummary} />;
}
