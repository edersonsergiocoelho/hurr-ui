import { VehicleBrand } from "../../vehicle-brand/entity/vehicle-brand.entity";

export interface Vehicle {

  vehicleId: string;
  vehicleName: string;
  createdDate: Date;
  modifiedDate: Date;
  enabled: boolean;

  vehicleBrand: VehicleBrand;
}