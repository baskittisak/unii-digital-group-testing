export interface CategoryResponse {
  StatusCode: number;
  success: boolean;
  productList: ProductCategory[];
}

export interface ProductCategory {
  categoryId: string;
  categoryName: string;
  subcategory: SubCategoryItem[];
}

export interface SubCategoryItem {
  subCategoryId: string;
  subCategoryName: string;
}
