import { TranslateMessageServiceDTO } from "src/app/core/translate/dto/translate-message-service-dto.dto";
import { VehicleBrandDTO } from "../../../dto/vehicle-brand-dto.dto";
import { VehicleBrand } from "../../../entity/vehicle-brand.entity";

export class VehicleBrandRegisterUIDTO extends TranslateMessageServiceDTO {
  
  vehicleBrandDTO: VehicleBrandDTO;
  vehicleBrands: Array<VehicleBrand>;

  // FileUpload
  uploadedFiles: any;
  files: Array<any>;

  // Mensagens - Tradução
  save_success_detail_message_service_VehicleBrandRegister: string;
  update_success_detail_message_service_VehicleBrandRegister: string;
  delete_success_detail_message_service_VehicleBrandRegister: string;
}