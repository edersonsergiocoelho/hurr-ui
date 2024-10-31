import { FileDTO } from "src/app/page/file/dto/file.dto";

export class VehicleTransmissionDTO {
  
  vehicleTransmissionId: string;
  vehicleTransmissionName: string;
  file: FileDTO;
  createdDate: Date;
  modifiedDate: Date;
  enabled: boolean;
}