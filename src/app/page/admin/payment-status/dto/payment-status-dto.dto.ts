import { FileDTO } from "src/app/page/file/dto/file.dto";

export class PaymentStatusDTO {
  
  paymentStatusId: string;
  paymentStatusName: string;
  file?: FileDTO;
  createdDate: Date;
  modifiedDate?: Date;
  enabled: boolean;
}