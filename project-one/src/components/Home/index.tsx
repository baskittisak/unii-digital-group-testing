import { OrderSummary } from "@/interface/order-summary.interface";
import { ProductCategory } from "@/interface/product-category.interface";

import Box from "@mui/material/Box";
import OrderSummaryTable from "@/components/Home/OrderSummaryTable";
import OrderSummaryFilter from "@/components/Home//OrderSummaryFilter";

interface HomeProps {
  orderSummary: OrderSummary[];
  productList: ProductCategory[];
}

export default function Home({ orderSummary, productList }: HomeProps) {
  return (
    <Box sx={{ p: 2 }}>
      <OrderSummaryFilter productList={productList} />
      <OrderSummaryTable orderSummary={orderSummary} />
    </Box>
  );
}
