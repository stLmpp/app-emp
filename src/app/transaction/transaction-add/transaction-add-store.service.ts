import { Inject, Injectable } from '@angular/core';
import { setProp } from '@ngneat/elf';

import { TransactionAddStore, TransactionAddStoreToken } from './transaction-add.store';

import { TransactionCreateDto } from '@model/transaction-create.dto';

@Injectable({ providedIn: 'root' })
export class TransactionAddStoreService {
  constructor(@Inject(TransactionAddStoreToken) private readonly store: TransactionAddStore) {}

  private _updateDto(dto: Partial<TransactionCreateDto>): void {
    this.store.update(setProp('dto', oldDto => ({ ...oldDto, ...dto })));
  }

  reset(): void {
    this.store.reset();
  }

  setIdUser(idUser: string): void {
    this.store.update(setProp('idUser', idUser));
  }

  getIdUser(): string | null {
    return this.store.query(state => state.idUser);
  }

  setNameAndDescription(dto: Pick<TransactionCreateDto, 'name' | 'description'>): void {
    this._updateDto(dto);
  }

  setPerson(dto: Pick<TransactionCreateDto, 'personName' | 'idPerson'>): void {
    this._updateDto(dto);
  }

  setDateAndValue(dto: Pick<TransactionCreateDto, 'total' | 'date'>): void {
    this._updateDto(dto);
  }

  getDto(): Readonly<TransactionCreateDto> {
    return this.store.query(state => state.dto);
  }
}
