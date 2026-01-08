export interface GradeSummary {
  buyQuantityKg: number;
  buyTotalAmount: number;
  sellQuantityKg: number;
  sellTotalAmount: number;
}

export interface OrderSummary {
  categoryId: string;
  categoryName: string;
  subCategoryId: string;
  subCategoryName: string;
  grades: Record<string, GradeSummary>;
  remainingQuantityKg: number;
  remainingTotalAmount: number;
}
