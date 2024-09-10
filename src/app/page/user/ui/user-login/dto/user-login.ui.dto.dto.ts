import { AuthSignInDTO } from "src/app/core/auth/dto/auth-sign-in-dto.dto";
import { TranslateSeverityDTO } from "src/app/core/translate/dto/translate-severity-dto.dto";

export class UserLoginUIDTO extends TranslateSeverityDTO {
 
  authSignInDTO: AuthSignInDTO;
  carouselUserLogin: CarouselUserLogin[];

  constructor() {
    super(); // Chama o construtor da classe pai (TranslateSeverityDTO)

    // Inicializa o array carouselUserLogin
    this.carouselUserLogin = [
      {
        title: "Conexão Segura entre Usuários e Proprietários de Carros",
        description: "Em nossa plataforma, você encontrará uma conexão segura entre usuários e proprietários de carros. Nossa prioridade é garantir que os proprietários de carros possam confiar nos usuários que alugam seus veículos. Oferecemos um ambiente confiável e seguro para facilitar essa conexão.",
        image: "assets/images/user/live-collaboration.svg"
      },
      {
        title: "Experiência de Usuário Simplificada",
        description: "Desenvolvemos uma interface intuitiva e fácil de usar para garantir uma experiência de usuário simplificada. Nossa plataforma foi projetada com o objetivo de tornar o processo de aluguel e navegação o mais simples possível. Com opções claras de login e navegação, proporcionamos uma experiência agradável para todos os usuários.",
        image: "assets/images/user/subscribe.svg"
      },
      {
        title: "Priorizando sua Segurança",
        description: "Na nossa plataforma, priorizamos sua segurança. Implementamos recursos avançados, incluindo autenticação de dois fatores, criptografia de ponta a ponta e proteção contra ameaças de segurança. Nossa equipe está empenhada em garantir que sua experiência seja segura e livre de preocupações, para que você possa aproveitar ao máximo nossos serviços com tranquilidade.",
        image: "assets/images/user/security.svg"
      }
    ];
  }
}

interface CarouselUserLogin {
  title: string;
  description: string;
  image: string;
}