import { Component, OnInit } from '@angular/core';
import { CustomerVehicleSearchUIDTO } from './dto/customer-vehicle-search-ui-dto.dto';
import { DataViewLazyLoadEvent } from 'primeng/dataview';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { CustomerVehicleService } from '../../service/customer-vehicle.service';
import { first, firstValueFrom } from 'rxjs';
import { CustomerVehicle } from '../../entity/customer-vehicle.entity';
import { CustomerVehicleSearchDTO } from '../../dto/customer-vehicle-search-dto.dto';
import { Router } from '@angular/router';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { CustomerVehicleFilePhotoService } from 'src/app/page/customer-vehicle-file-photo/service/customer-vehicle-file-photo.service';

@Component({
  selector: 'app-customer-vehicle-search',
  templateUrl: './customer-vehicle-search.component.html',
  styleUrls: ['./customer-vehicle-search.component.css']
})
export class CustomerVehicleSearchComponent implements OnInit {

  customerVehicleSearchUIDTO: CustomerVehicleSearchUIDTO;

  constructor (
    private customerVehicleService: CustomerVehicleService,
    private customerVehicleFilePhotoService: CustomerVehicleFilePhotoService,
    private router: Router,
    private messageService: MessageService,
    private ngxSpinnerService: NgxSpinnerService,
    private translateService: TranslateService,
  ) {

  }

  ngOnInit(): void {
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

    try {

      const keys = [
        'error_message_service_Generic',
        'label_created_date_option_1_CustomerVehicleSearch',
        'label_created_date_option_2_CustomerVehicleSearch'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.customerVehicleSearchUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.customerVehicleSearchUIDTO.label_created_date_option_1_CustomerVehicleSearch = translations['label_created_date_option_1_CustomerVehicleSearch'];
      this.customerVehicleSearchUIDTO.label_created_date_option_2_CustomerVehicleSearch = translations['label_created_date_option_2_CustomerVehicleSearch'];

    } catch (error: any) {
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: '' + this.customerVehicleSearchUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }
    
    this.customerVehicleSearchUIDTO.sortOptions = [
      { label: '' + this.customerVehicleSearchUIDTO.label_created_date_option_1_CustomerVehicleSearch, value: '!createdDate' },
      { label: '' + this.customerVehicleSearchUIDTO.label_created_date_option_2_CustomerVehicleSearch, value: 'createdDate' }
    ];

    this.customerVehicleSearchUIDTO.sortField = this.customerVehicleSearchUIDTO.sortOptions[1].value;

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

  getVehicleColorStyle(vehicleColorName: string): string {
    switch(vehicleColorName.toLowerCase()) {
      case 'preto': return '#000000';
      case 'branco': return '#FFFFFF';
      case 'prata': return '#C0C0C0';
      case 'cinza': return '#808080';
      case 'vermelho': return '#FF0000';
      case 'azul': return '#0000FF';
      case 'amarelo': return '#FFFF00';
      case 'verde': return '#008000';
      case 'marrom': return '#A52A2A';
      case 'bege': return '#F5F5DC';
      default: return '#D3D3D3';  // Cor padrão para cores não mapeadas
    }
  }

  async search(event: DataViewLazyLoadEvent | null) {

    this.paginate(event);

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

    this.customerVehicleService.customerSearchPage(this.customerVehicleSearchUIDTO.customerVehicleSearchDTO, this.customerVehicleSearchUIDTO.page, this.customerVehicleSearchUIDTO.size, this.customerVehicleSearchUIDTO.sortDir, this.customerVehicleSearchUIDTO.sortBy).pipe(first()).subscribe({
      next: (data: any) => {
        this.customerVehicleSearchUIDTO.customerVehicles = data.body.content;
        this.customerVehicleSearchUIDTO.totalRecords = data.body.totalElements;

        this.customerVehicleSearchUIDTO.customerVehicles.forEach(vehicle => {
          this.getFile(vehicle);
        });
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

  async getFile (customerVehicle: any) {

    try {

      const customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto = await firstValueFrom(this.customerVehicleFilePhotoService.findByCustomerVehicleAndCoverPhoto(customerVehicle.customerVehicleId).pipe(first()));
        
      if (customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.status == 200) {
        if (customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.body != null) {
          
          customerVehicle.file = customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.body;
          customerVehicle.dataURI = `data:${customerVehicle.file.contentType};base64,${customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.body.dataAsByteArray}`;
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({ 
          severity: SeverityConstants.ERROR, 
          summary: '' + this.customerVehicleSearchUIDTO.error_message_service_Generic,
          detail: error.toString() 
        });
      }
    }
  }

  async paginate(event: any) {
    this.customerVehicleSearchUIDTO.size = event.rows;
    this.customerVehicleSearchUIDTO.page = event.first / event.rows;
  }

  clickRouterNavigateToCustomerVehicleRegister() {
    this.router.navigate(['/customer-vehicle/register']);
  }

  clickRouterNavigateToCustomerVehicleEdit(rowData) {
    this.router.navigate(['/customer-vehicle/edit/photos/' + rowData.customerVehicleId]);
  }
}