import { User } from "src/app/page/user/entity/user.entity";
import { UserPreferenceDTO } from "../dto/user-preference-dto.dto";

export class UserPreference {
  
  userPreferenceId: string;
  user: User;
  language: string;
  theme: string;
  createdDate: Date;
  modifiedDate: Date;
  enabled: boolean;

  public static toDTO(userPreference: UserPreference): UserPreferenceDTO {
    return {
      userPreferenceId: userPreference.userPreferenceId,
      user: userPreference.user,
      language: userPreference.language,
      theme: userPreference.theme,
      createdDate: userPreference.createdDate,
      modifiedDate: userPreference.modifiedDate,
      enabled: userPreference.enabled,
    };
  }
}