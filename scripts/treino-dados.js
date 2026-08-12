// ===================== DADOS FICTÍCIOS — PÁGINA DE TREINOS =====================
// Todo o conteúdo abaixo é fictício e serve apenas para demonstração do portfólio.
// Nenhum nome, foto, avaliação ou número representa pessoas ou dados reais.

var TREINO_DADOS = {

    // Treinos personalizados fictícios (exibidos apenas no estado "logado")
    treinos: [
        {
            id: "a",
            nome: "Treino A",
            grupo: "Peito, Ombros e Tríceps",
            exercicios: 8,
            duracao: "55 min",
            nivel: "Intermediário",
            objetivo: "Hipertrofia",
            icone: "fitness_center"
        },
        {
            id: "b",
            nome: "Treino B",
            grupo: "Costas e Bíceps",
            exercicios: 7,
            duracao: "50 min",
            nivel: "Intermediário",
            objetivo: "Hipertrofia",
            icone: "sports_gymnastics"
        },
        {
            id: "c",
            nome: "Treino C",
            grupo: "Pernas",
            exercicios: 9,
            duracao: "60 min",
            nivel: "Avançado",
            objetivo: "Força",
            icone: "directions_run"
        },
        {
            id: "d",
            nome: "Treino D",
            grupo: "Full Body",
            exercicios: 10,
            duracao: "45 min",
            nivel: "Iniciante",
            objetivo: "Condicionamento",
            icone: "self_improvement"
        }
    ],

    // Etapas de "Como funciona"
    passos: [
        {
            numero: "01",
            titulo: "Crie sua conta",
            texto: "Cadastre-se gratuitamente na plataforma e monte seu perfil de treino em poucos minutos."
        },
        {
            numero: "02",
            titulo: "Encontre um personal",
            texto: "Escolha um profissional de acordo com sua especialidade, experiência e objetivo."
        },
        {
            numero: "03",
            titulo: "Converse sobre seus objetivos",
            texto: "Conte sua rotina, seu nível de experiência e suas metas para o personal montar o plano ideal."
        },
        {
            numero: "04",
            titulo: "Receba seu treino",
            texto: "Acompanhe seu plano de treino personalizado direto pela plataforma e evolua com constância."
        }
    ],

    // Personal trainers fictícios
    personais: [
        {
            nome: "Bruno Alencar",
            iniciais: "BA",
            especialidade: "Hipertrofia",
            experiencia: "8 anos de experiência",
            nota: 4.9,
            alunos: 132,
            bio: "Focado em ganho de massa muscular com treinos progressivos e acompanhamento próximo.",
            cor: "verde"
        },
        {
            nome: "Camila Duarte",
            iniciais: "CD",
            especialidade: "Emagrecimento",
            experiencia: "6 anos de experiência",
            nota: 4.8,
            alunos: 98,
            bio: "Especialista em treinos metabólicos que aliam resultado a uma rotina sustentável.",
            cor: "escuro"
        },
        {
            nome: "Diego Martins",
            iniciais: "DM",
            especialidade: "Força",
            experiencia: "10 anos de experiência",
            nota: 4.7,
            alunos: 156,
            bio: "Trabalha com powerlifting e ganho de força máxima para praticantes de todos os níveis.",
            cor: "verde"
        },
        {
            nome: "Larissa Ferraz",
            iniciais: "LF",
            especialidade: "Condicionamento físico",
            experiencia: "5 anos de experiência",
            nota: 4.9,
            alunos: 74,
            bio: "Monta treinos funcionais de alta intensidade focados em resistência e saúde geral.",
            cor: "escuro"
        },
        {
            nome: "Otávio Ramos",
            iniciais: "OR",
            especialidade: "Performance",
            experiencia: "9 anos de experiência",
            nota: 4.6,
            alunos: 61,
            bio: "Atende praticantes que buscam evolução técnica e desempenho em esportes específicos.",
            cor: "verde"
        },
        {
            nome: "Yasmin Cardoso",
            iniciais: "YC",
            especialidade: "Treinamento funcional",
            experiencia: "4 anos de experiência",
            nota: 4.8,
            alunos: 53,
            bio: "Une mobilidade, estabilidade e força em treinos dinâmicos para o dia a dia.",
            cor: "escuro"
        }
    ],

    // Avaliações fictícias — propositalmente com notas variadas, não apenas 5 estrelas
    avaliacoes: [
        {
            nome: "Marcos Vinícius",
            iniciais: "MV",
            nota: 5,
            comentario: "Comecei sem saber muito bem como estruturar meus treinos e o acompanhamento fez bastante diferença. Depois de algumas semanas já percebi evolução na minha força.",
            personal: "Diego Martins",
            objetivo: "Força"
        },
        {
            nome: "Paula Nogueira",
            iniciais: "PN",
            nota: 4,
            comentario: "Gostei bastante da organização do treino e da atenção do personal. Os exercícios fazem sentido para o meu objetivo e consigo acompanhar tudo pela plataforma.",
            personal: "Camila Duarte",
            objetivo: "Emagrecimento"
        },
        {
            nome: "Igor Salgado",
            iniciais: "IS",
            nota: 3,
            comentario: "O treino é bom, mas senti que alguns exercícios poderiam ser substituídos. Ainda assim, tive bons resultados e gostei bastante do acompanhamento.",
            personal: "Bruno Alencar",
            objetivo: "Hipertrofia"
        },
        {
            nome: "Renata Barbosa",
            iniciais: "RB",
            nota: 5,
            comentario: "Melhor decisão que tomei esse ano. O personal entendeu minha rotina corrida e montou um plano que eu realmente consigo seguir.",
            personal: "Yasmin Cardoso",
            objetivo: "Condicionamento"
        },
        {
            nome: "Thiago Nascimento",
            iniciais: "TN",
            nota: 2,
            comentario: "Tive dificuldade para marcar os primeiros contatos e o retorno demorou um pouco. Depois que engrenou, a experiência melhorou bastante.",
            personal: "Otávio Ramos",
            objetivo: "Performance"
        },
        {
            nome: "Bianca Ferreira",
            iniciais: "BF",
            nota: 4,
            comentario: "Plataforma bem organizada e treino condizente com o que conversei com a personal. Recomendo pra quem quer sair do genérico.",
            personal: "Larissa Ferraz",
            objetivo: "Condicionamento"
        }
    ],

    // Estatísticas fictícias e meramente demonstrativas
    estatisticas: [
        { valor: 1200, prefixo: "+", sufixo: "", label: "Usuários cadastrados" },
        { valor: 35, prefixo: "+", sufixo: "", label: "Personais parceiros" },
        { valor: 4.8, prefixo: "", sufixo: "/5", label: "Avaliação média", decimal: true },
        { valor: 2500, prefixo: "+", sufixo: "", label: "Treinos realizados" }
    ]
};