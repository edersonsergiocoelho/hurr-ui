import { DecimalPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MomentUtilsService {

  constructor() {}

  // Método auxiliar para verificar se duas datas são do mesmo dia
  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
  }

  diffDays(initDate: Date, endDate: Date): number {

    const init = moment(initDate);
    const end = moment(endDate);
  
    // Calcula a diferença em dias, incluindo frações de dias
    const difference = end.diff(init, 'hours') / 24;
  
    // Verifica se houve uma fração de dia (para contabilizar o segundo dia mesmo que não esteja completo)
    const totalDays = Math.ceil(difference);

    return totalDays;
  }
}