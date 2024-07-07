import { State } from "src/app/page/admin/state/entity/state.entity";
import { CustomerVehicleRegisterStep1UIDTO } from "../../customer-vehicle-register-step1/dto/customer-vehicle-register-step1-ui-dto.dto";

export class CustomerVehicleRegisterStep6UIDTO {

  isFormValid: boolean = false;

  // FileUpload
  uploadedFiles: any;

  // Galleria
  displayCustom: boolean;
  activeIndex: number = 0;
  images: any[];

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

  // Messages
  error_message_service_Generic: string;
  warn_message_service_Generic: string;
}