import { UserRole } from "../entity/user-role.entity";
import { UserRoleIdDTO } from "./user-role-dto-id.dto";

export class UserRoleDTO {
  
  userRoleId: UserRoleIdDTO;
  createdDate: Date;
  modifiedDate: Date;
  enabled: boolean;

  public static toEntity(userRoleDTO: UserRoleDTO): UserRole {
    return {
      userRoleId: userRoleDTO.userRoleId,
      createdDate: userRoleDTO.createdDate,
      modifiedDate: userRoleDTO.modifiedDate,
      enabled: userRoleDTO.enabled
    };
  }
}