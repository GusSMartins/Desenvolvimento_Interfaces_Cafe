document.addEventListener("DOMContentLoaded", () => {
    const htmlEl = document.documentElement;
  
    // ========================================================================
    // 1. ABA DE ACESSIBILIDADE (MODO ESCURO, FONTE, ESPAÇAMENTO E LINKS)
    // ========================================================================
    const btnAcessibilidade = document.getElementById("btn-acessibilidade");
    const painelAcessibilidade = document.getElementById("painel-acessibilidade");
    const btnTema = document.getElementById("btn-tema");
    const btnFonteDiminuir = document.getElementById("btn-fonte-diminuir");
    const btnFontePadrao = document.getElementById("btn-fonte-padrao");
    const btnFonteAumentar = document.getElementById("btn-fonte-aumentar");
    const btnEspacamento = document.getElementById("btn-espacamento");
    const btnLinks = document.getElementById("btn-links");
    const btnResetAcess = document.getElementById("btn-reset-acess");
  
    let escalaFonteAtual = Number(localStorage.getItem("sg_fonte")) || 100;
  
    function aplicarPreferenciasSalvas() {
      // Tema
      const temaSalvo = localStorage.getItem("sg_tema");
      if (temaSalvo === "escuro") {
        htmlEl.setAttribute("data-tema", "escuro");
        if (btnTema) btnTema.textContent = "Alternar Modo Claro";
      } else {
        htmlEl.removeAttribute("data-tema");
        if (btnTema) btnTema.textContent = "Alternar Modo Escuro";
      }
  
      // Fonte
      htmlEl.style.setProperty("--escala-fonte", `${escalaFonteAtual}%`);
  
      // Espaçamento
      if (localStorage.getItem("sg_espacamento") === "amplo") {
        htmlEl.setAttribute("data-espacamento", "amplo");
        if (btnEspacamento) btnEspacamento.classList.add("ativo");
      } else {
        htmlEl.removeAttribute("data-espacamento");
        if (btnEspacamento) btnEspacamento.classList.remove("ativo");
      }
  
      // Sublinhar links
      if (localStorage.getItem("sg_links") === "sublinhados") {
        htmlEl.setAttribute("data-links", "sublinhados");
        if (btnLinks) btnLinks.classList.add("ativo");
      } else {
        htmlEl.removeAttribute("data-links");
        if (btnLinks) btnLinks.classList.remove("ativo");
      }
    }
  
    aplicarPreferenciasSalvas();
  
    if (btnAcessibilidade && painelAcessibilidade) {
      btnAcessibilidade.addEventListener("click", () => {
        const estaAberto = !painelAcessibilidade.hidden;
        painelAcessibilidade.hidden = estaAberto;
        btnAcessibilidade.setAttribute("aria-expanded", String(!estaAberto));
      });
    }
  
    if (btnTema) {
      btnTema.addEventListener("click", () => {
        const escuroAtivo = htmlEl.getAttribute("data-tema") === "escuro";
        localStorage.setItem("sg_tema", escuroAtivo ? "claro" : "escuro");
        aplicarPreferenciasSalvas();
      });
    }
  
    if (btnFonteAumentar && btnFonteDiminuir && btnFontePadrao) {
      btnFonteAumentar.addEventListener("click", () => {
        if (escalaFonteAtual < 130) {
          escalaFonteAtual += 10;
          localStorage.setItem("sg_fonte", String(escalaFonteAtual));
          aplicarPreferenciasSalvas();
        }
      });
  
      btnFonteDiminuir.addEventListener("click", () => {
        if (escalaFonteAtual > 85) {
          escalaFonteAtual -= 10;
          localStorage.setItem("sg_fonte", String(escalaFonteAtual));
          aplicarPreferenciasSalvas();
        }
      });
  
      btnFontePadrao.addEventListener("click", () => {
        escalaFonteAtual = 100;
        localStorage.setItem("sg_fonte", "100");
        aplicarPreferenciasSalvas();
      });
    }
  
    if (btnEspacamento) {
      btnEspacamento.addEventListener("click", () => {
        const ativo = htmlEl.getAttribute("data-espacamento") === "amplo";
        localStorage.setItem("sg_espacamento", ativo ? "padrao" : "amplo");
        aplicarPreferenciasSalvas();
      });
    }
  
    if (btnLinks) {
      btnLinks.addEventListener("click", () => {
        const ativo = htmlEl.getAttribute("data-links") === "sublinhados";
        localStorage.setItem("sg_links", ativo ? "padrao" : "sublinhados");
        aplicarPreferenciasSalvas();
      });
    }
  
    if (btnResetAcess) {
      btnResetAcess.addEventListener("click", () => {
        localStorage.removeItem("sg_tema");
        localStorage.removeItem("sg_fonte");
        localStorage.removeItem("sg_espacamento");
        localStorage.removeItem("sg_links");
        escalaFonteAtual = 100;
        aplicarPreferenciasSalvas();
      });
    }
  
    // ========================================================================
    // 2. MENU MOBILE ACESSÍVEL
    // ========================================================================
    const btnMenu = document.getElementById("btn-menu");
    const menuPrincipal = document.getElementById("menu-principal");
  
    if (btnMenu && menuPrincipal) {
      btnMenu.addEventListener("click", () => {
        const estaAberto = menuPrincipal.classList.toggle("aberto");
        btnMenu.setAttribute("aria-expanded", String(estaAberto));
      });
    }
  
    // ========================================================================
    // 3. CARROSSEL DE IMAGENS DOS AMBIENTES (index.html)
    // ========================================================================
    const slides = document.querySelectorAll(".carrossel-slide");
    const indicadores = document.querySelectorAll(".indicador");
    const btnAnterior = document.getElementById("btn-slide-anterior");
    const btnProximo = document.getElementById("btn-slide-proximo");
    let slideAtual = 0;
  
    function mostrarSlide(indice) {
      if (slides.length === 0) return;
      slideAtual = (indice + slides.length) % slides.length;
  
      slides.forEach((slide, i) => {
        slide.classList.toggle("ativo", i === slideAtual);
      });
  
      indicadores.forEach((ind, i) => {
        const selecionado = i === slideAtual;
        ind.classList.toggle("ativo", selecionado);
        ind.setAttribute("aria-selected", String(selecionado));
      });
    }
  
    if (btnAnterior && btnProximo && slides.length > 0) {
      btnAnterior.addEventListener("click", () => mostrarSlide(slideAtual - 1));
      btnProximo.addEventListener("click", () => mostrarSlide(slideAtual + 1));
  
      indicadores.forEach((ind) => {
        ind.addEventListener("click", () => {
          const alvo = Number(ind.getAttribute("data-indice"));
          mostrarSlide(alvo);
        });
      });
    }
  
    // ========================================================================
    // 4. CALCULADORA INTERATIVA DE ESTADIA (index.html)
    // ========================================================================
    const horasRange = document.getElementById("horas-range");
    const horasValor = document.getElementById("horas-valor");
    const tipoEstacao = document.getElementById("tipo-estacao");
    const valorTotal = document.getElementById("valor-total");
    const notaDesconto = document.getElementById("nota-desconto");
  
    function atualizarCalculadora() {
      if (!horasRange || !tipoEstacao || !valorTotal) return;
  
      const horas = Number(horasRange.value);
      const precoHora = Number(tipoEstacao.value);
      let total = horas * precoHora;
  
      horasValor.textContent = horas === 1 ? "1 hora" : `${horas} horas`;
  
      if (horas >= 4) {
        total = total * 0.85;
        notaDesconto.textContent = "✓ Desconto de 15% ativado nesta simulação!";
        notaDesconto.classList.add("desconto-ativo");
      } else {
        notaDesconto.textContent = "Dica: reserve 4h ou mais para ganhar 15% de desconto.";
        notaDesconto.classList.remove("desconto-ativo");
      }
  
      valorTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }
  
    if (horasRange && tipoEstacao) {
      horasRange.addEventListener("input", atualizarCalculadora);
      tipoEstacao.addEventListener("change", atualizarCalculadora);
      atualizarCalculadora();
    }
  
    // ========================================================================
    // 5. FILTRO DE CATEGORIAS DO CARDÁPIO (cardapio.html)
    // ========================================================================
    const botoesFiltro = document.querySelectorAll(".btn-filtro");
    const itensCardapio = document.querySelectorAll(".item-cardapio");
  
    if (botoesFiltro.length > 0 && itensCardapio.length > 0) {
      botoesFiltro.forEach((botao) => {
        botao.addEventListener("click", () => {
          botoesFiltro.forEach((b) => b.classList.remove("ativo"));
          botao.classList.add("ativo");
  
          const categoriaSelecionada = botao.getAttribute("data-filtro");
  
          itensCardapio.forEach((item) => {
            const categoriaItem = item.getAttribute("data-categoria");
            item.style.display =
              categoriaSelecionada === "todos" || categoriaSelecionada === categoriaItem
                ? "block"
                : "none";
          });
        });
      });
    }
  
    // ========================================================================
    // 6. PÁGINA DE LOGIN E CADASTRO (login.html)
    // ========================================================================
    const tabEntrar = document.getElementById("tab-entrar");
    const tabCadastrar = document.getElementById("tab-cadastrar");
    const grupoNomeCadastro = document.getElementById("grupo-nome-cadastro");
    const inputNomeCadastro = document.getElementById("login-nome");
    const btnSubmitLogin = document.getElementById("btn-submit-login");
    const btnMostrarSenha = document.getElementById("btn-mostrar-senha");
    const inputSenha = document.getElementById("login-senha");
    const formLogin = document.getElementById("form-login");
    const painelStatusLogin = document.getElementById("painel-status-login");
    let modoCadastro = false;
  
    if (tabEntrar && tabCadastrar && grupoNomeCadastro) {
      tabEntrar.addEventListener("click", () => {
        modoCadastro = false;
        tabEntrar.classList.add("ativo");
        tabEntrar.setAttribute("aria-selected", "true");
        tabCadastrar.classList.remove("ativo");
        tabCadastrar.setAttribute("aria-selected", "false");
        grupoNomeCadastro.hidden = true;
        inputNomeCadastro.required = false;
        btnSubmitLogin.textContent = "Entrar na Minha Conta";
      });
  
      tabCadastrar.addEventListener("click", () => {
        modoCadastro = true;
        tabCadastrar.classList.add("ativo");
        tabCadastrar.setAttribute("aria-selected", "true");
        tabEntrar.classList.remove("ativo");
        tabEntrar.setAttribute("aria-selected", "false");
        grupoNomeCadastro.hidden = false;
        inputNomeCadastro.required = true;
        btnSubmitLogin.textContent = "Criar Minha Conta";
      });
    }
  
    if (btnMostrarSenha && inputSenha) {
      btnMostrarSenha.addEventListener("click", () => {
        const estaOculta = inputSenha.type === "password";
        inputSenha.type = estaOculta ? "text" : "password";
        btnMostrarSenha.textContent = estaOculta ? "Ocultar" : "Mostrar";
      });
    }
  
    if (formLogin && painelStatusLogin) {
      formLogin.addEventListener("submit", (evento) => {
        evento.preventDefault();
        const email = document.getElementById("login-email").value.trim();
        const nome = modoCadastro
          ? inputNomeCadastro.value.trim()
          : email.split("@")[0];
  
        painelStatusLogin.innerHTML = `
          <p class="selo-status">✓ Sessão Autenticada</p>
          <h2>Bem-vindo(a), ${nome}!</h2>
          <p>Acesso liberado para <strong>${email}</strong>.</p>
          <ul class="lista-check" style="margin: 1rem 0 1.5rem;">
            <li><strong>Saldo atual:</strong> 6 horas disponíveis no pacote</li>
            <li><strong>Preferência salva:</strong> Cabine Individual Silenciosa</li>
            <li><strong>Status:</strong> Elegível para check-in rápido</li>
          </ul>
          <a href="reservas.html" class="btn btn-primario btn-largura-total">Agendar Nova Sessão</a>
        `;
      });
    }
  
    // ========================================================================
    // 7. CONFIRMAÇÃO DE RESERVA (reservas.html)
    // ========================================================================
    const formReserva = document.getElementById("form-reserva");
    const comprovanteBox = document.getElementById("comprovante-reserva");
  
    if (formReserva && comprovanteBox) {
      formReserva.addEventListener("submit", (evento) => {
        evento.preventDefault();
  
        const nome = document.getElementById("nome").value.trim();
        const data = document.getElementById("data").value;
        const horario = document.getElementById("horario").value;
        const selectEstacao = document.getElementById("estacao-reserva");
        const estacaoNome = selectEstacao.value;
        const precoHora = Number(selectEstacao.options[selectEstacao.selectedIndex].dataset.preco);
        const duracao = Number(document.getElementById("duracao-reserva").value);
  
        let total = precoHora * duracao;
        if (duracao >= 4) total *= 0.85;
  
        const codigo = "SG-" + Math.floor(1000 + Math.random() * 9000);
        const totalFormatado = total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
  
        comprovanteBox.innerHTML = `
          <p class="selo-status">✓ Reserva Confirmada</p>
          <h2>Código: ${codigo}</h2>
          <p>Olá, <strong>${nome}</strong>. Sua estação está reservada:</p>
          <ul class="lista-check" style="margin-top: 1rem;">
            <li><strong>Estação:</strong> ${estacaoNome}</li>
            <li><strong>Data e Entrada:</strong> ${data} às ${horario}</li>
            <li><strong>Duração:</strong> ${duracao}h (café e lanches inclusos)</li>
            <li><strong>Valor no check-in:</strong> ${totalFormatado}</li>
          </ul>
        `;
      });
    }
  });