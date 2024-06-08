import { CustomerWithdrawalRequests } from "src/app/global/page/customer-withdrawal-requests/entity/customer-withdrawal-requests.entity";

export class EarningsCustomerWithdrawalRequestsUIDTO {

  customerWithdrawalRequests: Array<CustomerWithdrawalRequests>;

  // Messages
  error_message_service_Generic: string;
}