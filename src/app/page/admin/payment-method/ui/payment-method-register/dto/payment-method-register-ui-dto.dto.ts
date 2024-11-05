import { PaymentMethodDTO } from "../../../dto/payment-method-dto.dto";
import { PaymentMethod } from "../../../entity/payment-method.entity";
import { TranslateMessageServiceDTO } from "src/app/core/translate/dto/translate-message-service-dto.dto";

export class PaymentMethodRegisterUIDTO extends TranslateMessageServiceDTO {

  paymentMethodDTO: PaymentMethodDTO;
  paymentMethodes: Array<PaymentMethod>;

  // FileUpload
  uploadedFiles: any;
  files: Array<any>;

  // Mensagens - Tradução
  save_success_message_service_PaymentMethodRegister: string;
  update_success_message_service_PaymentMethodRegister: string;
  delete_success_message_service_PaymentMethodRegister: string;
}