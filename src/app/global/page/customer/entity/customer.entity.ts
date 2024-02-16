export class Customer {

  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  emailValidated: boolean;
  emailVerificationCode: string;
  ddiPhone: string;
  phone: string;
  phoneValidated: boolean;
  phoneVerificationCode: string;
  dateOfBirth: Date;
  cpf: string;
  identityNumber: string;
  identityNumberIssuingBody: string;
  identityNumberIssuingBodyUF: string;
  identityNumberValidated: boolean;
  identityNumberFileId: string;
  driverLicenseRegistrationNumber: string;
  driverLicenseCategory: string;
  driverLicenseFirstLicenseDate: Date;
  driverLicenseExpirationDate: Date;
  driverLicenseIssueDate: Date;
  driverLicenseIssueUF: string;
  driverLicenseValidated: boolean;
  driverLicenseFileId: string;
  customerType: string;
  createdDate: Date;
  modifiedDate: Date;
  enabled: boolean;
}