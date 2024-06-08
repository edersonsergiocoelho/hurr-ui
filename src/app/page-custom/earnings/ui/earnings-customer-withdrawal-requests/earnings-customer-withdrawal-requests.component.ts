import { Component, OnInit } from '@angular/core';
import { EarningsCustomerWithdrawalRequestsUIDTO } from './dto/earnings-customer-withdrawal-requests-ui-dto.dto';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { first, firstValueFrom } from 'rxjs';
import { CustomerWithdrawalRequestsService } from 'src/app/global/page/customer-withdrawal-requests/service/customer-withdrawal-requests.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-earnings-customer-withdrawal-requests',
  templateUrl: './earnings-customer-withdrawal-requests.component.html',
  styleUrls: ['./earnings-customer-withdrawal-requests.component.css']
})
export class EarningsCustomerWithdrawalRequestsComponent implements OnInit {

  earningsCustomerWithdrawalRequestsUIDTO: EarningsCustomerWithdrawalRequestsUIDTO;

  constructor(
    private customerWithdrawalRequestsService: CustomerWithdrawalRequestsService,
    private messageService: MessageService,
    private ngxSpinnerService: NgxSpinnerService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.translateService.setDefaultLang('pt_BR');
    this.resetForm();
  }

  resetForm() {

    this.earningsCustomerWithdrawalRequestsUIDTO = new EarningsCustomerWithdrawalRequestsUIDTO();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.earningsCustomerWithdrawalRequestsUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];

    } catch (error: any) {

      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: '' + this.earningsCustomerWithdrawalRequestsUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    try {
        
      const customerWithdrawalRequestsServiceFindByCustomerId = await firstValueFrom(this.customerWithdrawalRequestsService.findByCustomerId().pipe(first()));
      
      if (customerWithdrawalRequestsServiceFindByCustomerId.status == 200 && customerWithdrawalRequestsServiceFindByCustomerId.body != null) {
        this.earningsCustomerWithdrawalRequestsUIDTO.customerWithdrawalRequests = customerWithdrawalRequestsServiceFindByCustomerId.body;
      }
      
    } catch (error: any) {
      this.messageService.add({ 
        severity: 'error', 
        summary: '' + this.earningsCustomerWithdrawalRequestsUIDTO.error_message_service_Generic,
        detail: error.toString() 
      });
    }

    this.ngxSpinnerService.hide();
  }
}