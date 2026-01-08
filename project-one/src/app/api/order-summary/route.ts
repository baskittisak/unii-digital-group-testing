import { NextResponse } from "next/server";
import { getOrderSummary } from "@/services/order-summary.service";

export async function GET() {
  const data = await getOrderSummary();
  return NextResponse.json(data);
}
