export interface GradeSummary {
  buyQuantityKg: number;
  buyTotalAmount: number;
  sellQuantityKg: number;
  sellTotalAmount: number;
  prices: number[];
}

export interface OrderSummary {
  categoryId: string;
  categoryName: string;
  subCategoryId: string;
  subCategoryName: string;
  grades: Record<string, GradeSummary>;
  remainingQuantityKg: number;
  remainingTotalAmount: number;
  orderIds: string[];
  orderFinishedDates: string[];
}

export interface OrderSummaryFilter {
  dateFrom?: string;
  dateTo?: string;
  categoryId?: string;
  subCategoryId?: string;
  orderId?: string;
  grade?: string;
  priceFrom?: number;
  priceTo?: number;
}
