import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerVehicleRoutingModule } from './customer-vehicle-routing.module';

import { TranslateModule } from '@ngx-translate/core';

import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { GalleriaModule } from 'primeng/galleria';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';

import { CustomerVehicleComponent } from '../ui/customer-vehicle/customer-vehicle.component';
import { CustomerVehicleDetailComponent } from '../ui/customer-vehicle-detail/customer-vehicle-detail.component';
import { CustomerVehicleSearchComponent } from '../ui/customer-vehicle-search/customer-vehicle-search.component';
import { CustomerVehicleRegisterComponent } from '../ui/customer-vehicle-register/customer-vehicle-register.component';
import { CustomerVehicleRegisterStep1Component } from '../ui/customer-vehicle-register-step1/customer-vehicle-register-step1.component';
import { CustomerVehicleRegisterStep2Component } from '../ui/customer-vehicle-register-step2/customer-vehicle-register-step2.component';
import { CustomerVehicleRegisterStep3Component } from '../ui/customer-vehicle-register-step3/customer-vehicle-register-step3.component';
import { CustomerVehicleRegisterStep4Component } from '../ui/customer-vehicle-register-step4/customer-vehicle-register-step4.component';
import { CustomerVehicleRegisterStep5Component } from '../ui/customer-vehicle-register-step5/customer-vehicle-register-step5.component';
import { CustomerVehicleRegisterStep6Component } from '../ui/customer-vehicle-register-step6/customer-vehicle-register-step6.component';
import { CustomerVehicleRegisterStep7Component } from '../ui/customer-vehicle-register-step7/customer-vehicle-register-step7.component';
import { ConfirmationService } from 'primeng/api';
import { CustomerVehicleEditPhotosComponent } from '../ui/customer-vehicle-edit-photos/customer-vehicle-edit-photos.component';
import { CustomerVehicleEditPriceDiscountComponent } from '../ui/customer-vehicle-edit-price-discount/customer-vehicle-edit-price-discount.component';
import { CustomerVehicleEditAdvertisementStatusComponent } from '../ui/customer-vehicle-edit-advertisement-status/customer-vehicle-edit-advertisement-status.component';
import { CustomerVehicleEditLimitedMileageComponent } from '../ui/customer-vehicle-edit-limited-mileage/customer-vehicle-edit-limited-mileage.component';
import { CustomerVehicleEditDetailComponent } from '../ui/customer-vehicle-edit-detail/customer-vehicle-edit-detail.component';
import { CustomerVehicleEditAddressesComponent } from '../ui/customer-vehicle-edit-addresses/customer-vehicle-edit-addresses.component';
import { CustomerVehicleEditAddressesRegisterComponent } from '../ui/customer-vehicle-edit-addresses-register/customer-vehicle-edit-addresses-register.component';
import { CustomerVehicleEditAddressesSearchComponent } from '../ui/customer-vehicle-edit-addresses-search/customer-vehicle-edit-addresses-search.component';
import { TableModule } from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';
import { UtilsPipeModule } from 'src/app/utils/pipe/module/utils-pipe.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
  declarations: [
    CustomerVehicleComponent,
    CustomerVehicleDetailComponent,
    CustomerVehicleEditAddressesComponent,
    CustomerVehicleEditAddressesRegisterComponent,
    CustomerVehicleEditAddressesSearchComponent,
    CustomerVehicleEditAdvertisementStatusComponent,
    CustomerVehicleEditDetailComponent,
    CustomerVehicleEditLimitedMileageComponent,
    CustomerVehicleEditPhotosComponent,
    CustomerVehicleEditPriceDiscountComponent,
    CustomerVehicleSearchComponent,
    CustomerVehicleRegisterComponent,
    CustomerVehicleRegisterStep1Component,
    CustomerVehicleRegisterStep2Component,
    CustomerVehicleRegisterStep3Component,
    CustomerVehicleRegisterStep4Component,
    CustomerVehicleRegisterStep5Component,
    CustomerVehicleRegisterStep6Component,
    CustomerVehicleRegisterStep7Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerVehicleRoutingModule,

    UtilsPipeModule,

    TranslateModule,

    ButtonModule,
    CalendarModule,
    ConfirmDialogModule,
    DataViewModule,
    DropdownModule,
    DividerModule,
    GalleriaModule,
    RatingModule,
    FileUploadModule,
    RadioButtonModule,
    InputTextModule,
    InputNumberModule,
    InputMaskModule,
    InputSwitchModule,
    SelectButtonModule,
    MultiSelectModule,
    TableModule,
    ToolbarModule,
    ToastModule
  ],
  exports: [
    CustomerVehicleComponent,
    CustomerVehicleDetailComponent,
    CustomerVehicleEditAddressesComponent,
    CustomerVehicleEditAddressesRegisterComponent,
    CustomerVehicleEditAddressesSearchComponent,
    CustomerVehicleEditAdvertisementStatusComponent,
    CustomerVehicleEditDetailComponent,
    CustomerVehicleEditLimitedMileageComponent,
    CustomerVehicleEditPhotosComponent,
    CustomerVehicleEditPriceDiscountComponent,
    CustomerVehicleSearchComponent,
    CustomerVehicleRegisterComponent,
    CustomerVehicleRegisterStep1Component,
    CustomerVehicleRegisterStep2Component,
    CustomerVehicleRegisterStep3Component,
    CustomerVehicleRegisterStep4Component,
    CustomerVehicleRegisterStep5Component,
    CustomerVehicleRegisterStep6Component,
    CustomerVehicleRegisterStep7Component
  ],
  providers: [
    ConfirmationService
  ]
})
export class CustomerVehicleModule { }
