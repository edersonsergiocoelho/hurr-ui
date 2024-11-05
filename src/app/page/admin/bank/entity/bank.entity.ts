import { BankDTO } from "../dto/bank-dto.dto";
import { File } from "src/app/page/file/entity/file.entity";

export class Bank {
  
  bankId: string;
  bankCode: string;
  bankName: string;
  file?: File;
  createdDate: Date;
  modifiedDate?: Date;
  enabled: boolean;

  dataURI: string;

  public static toDTO(bank: Bank): BankDTO {
    return {
      bankId: bank.bankId,
      bankName: bank.bankName,
      bankCode: bank.bankCode,
      file: bank.file ? File.toDTO(bank.file) : undefined,
      createdDate: bank.createdDate,
      modifiedDate: bank.modifiedDate,
      enabled: bank.enabled,
      dataURI: bank.dataURI
    };
  }
}