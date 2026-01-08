"use server";

import { getTransactions } from "@/services/transaction.service";
import { getProductCategories } from "@/services/product-category.service";
import { Transaction } from "@/interface/transaction.interface";
import {
  OrderSummary,
  GradeSummary,
} from "@/interface/order-summary.interface";
import { ProductCategory } from "@/interface/product-category.interface";

export const getOrderSummary = async (): Promise<OrderSummary[]> => {
  const [{ buyTransaction, sellTransaction }, { productList }] =
    await Promise.all([getTransactions(), getProductCategories()]);

  const productMap = buildProductMap(productList);
  const orderSummaryMap = new Map<string, OrderSummary>();

  processTransactions(buyTransaction, "buy", orderSummaryMap, productMap);
  processTransactions(sellTransaction, "sell", orderSummaryMap, productMap);

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
  productMap: Map<string, { categoryName: string; subCategoryName: string }>
) => {
  transactions.forEach((order) => {
    order.requestList.forEach((category) => {
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
        });
      }

      const order = orderSummaryMap.get(key)!;

      category.requestList.forEach((req) => {
        const gradeKey = req.grade;

        if (!order.grades[gradeKey]) {
          order.grades[gradeKey] = createEmptyGrade();
        }

        const grade = order.grades[gradeKey];

        const quantity = Number(req.quantity || 0);
        const total = Number(req.total || 0);

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
});
