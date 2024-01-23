import { RoleDTO } from "../../../dto/role-dto.dto";
import { Role } from "../../../entity/role.entity";

export class RoleRegisterUIDTO {

  roleDTO: RoleDTO;
  role: Role;
  roles: Array<Role>;
}