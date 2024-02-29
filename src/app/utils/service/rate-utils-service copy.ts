import { DecimalPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DecimalPipeService {

  constructor(private decimalPipe: DecimalPipe) {}

  formatR$(dailyRate: number): string {
    return this.decimalPipe?.transform(dailyRate, '1.2-2')?.replace('.', ',') ?? '';
  }
}