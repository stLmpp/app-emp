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

  setNameAndDescription(dto: Pick<TransactionCreateDto, 'name' | 'description'>): void {
    this._updateDto(dto);
  }

  setPerson(dto: Pick<TransactionCreateDto, 'personName' | 'idPerson'>): void {
    this._updateDto(dto);
  }

  setDateAndValue(dto: Pick<TransactionCreateDto, 'total' | 'date'>): void {
    this._updateDto(dto);
  }

  isNameAndDescriptionValid(): boolean {
    const { name } = this.store.get('dto');
    return (
      !!name && name.length >= TransactionCreateDto.nameMinLength && name.length <= TransactionCreateDto.nameMaxLength
    );
  }

  isPersonValid(): boolean {
    const { personName, idPerson } = this.store.get('dto');
    const isNameAndDescriptionValid = this.isNameAndDescriptionValid();
    return (
      (isNameAndDescriptionValid && !!idPerson) ||
      (isNameAndDescriptionValid &&
        !!personName &&
        personName.length >= TransactionCreateDto.personNameMinLength &&
        personName.length <= TransactionCreateDto.personNameMaxLength)
    );
  }

  isDateAndValueValid(): boolean {
    const { total, date } = this.store.get('dto');
    return (
      this.isPersonValid() && !!date && total >= TransactionCreateDto.totalMin && total <= TransactionCreateDto.totalMax
    );
  }

  getDto(): TransactionCreateDto {
    return this.store.get('dto');
  }
}
