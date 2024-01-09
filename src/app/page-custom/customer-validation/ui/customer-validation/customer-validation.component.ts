import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { first, firstValueFrom } from 'rxjs';
import { CustomerValidationUUIDTO } from './dto/customer-validation-ui.dto';
import { CustomerService } from 'src/app/global/page/customer/service/customer.service';
import { SessionStorageService } from 'src/app/core/session-storage/service/session-storage.service';
import { Customer } from 'src/app/global/page/customer/entity/customer.entity';

@Component({
  selector: 'app-customer-validation',
  templateUrl: './customer-validation.component.html',
  styleUrls: ['./customer-validation.component.css']
})
export class CustomerValidationComponent implements OnInit {

  customerValidationUIDTO: CustomerValidationUUIDTO;

  constructor(private messageService: MessageService,

              private sessionStorageService: SessionStorageService,

              private customerService: CustomerService) {

  }

  ngOnInit(): void {
    this.resetCustomerValidationForm();
  }

  resetCustomerValidationForm () {

    this.customerValidationUIDTO = new CustomerValidationUUIDTO();

    this.customerValidationUIDTO.customer = new Customer();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    try {

      const currentUser = this.sessionStorageService.getUser();

      const resultCustomerFindByEmail = await firstValueFrom(this.customerService.findByEmail(currentUser.email).pipe(first()));

      if (resultCustomerFindByEmail.status == 200) {

        if (resultCustomerFindByEmail.body != null) {
          this.customerValidationUIDTO.customer = resultCustomerFindByEmail.body;
        }
      }

    } catch (error: any) {

      if (error.status == 404) {;

        this.messageService.add({ severity: 'warn', 
                                  summary: 'Não encontrado dados do cliente.', 
                                  detail: 'Não encontrado dados do cliente, favor seguir os passos para a validação.',
                                  life: 5000 
                                });
      }

      if (error.status == 500) {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
      }
    }
  }

  clickSendCode() {

    this.customerService.sendCode(this.customerValidationUIDTO.customer).pipe(first()).subscribe({
      next: (data: any) => {

        debugger;
        //this.serverACCSearchUIDTO.serverACCSearchList = data.body.content;
        //this.serverACCSearchUIDTO.totalRecords = data.body.totalElements;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error });

        //this.ngxSpinnerService.hide();
      },
      complete: () => {
        //this.ngxSpinnerService.hide();
      }
    });
  }
}