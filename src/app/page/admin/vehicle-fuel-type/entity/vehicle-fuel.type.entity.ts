import { File } from "src/app/page/file/entity/file.entity";

export class VehicleFuelType {
  
  vehicleFuelTypeId: string;
  vehicleFuelTypeName: string;
  file: File;
  createdDate: Date;
  modifiedDate: Date;
  enabled: boolean;
}