import { UserDTO } from "../../../dto/user-dto.dto";
import { UserForgotPasswordDTO } from "../../../dto/user-forgot-password-dto.dto";

export class UserForgotPasswordUIDTO {

  userForgotPasswordDTO: UserForgotPasswordDTO;

  // Controle De Tela
  forgotPasswordVerificationCodeScreenControl: boolean;
  forgotPasswordValidatedScreenControl: boolean;
  
  // Messages - Translate
  error_summary_message_service_Generic: string;
  warn_summary_message_service_Generic: string;

  forgot_password_verification_code_summary_message_service_UserForgotPassword: string
  forgot_password_verification_code_detail_message_service_UserForgotPassword: string;

  forgot_password_validated_code_summary_message_service_UserForgotPassword: string;
  forgot_password_validated_code_detail_message_service_UserForgotPassword: string;

  update_forgot_password_summary_message_service_UserForgotPassword: string;
  update_forgot_password_detail_message_service_UserForgotPassword: string;
}