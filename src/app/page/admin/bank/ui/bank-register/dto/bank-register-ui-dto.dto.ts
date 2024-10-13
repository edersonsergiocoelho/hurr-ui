import { BankDTO } from "../../../dto/bank-dto.dto";
import { Bank } from "../../../entity/bank.entity";
import { TranslateMessageServiceDTO } from "src/app/core/translate/dto/translate-message-service-dto.dto";

export class BankRegisterUIDTO extends TranslateMessageServiceDTO {

  bankDTO: BankDTO;
  bankes: Array<Bank>;

  // FileUpload
  uploadedFiles: any;
  files: Array<any>;

  // Mensagens - Tradução
  save_success_message_service_BankRegister: string;
  update_success_message_service_BankRegister: string;
  delete_success_message_service_BankRegister: string;
}