import { Component, OnInit } from '@angular/core';
import { CustomerVehicleSearchUIDTO } from './dto/customer-vehicle-search-ui-dto.dto';
import { DataViewLazyLoadEvent } from 'primeng/dataview';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { CustomerVehicleService } from '../../service/customer-vehicle.service';
import { first } from 'rxjs';
import { CustomerVehicle } from '../../entity/customer-vehicle.entity';
import { CustomerVehicleSearchDTO } from '../../dto/customer-vehicle-search-dto.dto';
import { Router } from '@angular/router';
import { SeverityConstants } from 'src/app/commom/severity.constants';

@Component({
  selector: 'app-customer-vehicle-search',
  templateUrl: './customer-vehicle-search.component.html',
  styleUrls: ['./customer-vehicle-search.component.css']
})
export class CustomerVehicleSearchComponent implements OnInit {

  customerVehicleSearchUIDTO: CustomerVehicleSearchUIDTO;

  constructor (
    private customerVehicleService: CustomerVehicleService,
    private router: Router,
    private messageService: MessageService,
    private ngxSpinnerService: NgxSpinnerService,
    private translateService: TranslateService,
  ) {

  }

  ngOnInit(): void {
    this.translateService.setDefaultLang('pt_BR');
    this.resetForm();
  }

  resetForm() {

    this.customerVehicleSearchUIDTO = new CustomerVehicleSearchUIDTO();

    this.customerVehicleSearchUIDTO.customerVehicles = new Array<CustomerVehicle>;
    this.customerVehicleSearchUIDTO.customerVehicleSearchDTO = new CustomerVehicleSearchDTO();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    this.ngxSpinnerService.hide();
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.customerVehicleSearchUIDTO.sortOrder = -1;
      this.customerVehicleSearchUIDTO.sortField = value.substring(1, value.length);
    } else {
      this.customerVehicleSearchUIDTO.sortOrder = 1;
      this.customerVehicleSearchUIDTO.sortField = value;
    }
  }

  search(event: DataViewLazyLoadEvent | null) {

    if (event && event.sortField) {
      this.customerVehicleSearchUIDTO.sortBy = event.sortField;
    }
    if (event && event.sortOrder) {
      if(event.sortOrder == 1) {
        this.customerVehicleSearchUIDTO.sortDir = "DESC";
      } else if(event.sortOrder == -1) {
        this.customerVehicleSearchUIDTO.sortDir = "ASC";
      }
    }
  
    this.customerVehicleService.searchPage(this.customerVehicleSearchUIDTO.customerVehicleSearchDTO, this.customerVehicleSearchUIDTO.page, this.customerVehicleSearchUIDTO.size, this.customerVehicleSearchUIDTO.sortDir, this.customerVehicleSearchUIDTO.sortBy).pipe(first()).subscribe({
      next: (data: any) => {
        this.customerVehicleSearchUIDTO.customerVehicles = data.body.content;
        this.customerVehicleSearchUIDTO.totalRecords = data.body.totalElements;
      },
      error: (error) => {

        if (error.status == 500) {

          this.messageService.add({ 
            severity: SeverityConstants.ERROR, 
            summary: '' + this.customerVehicleSearchUIDTO.error_message_service_Generic, 
            detail: error.error.message 
          });
        }

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    });
  }

  paginate(event: any) {
    this.customerVehicleSearchUIDTO.size = event.rows;
    this.customerVehicleSearchUIDTO.page = event.first / event.rows;
  }

  navigateToCustomerVehicleRegister() {
    this.router.navigate(['/customer-vehicle/register']);
  }
}