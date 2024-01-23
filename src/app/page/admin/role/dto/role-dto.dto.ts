import { Role } from "../entity/role.entity";

export class RoleDTO {
  
  roleId: string;
  roleName: string;
  createdDate: Date;
  modifiedDate: Date;
  enabled: boolean;

  public static toEntity(roleDTO: RoleDTO): Role {
    return {
      roleId: roleDTO.roleId,
      roleName: roleDTO.roleName,
      createdDate: roleDTO.createdDate,
      modifiedDate: roleDTO.modifiedDate,
      enabled: roleDTO.enabled
    };
  }
}