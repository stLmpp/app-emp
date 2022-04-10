import { NgModule } from '@angular/core';

import { UniqueUserIdValidatorDirective } from './unique-user-id-validator.directive';

@NgModule({
  declarations: [UniqueUserIdValidatorDirective],
  exports: [UniqueUserIdValidatorDirective],
})
export class UniqueUserIdValidatorModule {}
