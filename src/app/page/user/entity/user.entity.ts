export class User {

  userId: string;
  providerUserId: string;
  email: string;
  displayName: string;
  password: string;
  provider: string;
  photoFileId: string;
  imageURL: string;
  photoValidated: boolean;
  createdDate: Date;
  modifiedDate: Date;
  enabled: boolean;

  roles: any;
}