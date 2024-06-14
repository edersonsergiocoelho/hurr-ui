import { FileDTO } from "src/app/page/file/dto/file.dto";

export class PaymentMethodSearchDTO {

  paymentMethodId: string;
  paymentMethodName: string;
  file?: FileDTO;
  createdDate: Date;
  modifiedDate?: Date;
  enabled: boolean;
}