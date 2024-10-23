import { VehicleCategory } from "../../vehicle-category/entity/vehicle-category.entity";
import { Vehicle } from "../../vehicle/entity/vehicle.entity";

export class VehicleModel {
  
  vehicleModelId: string;
  vehicleModelName: string;
  vehicle: Vehicle;
  vehicleCategory: VehicleCategory;
  createdDate: Date;
  modifiedDate: Date;
  enabled: boolean;
}