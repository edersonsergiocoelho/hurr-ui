import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RateUtilsService {

  calculateTotalRate(startDate: Date, endDate: Date, dailyRate: number): number {
    const start = moment(startDate);
    const end = moment(endDate);
  
    // Diferença entre as datas
    const difference = end.diff(start, 'days'); // Obtém a diferença em dias
  
    return difference * dailyRate;
  }
}