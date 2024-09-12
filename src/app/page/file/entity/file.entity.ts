import { FileDTO } from "../dto/file.dto";

export class File {

  fileId: string;
  contentType: string;
  originalFileName: string;
  dataAsByteArray: Uint8Array;
  createdDate: Date;
  modifiedDate?: Date;
  enabled: boolean;

  public static toDTO(fileDTO: FileDTO): File {
    return {
      fileId: fileDTO.fileId,
      contentType: fileDTO.contentType,
      originalFileName: fileDTO.originalFileName,
      dataAsByteArray: fileDTO.dataAsByteArray,
      createdDate: fileDTO.createdDate,
      modifiedDate: fileDTO.modifiedDate,
      enabled: fileDTO.enabled,
    };
  }
}