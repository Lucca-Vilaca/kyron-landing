export const content = {
  nav: [
    { label: "Produto", href: "#prova" },
    { label: "Como funciona", href: "#como-funciona" },
    { label: "FAQ", href: "#faq" },
    { label: "Waitlist", href: "#cta" },
  ],

  hero: {
    eyebrow: "TREINO COM IA · ARTES MARCIAIS",
    headingBefore: "Seu treino",
    headingEmphasis: "deixa de ser",
    headingAfter: "improviso.",
    sub: "IA que monta a sessão, acompanha a execução e devolve progresso real. Feito pra quem treina boxe, MMA e rotinas de combate — dentro ou fora da academia.",
    ctaPrimary: {
      label: "Entrar na waitlist",
      href: "mailto:lucca.vilaca@gmail.com?subject=Quero%20testar%20o%20Kyron",
    },
    ctaSecondary: { label: "Ver o produto", href: "#prova" },
  },

  prova: {
    eyebrow: "PROVA",
    headingBefore: "Mais próximo de um app real do que de uma ",
    headingEmphasis: "promessa abstrata",
    headingAfter: ".",
    sub: "Como o Kyron organiza contexto, treino e progresso.",
    cards: [
      {
        ordinal: "I",
        label: "Onboarding",
        title: "Seu contexto entra antes do treino",
        items: [
          "Escolha de disciplinas em 7 passos",
          "Insight da IA explicando cada ciclo",
          "Artes marciais, musculação, esportes com bola",
          "Perfil calibrado antes da primeira sessão",
        ],
        featured: false,
        image: {
          webp: "/assets/iphone16-onboarding.webp",
          avif: "/assets/iphone16-onboarding.avif",
          alt: "Tela de onboarding do Kyron com insight da IA sobre musculação",
        },
      },
      {
        ordinal: "II",
        label: "Plano da semana",
        title: "Semana inteira já montada",
        items: [
          "15 sessões geradas para a semana",
          "Conditioning, artes marciais e muay thai",
          "+150 XP por sessão concluída",
          "\"Gerar novo treino\" a qualquer momento",
        ],
        featured: true,
        image: {
          webp: "/assets/iphone16-treinos.webp",
          avif: "/assets/iphone16-treinos.avif",
          alt: "Tela Meus Treinos do Kyron com 15 sessões da semana",
        },
      },
      {
        ordinal: "III",
        label: "Progressão",
        title: "Consistência visível",
        items: [
          "Kyron Score 9 — ritmo atual",
          "450 XP acumulados em 3 treinos",
          "2 semanas consecutivas",
          "Disciplinas e níveis no mesmo perfil",
        ],
        featured: false,
        image: {
          webp: "/assets/iphone16-perfil.webp",
          avif: "/assets/iphone16-perfil.avif",
          alt: "Tela de perfil do Kyron mostrando Kyron Score e XP",
        },
      },
    ],
  },

  comoFunciona: {
    eyebrow: "COMO FUNCIONA",
    headingBefore: "Três etapas pra sair da intenção ",
    headingEmphasis: "e entrar na rotina",
    headingAfter: ".",
    steps: [
      {
        number: "01",
        title: "Perfil e contexto",
        description:
          "O app entende disciplina, ambiente, nível, frequência e duração da sessão, adaptando o treino à sua realidade.",
        example: "Ex.: 30 min em casa, só com saco e corda.",
      },
      {
        number: "02",
        title: "Treino gerado",
        description:
          "A IA monta um treino coerente com seu contexto, com foco em técnica, explosão, condicionamento e ordem de execução.",
        example: "Ex.: 6 rounds de manopla + sprawls + shadow técnico.",
      },
      {
        number: "03",
        title: "Evolução visível",
        description:
          "Score, histórico, streak e ranking transformam repetição em progresso percebido — não em motivação aleatória.",
        example: "Ex.: 7 dias de streak, score +12 na semana.",
      },
    ],
  },

  diferenciais: {
    eyebrow: "DIFERENCIAIS",
    headingBefore: "O que faz o Kyron parecer ",
    headingEmphasis: "produto, não demo",
    headingAfter: ".",
    items: [
      {
        title: "IA pra artes marciais reais",
        description:
          "O treino nasce do seu ambiente, nível e tempo disponível — não de um template genérico. Funciona pra academia, mas também pra boxe e MMA com estrutura reduzida.",
        featured: true,
      },
      {
        title: "Execução sem fricção",
        description:
          "Séries, descanso e progressão aparecem com clareza pra você treinar sem pensar na interface.",
        featured: false,
      },
      {
        title: "Chat útil, não decorativo",
        description:
          "Um assistente focado em treino, recuperação e performance de combate. Tom direto e contextual.",
        featured: false,
      },
      {
        title: "Gamificação com propósito",
        description:
          "XP, score e ranking servem pra reforçar consistência — não pra poluir a experiência.",
        featured: false,
      },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    headingBefore: "Objeções previsíveis, ",
    headingEmphasis: "respostas diretas",
    headingAfter: ".",
    items: [
      {
        question: "Serve para iniciante?",
        answer:
          "Sim, desde que o objetivo seja montar sessões compatíveis com nível e contexto. A ideia não é jogar volume avançado em quem está começando.",
      },
      {
        question: "Substitui treinador?",
        answer:
          "Não. O Kyron funciona melhor como apoio para rotina, disciplina e treino complementar — especialmente fora do horário de aula ou do CT.",
      },
      {
        question: "Precisa de academia completa?",
        answer:
          "Não. O produto foi pensado justamente para ambientes variáveis, inclusive casa, espaço funcional e estrutura reduzida.",
      },
      {
        question: "Quais modalidades fazem mais sentido no início?",
        answer:
          "Boxe, MMA, muay thai e rotinas de combate com componente técnico e físico claro tendem a encaixar melhor na proposta inicial.",
      },
    ],
  },

  cta: {
    eyebrow: "PRÓXIMO PASSO",
    headingBefore: "Se você quer testar cedo, ",
    headingEmphasis: "esse é o ponto de entrada",
    headingAfter: ".",
    sub: "Deixe seus dados e o contexto do seu treino. Entramos em contato assim que a waitlist abrir.",
    emailTo: "lucca.vilaca@gmail.com",
    emailSubject: "Quero testar o Kyron",
    fallbackContact: {
      label: "Falar com o time",
      href: "mailto:lucca.vilaca@gmail.com?subject=Quero%20conhecer%20o%20Kyron",
    },
  },

  footer: {
    brand: "KYRON",
    tagline: "Equipe de desenvolvimento Kyron",
    copyright: "© 2026 Todos os direitos reservados",
  },
} as const;

export type Content = typeof content;
