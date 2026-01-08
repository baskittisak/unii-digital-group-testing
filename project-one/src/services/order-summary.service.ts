"use server";

import { getTransactions } from "@/services/transaction.service";
import { getProductCategories } from "@/services/product-category.service";
import { Transaction } from "@/interface/transaction.interface";
import {
  OrderSummary,
  GradeSummary,
  OrderSummaryFilter,
} from "@/interface/order-summary.interface";
import { ProductCategory } from "@/interface/product-category.interface";

export const getOrderSummary = async (
  filters: OrderSummaryFilter = {}
): Promise<OrderSummary[]> => {
  const [{ buyTransaction, sellTransaction }, { productList }] =
    await Promise.all([getTransactions(), getProductCategories()]);

  const productMap = buildProductMap(productList);
  const orderSummaryMap = new Map<string, OrderSummary>();

  processTransactions(
    buyTransaction,
    "buy",
    orderSummaryMap,
    productMap,
    filters
  );
  processTransactions(
    sellTransaction,
    "sell",
    orderSummaryMap,
    productMap,
    filters
  );

  orderSummaryMap.forEach((order) => {
    let buyQty = 0;
    let sellQty = 0;
    let buyAmt = 0;
    let sellAmt = 0;

    Object.values(order.grades).forEach((grade) => {
      buyQty += grade.buyQuantityKg;
      sellQty += grade.sellQuantityKg;
      buyAmt += grade.buyTotalAmount;
      sellAmt += grade.sellTotalAmount;
    });

    order.remainingQuantityKg = buyQty - sellQty;
    order.remainingTotalAmount = buyAmt - sellAmt;
  });

  const result = Array.from(orderSummaryMap.values()).sort((a, b) => {
    const categoryCompare = a.categoryId.localeCompare(b.categoryId);
    if (categoryCompare !== 0) return categoryCompare;

    return a.subCategoryId.localeCompare(b.subCategoryId);
  });

  return result;
};

const buildProductMap = (
  productList: ProductCategory[]
): Map<string, { categoryName: string; subCategoryName: string }> => {
  const productMap = new Map<
    string,
    { categoryName: string; subCategoryName: string }
  >();

  productList.forEach((category) => {
    category.subcategory.forEach((subCategory) => {
      const key = `${category.categoryId}-${subCategory.subCategoryId}`;
      const value = {
        categoryName: category.categoryName,
        subCategoryName: subCategory.subCategoryName,
      };

      productMap.set(key, value);
    });
  });

  return productMap;
};

const processTransactions = (
  transactions: Transaction[],
  type: "buy" | "sell",
  orderSummaryMap: Map<string, OrderSummary>,
  productMap: Map<string, { categoryName: string; subCategoryName: string }>,
  filters: OrderSummaryFilter
) => {
  transactions.forEach((order) => {
    if (filters.dateFrom && order.orderFinishedDate < filters.dateFrom) return;
    if (filters.dateTo && order.orderFinishedDate > filters.dateTo) return;
    if (filters.orderId && order.orderId !== filters.orderId) return;

    order.requestList.forEach((category) => {
      if (filters.categoryId && category.categoryID !== filters.categoryId) {
        return;
      }

      if (
        filters.subCategoryId &&
        category.subCategoryID !== filters.subCategoryId
      ) {
        return;
      }

      const validGrades = category.requestList.filter((req) => {
        if (filters.grade && req.grade !== filters.grade) return false;

        const price = Number(req.price || 0);

        if (filters.priceFrom !== undefined && price < filters.priceFrom) {
          return false;
        }

        if (filters.priceTo !== undefined && price > filters.priceTo) {
          return false;
        }

        return true;
      });

      if (validGrades.length === 0) return;

      const key = `${category.categoryID}-${category.subCategoryID}`;

      if (!orderSummaryMap.has(key)) {
        const product = productMap.get(key);

        orderSummaryMap.set(key, {
          categoryId: category.categoryID,
          categoryName: product?.categoryName ?? "-",
          subCategoryId: category.subCategoryID,
          subCategoryName: product?.subCategoryName ?? "-",
          grades: {},
          remainingQuantityKg: 0,
          remainingTotalAmount: 0,
          orderIds: [],
          orderFinishedDates: [],
        });
      }

      const summary = orderSummaryMap.get(key)!;

      if (!summary.orderIds.includes(order.orderId)) {
        summary.orderIds.push(order.orderId);
      }

      if (!summary.orderFinishedDates.includes(order.orderFinishedDate)) {
        summary.orderFinishedDates.push(order.orderFinishedDate);
      }

      validGrades.forEach((req) => {
        const gradeKey = req.grade;

        if (!summary.grades[gradeKey]) {
          summary.grades[gradeKey] = createEmptyGrade();
        }

        const grade = summary.grades[gradeKey];

        const quantity = Number(req.quantity || 0);
        const total = Number(req.total || 0);
        const price = Number(req.price || 0);

        if (!grade.prices.includes(price)) {
          grade.prices.push(price);
        }

        if (type === "buy") {
          grade.buyQuantityKg += quantity;
          grade.buyTotalAmount += total;
        } else {
          grade.sellQuantityKg += quantity;
          grade.sellTotalAmount += total;
        }
      });
    });
  });
};

const createEmptyGrade = (): GradeSummary => ({
  buyQuantityKg: 0,
  buyTotalAmount: 0,
  sellQuantityKg: 0,
  sellTotalAmount: 0,
  prices: [],
});
