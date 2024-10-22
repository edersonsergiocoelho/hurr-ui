import { AuthSignUpDTO } from "src/app/core/auth/dto/auth-sign-up-dto.dto";

export class UserRegisterUIDTO {

  authSignUpDTO: AuthSignUpDTO;
  
  // Messages - Translate
  error_summary_message_service_Generic: string;
  warn_summary_message_service_Generic: string;
  save_summary_message_service_Generic: string;
  save_success_message_service_UserRegister: string;
}