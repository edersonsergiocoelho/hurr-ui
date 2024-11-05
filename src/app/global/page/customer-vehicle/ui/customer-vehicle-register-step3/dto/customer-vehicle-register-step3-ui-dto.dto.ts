import { VehicleBrand } from "src/app/page/admin/vehicle-brand/entity/vehicle-brand.entity";
import { VehicleModel } from "src/app/page/admin/vehicle-model/entity/vehicle-model.entity";
import { VehicleTransmission } from "src/app/page/admin/vehicle-transmission/entity/vehicle-transmission.entity";
import { Vehicle } from "src/app/page/admin/vehicle/entity/vehicle.entity";

export class CustomerVehicleRegisterStep3UIDTO {

  VehicleTransmissions: Array<VehicleTransmission>;
  selectedVehicleTransmission: VehicleTransmission;

  mileageCreated: number;

  // Messages - Translate
  error_summary_message_service_Generic: string;
  warn_summary_message_service_Generic: string;
}