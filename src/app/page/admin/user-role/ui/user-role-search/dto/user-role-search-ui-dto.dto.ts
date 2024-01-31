import { Role } from "src/app/page/admin/role/entity/role.entity";
import { UserRoleDTO } from "../../../dto/user-role-dto.dto";
import { UserRoleSearchDTO } from "../../../dto/user-role-search-dto";
import { UserRole } from "../../../entity/user-role.entity";

export class UserRoleSearchUIDTO {

  columns: any[] = [];
  totalRecords = 0;
  loading = true;

  page: number = 0;
  size: number = 10;
  sortDir: string = '';
  sortBy: string | string[];

  userRoleSearchDTO: UserRoleSearchDTO;
  userRole: UserRole;
  userRoles: Array<UserRole>;

  roles: Array<Role>;
  selectedRole: Role;

  enabledOptions: any[] = [{label: 'Todos', value: 'ALL'}, {label: 'Habilitados', value: 'ON'}, {label: 'Desabilitados', value: 'OFF'}];
  enabledValue: string = 'ALL';

  error_message_service_Generic: string;
  warn_message_service_Generic: string;
  no_connection_to_the_api_message_service_Generic: string;
  table_header_display_name_UserRoleSearch: string;
  table_header_email_UserRoleSearch: string;
  table_header_role_name_UserRoleSearch: string;
  table_header_enabled_UserRoleSearch: string;
}