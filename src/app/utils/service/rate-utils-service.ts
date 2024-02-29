import { DecimalPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RateUtilsService {

  constructor(private decimalPipe: DecimalPipe) {}

  calculateTotalRate(startDate: Date, endDate: Date, dailyRate: number): number {
    const start = moment(startDate);
    const end = moment(endDate);
  
    const difference = end.diff(start, 'days');
  
    return difference * dailyRate;
  }

  formatDailyRateWithComma(dailyRate: number): string {
    return this.decimalPipe?.transform(dailyRate, '1.2-2')?.replace('.', ',') ?? '';
  }
}