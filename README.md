# Fitness Stok

> Site de e-commerce fitness com vestimentas, suplementos e acessórios, além de uma seção de treinos com personal trainers, sistema de busca global e fluxo de login/cadastro simulado — construído inteiramente em HTML, CSS e JavaScript puro, sem frameworks ou build tools.

Projeto de portfólio desenvolvido por **José Kennedy** e **Thiago Rodrigues**.

---

## 📖 Sobre o projeto

Fitness Stok é uma loja online fictícia voltada para quem treina: reúne vestimentas, suplementos e acessórios à venda, além de uma seção dedicada a treinos, com apresentação de personal trainers e depoimentos de usuários. O projeto foi construído como um site multi-página tradicional (arquivos `.html` reais, sem SPA), com um design system consistente compartilhado entre todas as páginas — incluindo suporte a tema claro/escuro.

Como é um projeto de portfólio, os dados de treinos, personal trainers, avaliações e estatísticas são fictícios, e o login/cadastro são simulados no navegador (sem backend), mas construídos para reproduzir o comportamento real de um fluxo de autenticação.

## 🎯 Objetivos do projeto

- Reproduzir a experiência de um e-commerce fitness completo usando apenas HTML, CSS e JavaScript puro
- Manter uma identidade visual única e consistente entre todas as páginas (cores, tipografia, cards, botões, sombras)
- Suportar tema claro/escuro em todo o site
- Oferecer navegação e filtros de produto funcionais, sem dependência de backend
- Implementar uma busca global real, que indexa o conteúdo verdadeiro das páginas
- Ser responsivo, do mobile ao desktop

---

## 🚀 Funcionalidades

### 🛒 Catálogo e carrinho
- Três páginas de categoria — **Vestimentas**, **Suplementos** e **Acessórios** —, cada uma com 24 produtos
- Filtros por checkbox (tipo, cor/peso, forma), combinando grupos com lógica "E" e itens do mesmo grupo com lógica "OU"
- Mensagem de "nenhum produto encontrado" quando os filtros não retornam resultado
- Carrinho de compras persistido em `localStorage`, com badge de contador, painel lateral, remoção individual de itens e "Limpar carrinho"
- "Finalizar Compra" simulado (alerta de confirmação + esvaziamento do carrinho, sem checkout real)

### 🏋️ Treinos
- Hero com CTA duplo, seção de "Treinos personalizados", "Como funciona" (4 etapas), grade de 6 personal trainers fictícios, banner de contato, 6 avaliações de usuários (com notas variadas, não só 5 estrelas), estatísticas com contagem animada ao entrar na tela, e CTA final
- A seção de treinos personalizados tem dois estados reais: **deslogado** (convite para entrar/criar conta) e **logado** (4 cards de treino fictícios — nome, grupo muscular, exercícios, duração, nível e objetivo)
- Animação de revelar seções ao rolar a página, via `IntersectionObserver`

### 👤 Login e cadastro (simulados)
- Formulários de login e cadastro com validação nativa do HTML5 (campos obrigatórios, tamanho mínimo de senha, confirmação de senha com feedback visual de requisitos atendidos)
- Toggle de "mostrar senha"
- Toast de feedback ("Login realizado com sucesso!", "Conta criada com sucesso!", "Mensagem enviada, aguarde o retorno.")
- **Sessão simulada**: ao enviar o formulário, uma flag booleana é salva em `sessionStorage` (apagada ao fechar a aba) — **nenhum dado do visitante é armazenado** (nome, e-mail e senha não são persistidos em lugar nenhum)
- Redirecionamento pós-login/cadastro de volta à página de origem (via parâmetro `?redirect=`), com fallback para a página inicial
- O ícone de "Login" no header vira **"Minha conta"** (com opção de sair) quando a sessão simulada está ativa

### 🔎 Busca global
Veja a seção [Sistema de busca](#-sistema-de-busca) abaixo — é uma das partes mais elaboradas do projeto.

### 🎨 Tema claro/escuro
- Alternância de tema salva em `localStorage`, aplicada antes da renderização da página (evita "flash" do tema errado)
- Todas as cores do site usam variáveis CSS (`--fundo`, `--texto`, `--cartao`, etc.), sobrescritas via `:root[data-tema="escuro"]`

### 📱 Responsividade
- Menu hambúrguer no mobile, com overlay que escurece e trava o fundo, e fecha ao clicar fora
- Layout em grid/flex que se adapta em breakpoints de 768px e 1024px
- Dropdown de busca com posição recalculada dinamicamente via JavaScript, garantindo que funcione em qualquer tamanho de tela

---

## 🛠️ Tecnologias utilizadas

```text
HTML5
CSS3   (Custom Properties, Grid, Flexbox, media queries)
JavaScript (ES6+, vanilla — sem frameworks)

Fontes:        Google Fonts (Bebas Neue, Montserrat)
Ícones:        Material Icons (Google)
                Font Awesome 6.5.1 (carregado via CDN, mas não utilizado nas páginas atuais)
Armazenamento: localStorage (carrinho, tema) e sessionStorage (sessão de login simulada)
APIs do navegador: fetch, DOMParser, IntersectionObserver, URLSearchParams
```

Não há framework de front-end, bundler, gerenciador de pacotes, backend, banco de dados ou API externa de dados — o projeto é 100% estático.

---

## 📁 Estrutura do projeto

```text
.
├── principal.html              # Página inicial
├── estilos/
│   ├── principal.css           # Design system global (variáveis, header, footer, cards, tema)
│   ├── media-queries.css       # Breakpoints responsivos (768px / 1024px)
│   ├── treino.css              # Estilos exclusivos da página de Treinos
│   ├── login.css               # Estilos da página de Login (paleta própria)
│   └── cadastro.css            # Estilos da página de Cadastro (paleta própria)
├── paginas/
│   ├── roupas.html             # Categoria: Vestimentas
│   ├── sup.html                # Categoria: Suplementos
│   ├── acessorios.html         # Categoria: Acessórios
│   ├── treino.html             # Treinos, personal trainers e avaliações
│   ├── login.html              # Login
│   └── cadastro.html           # Criar conta
├── scripts/
│   ├── principal.js            # Header, menu mobile, formulário de contato
│   ├── carrinho.js             # Lógica do carrinho de compras
│   ├── tema.js                 # Alternância de tema claro/escuro
│   ├── auth.js                 # Sessão simulada + header "Minha conta"
│   ├── toast.js                # Componente de notificação (usado por login/cadastro)
│   ├── toggle-senha.js         # Mostrar/ocultar senha
│   ├── login.js / cadastro.js  # Lógica dos formulários de autenticação
│   ├── roupas.js / sup.js      # Filtros de produto por checkbox
│   ├── produto-ids.js          # Gera IDs únicos nos cards de produto (para a busca)
│   ├── treino-dados.js         # Dados fictícios de treinos e personal trainers
│   ├── treino.js               # Renderização da página de Treinos
│   ├── busca-utils.js          # Normalização de texto, slug e distância de edição
│   ├── busca-paginas.js        # Índice manual de páginas/seções estruturais
│   ├── busca-indice.js         # Monta o índice de busca (páginas + treinos + produtos)
│   ├── busca-service.js        # Pontuação de relevância e resolução de rotas
│   └── busca-dropdown.js       # Componente visual da busca (dropdown, teclado, debounce)
└── imagens/                    # Ícones e imagens do site (favicon, fotos)
```

> `toast.js` e `toggle-senha.js` são referenciados pelas páginas de login/cadastro, mas seu conteúdo não fez parte da análise que gerou este README.

---

## 🧩 Principais componentes

| Componente | Onde vive | O que faz |
|---|---|---|
| **Header + Nav** | Duplicado em cada página (`<header>`/`<nav>` no HTML) | Logo, busca, tema, carrinho, login/conta, menu mobile |
| **Painel do carrinho** | `carrinho.js` + markup em cada página | Lista de itens, total, finalizar/limpar |
| **Dropdown de busca** | `busca-dropdown.js` | Sugestões em tempo real, navegação por teclado |
| **Cards de produto** | `roupas.html`, `sup.html`, `acessorios.html` | Imagem, nome, preço, botão "Adicionar" |
| **Cards de treino / personal** | `treino.js` (renderizados via JS a partir de `treino-dados.js`) | Dados fictícios de treinos e profissionais |
| **Footer** | Duplicado em cada página | Marca, institucional, categorias |

O header, o footer e o painel do carrinho não são componentes reutilizáveis via JavaScript — são blocos de HTML duplicados manualmente em cada página, seguindo o mesmo padrão de marcação.

---

## 🧭 Páginas

| Página | Arquivo | Descrição |
|---|---|---|
| Início | `principal.html` | Hero, "Quem Somos", "Fale Conosco" |
| Vestimentas | `paginas/roupas.html` | 24 produtos, filtro por tipo/cor/forma |
| Suplementos | `paginas/sup.html` | 24 produtos, filtro por tipo/peso/forma |
| Acessórios | `paginas/acessorios.html` | 24 produtos, filtro por tipo/cor/forma |
| Treinos | `paginas/treino.html` | Hero, treinos personalizados, como funciona, personal trainers, avaliações, estatísticas |
| Login | `paginas/login.html` | Formulário de login simulado |
| Criar conta | `paginas/cadastro.html` | Formulário de cadastro simulado |

Não existe sistema de rotas em JavaScript — a navegação é feita por links HTML padrão entre arquivos `.html` reais, com âncoras (`#id`) para seções específicas dentro de uma página.

---

## 👤 Autenticação

**Importante: não existe backend nem autenticação real neste projeto.** O que existe é uma simulação pensada para demonstrar o fluxo de UI:

1. O usuário preenche e envia o formulário de login ou cadastro (qualquer e-mail/senha que passe na validação nativa do HTML5 é aceito)
2. `auth.js` grava uma flag booleana (`fitness-stok-sessao`) em `sessionStorage` — sem guardar nome, e-mail, senha ou qualquer identificador do visitante
3. O usuário é redirecionado de volta à página de onde veio (via parâmetro `?redirect=`), ou para `principal.html` se não houver origem identificável
4. Enquanto a sessão estiver ativa, o ícone de "Login" no header vira **"Minha conta"**; clicar nele encerra a sessão e recarrega a página
5. Como o dado fica em `sessionStorage`, ele desaparece sozinho ao fechar a aba/navegador — nada é "lembrado" entre visitas

A página de Treinos usa esse mesmo estado de sessão para decidir se mostra a área de "treinos personalizados" ou o convite para criar conta/entrar.

**Limitação atual:** o header com o estado "Minha conta" só está integrado em `principal.html` e `paginas/treino.html`. As páginas `roupas.html`, `sup.html` e `acessorios.html` ainda não incluem `auth.js`, então nelas o ícone de login permanece sempre como "Login".

---

## 🔎 Sistema de busca

A barra de busca do header foi transformada em uma busca global funcional, com sugestões em tempo real.

**Como o índice é montado** (`busca-indice.js`), combinando três fontes diferentes:

1. **Páginas e seções estruturais** — uma lista curta e mantida manualmente em `busca-paginas.js` (Quem Somos, Fale Conosco, Como Funciona, Personal Trainers, Login, etc.), já que esse conteúdo muda pouco.
2. **Treinos e personal trainers** — lidos diretamente de `TREINO_DADOS` (o mesmo array usado para renderizar a página de Treinos), sem duplicar informação.
3. **Produtos** — lidos **ao vivo do HTML real** das páginas de categoria via `fetch()` + `DOMParser`, extraindo título, descrição e atributos (`data-tipo`, `data-cor`, `data-peso`, `data-forma`) diretamente dos cards `.produto`. Isso significa que um produto novo adicionado ao HTML já aparece na busca automaticamente, sem precisar editar nenhum arquivo relacionado à busca.

O índice é montado uma única vez por carregamento de página e reaproveitado nas pesquisas seguintes (cache em memória via Promise).

**Relevância** (`busca-service.js`): cada item recebe uma pontuação com base no melhor critério encontrado — correspondência exata no título (mais alta) → título começa com o termo → título contém o termo → keyword → descrição → tolerância a erro de digitação (distância de Levenshtein, para termos com 4+ letras). Os resultados são ordenados pela maior pontuação e limitados a 8 sugestões.

**Digitação e debounce**: as sugestões aparecem a partir de 1 caractere digitado, com debounce de 250ms entre teclas.

**Navegação**: cada resultado guarda uma chave de página (`treino`, `roupas`, `sup`, `acessorios`, `principal`, `login`, `cadastro`) e uma âncora opcional. Ao clicar, o sistema calcula o caminho relativo correto dependendo de onde o usuário está navegando (raiz do site ou dentro de `/paginas`), e faz scroll suave em vez de recarregar a página quando o resultado já está na página atual.

**Teclado e estados**: `↑`/`↓` navegam entre sugestões, `Enter` seleciona, `Esc` e clique fora fecham o dropdown. Estados de carregamento e "Nenhum resultado encontrado. Tente pesquisar por outro termo." são tratados explicitamente.

**Posicionamento**: o painel de sugestões é criado no `<body>` (não dentro da caixa de busca) e posicionado via `getBoundingClientRect()`, porque a caixa de busca tem `overflow: hidden` para arredondar as bordas — um filho posicionado dentro dela ficaria cortado.

---

## 🎨 Interface e responsividade

- **Paleta**: fundo/texto adaptáveis por tema (`--fundo`, `--texto`, `--cartao`) e uma cor de destaque fixa em ambos os temas (`--dest: #A8E000`, verde-limão)
- **Tipografia**: Bebas Neue para títulos, Montserrat para texto corrido
- **Cards**: bordas de 1px com `--cartao-borda`, `border-radius` entre 8px e 16px, duas escalas de sombra (`--sombra-suave` / `--sombra-forte`)
- **Botões**: padrão primário (fundo verde, borda preta) e secundário (contorno), com `translateY` no hover
- **Tema claro/escuro**: `data-tema="escuro"` no `<html>`, aplicado antes do primeiro paint para evitar flash de tema errado
- **Responsividade**: breakpoints em 768px e 1024px (`media-queries.css`), menu hambúrguer com overlay no mobile, grids que colapsam para 1 coluna em telas pequenas
- **Animações**: revelar seções ao rolar (Treinos), contagem numérica animada (estatísticas), leve flutuação no badge do hero, transições suaves em hover de cards e botões — respeitando `@media (prefers-reduced-motion: reduce)` onde implementado

---

## ⚙️ Instalação e como executar

Não há processo de build, dependências para instalar ou variáveis de ambiente — é um site estático.

```bash
git clone <url-do-repositorio>
cd fitness-stok
```

Depois, sirva a pasta com qualquer servidor local (necessário para a busca global funcionar, já que ela usa `fetch()` para ler outras páginas — isso não funciona abrindo o arquivo direto via `file://`):

```bash
# Exemplo: extensão Live Server do VS Code,
# ou qualquer outro servidor estático de sua preferência
```

Acesse `principal.html` pelo navegador.

---

## 🔐 Variáveis de ambiente

Não aplicável — o projeto não possui backend, API ou arquivo `.env`.

---

## ⚠️ Limitações

- Não existe backend real: carrinho, login/cadastro e "finalizar compra" são simulados no navegador
- Login e cadastro aceitam qualquer e-mail/senha que passe na validação do HTML5 — não há verificação de credenciais
- O estado de sessão simulada ("Minha conta") só está integrado ao header de `principal.html` e `paginas/treino.html`
- Todos os treinos, personal trainers, avaliações e estatísticas da página de Treinos são fictícios, para fins de demonstração
- A busca global depende de `fetch()` para ler as páginas de produto — não funciona abrindo os arquivos diretamente pelo navegador (`file://`), apenas por um servidor local ou hospedagem real
- Não há testes automatizados

## 🔮 Próximos passos

Possibilidades futuras — nenhuma delas implementada atualmente:

- Integração com uma API/backend real para produtos, carrinho e autenticação
- Persistência de dados de usuário em um banco de dados
- Página de detalhe individual por produto
- Incluir `auth.js` também nas páginas de categoria, para o header ficar consistente em 100% do site
- Testes automatizados

---

## 🤝 Contribuição

Projeto de portfólio pessoal. Sugestões e feedback são bem-vindos através de issues, se o repositório estiver público.

## 📄 Licença

Nenhum arquivo de licença foi identificado no projeto.