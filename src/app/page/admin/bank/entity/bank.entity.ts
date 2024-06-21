export class Bank {
  
  /**
   * Identificador único do banco.
   */
  bankId: string;

  /**
   * Código do banco, por exemplo, "001" para Banco do Brasil.
   */
  bankCode: string;

  /**
   * Nome do banco, por exemplo, "Banco do Brasil".
   */
  bankName: string;

  /**
   * Data e hora de criação do registro.
   */
  createdDate: Date;

  /**
   * Data e hora da última modificação do registro.
   */
  modifiedDate?: Date;

  /**
   * Indica se o banco está ativo.
   */
  enabled: boolean;

  dataURI: string;
}