import { Customer } from "src/app/global/page/customer/entity/customer.entity";

export class CustomerBankAccount {
  
  /**
   * Identificador único da conta bancária do cliente.
   */
  customerBankAccountId: string;

  /**
   * Identificador do cliente.
   */
  customer: Customer;

  /**
   * Identificador do banco.
   */
  bankId: string;

  /**
   * Número da conta bancária.
   */
  accountNumber: string;

  /**
   * Tipo da conta bancária, por exemplo, "corrente" ou "poupança".
   */
  accountType: string;

  /**
   * Número da agência bancária.
   */
  branchNumber: string;

  /**
   * Chave Pix associada à conta bancária.
   */
  pixKey?: string;

  /**
   * Data de criação do registro.
   */
  createdDate: Date;

  /**
   * Data da última modificação do registro.
   */
  modifiedDate?: Date;

  /**
   * Indica se a conta bancária está ativa.
   */
  enabled: boolean;
}