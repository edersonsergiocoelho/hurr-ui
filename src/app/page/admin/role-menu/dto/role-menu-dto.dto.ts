import { MenuDTO } from "../../menu/dto/menu-dto.dto";
import { RoleDTO } from "../../role/dto/role-dto.dto";
import { RoleMenuIdDTO } from "./role-menu-id-dto.dto";

export class RoleMenuDTO {

  roleMenuId: RoleMenuIdDTO;
  role: RoleDTO;
  menu: MenuDTO;
  createdDate: Date;
  modifiedDate?: Date;
  enabled: boolean;
}