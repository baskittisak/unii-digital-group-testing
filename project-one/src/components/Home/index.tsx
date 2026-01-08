"use client";

import { useState } from "react";
import { ProductCategory } from "@/interface/product-category.interface";
import { Transaction } from "@/interface/transaction.interface";
import { OrderSummary } from "@/interface/order-summary.interface";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

interface HomeProps {
  buyTransaction: Transaction[];
  sellTransaction: Transaction[];
  productList: ProductCategory[];
  orderSummary: OrderSummary[];
}

export default function Home({
  buyTransaction,
  sellTransaction,
  productList,
  orderSummary,
}: HomeProps) {
  const [tab, setTab] = useState<number>(0);

  return (
    <Box sx={{ p: 2 }}>
      <Tabs value={tab} onChange={(_, v) => setTab(v)}>
        <Tab label="Order Summary" />
        <Tab label="Raw Data" />
      </Tabs>

      <Divider sx={{ my: 2 }} />

      {tab === 0 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Order Summary
          </Typography>

          {orderSummary.map((row) => (
            <Box
              key={`${row.categoryId}-${row.subCategoryId}`}
              sx={{ mb: 2, p: 1, border: "1px solid #ddd", borderRadius: 1 }}
            >
              <Typography variant="subtitle1">
                {row.categoryId} - {row.categoryName} / {row.subCategoryId} -{" "}
                {row.subCategoryName}
              </Typography>

              {Object.entries(row.grades).map(([grade, g]) => (
                <Typography key={grade} sx={{ pl: 2 }} variant="body2">
                  Grade {grade} | Buy {g.buyQuantityKg} kg ({g.buyTotalAmount}฿)
                  | Sell {g.sellQuantityKg} kg ({g.sellTotalAmount}฿)
                </Typography>
              ))}

              <Typography sx={{ pl: 2, mt: 1 }} variant="body2">
                Remaining: {row.remainingQuantityKg} kg /{" "}
                {row.remainingTotalAmount} ฿
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {tab === 1 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Product Categories
          </Typography>

          {productList.map((cat) => (
            <Box key={cat.categoryId} sx={{ mb: 2 }}>
              <Typography variant="h6">
                {cat.categoryId} - {cat.categoryName}
              </Typography>

              {cat.subcategory.map((sub) => (
                <Typography key={sub.subCategoryId} sx={{ pl: 2 }}>
                  • {sub.subCategoryId} - {sub.subCategoryName}
                </Typography>
              ))}
            </Box>
          ))}

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" gutterBottom>
            Buy Transactions
          </Typography>

          {buyTransaction.map((order) => (
            <Box key={order.orderId} sx={{ mb: 2 }}>
              <Typography variant="subtitle1">
                Order ID: {order.orderId}
              </Typography>
              <Typography variant="body2">
                Date: {order.orderFinishedDate} {order.orderFinishedTime}
              </Typography>

              {order.requestList.map((cat) => (
                <Box
                  key={`${cat.categoryID}-${cat.subCategoryID}`}
                  sx={{ pl: 2, mt: 1 }}
                >
                  <Typography>
                    Category {cat.categoryID} / Sub {cat.subCategoryID}
                  </Typography>

                  {cat.requestList.map((req, idx) => (
                    <Typography key={idx} sx={{ pl: 2 }} variant="body2">
                      - Grade {req.grade} | Qty {req.quantity} kg | Price{" "}
                      {req.price} | Total {req.total}
                    </Typography>
                  ))}
                </Box>
              ))}
            </Box>
          ))}

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" gutterBottom>
            Sell Transactions
          </Typography>

          {sellTransaction.map((order) => (
            <Box key={order.orderId} sx={{ mb: 2 }}>
              <Typography variant="subtitle1">
                Order ID: {order.orderId}
              </Typography>
              <Typography variant="body2">
                Date: {order.orderFinishedDate} {order.orderFinishedTime}
              </Typography>

              {order.requestList.map((cat) => (
                <Box
                  key={`${cat.categoryID}-${cat.subCategoryID}`}
                  sx={{ pl: 2, mt: 1 }}
                >
                  <Typography>
                    Category {cat.categoryID} / Sub {cat.subCategoryID}
                  </Typography>

                  {cat.requestList.map((req, idx) => (
                    <Typography key={idx} sx={{ pl: 2 }} variant="body2">
                      - Grade {req.grade} | Qty {req.quantity} kg | Price{" "}
                      {req.price} | Total {req.total}
                    </Typography>
                  ))}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
