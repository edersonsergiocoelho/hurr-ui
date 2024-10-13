import { SelectItem } from "primeng/api";
import { CustomerVehicleWithdrawalRequestSearchDTO } from "src/app/global/page/customer-vehicle-withdrawal-request/dto/customer-vehicle-withdrawal-request-search-dto.dto";
import { CustomerVehicleWithdrawalRequest } from "src/app/global/page/customer-vehicle-withdrawal-request/entity/customer-vehicle-withdrawal-request.entity";

export class EarningsCustomerVehicleWithdrawalRequestUIDTO {

  totalRecords = 0;

  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField: string = 'createdDate';

  page: number = 0;
  size: number = 10;
  sortDir: string = '';
  sortBy: string | string[];

  customerVehicleWithdrawalRequests: Array<CustomerVehicleWithdrawalRequest>;

  customerVehicleWithdrawalRequestSearchDTO: CustomerVehicleWithdrawalRequestSearchDTO;

  // Messages
  error_message_service_Generic: string;
  label_created_date_option_1_EarningsCustomerVehicleWithdrawalRequest: string;
  label_created_date_option_2_EarningsCustomerVehicleWithdrawalRequest: string;
}