export const content = {
  nav: [
    { label: "Produto", href: "#prova" },
    { label: "Método", href: "#como-funciona" },
    { label: "Sistema", href: "#diferenciais" },
    { label: "Dúvidas", href: "#faq" },
    { label: "Waitlist", href: "#cta" },
  ],

  hero: {
    section: "01",
    eyebrow: "Manifesto · Treino com IA",
    headingBefore: "Treino",
    headingEmphasis: "é combate.",
    headingAfter: "Não rotina.",
    sub: "IA que monta a sessão, registra a execução e devolve progresso real. Feito pra quem treina boxe, MMA e rotinas de combate — dentro ou fora da academia.",
    meta: {
      doc: "REV · 02.26",
      region: "BR · PT-BR",
    },
    stat: {
      value: "—",
      label: "Sem atalho. Só trilha.",
    },
    ctaPrimary: {
      label: "Entrar na waitlist",
      href: "mailto:lucca.vilaca@gmail.com?subject=Quero%20testar%20o%20Kyron",
    },
    ctaSecondary: { label: "Ver o produto", href: "#prova" },
  },

  prova: {
    section: "02",
    eyebrow: "Produto · 03 telas",
    headingBefore: "Mais próximo de um app real do que de uma ",
    headingEmphasis: "promessa abstrata.",
    headingAfter: "",
    sub: "Como o Kyron organiza treino, progresso e comunidade — sem decorativo.",
    cards: [
      {
        ordinal: "01",
        label: "Plano da semana",
        title: "Semana inteira já montada",
        items: [
          "Uma sessão por dia de treino, por modalidade",
          "Artes marciais, musculação ou conditioning",
          "XP por sessão concluída, calibrado pela IA",
          "Pendentes e completos no mesmo plano",
        ],
        featured: false,
        image: {
          webp: "/assets/mockups/03-treinos.webp",
          avif: "/assets/mockups/03-treinos.avif",
          alt: "Tela Meus Treinos do Kyron com a lista de rounds da semana",
        },
      },
      {
        ordinal: "02",
        label: "Score & progressão",
        title: "Consistência virou número",
        items: [
          "Kyron Score 9 — ritmo atual",
          "450 XP acumulados em 3 treinos",
          "Métricas semanais — treinos, semanas, XP",
          "Disciplinas e nível no mesmo perfil",
        ],
        featured: true,
        image: {
          webp: "/assets/mockups/04-perfil.webp",
          avif: "/assets/mockups/04-perfil.avif",
          alt: "Tela de perfil do Kyron mostrando Kyron Score 9 e métricas de atleta intermediário",
        },
      },
      {
        ordinal: "03",
        label: "Comunidade",
        title: "Sua posição no ranking",
        items: [
          "Pódio tier · global e amigos",
          "Sua posição em destaque no centro",
          "Ranking geral por XP da temporada",
          "Atletas comparáveis pelo seu contexto",
        ],
        featured: false,
        image: {
          webp: "/assets/mockups/05-ranking.webp",
          avif: "/assets/mockups/05-ranking.avif",
          alt: "Tela de comunidade do Kyron com ranking tier global mostrando o pódio e a posição do atleta",
        },
      },
    ],
  },

  comoFunciona: {
    section: "03",
    eyebrow: "Método · 03 etapas",
    headingBefore: "Disciplina ",
    headingEmphasis: "virou plano.",
    headingAfter: "",
    sub: "Três etapas pra sair da intenção e entrar na rotina.",
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
    section: "04",
    eyebrow: "Sistema · Diferenciais",
    headingBefore: "A gente mede a sua ",
    headingEmphasis: "garra.",
    headingAfter: "",
    sub: "O que faz o Kyron parecer produto, não demo.",
    items: [
      {
        title: "IA que entende seu contexto",
        description:
          "O treino nasce do seu ambiente, nível e tempo disponível — não de um template genérico. Funciona pra academia, mas também pra boxe e MMA com estrutura reduzida.",
        featured: true,
        tag: "Núcleo",
      },
      {
        title: "Execução sem fricção",
        description:
          "Séries, descanso e progressão aparecem com clareza pra você treinar sem pensar na interface.",
        featured: false,
        tag: "Interface",
      },
      {
        title: "Chat útil, não decorativo",
        description:
          "Um assistente focado em treino, recuperação e performance de combate. Tom direto e contextual.",
        featured: false,
        tag: "Assistente",
      },
      {
        title: "Gamificação com propósito",
        description:
          "XP, score e ranking servem pra reforçar consistência — não pra poluir a experiência.",
        featured: false,
        tag: "Progressão",
      },
    ],
  },

  taglines: {
    section: "05",
    eyebrow: "Voz · Manifesto",
    lines: [
      { idx: "T · 01", text: "Treino", em: "é", rest: "combate.", use: "Primária" },
      { idx: "T · 02", text: "Aparecer é o", em: "mínimo.", rest: "", use: "Provocação" },
      { idx: "T · 03", text: "Disciplina", em: "virou", rest: "plano.", use: "Onboarding" },
      { idx: "T · 04", text: "A gente mede a sua", em: "garra.", rest: "", use: "Score" },
      { idx: "T · 05", text: "Próximo round", em: "começa", rest: "amanhã.", use: "Push" },
      { idx: "T · 06", text: "Não vende atalho.", em: "Trilha.", rest: "", use: "Campanha" },
    ],
  },

  faq: {
    section: "06",
    eyebrow: "Dúvidas · FAQ",
    headingBefore: "Objeções previsíveis, ",
    headingEmphasis: "respostas diretas.",
    headingAfter: "",
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
    section: "07",
    eyebrow: "Entrada · Próximo round",
    headingBefore: "Próximo round ",
    headingEmphasis: "começa",
    headingAfter: " com você.",
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
    tagline: "Treino é combate. Não rotina.",
    doc: "BRAND · REV 02.26",
    copyright: "© 2026 Kyron. Todos os direitos reservados.",
  },
} as const;

export type Content = typeof content;
