import { TransactionItem } from './transaction-item';

export interface TransactionWithItems {
  idTransaction: string;
  idPerson: string;
  personName: string;
  name: string;
  description: string;
  date: string;
  total: number;
  items: TransactionItem[];
}
