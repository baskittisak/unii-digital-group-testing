import { OrderSummary } from "@/interface/order-summary.interface";
import { ProductCategory } from "@/interface/product-category.interface";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import OrderSummaryTable from "@/components/Home/OrderSummaryTable";
import OrderSummaryFilter from "@/components/Home/OrderSummaryFilter";

interface HomeProps {
  orderSummary: OrderSummary[];
  productList: ProductCategory[];
}

export default function Home({ orderSummary, productList }: HomeProps) {
  return (
    <>
      <AppBar position="fixed" elevation={2}>
        <Toolbar sx={{ minHeight: 64, p: 1 }}>
          <Image
            src="/icons/unii-full-logo.png"
            alt="Unii"
            width={48}
            height={48}
            priority
          />
        </Toolbar>
      </AppBar>

      <Box sx={{ pt: "80px", pb: 4 }}>
        <Container maxWidth="xl">
          <Typography variant="h6" fontWeight={600} mb={2}>
            รายงานธุรกรรมสินค้า
          </Typography>
          <Box sx={{ mb: 3 }}>
            <OrderSummaryFilter productList={productList} />
          </Box>
          <OrderSummaryTable orderSummary={orderSummary} />
        </Container>
      </Box>
    </>
  );
}
