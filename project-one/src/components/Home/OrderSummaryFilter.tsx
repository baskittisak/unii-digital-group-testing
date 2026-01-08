"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { OrderSummaryFilter } from "@/interface/order-summary.interface";
import { ProductCategory } from "@/interface/product-category.interface";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";

interface Props {
  productList: ProductCategory[];
}

const GRADES = ["A", "B", "C", "D"] as const;

export default function OrderSummaryFilterComponent({ productList }: Props) {
  const router = useRouter();
  const [filters, setFilters] = useState<OrderSummaryFilter>({});

  useEffect(() => {
    router.replace("/", { scroll: false });
  }, [router]);

  const handleSetText = (key: keyof OrderSummaryFilter, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  const handleSetNumber = (key: keyof OrderSummaryFilter, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "" ? undefined : Number(value),
    }));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.set(key, String(value));
      }
    });

    router.push(`?${params.toString()}`);
  };

  const handleClear = () => {
    setFilters({});
    router.push("?");
  };

  const subCategoryOptions = useMemo(() => {
    if (!filters.categoryId) return [];
    const category = productList.find(
      (c) => c.categoryId === filters.categoryId
    );
    return category?.subcategory ?? [];
  }, [filters.categoryId, productList]);

  const isSearchDisabled = useMemo(() => {
    return Object.keys(filters).length === 0;
  }, [filters]);

  return (
    <Paper sx={{ mb: 2, p: 2 }}>
      <Typography sx={{ mb: 1 }}>ตัวกรองข้อมูล</Typography>

      <Stack spacing={2} direction={{ xs: "column", md: "row" }}>
        <TextField
          label="วันที่เริ่มต้น"
          type="date"
          size="small"
          slotProps={{ inputLabel: { shrink: true } }}
          value={filters.dateFrom ?? ""}
          onChange={(e) => handleSetText("dateFrom", e.target.value)}
          fullWidth
        />

        <TextField
          label="วันที่สิ้นสุด"
          type="date"
          size="small"
          slotProps={{ inputLabel: { shrink: true } }}
          value={filters.dateTo ?? ""}
          onChange={(e) => handleSetText("dateTo", e.target.value)}
          fullWidth
        />

        <TextField
          label="หมวดหมู่"
          select
          size="small"
          value={filters.categoryId ?? ""}
          onChange={(e) =>
            setFilters({
              categoryId: e.target.value || undefined,
              subCategoryId: undefined,
            })
          }
          fullWidth
        >
          {productList.map((c) => (
            <MenuItem key={c.categoryId} value={c.categoryId}>
              {c.categoryId} - {c.categoryName}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="หมวดหมู่ย่อย"
          select
          size="small"
          disabled={!filters.categoryId}
          value={filters.subCategoryId ?? ""}
          onChange={(e) => handleSetText("subCategoryId", e.target.value)}
          fullWidth
        >
          {subCategoryOptions.map((s) => (
            <MenuItem key={s.subCategoryId} value={s.subCategoryId}>
              {s.subCategoryId} - {s.subCategoryName}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <Stack spacing={2} direction={{ xs: "column", md: "row" }} sx={{ mt: 2 }}>
        <TextField
          label="หมายเลขคำสั่งซื้อ"
          size="small"
          value={filters.orderId ?? ""}
          onChange={(e) => handleSetText("orderId", e.target.value)}
          fullWidth
        />

        <TextField
          label="ราคาเริ่มต้น"
          type="number"
          size="small"
          value={filters.priceFrom ?? ""}
          onChange={(e) => handleSetNumber("priceFrom", e.target.value)}
          fullWidth
        />

        <TextField
          label="ราคาสุดท้าย"
          type="number"
          size="small"
          value={filters.priceTo ?? ""}
          onChange={(e) => handleSetNumber("priceTo", e.target.value)}
          fullWidth
        />

        <TextField
          label="เกรด"
          select
          size="small"
          value={filters.grade ?? ""}
          onChange={(e) => handleSetText("grade", e.target.value)}
          fullWidth
        >
          {GRADES.map((g) => (
            <MenuItem key={g} value={g}>
              {g}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
        <Button
          variant="outlined"
          color="inherit"
          disabled={isSearchDisabled}
          onClick={handleClear}
        >
          ล้างค่า
        </Button>
        <Button
          variant="contained"
          disabled={isSearchDisabled}
          onClick={handleSearch}
        >
          ค้นหา
        </Button>
      </Box>
    </Paper>
  );
}
