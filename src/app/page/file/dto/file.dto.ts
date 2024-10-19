import { File } from "../entity/file.entity";

export class FileDTO {
  
  fileId: string; // UUID em formato string
  contentType: string;
  originalFileName: string;
  dataAsByteArray: Uint8Array; // Array de bytes
  createdDate: Date;
  modifiedDate?: Date;
  enabled: boolean;

  dataURI: string;

  public static toEntity(fileDTO: FileDTO): File {
    return {
      fileId: fileDTO.fileId,
      contentType: fileDTO.contentType,
      originalFileName: fileDTO.originalFileName,
      dataAsByteArray: fileDTO.dataAsByteArray,
      createdDate: fileDTO.createdDate,
      modifiedDate: fileDTO.modifiedDate,
      enabled: fileDTO.enabled,
      dataURI: fileDTO.dataURI
    };
  }
}