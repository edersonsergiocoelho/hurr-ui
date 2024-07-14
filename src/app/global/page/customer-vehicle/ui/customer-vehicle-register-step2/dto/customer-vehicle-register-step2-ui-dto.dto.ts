import { VehicleBrand } from "src/app/page/admin/vehicle-brand/entity/vehicle-brand.entity";
import { VehicleModel } from "src/app/page/admin/vehicle-model/entity/vehicle-model.entity";
import { Vehicle } from "src/app/page/admin/vehicle/entity/vehicle.entity";

export class CustomerVehicleRegisterStep2UIDTO {

  vehicleBrands: Array<VehicleBrand>;
  selectedVehicleBrand: VehicleBrand;

  vehicles: Array<Vehicle>;
  selectedVehicle: Vehicle;

  vehicleModels: Array<VehicleModel>;
  selectedVehicleModel: VehicleModel;

  // Messages
  error_message_service_Generic: string;
  warn_message_service_Generic: string;
}