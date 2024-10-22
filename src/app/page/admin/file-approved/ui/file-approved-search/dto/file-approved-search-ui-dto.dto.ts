import { User } from "src/app/page/user/entity/user.entity";
import { FileApprovedSearchDTO } from "../../../dto/file-approved-search-dto.dto"
import { FileApproved } from "../../../entity/file-approved.entity";

export class FileApprovedSearchUIDTO {

  columns: any[] = [];
  totalRecords = 0;

  page: number = 0;
  size: number = 10;
  sortDir: string = '';
  sortBy: string | string[];

  fileApprovedSearchDTO: FileApprovedSearchDTO;
  fileApproveds: Array<FileApproved>;

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
  error_summary_message_service_Generic: string;
  warn_summary_message_service_Generic: string;
  table_header_file_approved_id_FileApprovedSearch: string;
  table_header_file_table_FileApprovedSearch: string;
  table_header_file_type_FileApprovedSearch: string;
  table_header_customer_user_FileApprovedSearch: string;
  table_header_created_date_FileApprovedSearch: string;
  table_header_enabled_FileApprovedSearch: string;
  table_header_action_FileApprovedSearch: string;
}

interface FileTable {
  name: string;
  code: string;
}

interface fileType {
  name: string;
  code: string;
}