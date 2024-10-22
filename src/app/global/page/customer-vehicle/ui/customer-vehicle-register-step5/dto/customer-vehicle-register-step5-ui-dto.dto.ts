import { State } from "src/app/page/admin/state/entity/state.entity";
import { CustomerVehicleRegisterStep1UIDTO } from "../../customer-vehicle-register-step1/dto/customer-vehicle-register-step1-ui-dto.dto";
import { VehicleColor } from "src/app/page/admin/vehicle-color/entity/vehicle-color.entity";
import { VehicleFuelType } from "src/app/page/admin/vehicle-fuel-type/entity/vehicle-fuel.type.entity";

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
  vehicleColors: Array<VehicleColor>;
  selectedVehicleColor: VehicleColor;
  vehicleFuelTypes: Array<VehicleFuelType>;
  selectedVehicleFuelType: VehicleFuelType;

  // Messages - Translate
  error_summary_message_service_Generic: string;
  warn_summary_message_service_Generic: string;
}