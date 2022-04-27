import { TransactionType } from './transaction-type';

export interface TransactionCreateDto {
  name: string;
  description?: string;
  idPerson?: string;
  personName?: string;
  date: Date;
  type: TransactionType;
  total: number;
}
