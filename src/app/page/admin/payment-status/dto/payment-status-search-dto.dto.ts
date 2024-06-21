import { FileDTO } from "src/app/page/file/dto/file.dto";

export class PaymentStatusSearchDTO {
  
  paymentStatusId: string;
  paymentStatusName: string;
  file?: FileDTO;
  createdDate: Date;
  modifiedDate?: Date;
  enabled: boolean;
}