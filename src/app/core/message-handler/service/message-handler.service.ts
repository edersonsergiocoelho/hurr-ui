import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SeverityConstants } from 'src/app/commom/severity.constants';

@Injectable({
  providedIn: 'root'
})
export class MessageHandlerService {

  constructor(private messageService: MessageService) {}

  showInfoMessage(summary: string, detail: string): void {
    this.messageService.add({
      severity: SeverityConstants.INFO,
      summary: summary,
      detail: detail
    });
  }

  showWarnMessage(summary: string, detail: string): void {
    this.messageService.add({
      severity: SeverityConstants.WARN,
      summary: summary,
      detail: detail
    });
  }

  showSuccessMessage(summary: string, detail: string): void {
    this.messageService.add({
      severity: SeverityConstants.SUCCESS,
      summary: summary,
      detail: detail
    });
  }

  showErrorMessage(summary: string, detail: string): void {
    this.messageService.add({
      severity: SeverityConstants.ERROR,
      summary: summary,
      detail: detail
    });
  }

  showInternalServerErrorMessage(error: any, summary: string): void {
    this.messageService.add({
      severity: SeverityConstants.ERROR,
      summary: summary,
      detail: error.error?.message || error.toString()
    });
  }
}