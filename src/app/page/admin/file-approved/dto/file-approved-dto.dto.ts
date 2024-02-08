export class FileApprovedDTO {

  fileApprovedId: string;
  fileId: string;
  approvedBy: string;
  reprovedBy: string;
  message: string;
  fileTable: string;
  fileType: string;
  createdBy: string;
  modifiedBy: string;
  createdDate: Date;
  modifiedDate: Date;
  enabled: boolean;
}