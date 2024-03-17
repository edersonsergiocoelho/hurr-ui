import { DecimalPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DecimalPipeService {

  constructor(private decimalPipe: DecimalPipe) {}

  formatR$(value: number): string {
    return this.decimalPipe?.transform(value, '1.2-2')?.replace('.', ',') ?? '';
  }
}