import { FileDTO } from "src/app/page/file/dto/file.dto";
import { PaymentMethod } from "../entity/payment-method.entity";

export class PaymentMethodDTO {

  paymentMethodId: string;
  paymentMethodName: string;
  file?: FileDTO;
  createdDate: Date;
  modifiedDate?: Date;
  enabled: boolean;

  dataURI: string;

  public static toEntity(paymentMethodDTO: PaymentMethodDTO): PaymentMethod {
    return {
      paymentMethodId: paymentMethodDTO.paymentMethodId,
      paymentMethodName: paymentMethodDTO.paymentMethodName,
      file: paymentMethodDTO.file ? FileDTO.toEntity(paymentMethodDTO.file) : undefined, // Supondo que FileDTO também tenha um método toEntity
      createdDate: paymentMethodDTO.createdDate,
      modifiedDate: paymentMethodDTO.modifiedDate,
      enabled: paymentMethodDTO.enabled,
      dataURI: paymentMethodDTO.dataURI
    };
  }
}