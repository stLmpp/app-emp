import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TransactionCard } from '../models/transaction-card';
import { TransactionCreateDto } from '../models/transaction-create.dto';
import { TransactionWithItems } from '../models/transaction-with-items';
import { CacheService } from '../shared/cache/cache.service';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  constructor(private readonly httpClient: HttpClient, private readonly cacheService: CacheService) {}

  private readonly _cache = this.cacheService.create();

  readonly path = (idUser: string): string => `/user/${idUser}/transaction`;

  getCards(idUser: string): Observable<TransactionCard[]> {
    return this.httpClient.get<TransactionCard[]>(`${this.path(idUser)}/cards`).pipe(this._cache.use(idUser, 'cards'));
  }

  create(idUser: string, dto: TransactionCreateDto): Observable<TransactionCard> {
    return this.httpClient.post<TransactionCard>(`${this.path(idUser)}`, dto).pipe(this._cache.burst(idUser, 'cards'));
  }

  getWithItems(idUser: string, idTransaction: string): Observable<TransactionWithItems> {
    return this.httpClient
      .get<TransactionWithItems>(`${this.path(idUser)}/${idTransaction}/with/items`)
      .pipe(this._cache.use(idUser, idTransaction));
  }
}
