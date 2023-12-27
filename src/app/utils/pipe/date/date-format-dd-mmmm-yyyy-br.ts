import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormatDDMMMMYYYYBR'
})
export class DateFormatDDMMMMYYYYBR implements PipeTransform {

  transform(value: any, args?: any): any {
    const datePipe = new DatePipe('pt-BR');
    const formattedDate = datePipe.transform(value, 'dd MMMM yyyy');
    
    // Separando a data em partes: dia, mês e ano
    const parts = formattedDate?.split(' ');

    if (parts && parts.length === 3) {
      // Transforma apenas a primeira letra do mês para maiúsculo
      parts[1] = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
      return parts.join(' ');
    }

    return formattedDate;
  }
}