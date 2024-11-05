import { File } from "src/app/page/file/entity/file.entity";
import { PaymentMethodDTO } from "../dto/payment-method-dto.dto";

export class PaymentMethod {
 
  paymentMethodId: string;
  paymentMethodName: string;
  file?: File; // Supondo que File seja a entidade correspondente a FileDTO
  createdDate: Date;
  modifiedDate?: Date;
  enabled: boolean;

  dataURI: string;

  public static toDTO(paymentMethod: PaymentMethod): PaymentMethodDTO {
    return {
      paymentMethodId: paymentMethod.paymentMethodId,
      paymentMethodName: paymentMethod.paymentMethodName,
      file: paymentMethod.file ? File.toDTO(paymentMethod.file) : undefined, // Supondo que File tenha um método toDTO
      createdDate: paymentMethod.createdDate,
      modifiedDate: paymentMethod.modifiedDate,
      enabled: paymentMethod.enabled,
      dataURI: paymentMethod.dataURI
    };
  }
}