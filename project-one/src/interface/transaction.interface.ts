export interface TransactionResponse {
  buyTransaction: Transaction[];
  sellTransaction: Transaction[];
}

export interface Transaction {
  orderId: string;
  requestList: CategoryRequest[];
  transactionParties: TransactionParties | null;
  orderFinishedDate: string;
  orderFinishedTime: string;
}

export interface CategoryRequest {
  categoryID: string;
  subCategoryID: string;
  requestList: GradeRequest[];
}

export interface GradeRequest {
  grade: string;
  price: number;
  quantity: string;
  total: number;
}

export interface TransactionParties {
  customer: Party;
  transport: Party;
  collector: Party;
}

export interface Party {
  roleName: string;
  name: string;
  id: string;
}
