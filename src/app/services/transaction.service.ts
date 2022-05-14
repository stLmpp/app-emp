import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TransactionCard } from '../models/transaction-card';
import { TransactionCreateDto } from '../models/transaction-create.dto';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  constructor(private readonly httpClient: HttpClient) {}

  readonly path = (idUser: string): string => `/user/${idUser}/transaction`;

  getCards(idUser: string): Observable<TransactionCard[]> {
    return this.httpClient.get<TransactionCard[]>(`${this.path(idUser)}/cards`);
  }

  create(idUser: string, dto: TransactionCreateDto): Observable<TransactionCard> {
    return this.httpClient.post<TransactionCard>(`${this.path(idUser)}`, dto);
  }
}
