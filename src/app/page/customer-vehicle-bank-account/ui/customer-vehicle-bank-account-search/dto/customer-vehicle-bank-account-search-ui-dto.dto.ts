import { TranslateConfirmServiceDTO } from "src/app/core/translate/dto/translate-confirm-service-dto.dto";
import { CustomerVehicleBankAccountSearchDTO } from "../../../dto/customer-vehicle-bank-account-search-dto.dto";
import { CustomerVehicleBankAccount } from "../../../entity/customer-vehicle-bank-account.entity";
import { Bank } from "src/app/page/admin/bank/entity/bank.entity";

export class CustomerVehicleBankAccountSearchUIDTO extends TranslateConfirmServiceDTO {

  columns: any[] = [];
  dt: any;
  totalRecords = 0;

  page: number = 0;
  size: number = 10;
  sortDir: string = '';
  sortBy: string | string[];

  globalFilter: string | undefined;

  customerVehicleBankAccountSearchDTO: CustomerVehicleBankAccountSearchDTO;
  customerVehicleBankAccountes: Array<CustomerVehicleBankAccount>;
  selectedCustomerVehicleBankAccount: Array<CustomerVehicleBankAccount>;

  enabledOptions: any[];
  enabledValue: string = 'ALL';

  // Mensagens - Tradução
  table_header_payment_status_id_CustomerVehicleBankAccountSearch: string;
  table_header_pix_key_CustomerVehicleBankAccountSearch: string;
  table_header_enabled_CustomerVehicleBankAccountSearch: string;
}