import { State } from "src/app/page/admin/state/entity/state.entity";
import { CustomerVehicle } from "../../../entity/customer-vehicle.entity";
import { VehicleBrand } from "src/app/page/admin/vehicle-brand/entity/vehicle-brand.entity";
import { Vehicle } from "src/app/page/admin/vehicle/entity/vehicle.entity";
import { VehicleModel } from "src/app/page/admin/vehicle-model/entity/vehicle-model.entity";
import { VehicleColor } from "src/app/page/admin/vehicle-color/entity/vehicle-color.entity";
import { VehicleFuelType } from "src/app/page/admin/vehicle-fuel-type/entity/vehicle-fuel.type.entity";
import { VehicleTransmission } from "src/app/page/admin/vehicle-transmission/entity/vehicle-transmission.entity";
import { CustomerVehicleDTO } from "../../../dto/customer-vehicle-dto.entity";

export class CustomerVehicleEditDetailUIDTO {
  
  customerVehicle: CustomerVehicle;
  customerVehicleDTO: CustomerVehicleDTO;

  vehicleBrands: Array<VehicleBrand>;
  selectedVehicleBrand: VehicleBrand;

  vehicles: Array<Vehicle>;
  selectedVehicle: Vehicle;

  vehicleModels: Array<VehicleModel>;
  selectedVehicleModel: VehicleModel;

  VehicleTransmissions: Array<VehicleTransmission>;
  selectedVehicleTransmission: VehicleTransmission;

  licensePlateType: string = "oldModel";
  licensePlateMask: string = 'aaa-9999';

  yearOfManufacture: Date;
  yearOfTheCar: Date;

  states: Array<State> 
  selectedState: State;

  vehicleColors: Array<VehicleColor>
  selectedVehicleColor: VehicleColor;

  vehicleFuelTypes: Array<VehicleFuelType>;
  selectedVehicleFuelType: VehicleFuelType;

  // Messages - Translate
  error_summary_message_service_Generic: string;
  warn_summary_message_service_Generic: string;

  success_summary_message_service_Generic: string;
  save_success_message_service_CustomerVehicleEditDetail: string;
}