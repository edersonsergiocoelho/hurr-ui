import { RoleDTO } from "../../../dto/role-dto.dto";
import { Role } from "../../../entity/role.entity";

export class RoleSearchUIDTO {

  columns: any[] = [];
  dt: any;
  totalRecords = 0;
  loading = true;

  page: number = 0;
  size: number = 10;
  sortDir: string = '';
  sortBy: string | string[];

  roleDTO: RoleDTO;
  role: Role;
  roles: Array<Role>;

  enabledOptions: any[] = [{label: 'Todos', value: 'ALL'}, {label: 'Habilitados', value: 'ON'}, {label: 'Desabilitados', value: 'OFF'}];
  enabledValue: string = 'ALL';

  error_message_service_Generic: string;
}