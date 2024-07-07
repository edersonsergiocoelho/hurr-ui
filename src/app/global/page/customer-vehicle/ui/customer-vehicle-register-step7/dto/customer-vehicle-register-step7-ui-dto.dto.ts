import { State } from "src/app/page/admin/state/entity/state.entity";
import { CustomerVehicleRegisterStep1UIDTO } from "../../customer-vehicle-register-step1/dto/customer-vehicle-register-step1-ui-dto.dto";

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

  customerVehicleRegisterStep1UIDTO: CustomerVehicleRegisterStep1UIDTO;

  licensePlate: string;
  licensePlateType: string = "oldModel";
  licensePlateMask: string = 'aaa-9999';
  renavam: string;
  states: Array<State> 
  selectedState: State;
  chassis: string;
  yearOfManufacture: Date;
  yearOfTheCar: Date;
  description: string;

  // Messages
  error_message_service_Generic: string;
  warn_message_service_Generic: string;
  failed_to_open_new_tab_message_service_Generic: string;
}