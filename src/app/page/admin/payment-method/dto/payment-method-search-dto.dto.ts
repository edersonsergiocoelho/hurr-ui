import { FileDTO } from "src/app/page/file/dto/file.dto";

export class PaymentMethodSearchDTO {

  globalFilter: string;
  paymentMethodName: string;
  enabled: boolean | null;
}