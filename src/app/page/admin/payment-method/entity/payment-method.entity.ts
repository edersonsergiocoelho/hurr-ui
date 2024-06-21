import { File } from "src/app/page/file/entity/file.entity";

export class PaymentMethod {
 
  paymentMethodId: string;
  paymentMethodName: string;
  file?: File;
  createdDate: Date;
  modifiedDate?: Date;
  enabled: boolean;

  dataURI: string;
}