import { TranslateSeverityDTO } from "src/app/core/translate/dto/translate-severity-dto.dto";
import { UserDTO } from "../../../dto/user-dto.dto";

export class UserProfileContentUIDTO extends TranslateSeverityDTO {

  userDTO: UserDTO;

  dataURI: any;

  uploadedFiles: any;
  files: any;

  // Messages - Translate
  update_profile_summary_message_service_UserProfileContent: string;
  update_profile_detail_message_service_UserProfileContent: string;
}