import { PaymentStatus } from "src/app/page/admin/payment-status/entity/payment-status.entity";
import { CustomerVehicleWithdrawalRequestSearchDTO } from "../../../dto/customer-vehicle-withdrawal-request-search-dto.dto";
import { CustomerVehicleWithdrawalRequest } from "../../../entity/customer-vehicle-withdrawal-request.entity";
import { PaymentMethod } from "src/app/page/admin/payment-method/entity/payment-method.entity";

export class CustomerVehicleWithdrawalRequestApprovalUIDTO {

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

  customerVehicleWithdrawalRequests: Array<CustomerVehicleWithdrawalRequest>;

  // DTO's
  customerVehicleWithdrawalRequestSearchDTO: CustomerVehicleWithdrawalRequestSearchDTO;

  // Message
  error_summary_message_service_Generic: string;
  warn_summary_message_service_Generic: string;
  success_summary_message_service_Generic: string;
  success_approval_message_service_CustomerVehicleWithdrawalRequestApproval: string;

  // Message - Table
  table_header_first_name_CustomerVehicleWithdrawalRequestApproval: string;
  table_header_last_name_CustomerVehicleWithdrawalRequestApproval: string;
  table_header_bank_name_CustomerVehicleWithdrawalRequestApproval: string;
  table_header_payment_method_name_CustomerVehicleWithdrawalRequestApproval: string;
  table_header_payment_status_name_CustomerVehicleWithdrawalRequestApproval: string;
  table_header_withdrawable_booking_value_CustomerVehicleWithdrawalRequestApproval: string;
  table_header_created_date_CustomerVehicleWithdrawalRequestApproval: string;
  table_header_enabled_CustomerVehicleWithdrawalRequestApproval: string;
  table_header_action_CustomerVehicleWithdrawalRequestApproval: string;
}