import { getOrderSummary } from "@/services/order-summary.service";
import { getProductCategories } from "@/services/product-category.service";
import { OrderSummaryFilter } from "@/interface/order-summary.interface";
import Home from "@/components/Home";

interface HomePageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

const getText = (value?: string | string[]) =>
  typeof value === "string" && value.trim() !== "" ? value : undefined;

const getNumber = (value?: string | string[]) => {
  if (typeof value !== "string") return undefined;
  const num = Number(value);
  return Number.isNaN(num) ? undefined : num;
};

const buildFilters = (
  searchParams: Record<string, string | string[] | undefined>
): OrderSummaryFilter => ({
  orderId: getText(searchParams.orderId),
  dateFrom: getText(searchParams.dateFrom),
  dateTo: getText(searchParams.dateTo),
  categoryId: getText(searchParams.categoryId),
  subCategoryId: getText(searchParams.subCategoryId),
  grade: getText(searchParams.grade),
  priceFrom: getNumber(searchParams.priceFrom),
  priceTo: getNumber(searchParams.priceTo),
});

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = buildFilters(resolvedSearchParams ?? {});

  const [orderSummary, { productList }] = await Promise.all([
    getOrderSummary(filters),
    getProductCategories(),
  ]);

  return <Home orderSummary={orderSummary} productList={productList} />;
}
