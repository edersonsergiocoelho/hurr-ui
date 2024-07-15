import { User } from "src/app/page/user/entity/user.entity";
import { CustomerVehicleApproved } from "../../../entity/customer-vehicle-approved.entity";
import { CustomerVehicleApprovedSearchDTO } from "../../../dto/customer-vehicle-approved-search-dto.dto";

export class CustomerVehicleApprovedSearchUIDTO {

  columns: any[] = [];
  totalRecords = 0;

  page: number = 0;
  size: number = 10;
  sortDir: string = '';
  sortBy: string | string[];

  customerVehicleApprovedSearchDTO: CustomerVehicleApprovedSearchDTO;
  customerVehicleApproveds: Array<CustomerVehicleApproved>;

  fileTables: FileTable[];
  selectedFileTable: FileTable;

  fileTypes: fileType[];
  selectedFileType: fileType;

  approvedByUsers: Array<User>;
  selectedApprovedByUser: User;

  reprovedByUsers: Array<User>;
  selectedReprovedByUser: User;

  enabledOptions: any[] = [{label: 'Todos', value: 'ALL'}, {label: 'Habilitados', value: 'ON'}, {label: 'Desabilitados', value: 'OFF'}];
  enabledValue: string = 'ALL';

  filterOptions: any[] = [{label: 'Todos', value: 'ALL'}, {label: 'Aguardando Aprovação', value: 'AGUARDANDO_APROVACAO'}];
  filterValue: string = 'ALL';

  // Message
  error_message_service_Generic: string;
  warn_message_service_Generic: string;
  table_header_customer_vehicle_approved_id_CustomerVehicleApprovedSearch: string;
  table_header_first_name_CustomerVehicleApprovedSearch: string;
  table_header_last_name_CustomerVehicleApprovedSearch: string;
  table_header_cpf_CustomerVehicleApprovedSearch: string;
  table_header_created_date_CustomerVehicleApprovedSearch: string;
  table_header_enabled_CustomerVehicleApprovedSearch: string;
  table_header_action_CustomerVehicleApprovedSearch: string;
}

interface FileTable {
  name: string;
  code: string;
}

interface fileType {
  name: string;
  code: string;
}