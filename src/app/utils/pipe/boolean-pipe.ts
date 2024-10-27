import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, switchMap } from 'rxjs';

@Pipe({ name: 'boolean' })
export class BooleanPipe implements PipeTransform {

  constructor(
    private translateService: TranslateService) 
  { 

  }

  /*
  transform(value: boolean, ...args: any[]): string {
    return value ? this.translateService.instant('label_enable_true_Generic') : this.translateService.instant('label_enable_false_Generic');
  }
  */

  transform(value: boolean, ...args: any[]): Observable<string> {
    // Garante que a tradução ocorre depois do idioma ser carregado
    return this.translateService.get('label_enable_true_Generic').pipe(
      switchMap(() => {
        const key = value ? 'label_enable_true_Generic' : 'label_enable_false_Generic';
        return this.translateService.get(key); // Retorna a tradução observável
      })
    );
  }
}