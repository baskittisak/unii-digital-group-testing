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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface OrderSummaryTableProps {
  orderSummary: OrderSummary[];
}

export default function OrderSummaryTable({
  orderSummary,
}: OrderSummaryTableProps) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <Box>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ชนิดของสินค้า</TableCell>
              <TableCell>หมวดหมู่ย่อย</TableCell>
              <TableCell align="right">ปริมาณซื้อทั้งหมด (กิโลกรัม)</TableCell>
              <TableCell align="right">มูลค่าการซื้อทั้งหมด (บาท)</TableCell>
              <TableCell align="right">ปริมาณขายทั้งหมด (กิโลกรัม)</TableCell>
              <TableCell align="right">มูลค่าการขายทั้งหมด (บาท)</TableCell>
              <TableCell align="right">ปริมาณคงเหลือทั้งหมด (กิโลกรัม)</TableCell>
              <TableCell align="right">มูลค่าคงเหลือทั้งหมด (บาท)</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {orderSummary.map((row) => {
              const rowKey = `${row.categoryId}-${row.subCategoryId}`;
              const isOpen = openKey === rowKey;

              const totals = Object.values(row.grades).reduce(
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
                      {row.categoryId} - {row.categoryName}
                    </TableCell>
                    <TableCell>
                      {row.subCategoryId} - {row.subCategoryName}
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
                    <TableCell colSpan={9} sx={{ p: 0 }}>
                      <Collapse in={isOpen} timeout="auto" unmountOnExit>
                        <Box sx={{ m: 1 }}>
                          <Typography variant="subtitle2">
                            รายละเอียดแยกตามเกรด
                          </Typography>

                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>เกรด</TableCell>
                                <TableCell align="right">
                                  ปริมาณซื้อ (กิโลกรัม)
                                </TableCell>
                                <TableCell align="right">
                                  มูลค่าการซื้อ (บาท)
                                </TableCell>
                                <TableCell align="right">
                                  ปริมาณขาย (กิโลกรัม)
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
                              {Object.entries(row.grades).map(
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
    </Box>
  );
}
