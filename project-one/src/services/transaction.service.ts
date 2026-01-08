"use server";

import { TransactionResponse } from "@/interface/transaction.interface";

export async function getTransactions(): Promise<TransactionResponse> {
  try {
    const res = await fetch(
      "https://apirecycle.unii.co.th/Stock/query-transaction-demo"
    );

    const { buyTransaction, sellTransaction }: TransactionResponse =
      await res.json();

    return {
      buyTransaction,
      sellTransaction,
    };
  } catch {
    throw new Error("Unable to fetch Transactions");
  }
}
