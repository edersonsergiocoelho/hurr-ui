import { FeeDTO } from "../../../dto/fee-dto.dto";
import { Fee } from "../../../entity/fee.entity";
import { TranslateMessageServiceDTO } from "src/app/core/translate/dto/translate-message-service-dto.dto";

export class FeeRegisterUIDTO extends TranslateMessageServiceDTO {

  feeDTO: FeeDTO;
  feees: Array<Fee>;

  feeTypes: FeeType[];
  selectedFeeType: FeeType;

  // Mensagens - Tradução
  save_success_message_service_FeeRegister: string;
  update_success_message_service_FeeRegister: string;
  delete_success_message_service_FeeRegister: string;
}

interface FeeType {
  name: string;
  code: string;
}