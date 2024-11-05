import { Component, OnInit } from '@angular/core';
import { EarningsUIDTO } from './dto/earnings-ui.dto';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { first, firstValueFrom } from 'rxjs';
import { SeverityConstants } from 'src/app/commom/severity.constants';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.css']
})
export class EarningsComponent implements OnInit {

  earningsUIDTO: EarningsUIDTO;

  isOverviewActive: boolean = true;
  isTransactionsVisibleActive: boolean = false;

  resumeVisible: boolean = true;
  transactionsVisible: boolean = false;

  toggleOverview() {
    this.isOverviewActive = true;
    this.isTransactionsVisibleActive = false;

    this.resumeVisible = true;
    this.transactionsVisible = false;
  }

  toggleTransactions() {
    this.isOverviewActive = false;
    this.isTransactionsVisibleActive = true;

    this.resumeVisible = false;
    this.transactionsVisible = true;
  }

  constructor(
    private messageService: MessageService,
    private ngxSpinnerService: NgxSpinnerService,
    private translateService: TranslateService,
  ) {}

  ngOnInit() {
    this.resetForm();
  }

  resetForm() {

    this.earningsUIDTO = new EarningsUIDTO();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_summary_message_service_Generic'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.earningsUIDTO.error_summary_message_service_Generic = translations['error_summary_message_service_Generic'];

    } catch (error: any) {

      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: '' + this.earningsUIDTO.error_summary_message_service_Generic,
        detail: error.toString()
      });
    }
  
    this.ngxSpinnerService.hide();
  }
}