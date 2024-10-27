import { FileDTO } from "src/app/page/file/dto/file.dto";
import { Fee } from "../entity/fee.entity";

export class FeeDTO {
  
  feeId: string;
  feeType: string;
  amount: number;
  startDate: Date;
  endDate: Date;
  createdDate: Date;
  modifiedDate?: Date;
  enabled: boolean;

  public static toEntity(feeDTO: FeeDTO): Fee {
    return {
      feeId: feeDTO.feeId,
      feeType: feeDTO.feeType,
      amount: feeDTO.amount,
      startDate: feeDTO.startDate,
      endDate: feeDTO.endDate,
      createdDate: feeDTO.createdDate,
      modifiedDate: feeDTO.modifiedDate,
      enabled: feeDTO.enabled,
    };
  }
}