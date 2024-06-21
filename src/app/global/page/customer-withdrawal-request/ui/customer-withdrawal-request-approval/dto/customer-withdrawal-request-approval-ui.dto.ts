import { PaymentStatus } from "src/app/page/admin/payment-status/entity/payment-status.entity";
import { CustomerWithdrawalRequestSearchDTO } from "../../../dto/customer-withdrawal-request-search-dto.dto";
import { CustomerWithdrawalRequest } from "../../../entity/customer-withdrawal-request.entity";
import { PaymentMethod } from "src/app/page/admin/payment-method/entity/payment-method.entity";

export class CustomerWithdrawalRequestApprovalUIDTO {

  // Table
  columns: any[] = [];
  totalRecords = 0;

  page: number = 0;
  size: number = 10;
  sortDir: string = '';
  sortBy: string | string[];

  // Entity's
  paymentMethods: Array<PaymentMethod>;
  selectedPaymentMethod: PaymentMethod;
  paymentStatuses: Array<PaymentStatus>;
  selectedPaymentStatus: PaymentStatus;

  customerWithdrawalRequests: Array<CustomerWithdrawalRequest>;

  // DTO's
  customerWithdrawalRequestSearchDTO: CustomerWithdrawalRequestSearchDTO;

  // Message
  error_message_service_Generic: string;
  warn_message_service_Generic: string;
  success_message_service_Generic: string;
  success_approval_message_service_CustomerWithdrawalRequestApproval: string;

  // Message - Table
  table_header_first_name_CustomerWithdrawalRequestApproval: string;
  table_header_last_name_CustomerWithdrawalRequestApproval: string;
  table_header_bank_name_CustomerWithdrawalRequestApproval: string;
  table_header_payment_method_name_CustomerWithdrawalRequestApproval: string;
  table_header_payment_status_name_CustomerWithdrawalRequestApproval: string;
  table_header_withdrawable_booking_value_CustomerWithdrawalRequestApproval: string;
  table_header_created_date_CustomerWithdrawalRequestApproval: string;
  table_header_enabled_CustomerWithdrawalRequestApproval: string;
  table_header_action_CustomerWithdrawalRequestApproval: string;
}