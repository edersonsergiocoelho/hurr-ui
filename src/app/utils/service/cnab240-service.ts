import { Injectable } from '@angular/core';
import { CustomerVehicleWithdrawalRequestDTO } from 'src/app/global/page/customer-vehicle-withdrawal-request/dto/customer-vehicle-withdrawal-request-dto.dto';

@Injectable({
  providedIn: 'root'
})
export class CNAN240Service {

  generateCNAB240File(requests: CustomerVehicleWithdrawalRequestDTO[]): string {

    let cnabFile = '';
    let totalValor = 0; // Total das transferências
    const limitePorLote = 9999; // Limite de registros por lote

    const empresa = this.getCompanyInfo(); // Pegando informações fixas da empresa

    cnabFile += this.generateHeaderArchive(empresa) + '\n'; // Cabeçalho principal do arquivo
    let loteNumber = 1;
    let registrosNoLote = 0;
    let valorLote = 0;

    requests.forEach((request, index) => {
      if (registrosNoLote === limitePorLote) {
        cnabFile += this.generateLoteTrailer(loteNumber, registrosNoLote, valorLote) + '\n';
        loteNumber++;
        registrosNoLote = 0;
        valorLote = 0;
      }

      if (registrosNoLote === 0) {
        cnabFile += this.generateHeaderLote(loteNumber, empresa) + '\n';
      }

      cnabFile += this.generateSegmentA(request, loteNumber, index + 1) + '\n';
      cnabFile += this.generateSegmentB(request, loteNumber, index + 1) + '\n';

      totalValor += request.customerVehicleBooking.withdrawableBookingValue;
      valorLote += request.customerVehicleBooking.withdrawableBookingValue;
      registrosNoLote++;
    });

    if (registrosNoLote > 0) {
      cnabFile += this.generateLoteTrailer(loteNumber, registrosNoLote, valorLote) + '\n';
    }

    const totalLotes = loteNumber;
    const totalRegistros = requests.length + totalLotes * 2;

    cnabFile += this.generateTrailerArchive(totalLotes, totalRegistros);
    return cnabFile;
  }

  private getCompanyInfo(): any {
    return {
      cnpj: '23083693000129',
      nome: 'ESC CONSULTORIA EM INFORMATICA',
      rua: 'R RICARDO ABED',
      numeroLocal: '111',
      complemento: '',
      cidade: 'São Paulo',
      cep: '05171',
      complementoCep: '030',
      estado: 'SP',
      numeroConta: '3559391',
      digitoVerificadorConta: '1',
    };
  }

  generateHeaderArchive(empresa: any): string {
    let headerArquivo = '';

    headerArquivo += '077';  // Código do Banco
    headerArquivo += '0000';  // Lote de Serviço
    headerArquivo += '0';  // Tipo de Registro
    headerArquivo += ' '.repeat(9);
    headerArquivo += '2';  // Tipo de documento
    headerArquivo += empresa.cnpj.padStart(14, '0');
    headerArquivo += ' '.repeat(20);
    headerArquivo += '00001';  // Agência
    headerArquivo += '9';  // Dígito Verificador da Agência
    headerArquivo += empresa.numeroConta.padStart(12, '0');
    headerArquivo += empresa.digitoVerificadorConta;
    headerArquivo += ' ';
    headerArquivo += empresa.nome.padEnd(30, ' ');
    headerArquivo += 'BANCO INTER'.padEnd(30, ' ');
    headerArquivo += ' '.repeat(10);
    headerArquivo += '1';
    headerArquivo += this.getCurrentDateDDMMYYYY();
    headerArquivo += this.getCurrentTimeHHMMSS();
    headerArquivo += '000001';
    headerArquivo += '107';
    headerArquivo += '01600';
    headerArquivo += ' '.repeat(20);
    headerArquivo += ' '.repeat(20);
    headerArquivo += ' '.repeat(29);

    return headerArquivo;
  }

  generateTrailerArchive(totalLotes: number, totalRegistros: number): string {
    let trailerArchive = '';

    trailerArchive += '077';
    trailerArchive += '9999';
    trailerArchive += '9';
    trailerArchive += ' '.repeat(9);
    trailerArchive += totalLotes.toString().padStart(6, '0');
    trailerArchive += totalRegistros.toString().padStart(6, '0');
    trailerArchive += ' '.repeat(211);

    return trailerArchive;
  }

  getCurrentDateDDMMYYYY(): string {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    return `${day}${month}${year}`;
  }

  getCurrentTimeHHMMSS(): string {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}${minutes}${seconds}`;
  }

  generateHeaderLote(loteNumber: number, empresa: any): string {
    let loteHeader = '';

    loteHeader += '077';
    loteHeader += loteNumber.toString().padStart(4, '0');
    loteHeader += '1';
    loteHeader += 'C';
    loteHeader += '98';
    loteHeader += '45';
    loteHeader += '046';
    loteHeader += ' ';
    loteHeader += '2';
    loteHeader += empresa.cnpj.padStart(14, '0');
    loteHeader += ' '.repeat(20);
    loteHeader += '00001';
    loteHeader += '9';
    loteHeader += empresa.numeroConta.padStart(12, '0');
    loteHeader += empresa.digitoVerificadorConta;
    loteHeader += ' ';
    loteHeader += empresa.nome.padEnd(30, ' ');
    loteHeader += ' '.repeat(40);
    loteHeader += empresa.rua.padEnd(30, ' ');
    loteHeader += empresa.numeroLocal.padStart(5, '0');
    loteHeader += empresa.complemento.padEnd(15, ' ');
    loteHeader += empresa.cidade.padEnd(20, ' ');
    loteHeader += empresa.cep.padStart(5, '0');
    loteHeader += empresa.complementoCep.padEnd(3, '0');
    loteHeader += empresa.estado.padEnd(2, '0');
    loteHeader += ' '.repeat(8);
    loteHeader += ' '.repeat(10);

    return loteHeader;
  }


  generateSegmentA(request: CustomerVehicleWithdrawalRequestDTO, loteNumber: number, sequencial: number): string {
    let segmentoA = '';

    segmentoA += this.addField('077', 3);  // Código do Banco na Compensação
    segmentoA += this.addField(loteNumber.toString(), 4, '0');  // Lote de Serviço
    segmentoA += '3';  // Tipo de Registro
    segmentoA += this.addField(sequencial.toString(), 5, '0');  // Número Sequencial do Registro
    segmentoA += 'A';  // Código de Segmento do Registro
    segmentoA += '0';  // Tipo de Movimento
    segmentoA += '00';  // Código de Instrução para Movimento
    segmentoA += this.addField('000', 3);  // Código da Câmara Centralizadora
    segmentoA += this.addField('', 3);  // Código do Banco Favorecido (Campo em branco)
    segmentoA += this.addField('', 5);  // Agência Mantenedora (Campo em branco)
    segmentoA += ' ';  // Dígito Verificador da Agência (Campo em branco)
    segmentoA += this.addField('', 12);  // Número da Conta Corrente (Campo em branco)
    segmentoA += ' ';  // Dígito Verificador da Conta (Campo em branco)
    segmentoA += ' ';  // Campo em branco
    segmentoA += this.addField('', 30);  // Nome do Favorecido (Campo em branco)
    segmentoA += this.addField('', 20);  // Número do Documento atribuído pela Empresa
    segmentoA += this.getCurrentDateDDMMYYYY();  // Data do Pagamento
    segmentoA += 'BRL';  // Tipo da Moeda
    segmentoA += this.addField('000000000000000', 15);  // Quantidade da Moeda
    segmentoA += this.addField(this.formatValue(request.customerVehicleBooking.withdrawableBookingValue), 15);  // Valor do Pagamento
    segmentoA += this.addField('', 20);  // Número do Documento atribuído pelo Banco (Campo em branco)
    segmentoA += this.addField('', 8);  // Data Real da Efetivação do Pagamento (Retorno)
    segmentoA += this.addField('', 15);  // Valor Real da Efetivação do Pagamento (Retorno)
    segmentoA += this.addField('', 14);  // CPF/CNPJ do Favorecido
    segmentoA += this.addField('', 8);  // Código ISPB do Favorecido
    segmentoA += this.addField('', 2);  // Tipo de Conta do Favorecido
    segmentoA += this.addField('', 29);  // Campo em branco
    segmentoA += this.addField('', 10);  // Códigos de Ocorrências p/ Retorno

    return segmentoA.padEnd(240, ' ');
  }

  generateSegmentB(request: CustomerVehicleWithdrawalRequestDTO, loteNumber: number, sequencial: number): string {
    let segmentB = '';

    segmentB += this.addField('077', 3);  // Código do Banco na Compensação
    segmentB += this.addField(loteNumber.toString(), 4, '0');  // Lote de Serviço
    segmentB += '3';  // Tipo de Registro
    segmentB += this.addField(sequencial.toString(), 5, '0');  // Número Sequencial do Registro
    segmentB += 'B';  // Código de Segmento
    segmentB += this.getFormaDeIniciacao(request.customerVehicleBankAccount.pixType);  // Forma de Iniciação (Tipo de Chave)
    const tipoDocumento = this.getTipoDocumento(request.customerVehicleBankAccount.pixKey);
    segmentB += tipoDocumento;  // Tipo de Documento
    segmentB += this.getCpfCnpj(request.customerVehicleBankAccount.pixKey, tipoDocumento);  // CPF/CNPJ
    segmentB += this.addField('', 35);  // TX ID (Campo opcional)
    segmentB += this.addField('', 60);  // Campo em branco
    segmentB += this.getChavePix(request.customerVehicleBankAccount.pixKey, this.getFormaDeIniciacao(request.customerVehicleBankAccount.pixType));  // Chave Pix
    segmentB += this.addField('', 6);  // Campo em branco
    segmentB += this.addField('', 8);  // Código ISPB do Favorecido

    return segmentB.padEnd(240, ' ');
  }

  private getFormaDeIniciacao(pixType: string): string {
    // Defina a lógica para determinar a forma de iniciação com base na chave Pix
    if (pixType == 'CELULAR') {
      return '01';
    } else if (pixType == 'EMAIL') {
      return '02';
    } else if (pixType == 'CPF' || pixType == 'CNPJ') {
      return '03';
    } else if (pixType == 'CHAVE_ALEATORIA') {
      return '04';
    } else {
      return '05';
    }
  }

  private getTipoDocumento(pixKey: string): string {
    // Assumindo que você está usando CPF ou CNPJ para determinar o tipo de documento
    if (pixKey.length === 11) {
        return '1'; // CPF
    } else if (pixKey.length === 14) {
        return '2'; // CNPJ
    }
    return '0'; // Outro tipo, se aplicável
  }

  private getCpfCnpj(pixKey: string, tipoDocumento: string): string {
    if (tipoDocumento === '1' || tipoDocumento === '2') {
        return pixKey.padStart(14, '0'); // Completar com zeros à esquerda
    }
    return ' '.repeat(14); // Campo em branco se não for CPF ou CNPJ
  }

  private getChavePix(pixKey: string, formaDeIniciacao: string): string {
    if (['01', '02', '04'].includes(formaDeIniciacao)) {
        return pixKey.padEnd(99, ' '); // Preencher a chave Pix
    }
    return ' '.repeat(99); // Deixar em branco nos outros casos
  }

  generateLoteTrailer(loteNumber: number, totalRegistros: number, totalValor: number): string {
    let loteTrailer = '';

    loteTrailer += this.addField('077', 3);  // Código do Banco
    loteTrailer += this.addField(loteNumber.toString(), 4, '0');  // Lote de Serviço
    loteTrailer += '5';  // Tipo de Registro
    loteTrailer += this.addField('', 9);  // Campo em branco
    loteTrailer += this.addField(totalRegistros.toString(), 6, '0');  // Quantidade de Registros
    loteTrailer += this.addField(this.formatTotalValue(totalValor), 18);  // Somatória dos Valores
    loteTrailer += this.addField('000000000000000', 15);  // Quantidade de Moedas
    loteTrailer += this.addField('', 6);  // Número Aviso de Débito (Campo em branco)
    loteTrailer += this.addField('', 165);  // Campo em branco
    loteTrailer += this.addField('', 10);  // Códigos de Ocorrências p/ Retorno

    return loteTrailer.padEnd(240, ' ');
  }

  // Método auxiliar para adicionar campos com preenchimento
  private addField(value: string, length: number, paddingChar: string = ' '): string {
    return value.padEnd(length, paddingChar).substring(0, length);
  }

  private formatValue(value: number): string {
    return value.toFixed(2).replace('.', '').padStart(15, '0');
  }

  private formatTotalValue(value: number): string {
    return (value * 100).toFixed(0).padStart(18, '0');
  }
}