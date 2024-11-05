import { File } from "src/app/page/file/entity/file.entity";
import { VehicleBrandDTO } from "../dto/vehicle-brand-dto.dto";

export class VehicleBrand {

  vehicleBrandId: string;
  vehicleBrandName: string;
  file: File;
  createdDate: Date;
  modifiedDate: Date;
  enabled: boolean;

  public static toDTO(vehicleBrand: VehicleBrand): VehicleBrandDTO {
    return {
      vehicleBrandId: vehicleBrand.vehicleBrandId,
      vehicleBrandName: vehicleBrand.vehicleBrandName,
      file: vehicleBrand.file,
      createdDate: vehicleBrand.createdDate,
      modifiedDate: vehicleBrand.modifiedDate,
      enabled: vehicleBrand.enabled
    };
  }
}