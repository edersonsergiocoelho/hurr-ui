import { Menu } from "../../menu/entity/menu.entity";
import { Role } from "../../role/entity/role.entity";
import { RoleMenuId } from "./role-menu-id.entity";

export class RoleMenu {

  roleMenuId: RoleMenuId;
  role: Role;
  menu: Menu;
  createdDate: Date;
  modifiedDate?: Date;
  enabled: boolean;
}