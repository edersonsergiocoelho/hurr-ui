import { Role } from "src/app/page/admin/role/entity/role.entity";
import { UserRoleDTO } from "../../../dto/user-role-dto.dto";
import { User } from "src/app/page/user/entity/user.entity";

export class UserRoleRegisterUIDTO {

  userId: string;
  roleId: string;
  
  userRoleDTO: UserRoleDTO;

  users: Array<User>;
  selectedUser: User | null;

  roles: Array<Role>;
  selectedRole: Role | null;

  // Messages
  error_message_service_Generic: string;
  save_message_service_Generic: string;
  update_message_service_Generic: string;
  delete_message_service_Generic: string;

  save_success_message_service_UserRoleRegister: string;
  update_success_message_service_UserRoleRegister: string;
  delete_success_message_service_UserRoleRegister: string;
}