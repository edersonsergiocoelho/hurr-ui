import { FileDTO } from "src/app/page/file/dto/file.dto";
import { PaymentStatus } from "../entity/payment-status.entity";

export class PaymentStatusDTO {
  
  paymentStatusId: string;
  paymentStatusName: string;
  file?: FileDTO;
  createdDate: Date;
  modifiedDate?: Date;
  enabled: boolean;

  public static toEntity(paymentStatusDTO: PaymentStatusDTO): PaymentStatus {
    return {
      paymentStatusId: paymentStatusDTO.paymentStatusId,
      paymentStatusName: paymentStatusDTO.paymentStatusName,
      file: paymentStatusDTO.file ? FileDTO.toEntity(paymentStatusDTO.file) : undefined,
      createdDate: paymentStatusDTO.createdDate,
      modifiedDate: paymentStatusDTO.modifiedDate,
      enabled: paymentStatusDTO.enabled,
    };
  }
}