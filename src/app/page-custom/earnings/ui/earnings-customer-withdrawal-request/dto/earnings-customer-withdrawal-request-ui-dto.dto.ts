import { SelectItem } from "primeng/api";
import { CustomerWithdrawalRequestSearchDTO } from "src/app/global/page/customer-withdrawal-request/dto/customer-withdrawal-request-search-dto.dto";
import { CustomerWithdrawalRequest } from "src/app/global/page/customer-withdrawal-request/entity/customer-withdrawal-request.entity";

export class EarningsCustomerWithdrawalRequestUIDTO {

  totalRecords = 0;

  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField: string = 'createdDate';

  page: number = 0;
  size: number = 10;
  sortDir: string = '';
  sortBy: string | string[];

  customerWithdrawalRequests: Array<CustomerWithdrawalRequest>;

  customerWithdrawalRequestSearchDTO: CustomerWithdrawalRequestSearchDTO;

  // Messages
  error_message_service_Generic: string;
  label_created_date_option_1_EarningsCustomerWithdrawalRequest: string;
  label_created_date_option_2_EarningsCustomerWithdrawalRequest: string;
}