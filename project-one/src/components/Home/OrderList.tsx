"use client";

import { useState } from "react";
import { OrderSummary } from "@/interface/order-summary.interface";
import { ProductCategory } from "@/interface/product-category.interface";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import OrderSummaryTable from "@/components/Home/OrderSummaryTable";
import OrderSummaryFilter from "@/components/Home/OrderSummaryFilter";

interface OrderListProps {
  orderSummary: OrderSummary[];
  productList: ProductCategory[];
}

export default function OrderList({
  orderSummary,
  productList,
}: OrderListProps) {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <Box sx={{ pt: "80px", pb: 4 }}>
        <Container maxWidth="xl">
          <Typography variant="h6" fontWeight={600} mb={2}>
            รายงานธุรกรรมสินค้า
          </Typography>
          <Box sx={{ mb: 3 }}>
            <OrderSummaryFilter
              productList={productList}
              setLoading={setLoading}
            />
          </Box>
          <OrderSummaryTable orderSummary={orderSummary} loading={loading} />
        </Container>
      </Box>
    </>
  );
}
