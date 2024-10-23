import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'src/app/core/session-storage/service/session-storage.service';

@Pipe({ name: 'boolean' })
export class BooleanPipe implements PipeTransform {

  constructor(
    private sessionStorageService: SessionStorageService,
    private translateService: TranslateService) 
  { }

  transform(value: boolean, ...args: any[]): string {

    const currentUserPreference = this.sessionStorageService.getUserPreference();

    if (currentUserPreference != null) {
      this.translateService.setDefaultLang(currentUserPreference.language);
    } else {
      this.translateService.setDefaultLang('pt_BR');
    }
    
    return value ? this.translateService.instant('label_enable_true_Generic') : this.translateService.instant('label_enable_false_Generic');
  }
}