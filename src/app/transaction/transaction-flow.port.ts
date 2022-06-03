import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { TransactionCard } from '@model/transaction-card';
import { TransactionCreateDto } from '@model/transaction-create.dto';

export interface TransactionFlowMessages {
  title: string;
  saveSuccessful: string;
  saveError: string;
  summaryTitle: string;
  summarySaveButton: string;
  nameAndDescriptionPageTitle: string;
  personPageTitle: string;
  dateAndTotalPageTitle: string;
  summaryPageTitle: string;
}

// TODO add edit adapter

export abstract class TransactionFlowPort {
  abstract readonly messages: TransactionFlowMessages;

  isNameAndDescriptionValid(): boolean {
    const { name } = this.getDto();
    return (
      !!name && name.length >= TransactionCreateDto.nameMinLength && name.length <= TransactionCreateDto.nameMaxLength
    );
  }

  isPersonValid(): boolean {
    const { personName, idPerson } = this.getDto();
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
    const { total } = this.getDto();
    return this.isPersonValid() && total >= TransactionCreateDto.totalMin && total <= TransactionCreateDto.totalMax;
  }

  abstract getDto(): TransactionCreateDto;
  abstract setNameAndDescription(dto: Pick<TransactionCreateDto, 'name' | 'description'>): void;
  abstract setPerson(dto: Pick<TransactionCreateDto, 'personName' | 'idPerson'>): void;
  abstract setDateAndTotal(dto: Pick<TransactionCreateDto, 'total' | 'date'>): void;
  abstract getIdUser(): string | null;
  abstract setIdUser(idUser: string): void;
  abstract save(idUser: string, dto: TransactionCreateDto): Observable<TransactionCard>;
  abstract reset(): void;
  abstract getMiddlePath(route: ActivatedRouteSnapshot): string[];
}
