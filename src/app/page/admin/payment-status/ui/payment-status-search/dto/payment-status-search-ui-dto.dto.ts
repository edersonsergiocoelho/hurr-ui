import { PaymentStatusDTO } from "../../../dto/payment-status-dto.dto";
import { PaymentStatusSearchDTO } from "../../../dto/payment-status-search-dto.dto";
import { PaymentStatus } from "../../../entity/payment-status.entity";
import { TranslateSelectButtonEnabledDTO } from "src/app/core/translate/dto/translate-select-button-enabled.dto.dto";

export class PaymentStatusSearchUIDTO extends TranslateSelectButtonEnabledDTO {

  columns: any[] = [];
  dt: any;
  totalRecords = 0;

  page: number = 0;
  size: number = 10;
  sortDir: string = '';
  sortBy: string | string[];

  paymentStatusSearchDTO: PaymentStatusSearchDTO;
  paymentStatuses: Array<PaymentStatus>;
  selectedPaymentStatus: Array<PaymentStatus>;

  enabledOptions: any[];
  enabledValue: string = 'ALL';

  // Mensagens - Tradução
  table_header_payment_status_id_PaymentStatusSearch: string;
  table_header_payment_status_name_PaymentStatusSearch: string;
  table_header_enabled_PaymentStatusSearch: string;
}