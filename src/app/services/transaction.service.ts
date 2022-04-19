import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TransactionCard } from '../models/transaction-card';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  constructor(private readonly httpClient: HttpClient) {}

  readonly path = (idUser: string): string => `/users/${idUser}/transactions`;

  getCards(idUser: string): Observable<TransactionCard[]> {
    return this.httpClient.get<TransactionCard[]>(`${this.path(idUser)}/cards`);
  }
}
