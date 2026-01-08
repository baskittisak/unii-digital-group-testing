"use client";

import { Fragment, useState } from "react";
import { OrderSummary } from "@/interface/order-summary.interface";
import { numberWithCommas } from "@/utils";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import OrderInfoDialog from "@/components/Home/OrderInfoDialog";

interface OrderSummaryTableProps {
  orderSummary: OrderSummary[];
}

export default function OrderSummaryTable({
  orderSummary,
}: OrderSummaryTableProps) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<OrderSummary | null>(null);

  const onOpenDialog = (row: OrderSummary) => {
    setSelectedRow(row);
    setOpenDialog(true);
  };

  const onCloseDialog = () => {
    setSelectedRow(null);
    setOpenDialog(false);
  };

  return (
    <>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell width="20%">ชนิดของสินค้า</TableCell>
              <TableCell width="20%">หมวดหมู่ย่อย</TableCell>
              <TableCell align="right">
                ปริมาณการซื้อทั้งหมด (กิโลกรัม)
              </TableCell>
              <TableCell align="right">มูลค่าการซื้อทั้งหมด (บาท)</TableCell>
              <TableCell align="right">
                ปริมาณการขายทั้งหมด (กิโลกรัม)
              </TableCell>
              <TableCell align="right">มูลค่าการขายทั้งหมด (บาท)</TableCell>
              <TableCell align="right">
                ปริมาณคงเหลือทั้งหมด (กิโลกรัม)
              </TableCell>
              <TableCell align="right">มูลค่าคงเหลือทั้งหมด (บาท)</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {orderSummary.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 6 }}>
                  <Typography variant="subtitle1" color="text.secondary">
                    ไม่พบข้อมูล
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ลองปรับเงื่อนไขตัวกรองใหม่อีกครั้ง
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {orderSummary.length > 0 &&
              orderSummary.map((order) => {
                const rowKey = `${order.categoryId}-${order.subCategoryId}`;
                const isOpen = openKey === rowKey;

                const totals = Object.values(order.grades).reduce(
                  (acc, grade) => {
                    acc.buyQty += grade.buyQuantityKg;
                    acc.buyAmt += grade.buyTotalAmount;
                    acc.sellQty += grade.sellQuantityKg;
                    acc.sellAmt += grade.sellTotalAmount;
                    return acc;
                  },
                  { buyQty: 0, buyAmt: 0, sellQty: 0, sellAmt: 0 }
                );

                return (
                  <Fragment key={rowKey}>
                    <TableRow>
                      <TableCell>
                        {order.categoryId} - {order.categoryName}
                      </TableCell>
                      <TableCell>
                        {order.subCategoryId} - {order.subCategoryName}
                      </TableCell>
                      <TableCell align="right">
                        {numberWithCommas(totals.buyQty)}
                      </TableCell>
                      <TableCell align="right">
                        {numberWithCommas(totals.buyAmt)}
                      </TableCell>
                      <TableCell align="right">
                        {numberWithCommas(totals.sellQty)}
                      </TableCell>
                      <TableCell align="right">
                        {numberWithCommas(totals.sellAmt)}
                      </TableCell>
                      <TableCell align="right">
                        {numberWithCommas(totals.buyQty - totals.sellQty)}
                      </TableCell>
                      <TableCell align="right">
                        {numberWithCommas(totals.buyAmt - totals.sellAmt)}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => setOpenKey(isOpen ? null : rowKey)}
                        >
                          {isOpen ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell colSpan={9} sx={{ p: 0, bgcolor: "#fff" }}>
                        <Collapse in={isOpen} timeout="auto" unmountOnExit>
                          <Box sx={{ p: "16px 48px 24px" }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography variant="subtitle2" fontWeight={600}>
                                รายละเอียดแยกตามเกรด
                              </Typography>
                              <Button
                                size="small"
                                onClick={() => onOpenDialog(order)}
                                color="info"
                              >
                                ดูรายละเอียดคำสั่งซื้อ
                              </Button>
                            </Box>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>เกรด</TableCell>
                                  <TableCell align="right">
                                    ปริมาณการซื้อ (กิโลกรัม)
                                  </TableCell>
                                  <TableCell align="right">
                                    มูลค่าการซื้อ (บาท)
                                  </TableCell>
                                  <TableCell align="right">
                                    ปริมาณการขาย (กิโลกรัม)
                                  </TableCell>
                                  <TableCell align="right">
                                    มูลค่าการขาย (บาท)
                                  </TableCell>
                                  <TableCell align="right">
                                    ปริมาณคงเหลือ (กิโลกรัม)
                                  </TableCell>
                                  <TableCell align="right">
                                    มูลค่าคงเหลือ (บาท)
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {Object.entries(order.grades).map(
                                  ([grade, gradeSummary]) => (
                                    <TableRow key={grade}>
                                      <TableCell>{grade}</TableCell>
                                      <TableCell align="right">
                                        {numberWithCommas(
                                          gradeSummary.buyQuantityKg
                                        )}
                                      </TableCell>
                                      <TableCell align="right">
                                        {numberWithCommas(
                                          gradeSummary.buyTotalAmount
                                        )}
                                      </TableCell>
                                      <TableCell align="right">
                                        {numberWithCommas(
                                          gradeSummary.sellQuantityKg
                                        )}
                                      </TableCell>
                                      <TableCell align="right">
                                        {numberWithCommas(
                                          gradeSummary.sellTotalAmount
                                        )}
                                      </TableCell>
                                      <TableCell align="right">
                                        {numberWithCommas(
                                          gradeSummary.buyQuantityKg -
                                            gradeSummary.sellQuantityKg
                                        )}
                                      </TableCell>
                                      <TableCell align="right">
                                        {numberWithCommas(
                                          gradeSummary.buyTotalAmount -
                                            gradeSummary.sellTotalAmount
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </Fragment>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <OrderInfoDialog
        open={openDialog}
        orderSummary={selectedRow}
        onClose={onCloseDialog}
      />
    </>
  );
}
