import { RoleDTO } from "../../admin/role/dto/role-dto.dto";
import { FileDTO } from "../../file/dto/file.dto";
import { User } from "../entity/user.entity";

export class UserDTO {

  userId: string;
  providerUserId: string;
  email: string;
  displayName: string;
  password: string;
  passwordVerificationCode: string;
  provider: string;
  photoFileId: string;
  imageURL: string;
  photoValidated: boolean;
  createdDate: Date;
  modifiedDate: Date;
  enabled: boolean;

  file: FileDTO;
  roles: RoleDTO[];

  public static toEntity(userDTO: UserDTO): User {
    return {
      userId: userDTO.userId,
      providerUserId: userDTO.providerUserId,
      email: userDTO.email,
      displayName: userDTO.displayName,
      password: userDTO.password,
      passwordVerificationCode: userDTO.passwordVerificationCode,
      provider: userDTO.provider,
      photoFileId: userDTO.photoFileId,
      imageURL: userDTO.imageURL,
      photoValidated: userDTO.photoValidated,
      createdDate: userDTO.createdDate,
      modifiedDate: userDTO.modifiedDate,
      enabled: userDTO.enabled,
      file: userDTO.file,
      roles: userDTO.roles,
    };
  }
}