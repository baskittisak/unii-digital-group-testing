import { OrderSummary } from "@/interface/order-summary.interface";
import Box from "@mui/material/Box";
import OrderSummaryTable from "@/components/Home/OrderSummaryTable";

interface HomeProps {
  orderSummary: OrderSummary[];
}

export default function Home({ orderSummary }: HomeProps) {
  return (
    <Box sx={{ p: 2 }}>
      <OrderSummaryTable orderSummary={orderSummary} />
    </Box>
  );
}
