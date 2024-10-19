import { Role } from "../../admin/role/entity/role.entity";
import { File } from "../../file/entity/file.entity";
import { UserDTO } from "../dto/user-dto.dto";

export class User {

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

  file: File;
  roles: Role[];

  public static toDTO(user: User): UserDTO {
    return {
      userId: user.userId,
      providerUserId: user.providerUserId,
      email: user.email,
      displayName: user.displayName,
      password: user.password,
      passwordVerificationCode: user.passwordVerificationCode, 
      provider: user.provider,
      photoFileId: user.photoFileId,
      imageURL: user.imageURL,
      photoValidated: user.photoValidated,
      createdDate: user.createdDate,
      modifiedDate: user.modifiedDate,
      enabled: user.enabled,
      file: user.file,
      roles: user.roles,
    };
  }
}