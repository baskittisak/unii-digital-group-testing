"use server";

import {
  ProductCategory,
  CategoryResponse,
} from "@/interface/product-category.interface";

export async function getProductCategories(): Promise<{
  productList: ProductCategory[];
}> {
  try {
    const res = await fetch(
      "https://apirecycle.unii.co.th/category/query-product-demo"
    );

    const { productList }: CategoryResponse = await res.json();
    return { productList };
  } catch {
    throw new Error("Unable to fetch product categories");
  }
}
