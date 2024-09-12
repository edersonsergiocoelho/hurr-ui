import { TranslateConfirmServiceDTO } from "src/app/core/translate/dto/translate-confirm-service-dto.dto";
import { PaymentStatusSearchDTO } from "../../../dto/payment-status-search-dto.dto";
import { PaymentStatus } from "../../../entity/payment-status.entity";

export class PaymentStatusSearchUIDTO extends TranslateConfirmServiceDTO {

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