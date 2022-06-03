import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TransactionFlowMessages, TransactionFlowPort } from '../transaction-flow.port';
import { TransactionService } from '../transaction.service';

import { TransactionAddStoreService } from './transaction-add-store.service';

import { TransactionCard } from '@model/transaction-card';
import { TransactionCreateDto } from '@model/transaction-create.dto';

@Injectable({ providedIn: 'root' })
export class TransactionFlowAddAdapter extends TransactionFlowPort {
  constructor(
    private readonly transactionAddStoreService: TransactionAddStoreService,
    private readonly transactionService: TransactionService
  ) {
    super();
  }

  readonly messages: TransactionFlowMessages = {
    title: 'Add new transaction',
    saveError: 'Could not create transaction, please try again later',
    saveSuccessful: 'New transaction added successfully!',
    summarySaveButton: 'Create transaction',
    summaryTitle: 'Summary of the new transaction',
    nameAndDescriptionPageTitle: 'New transaction - Name and description',
    personPageTitle: 'New transaction - Person',
    dateAndTotalPageTitle: 'New transaction - Date and total',
    summaryPageTitle: 'New transactions - Summary',
  };

  getDto(): TransactionCreateDto {
    return this.transactionAddStoreService.getDto();
  }

  getIdUser(): string | null {
    return this.transactionAddStoreService.getIdUser();
  }

  reset(): void {
    this.transactionAddStoreService.reset();
  }

  save(idUser: string, dto: TransactionCreateDto): Observable<TransactionCard> {
    return this.transactionService.create(idUser, dto);
  }

  setDateAndTotal(dto: Pick<TransactionCreateDto, 'total' | 'date'>): void {
    this.transactionAddStoreService.setDateAndValue(dto);
  }

  setIdUser(idUser: string): void {
    this.transactionAddStoreService.setIdUser(idUser);
  }

  setNameAndDescription(dto: Pick<TransactionCreateDto, 'name' | 'description'>): void {
    this.transactionAddStoreService.setNameAndDescription(dto);
  }

  setPerson(dto: Pick<TransactionCreateDto, 'personName' | 'idPerson'>): void {
    this.transactionAddStoreService.setPerson(dto);
  }

  override getMiddlePath(): string[] {
    return ['new'];
  }
}
