import { State } from "src/app/page/admin/state/entity/state.entity";
import { CustomerVehicleRegisterStep1UIDTO } from "../../customer-vehicle-register-step1/dto/customer-vehicle-register-step1-ui-dto.dto";

export class CustomerVehicleRegisterStep5UIDTO {

  isFormValid: boolean = false;

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
}