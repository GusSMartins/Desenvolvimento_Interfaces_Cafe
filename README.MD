# Silêncio & Grão — Cafeteria Silenciosa & Coworking de Foco

Plataforma web responsiva e acessível desenvolvida para a **Silêncio & Grão**, cafeteria de cafés especiais e espaço de coworking sob a política *Zero Calls* (silêncio absoluto, sem ligações ou reuniões). O modelo funciona por hora de permanência com consumo livre na bancada.

## Estrutura de Arquivos

```text
Desenvolvimento_Interfaces_Cafe/
├── index.html      # Página inicial: status ao vivo, carrossel, pilares e simulador de estadia
├── cardapio.html   # Cardápio filtrável por categoria e modalidades de estações
├── reservas.html   # Formulário validado com emissão instantânea de comprovante
├── login.html      # Área do membro com alternância Entrar / Criar Conta
├── 404.html        # Página de erro personalizada para rotas inválidas
├── css/
│   └── style.css   # Estilos globais, temas, animações e responsividade (WCAG AAA)
├── img/
│   ├── logo.png                    # Logotipo da marca, usado também como favicon
│   ├── cabine-individual.webp      # Fotos dos ambientes (carrossel da página inicial)
│   ├── bancada-autosservico.webp
│   ├── mezanino-biblioteca.webp
│   ├── cafe-coado-v60.webp         # Fotos dos itens do cardápio
│   ├── cold-brew.webp
│   ├── infusao-camomila.webp
│   ├── cha-verde-sencha.webp
│   ├── pao-levain.webp
│   └── bolo-banana-aveia.webp
├── js/
│   └── script.js   # Acessibilidade, menu mobile, carrossel, simulador, filtros, login e reservas
└── README.MD       # Documentação do projeto
```

## Passo a Passo da Construção

1. **Planejamento e Paleta Acessível (WCAG AAA):**
   - Definição dos fluxos principais (informação, cardápio/tarifas, reserva, área do membro e página de erro 404).
   - Aplicação da regra cromática **60-30-10** com três cores de alto contraste: `#F7F5F0` (60% fundo Creme Pergaminho), `#261C16` (30% textos e bordas Espresso Profundo — contraste `15,30:1`) e `#2F4A3E` (10% botões e destaques Verde Botânico — contraste `8,88:1`).
   - Cor de ênfase pontual **Âmbar Torrado** `#8C4A19` para destacar a expressão "silêncio absoluto" no título principal e o preço do Passe por Hora (contraste `6,2:1`, AAA para texto grande), com variante `#E0A370` no modo escuro (contraste `7,6:1`).
   - Cor de status **Verde Vivo** `#1E7E34` no indicador de disponibilidade em tempo real, com variante `#4CC16A` no modo escuro.

2. **Estruturação Semântica (`HTML5`):**
   - Criação das cinco páginas compartilhando painel de acessibilidade, `<header>` fixo com logotipo e `<footer>` invertido.
   - Identidade visual com favicon (`<link rel="icon">` e `apple-touch-icon`) e logotipo ao lado do nome da marca, marcado como decorativo (`alt=""`) para não duplicar a leitura do link.
   - Emprego de tags semânticas (`<main>`, `<section>`, `<article>`, `<aside>`, `<figure>`), rótulos explícitos (`<label>`) em formulários e atributos `data-*` para filtragem dinâmica.
   - Fotografias otimizadas em `WebP` (1200 px) no carrossel de ambientes e nos cards do cardápio, com textos alternativos descritivos, dimensões declaradas (`width`/`height`) contra saltos de layout e `loading="lazy"` no cardápio.
   - Ícones vetoriais SVG inline (fone, xícara e relógio) com `stroke="currentColor"` para herdar o tema, marcados como decorativos (`aria-hidden="true"`).
   - Regiões `aria-live` e `role="status"` para anunciar atualizações (status de cabines, simulador, login e comprovante de reserva) a leitores de tela.

3. **Estilização e Responsividade (`css/style.css`):**
   - Centralização das cores em variáveis CSS (`:root`), redefinidas em `html[data-tema="escuro"]` para o modo escuro.
   - Construção de layouts com `CSS Grid` e `Flexbox`, tipografia híbrida (serifada para leitura e sem serifa para controles) e contornos `:focus-visible` para acessibilidade via teclado.
   - Card "Passe por Hora" com etiqueta em pílula (`★ Passe Diário Flexível`) posicionada sobre a borda superior e preço em Âmbar Torrado.
   - Pilares "Como funciona" com numeração em círculos preenchidos e ícones, dimensionados em `rem` para acompanhar o ajuste de fonte.
   - Indicador de status ao vivo com animação `@keyframes` de pulso, desativada automaticamente via `prefers-reduced-motion` (WCAG 2.3.3).
   - Adaptação para dispositivos móveis (`@media (max-width: 820px)`) com colunas em pilha única e menu retrátil.

4. **Interatividade (`js/script.js`):**
   - **Painel de Acessibilidade:** Alterna modo escuro, tamanho da fonte (85% a 130%), espaçamento ampliado e sublinhado de links, salvando as preferências no `localStorage`.
   - **Menu Mobile:** Alterna a exibição da navegação e atualiza `aria-expanded`.
   - **Carrossel de Ambientes:** Navegação por botões e indicadores entre as ilustrações dos espaços, atualizando `aria-selected`.
   - **Simulador de Permanência:** Calcula o valor total conforme horas e estação escolhidas, aplicando 15% de desconto automático a partir de 4 horas. Ao atingir o desconto, o JavaScript adiciona a classe `desconto-ativo`, que destaca o aviso em Verde Botânico com a mensagem de confirmação.
   - **Filtro de Cardápio:** Filtra os cards entre *Todos*, *Cafés*, *Chás* e *Lanches* sem recarregar a página.
   - **Login e Cadastro:** Alterna entre os modos Entrar e Criar Conta, permite mostrar/ocultar a senha e exibe um painel simulado de sessão autenticada.
   - **Comprovante de Reserva:** Valida o formulário e gera um código único (`SG-XXXX`) na tela após o envio.

## Como Executar

1. Mantenha a estrutura de pastas (`css/`, `img/` e `js/` na raiz do projeto).
2. Abra o arquivo `index.html` diretamente no navegador ou via extensão **Live Server** no VS Code.
3. Utilize o link **"Testar Página 404"** no rodapé para visualizar a página de erro personalizada.
4. Se o favicon não aparecer, recarregue com **Ctrl + F5** para limpar o cache do navegador.