import { UserDTO } from "src/app/page/user/dto/user-dto.dto";
import { UserPreference } from "../entity/user-preference.entity";

export class UserPreferenceDTO {

  userPreferenceId: string;
  user: UserDTO;
  language: string;
  theme: string;
  createdDate: Date;
  modifiedDate: Date;
  enabled: boolean;

  public static toEntity(userPreferenceDTO: UserPreferenceDTO): UserPreference {
    return {
      userPreferenceId: userPreferenceDTO.userPreferenceId,
      user: userPreferenceDTO.user,
      language: userPreferenceDTO.language,
      theme: userPreferenceDTO.theme,
      createdDate: userPreferenceDTO.createdDate,
      modifiedDate: userPreferenceDTO.modifiedDate,
      enabled: userPreferenceDTO.enabled,
    };
  }
}