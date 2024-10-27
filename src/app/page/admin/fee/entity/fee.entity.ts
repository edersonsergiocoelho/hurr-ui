import { FeeDTO } from "../dto/fee-dto.dto";
import { File } from "src/app/page/file/entity/file.entity";

export class Fee {

  feeId: string;
  feeType: string;
  amount: number;
  startDate: Date;
  endDate: Date;
  createdDate: Date;
  modifiedDate?: Date;
  enabled: boolean;

  public static toDTO(fee: Fee): FeeDTO {
    return {
      feeId: fee.feeId,
      feeType: fee.feeType,
      amount: fee.amount,
      startDate: fee.startDate,
      endDate: fee.endDate,
      createdDate: fee.createdDate,
      modifiedDate: fee.modifiedDate,
      enabled: fee.enabled,
    };
  }
}