import { Bank } from "../entity/bank.entity";
import { FileDTO } from "src/app/page/file/dto/file.dto";

export class BankDTO {
  
  bankId: string;
  bankCode: string;
  bankName: string;
  file?: FileDTO;
  createdDate: Date;
  modifiedDate?: Date;
  enabled: boolean;

  dataURI: string;

  public static toEntity(bankDTO: BankDTO): Bank {
    return {
      bankId: bankDTO.bankId,
      bankName: bankDTO.bankName,
      bankCode: bankDTO.bankCode,
      file: bankDTO.file ? FileDTO.toEntity(bankDTO.file) : undefined,
      createdDate: bankDTO.createdDate,
      modifiedDate: bankDTO.modifiedDate,
      enabled: bankDTO.enabled,
      dataURI: bankDTO.dataURI
    };
  }
}