export class UserForgotPasswordDTO {

  userId: string;
  email: string;
  password: string;
  matchingPassword: string;
  forgotPasswordVerificationCode: string;
}