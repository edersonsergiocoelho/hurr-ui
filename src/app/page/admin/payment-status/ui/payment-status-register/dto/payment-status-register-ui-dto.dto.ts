import { TranslateSeverityDTO } from "src/app/core/translate/dto/translate-severity-dto.dto";
import { PaymentStatusDTO } from "../../../dto/payment-status-dto.dto";
import { PaymentStatus } from "../../../entity/payment-status.entity";
import { TranslateMessageServiceDTO } from "src/app/core/translate/dto/translate-message-service-dto.dto";

export class PaymentStatusRegisterUIDTO extends TranslateMessageServiceDTO {

  paymentStatusDTO: PaymentStatusDTO;
  paymentStatuses: Array<PaymentStatus>;

  // Mensagens - Tradução
  save_success_message_service_PaymentStatusRegister: string;
  update_success_message_service_PaymentStatusRegister: string;
  delete_success_message_service_PaymentStatusRegister: string;
}