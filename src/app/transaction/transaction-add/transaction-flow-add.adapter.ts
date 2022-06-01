import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { TransactionEditAddPortMessages, TransactionFlowPort } from '../transaction-flow.port';
import { TransactionService } from '../transaction.service';
import { UserTransactionsNewStoreService } from '../user-transactions-new/user-transactions-new-store.service';

import { TransactionCard } from '@model/transaction-card';
import { TransactionCreateDto } from '@model/transaction-create.dto';

@Injectable({ providedIn: 'root' })
export class TransactionFlowAddAdapter extends TransactionFlowPort {
  constructor(
    private readonly userTransactionsNewStoreService: UserTransactionsNewStoreService,
    private readonly transactionService: TransactionService
  ) {
    super();
  }

  readonly messages: TransactionEditAddPortMessages = {
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
    return this.userTransactionsNewStoreService.getDto();
  }

  getIdUser(): string | null {
    return this.userTransactionsNewStoreService.getIdUser();
  }

  reset(): void {
    this.userTransactionsNewStoreService.reset();
  }

  save(idUser: string, dto: TransactionCreateDto): Observable<TransactionCard> {
    return this.transactionService.create(idUser, dto);
  }

  setDateAndTotal(dto: Pick<TransactionCreateDto, 'total' | 'date'>): void {
    this.userTransactionsNewStoreService.setDateAndValue(dto);
  }

  setIdUser(idUser: string): void {
    this.userTransactionsNewStoreService.setIdUser(idUser);
  }

  setNameAndDescription(dto: Pick<TransactionCreateDto, 'name' | 'description'>): void {
    this.userTransactionsNewStoreService.setNameAndDescription(dto);
  }

  setPerson(dto: Pick<TransactionCreateDto, 'personName' | 'idPerson'>): void {
    this.userTransactionsNewStoreService.setPerson(dto);
  }

  override getMiddlePath(route: ActivatedRouteSnapshot): string[] {
    return ['new'];
  }
}
