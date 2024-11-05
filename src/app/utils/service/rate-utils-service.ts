import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RateUtilsService {

  constructor() {}

  calculateTotalRate(startDate: Date, endDate: Date, dailyRate: number): number {
    const start = moment(startDate);
    const end = moment(endDate);
  
    // Calcula a diferença em dias, incluindo frações de dias
    const difference = end.diff(start, 'hours') / 24;
  
    // Verifica se houve uma fração de dia (para contabilizar o segundo dia mesmo que não esteja completo)
    const totalDays = Math.ceil(difference);

    return totalDays * dailyRate;
  }
}