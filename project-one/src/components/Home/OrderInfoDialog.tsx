"use client";

import { useState } from "react";
import { OrderSummary } from "@/interface/order-summary.interface";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

interface OrderInfoDialogProps {
  open: boolean;
  orderSummary: OrderSummary | null;
  onClose: () => void;
}

export default function OrderInfoDialog({
  open,
  orderSummary,
  onClose,
}: OrderInfoDialogProps) {
  const [tab, setTab] = useState<number>(0);

  if (!orderSummary) return null;

  const sellPrices = Array.from(
    new Set(Object.values(orderSummary.grades).flatMap((grade) => grade.prices))
  ).sort((a, b) => a - b);

  const handleClose = () => {
    setTab(0);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>รายละเอียดคำสั่งซื้อ</DialogTitle>

      <DialogContent dividers>
        <Tabs
          value={tab}
          onChange={(_, value) => setTab(value)}
          sx={{ mb: 2, color: "text.primary" }}
        >
          <Tab label="หมายเลขคำสั่งซื้อทั้งหมด" />
          <Tab label="วันที่ทำรายการทั้งหมด" />
          <Tab label="ราคาขายทั้งหมด" />
        </Tabs>

        {tab === 0 && (
          <Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {orderSummary.orderIds.map((id) => (
                <Chip key={id} label={id} color="primary" variant="outlined" />
              ))}
            </Box>
          </Box>
        )}

        {tab === 1 && (
          <Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {orderSummary.orderFinishedDates.map((date) => (
                <Chip
                  key={date}
                  label={date}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        )}

        {tab === 2 && (
          <Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {sellPrices.length > 0 ? (
                sellPrices.map((price) => (
                  <Chip
                    key={price}
                    label={`${price.toLocaleString()} บาท`}
                    color="success"
                    variant="outlined"
                  />
                ))
              ) : (
                <Chip label="ไม่มีข้อมูลราคา" disabled />
              )}
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>ปิด</Button>
      </DialogActions>
    </Dialog>
  );
}
