import { getTransactions } from "@/services/transaction.service";
import { getProductCategories } from "@/services/product-category.service";
import { getOrderSummary } from "@/services/order-summary.service";
import Home from "@/components/Home";

export default async function HomePage() {
  const [{ buyTransaction, sellTransaction }, { productList }, orderSummary] =
    await Promise.all([
      getTransactions(),
      getProductCategories(),
      getOrderSummary(),
    ]);

  return (
    <Home
      buyTransaction={buyTransaction}
      sellTransaction={sellTransaction}
      productList={productList}
      orderSummary={orderSummary}
    />
  );
}
