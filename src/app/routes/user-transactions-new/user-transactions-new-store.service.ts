import { Injectable } from '@angular/core';

import { TransactionCreateDto } from '../../models/transaction-create.dto';

import { UserTransactionsNewStore } from './user-transactions-new.store';

@Injectable({ providedIn: 'root' })
export class UserTransactionsNewStoreService {
  constructor(private readonly store: UserTransactionsNewStore) {}

  private _updateDto(dto: Partial<TransactionCreateDto>): void {
    this.store.update('dto', oldDto => ({ ...oldDto, ...dto }));
  }

  reset(): void {
    this.store.reset();
  }

  setIdUser(idUser: string): void {
    this.store.set('idUser', idUser);
  }

  getIdUser(): string | null {
    return this.store.get('idUser');
  }

  setStep1(step1: Pick<TransactionCreateDto, 'name' | 'description'>): void {
    this._updateDto(step1);
  }

  setStep2(step2: Pick<TransactionCreateDto, 'personName' | 'idPerson'>): void {
    this._updateDto(step2);
  }

  setStep3(step3: Pick<TransactionCreateDto, 'total' | 'date'>): void {
    this._updateDto(step3);
  }

  isStep1Valid(): boolean {
    const { name } = this.store.get('dto');
    return !!name && name.length <= TransactionCreateDto.nameMaxLength;
  }

  isStep2Valid(): boolean {
    const { personName, idPerson } = this.store.get('dto');
    const isStep1Valid = this.isStep1Valid();
    return (
      (isStep1Valid && !!idPerson) ||
      (isStep1Valid && !!personName && personName.length <= TransactionCreateDto.personNameMaxLength)
    );
  }

  isStep3Valid(): boolean {
    const { total, date } = this.store.get('dto');
    return (
      this.isStep2Valid() && !!date && total >= TransactionCreateDto.totalMin && total <= TransactionCreateDto.totalMax
    );
  }

  getDto(): TransactionCreateDto {
    return this.store.get('dto');
  }
}
