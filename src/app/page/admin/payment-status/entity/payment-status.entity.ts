import { PaymentStatusDTO } from "../dto/payment-status-dto.dto";
import { File } from "src/app/page/file/entity/file.entity";

export class PaymentStatus {

  paymentStatusId: string;
  paymentStatusName: string;
  file?: File;
  createdDate: Date;
  modifiedDate?: Date;
  enabled: boolean;

  public static toDTO(paymentStatus: PaymentStatus): PaymentStatusDTO {
    return {
      paymentStatusId: paymentStatus.paymentStatusId,
      paymentStatusName: paymentStatus.paymentStatusName,
      file: paymentStatus.file ? File.toDTO(paymentStatus.file) : undefined,
      createdDate: paymentStatus.createdDate,
      modifiedDate: paymentStatus.modifiedDate,
      enabled: paymentStatus.enabled,
    };
  }
}