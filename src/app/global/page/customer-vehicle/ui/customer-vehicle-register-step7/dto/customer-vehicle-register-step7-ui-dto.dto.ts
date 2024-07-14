import { CustomerVehicleFileInsurance } from "src/app/page/customer-vehicle-file-insurance/entity/customer-vehicle-file-insurance.entity";

export class CustomerVehicleRegisterStep7UIDTO {

  isFormValid: boolean = false;

  // FileUpload
  uploadedFiles: any;

  // Galleria
  displayCustom: boolean;

  activeIndex: number = 0;

  documents: any[];

  responsiveOptions: any[] = [
      {
          breakpoint: '1500px',
          numVisible: 5
      },
      {
          breakpoint: '1024px',
          numVisible: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];

  customerVehicleFileInsurances: Array<CustomerVehicleFileInsurance>;

  // Messages
  error_message_service_Generic: string;
  warn_message_service_Generic: string;
  failed_to_open_new_tab_message_service_Generic: string;
}