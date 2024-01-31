import { UserRoleDTO } from "../dto/user-role-dto.dto";
import { UserRoleId } from "./user-role-id.entity";

export class UserRole {
 
  userRoleId: UserRoleId;
  createdDate: Date;
  modifiedDate: Date;
  enabled: boolean;

  public static toDTO(userRole: UserRole): UserRoleDTO {
    return {
      userRoleId: userRole.userRoleId,
      createdDate: userRole.createdDate,
      modifiedDate: userRole.modifiedDate,
      enabled: userRole.enabled
    };
  }
}