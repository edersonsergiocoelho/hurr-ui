import { RoleDTO } from "../dto/role-dto.dto";

export class Role {
 
  roleId: string;
  roleName: string;
  createdDate: Date;
  modifiedDate: Date;
  enabled: boolean;

  public static toDTO(role: Role): RoleDTO {
    return {
      roleId: role.roleId,
      roleName: role.roleName,
      createdDate: role.createdDate,
      modifiedDate: role.modifiedDate,
      enabled: role.enabled
    };
  }
}