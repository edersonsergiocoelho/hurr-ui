import { TranslateSeverityDTO } from "src/app/core/translate/dto/translate-severity-dto.dto";
import { UserPreferenceDTO } from "../../../dto/user-preference-dto.dto";

export class UserPreferenceContentUIDTO extends TranslateSeverityDTO {

  userPreferenceDTO: UserPreferenceDTO;

  languages: Language[];
  selectedLanguage: Language;

  themes: any;
  selectedTheme: any;

  // Messages - Translate
  save_preference_summary_message_service_UserPreferenceContent: string;
  save_preference_detail_message_service_UserPreferenceContent: string;

  update_preference_summary_message_service_UserPreferenceContent: string;
  update_preference_detail_message_service_UserPreferenceContent: string;
}

interface Language {
  name: string;
  code: string;
}