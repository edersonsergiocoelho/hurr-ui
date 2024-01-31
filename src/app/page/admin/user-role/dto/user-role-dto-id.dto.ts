import { UserRoleId } from "../entity/user-role-id.entity";

export class UserRoleIdDTO {
  
  userId: string;
  roleId: string;

  public static toEntity(userRoleIdDTO: UserRoleIdDTO): UserRoleId {
    return {
      userId: userRoleIdDTO.userId,
      roleId: userRoleIdDTO.roleId
    };
  }
}