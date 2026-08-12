// ===================== ÍNDICE DE PÁGINAS/SEÇÕES ESTRUTURAIS =====================
// Conteúdo fixo do site (páginas e seções), que não muda com a frequência
// dos produtos. Por isso, diferente de roupas/suplementos/acessórios
// (que são lidos direto do HTML via fetch), esta lista é mantida à mão —
// é pequena e estável o suficiente pra isso não virar um problema.
//
// "pagina" é uma chave que o resolvedor de rotas (busca-service.js)
// sabe transformar no caminho relativo certo, dependendo de onde o
// usuário está navegando (raiz do site ou dentro de /paginas).

var BUSCA_PAGINAS = [
    {
        titulo: 'Página inicial',
        descricao: 'Início da Fitness Stok: vestimentas, suplementos, acessórios e treinos.',
        keywords: ['inicio', 'home', 'principal', 'loja'],
        categoria: 'Página',
        pagina: 'principal',
        ancora: null,
        tipo: 'pagina'
    },
    {
        titulo: 'Quem Somos',
        descricao: 'Conheça a Fitness Stok: loja online voltada pra quem leva o treino a sério.',
        keywords: ['sobre', 'quem somos', 'empresa', 'loja'],
        categoria: 'Página',
        pagina: 'principal',
        ancora: 'quem-somos',
        tipo: 'secao'
    },
    {
        titulo: 'Fale Conosco',
        descricao: 'Envie uma mensagem pra equipe da Fitness Stok.',
        keywords: ['contato', 'suporte', 'fale conosco', 'ajuda', 'duvida'],
        categoria: 'Página',
        pagina: 'principal',
        ancora: 'fale-conosco',
        tipo: 'secao'
    },
    {
        titulo: 'Vestimentas',
        descricao: 'Camisas, bermudas, calças, moletons e tênis pra treinar com estilo.',
        keywords: ['roupas', 'vestimentas', 'camisa', 'moletom', 'tenis', 'bermuda', 'calca'],
        categoria: 'Categoria',
        pagina: 'roupas',
        ancora: null,
        tipo: 'pagina'
    },
    {
        titulo: 'Suplementos',
        descricao: 'Whey, creatina, hipercalóricos e barras proteicas.',
        keywords: ['suplementos', 'whey', 'creatina', 'hipercalorico', 'barra proteica', 'proteina'],
        categoria: 'Categoria',
        pagina: 'sup',
        ancora: null,
        tipo: 'pagina'
    },
    {
        titulo: 'Acessórios',
        descricao: 'Bonés, cintos, mochilas, fones, garrafas e outros acessórios de treino.',
        keywords: ['acessorios', 'bone', 'cinto', 'mochila', 'fone', 'garrafa', 'faixa'],
        categoria: 'Categoria',
        pagina: 'acessorios',
        ancora: null,
        tipo: 'pagina'
    },
    {
        titulo: 'Treinos',
        descricao: 'Encontre treinos, conheça personal trainers e acompanhe sua evolução.',
        keywords: ['treinos', 'treino', 'academia', 'musculacao'],
        categoria: 'Categoria',
        pagina: 'treino',
        ancora: null,
        tipo: 'pagina'
    },
    {
        titulo: 'Treinos personalizados',
        descricao: 'Treinos montados de acordo com seu objetivo, nível e disponibilidade.',
        keywords: ['treino personalizado', 'meu treino', 'plano de treino'],
        categoria: 'Treinos',
        pagina: 'treino',
        ancora: 'treinos-personalizados',
        tipo: 'secao'
    },
    {
        titulo: 'Como funciona',
        descricao: 'Entenda o processo pra conseguir um treino personalizado com um personal.',
        keywords: ['como funciona', 'processo', 'passo a passo'],
        categoria: 'Treinos',
        pagina: 'treino',
        ancora: 'como-funciona',
        tipo: 'secao'
    },
    {
        titulo: 'Personal Trainers',
        descricao: 'Conheça os personal trainers parceiros e escolha o ideal pra você.',
        keywords: ['personal', 'personal trainer', 'profissional', 'treinador'],
        categoria: 'Treinos',
        pagina: 'treino',
        ancora: 'personal-trainers',
        tipo: 'secao'
    },
    {
        titulo: 'Solicitar treino personalizado',
        descricao: 'Entre em contato com um personal e explique seus objetivos.',
        keywords: ['solicitar treino', 'contato personal', 'quero um treino'],
        categoria: 'Treinos',
        pagina: 'treino',
        ancora: 'contato-personal',
        tipo: 'secao'
    },
    {
        titulo: 'Avaliações de usuários',
        descricao: 'Veja o que outros usuários acharam dos treinos e do acompanhamento.',
        keywords: ['avaliacoes', 'depoimentos', 'opinioes', 'reviews'],
        categoria: 'Treinos',
        pagina: 'treino',
        ancora: 'depoimentos',
        tipo: 'secao'
    },
    {
        titulo: 'Entrar',
        descricao: 'Acesse sua conta na Fitness Stok.',
        keywords: ['login', 'entrar', 'acessar conta'],
        categoria: 'Conta',
        pagina: 'login',
        ancora: null,
        tipo: 'pagina'
    },
    {
        titulo: 'Criar conta',
        descricao: 'Cadastre-se gratuitamente na Fitness Stok.',
        keywords: ['cadastro', 'criar conta', 'registrar', 'sign up'],
        categoria: 'Conta',
        pagina: 'cadastro',
        ancora: null,
        tipo: 'pagina'
    }
];