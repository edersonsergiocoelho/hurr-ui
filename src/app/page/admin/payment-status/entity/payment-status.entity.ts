import { PaymentStatusDTO } from "../dto/payment-status-dto.dto";
import { File } from "src/app/page/file/entity/file.entity";

export class PaymentStatus {

  paymentStatusId: string;
  paymentStatusName: string;
  file?: File; // Supondo que File seja a entidade correspondente a FileDTO
  createdDate: Date;
  modifiedDate?: Date;
  enabled: boolean;

  public static toDTO(paymentStatus: PaymentStatus): PaymentStatusDTO {
    return {
      paymentStatusId: paymentStatus.paymentStatusId,
      paymentStatusName: paymentStatus.paymentStatusName,
      file: paymentStatus.file ? File.toDTO(paymentStatus.file) : undefined, // Supondo que File tenha um método toDTO
      createdDate: paymentStatus.createdDate,
      modifiedDate: paymentStatus.modifiedDate,
      enabled: paymentStatus.enabled,
    };
  }
}