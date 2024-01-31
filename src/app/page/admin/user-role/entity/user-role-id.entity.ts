import { UserRoleIdDTO } from "../dto/user-role-dto-id.dto";

export class UserRoleId {
 
  userId: string;
  roleId: string;

  public static toDTO(userRoleId: UserRoleId): UserRoleIdDTO {
    return {
      userId: userRoleId.userId,
      roleId: userRoleId.roleId
    };
  }
}