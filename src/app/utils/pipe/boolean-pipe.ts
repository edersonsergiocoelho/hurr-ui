import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({ name: 'boolean' })
export class BooleanPipe implements PipeTransform {

  constructor(private translate: TranslateService) {}

  transform(value: boolean, ...args: any[]): string {
    return value ? this.translate.instant('label_enable_true_Generic') : this.translate.instant('label_enable_false_Generic');
  }
}