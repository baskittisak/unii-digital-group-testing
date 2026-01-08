import { OrderSummary } from "@/interface/order-summary.interface";
import { ProductCategory } from "@/interface/product-category.interface";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import OrderList from "@/components/Home/OrderList";

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
      <OrderList orderSummary={orderSummary} productList={productList} />
    </>
  );
}
