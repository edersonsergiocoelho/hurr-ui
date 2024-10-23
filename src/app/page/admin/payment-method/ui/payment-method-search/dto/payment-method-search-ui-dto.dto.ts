import { TranslateConfirmServiceDTO } from "src/app/core/translate/dto/translate-confirm-service-dto.dto";
import { PaymentMethodSearchDTO } from "../../../dto/payment-method-search-dto.dto";
import { PaymentMethod } from "../../../entity/payment-method.entity";

export class PaymentMethodSearchUIDTO extends TranslateConfirmServiceDTO {

  columns: any[] = [];
  dt: any;
  totalRecords = 0;

  page: number = 0;
  size: number = 10;
  sortDir: string = '';
  sortBy: string | string[];

  globalFilter: string | undefined;

  paymentMethodSearchDTO: PaymentMethodSearchDTO;
  paymentMethodes: Array<PaymentMethod>;
  selectedPaymentMethod: Array<PaymentMethod>;

  enabledOptions: any[];
  enabledValue: string = 'ALL';

  // Mensagens - Tradução
  table_header_payment_method_id_PaymentMethodSearch: string;
  table_header_payment_method_name_PaymentMethodSearch: string;
  table_header_enabled_PaymentMethodSearch: string;
}