# Silêncio & Grão — Cafeteria Silenciosa & Coworking de Foco

Plataforma web responsiva e acessível desenvolvida para a **Silêncio & Grão**, cafeteria de cafés especiais e espaço de coworking sob a política *Zero Calls* (silêncio absoluto, sem ligações ou reuniões). O modelo funciona por hora de permanência com consumo livre na bancada.

## Estrutura de Arquivos

```text
silencio-e-grao/
├── index.html      # Página inicial, regras de silêncio e simulador de estadia
├── cardapio.html   # Cardápio filtrável por categoria e modalidades de estações
├── reservas.html   # Formulário validado com emissão instantânea de comprovante
├── 404.html        # Página de erro personalizada para rotas inválidas
├── css/
│   └── style.css   # Estilos globais, responsividade e paleta 60-30-10 (WCAG AAA)
├── js/
│   └── script.js   # Lógica de menu mobile, calculadora, filtros e reservas
└── README.md       # Documentação do projeto
```

## Passo a Passo da Construção

1. **Planejamento e Paleta Acessível (WCAG AAA):**
   - Definição dos fluxos principais (informação, cardápio/tarifas, reserva e página de erro 404).
   - Aplicação da regra cromática **60-30-10** com três cores de alto contraste: `#F7F5F0` (60% fundo Creme Pergaminho), `#261C16` (30% textos e bordas Espresso Profundo — contraste `15,30:1`) e `#2F4A3E` (10% botões e destaques Verde Botânico — contraste `8,88:1`).

2. **Estruturação Semântica (`HTML5`):**
   - Criação das quatro páginas compartilhando `<header>` fixo e `<footer>` invertido.
   - Emprego de tags semânticas (`<main>`, `<section>`, `<article>`, `<aside>`), rótulos explícitos (`<label>`) em formulários e atributos `data-*` para filtragem dinâmica.

3. **Estilização e Responsividade (`css/style.css`):**
   - Centralização das cores em variáveis CSS (`:root`).
   - Construção de layouts com `CSS Grid` e `Flexbox`, tipografia híbrida (serifada para leitura e sem serifa para controles) e contornos `:focus-visible` para acessibilidade via teclado.
   - Adaptação para dispositivos móveis (`@media (max-width: 820px)`) com colunas em pilha única e menu retrátil.

4. **Interatividade (`js/script.js`):**
   - **Menu Mobile:** Alterna a exibição da navegação e atualiza `aria-expanded`.
   - **Simulador de Permanência:** Calcula o valor total conforme horas e estação escolhidas, aplicando 15% de desconto automático a partir de 4 horas.
   - **Filtro de Cardápio:** Filtra os cards entre *Todos*, *Cafés*, *Chás* e *Lanches* sem recarregar a página.
   - **Comprovante de Reserva:** Valida o formulário e gera um código único (`SG-XXXX`) na tela após o envio.

## Como Executar

1. Mantenha a estrutura de pastas (`css/` e `js/` dentro de `silencio-e-grao/`).
2. Abra o arquivo `index.html` diretamente no navegador ou via extensão **Live Server** no VS Code.
3. Utilize o link **"Testar Página 404"** no rodapé para visualizar a página de erro personalizada.