import { FileDTO } from "src/app/page/file/dto/file.dto";
import { VehicleBrand } from "../entity/vehicle-brand.entity";

export class VehicleBrandDTO {

  vehicleBrandId: string;
  vehicleBrandName: string;
  file: FileDTO;
  createdDate: Date;
  modifiedDate: Date;
  enabled: boolean;

  public static toEntity(vehicleBrandDTO: VehicleBrandDTO): VehicleBrand {
    return {
      vehicleBrandId: vehicleBrandDTO.vehicleBrandId,
      vehicleBrandName: vehicleBrandDTO.vehicleBrandName,
      file: vehicleBrandDTO.file,
      createdDate: vehicleBrandDTO.createdDate,
      modifiedDate: vehicleBrandDTO.modifiedDate,
      enabled: vehicleBrandDTO.enabled
    };
  }
}