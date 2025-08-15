
  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); // Impede o prompt automático
    deferredPrompt = e;

    // Exibe o banner
    const banner = document.getElementById('install-banner');
    banner.style.display = 'block';

    // Botão "Instalar"
    document.getElementById('btn-install-pwa').addEventListener('click', () => {
      banner.style.display = 'none';
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuário aceitou instalar');
        } else {
          console.log('Usuário recusou instalar');
        }
        deferredPrompt = null;
      });
    });

    // Botão "✕" apenas esconde o banner temporariamente
    document.getElementById('btn-close-banner').addEventListener('click', () => {
      banner.style.display = 'none';
    });
  });

  //--------------------------------------------------------------------

  function irParaCatalogo() {
  const secao = document.getElementById("catalogo");
  if (secao) {
    secao.scrollIntoView({ behavior: "smooth" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}


  //--------------------------------------------------------------------

  const campoBusca = document.getElementById("campo-busca");
const botaoLimpar = document.getElementById("limpar-busca");
const atalhosCategoriasDiv = document.getElementById("atalhos-categorias");

// Mostrar ou esconder o botão "❌" conforme o conteúdo do input
campoBusca.addEventListener("input", () => {
  const termo = campoBusca.value.trim().toLowerCase();
  botaoLimpar.style.display = termo ? "inline-block" : "none";

  const categorias = document.querySelectorAll(".categoria-container");
  let houveFiltro = false;

  categorias.forEach(cat => {
    const produtos = cat.querySelectorAll(".produto");
    let algumVisivel = false;

    produtos.forEach(prod => {
      const nome = prod.querySelector(".card-title").textContent.toLowerCase();
      const match = nome.includes(termo);
      prod.style.display = match ? "block" : "none";
      if (match) algumVisivel = true;
    });

    cat.style.display = algumVisivel ? "block" : "none";
    if (algumVisivel) houveFiltro = true;
  });

  // Se houver texto na busca, adiciona a classe oculto
  atalhosCategoriasDiv.classList.toggle("oculto", termo !== "");
});

// Ação de limpar busca
botaoLimpar.addEventListener("click", () => {
  campoBusca.value = "";
  botaoLimpar.style.display = "none";
  restaurarCategorias();

  // Mostra novamente os atalhos
  atalhosCategoriasDiv.classList.remove("oculto");
});

// Restaura todas as categorias e produtos
function restaurarCategorias() {
  const categorias = document.querySelectorAll(".categoria-container");

  categorias.forEach(cat => {
    cat.style.display = "block";
    const divCategoria = cat.querySelector(".produtos-categoria");
    if (divCategoria) divCategoria.style.display = "none";

    const produtos = cat.querySelectorAll(".produto");
    produtos.forEach(prod => prod.style.display = "block");
  });
}


  //--------------------------------------------------------------------


  function abrirMenuLateral() {
    document.getElementById('menu-lateral').classList.add('aberto');
    document.getElementById('overlay-menu').style.display = 'block';
  }

  function fecharMenuLateral() {
    document.getElementById('menu-lateral').classList.remove('aberto');
    document.getElementById('overlay-menu').style.display = 'none';
  }

    //--------------------------------------------------------------------

    let toqueInicialX_menu = 0;

  function iniciarSwipeMenu(event) {
    toqueInicialX_menu = event.touches[0].clientX;
  }

  function encerrarSwipeMenu(event) {
    const toqueFinalX = event.changedTouches[0].clientX;
    const diferencaX = toqueFinalX - toqueInicialX_menu;

    if (diferencaX > 70) {
      fecharMenuLateral(); // Função que você já deve ter para esconder o menu
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("menu-lateral");
    if (menu) {
      menu.addEventListener("touchstart", iniciarSwipeMenu);
      menu.addEventListener("touchend", encerrarSwipeMenu);
    }
  });

      //--------------------------------------------------------------------

      document.addEventListener("DOMContentLoaded", function () {
  const campoBusca = document.getElementById("campo-busca");
  const areaResultado = document.getElementById("area-resultado");
  const resultadoBusca = document.getElementById("resultado-busca");
  const voltarCatalogoBtn = document.getElementById("voltar-catalogo");

  campoBusca.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const termo = this.value.toLowerCase().trim();
      const categorias = document.querySelectorAll(".categoria-container");

      resultadoBusca.innerHTML = "";

      if (termo === "") {
        categorias.forEach(cat => cat.style.display = "block");
        areaResultado.style.display = "none";
      } else {
        categorias.forEach(cat => {
          const produtos = cat.querySelectorAll(".produto");
          cat.style.display = "none";

          produtos.forEach(prod => {
            const titulo = prod.querySelector(".card-title").textContent.toLowerCase();
            if (titulo.includes(termo)) {
              const nome = prod.querySelector(".card-title").textContent.trim();
              const precoTexto = prod.querySelector(".card-text").textContent.replace("R$", "").trim();
              const preco = parseFloat(precoTexto.replace(",", "."));
              const precoFormatado = "R$ " + preco.toFixed(2).replace(".", ",");
              const status = prod.querySelector(".status-text")?.style.display === "block" ? "esgotado" : "disponivel";
              const img = prod.querySelector("img")?.src || "";

              // Criação do card com template literals
              const card = document.createElement("div");
              card.className = "col produto mb-4";

              card.innerHTML = `
                <div class="card">
                  <img src="${img}" class="card-img-top cerv-tamanho" alt="${nome}">
                  <div class="card-body">
                    <h5 class="card-title">${nome}</h5>
                    <p class="card-text">${precoFormatado}</p>
                    <p class="status-text" style="display: ${status === 'esgotado' ? 'block' : 'none'}; color: red;">(esgotado)</p>
                    <div class="input-group mb-2">
                      <button class="btn btn-outline-secondary btn-menor">-</button>
                      <input type="number" class="form-control text-center" value="0" min="0" />
                      <button class="btn btn-outline-secondary btn-maior">+</button>
                    </div>
                    <button class="btn ${status === 'esgotado' ? 'btn-secondary' : 'btn-adicionar-carrinho'} w-100 btn-comprar" ${status === 'esgotado' ? 'disabled' : ''}>
                      ${status === 'esgotado' ? 'Esgotado' : 'Adicionar ao Carrinho'}
                    </button>
                  </div>
                </div>
              `;

              resultadoBusca.appendChild(card);

              // Ativa botões do produto recém criado
              const input = card.querySelector("input");
              const btnMenos = card.querySelector(".btn-menor");
              const btnMais = card.querySelector(".btn-maior");
              const btnComprar = card.querySelector(".btn-comprar");

              btnMenos?.addEventListener("click", () => {
                let valor = parseInt(input.value, 10);
                if (valor > 0) input.value = valor - 1;
              });

              btnMais?.addEventListener("click", () => {
                let valor = parseInt(input.value, 10);
                input.value = valor + 1;
              });

              btnComprar?.addEventListener("click", () => {
                const quantidade = parseInt(input.value, 10);
                if (quantidade > 0) {
                  adicionarAoCarrinho(nome, quantidade, preco, img);
                  atualizarCarrinho();
                  input.value = 0;
                }
              });
            }
          });
        });

        areaResultado.style.display = "block";
      }

      this.blur(); // Fecha teclado virtual
    }
  });

  voltarCatalogoBtn.addEventListener("click", function () {
    const categorias = document.querySelectorAll(".categoria-container");

    categorias.forEach(cat => {
      cat.style.display = "block";
      const divCategoria = cat.querySelector(".produtos-categoria");
      if (divCategoria) divCategoria.style.display = "none";
    });

    areaResultado.style.display = "none";
    campoBusca.value = "";
    atalhosCategoriasDiv.classList.remove("oculto");

  });
});

      //--------------------------------------------------------------------

      function atualizarTotalCarrinho() {
  const itens = document.querySelectorAll("#itens-carrinho .item");
  let total = 0;

  itens.forEach(item => {
    const texto = item.textContent;
    const regex = /(\d+)\s+×\s+R\$ ([\d.,]+)/;
    const match = texto.match(regex);

    if (match) {
      const quantidade = parseInt(match[1]);
      const precoUnitario = parseFloat(match[2].replace(",", "."));
      total += quantidade * precoUnitario;
    }
  });

  const totalFormatado = `R$ ${total.toFixed(2).replace(".", ",")}`;
  document.getElementById("total-carrinho").textContent = totalFormatado;
  const totalMobile = document.getElementById("total-carrinho-mobile");
  if (totalMobile) totalMobile.textContent = totalFormatado;
}

      //--------------------------------------------------------------------

      const sheetIDnovo = '1LzPCbEkzyfXOel2UEYDlcyIBFRlgdep9G3ENvui8cqU';
const apiKeynovo = 'AIzaSyA-OqANUQu2qfRGsyFlB60oZ7XdcbaaMpI';
const rangenovo = "notificacoes!A2:C"; // Colunas: Título, Mensagem, Data

// Usa data local no formato ISO: "YYYY-MM-DD"
const hoje = new Date().toLocaleDateString('sv-SE');

fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetIDnovo}/values/${rangenovo}?key=${apiKeynovo}`)
  .then(response => response.json())
  .then(data => {
    const notificacoes = data.values || [];
    const lista = document.getElementById("lista-notificacoes");
    const contador = document.getElementById("contador-notificacoes");
    let totalHoje = 0;

    notificacoes.forEach(([titulo, mensagem, dataHora]) => {
      if (!dataHora) return;

      // Remove horas caso haja, e compara com data local
      const data = dataHora.slice(0, 10);
      if (data === hoje) {
        totalHoje++;
        const div = document.createElement("div");
        div.innerHTML = `
          <strong>${titulo}</strong><br>
          <small>${mensagem}</small>
          <hr>
        `;
        lista.appendChild(div);
      }
    });

    if (totalHoje > 0) {
      contador.textContent = totalHoje;
      contador.style.display = "block";
    } else {
      contador.style.display = "none";
    }
  })
  .catch(err => {
    console.error("Erro ao carregar notificações:", err);
  });

function abrirNotificacoes() {
  document.getElementById("painel-notificacoes").style.right = "0";
  document.getElementById("overlay-notificacao").style.display = "block";
}

function fecharNotificacoes() {
  document.getElementById("painel-notificacoes").style.right = "-100%";
  document.getElementById("overlay-notificacao").style.display = "none";
}

      //--------------------------------------------------------------------

      const sheetID3 = "1LzPCbEkzyfXOel2UEYDlcyIBFRlgdep9G3ENvui8cqU";
const apiKey3 = "AIzaSyA-OqANUQu2qfRGsyFlB60oZ7XdcbaaMpI";
const range3 = "stories!A2:Z";

let stories = [];
let indiceAtual = 0;
let imagensAtuais = [];
let intervaloAuto;
let barraProgresso;

fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetID3}/values/${range3}?key=${apiKey3}`)
  .then(r => r.json())
  .then(data => {
    const linhas = data.values || [];
    const container = document.getElementById("stories-container");

    linhas.forEach((linha, index) => {
      const nome = linha[0];
      const imagens = linha.slice(1).filter(Boolean);
      if (!nome || imagens.length === 0) return;

      stories.push({ nome, imagens });

      const wrapper = document.createElement("div");
      wrapper.style.display = "flex";
      wrapper.style.flexDirection = "column";
      wrapper.style.alignItems = "center";
      wrapper.style.flex = "0 0 auto";
      wrapper.style.width = "80px";
      wrapper.style.cursor = "pointer";

      const circle = document.createElement("div");
      circle.style.width = "70px";
      circle.style.height = "70px";
      circle.style.borderRadius = "50%";
      circle.style.border = "3px solid #ffb700";
      circle.style.backgroundImage = `url(${imagens[0]})`;
      circle.style.backgroundSize = "cover";
      circle.style.backgroundPosition = "center";

      const label = document.createElement("span");
      label.textContent = nome;
      label.style.fontSize = "12px";
      label.style.marginTop = "5px";
      label.style.textAlign = "center";
      label.style.color = "#333";

      wrapper.appendChild(circle);
      wrapper.appendChild(label);
      wrapper.onclick = () => abrirModal(index);
      container.appendChild(wrapper);
    });
  })
  .catch(err => console.error("Erro ao carregar stories:", err));

// Lógica do modal
function abrirModal(indice) {
  imagensAtuais = stories[indice].imagens;
  indiceAtual = 0;
  document.getElementById("story-modal").style.display = "flex";
  barraProgresso = document.getElementById("progress-bar");
  exibirImagem();
  iniciarAutoAvanco();
}

function exibirImagem() {
  const img = document.getElementById("story-image");
  img.src = imagensAtuais[indiceAtual];
  barraProgresso.style.transition = "none";
  barraProgresso.style.width = "0%";
  // Começa a animar depois de um pequeno delay
  setTimeout(() => {
    barraProgresso.style.transition = "width 10s linear";
    barraProgresso.style.width = "100%";
  }, 50);
}

function mudarImagem(direcao) {
  indiceAtual += direcao;
  if (indiceAtual < 0) indiceAtual = imagensAtuais.length - 1;
  if (indiceAtual >= imagensAtuais.length) indiceAtual = 0;
  exibirImagem();
  reiniciarAutoAvanco();
}

function fecharModal() {
  document.getElementById("story-modal").style.display = "none";
  pararAutoAvanco();
}

function iniciarAutoAvanco() {
  pararAutoAvanco(); // Garante que não há duplicatas
  intervaloAuto = setInterval(() => {
    mudarImagem(1);
  }, 10000);
}

function reiniciarAutoAvanco() {
  iniciarAutoAvanco();
}

function pararAutoAvanco() {
  clearInterval(intervaloAuto);
}

      //--------------------------------------------------------------------

       const atalhos = document.querySelectorAll("#atalhos-categorias .btn-atalho");
const categorias = document.querySelectorAll(".categoria-container");
const btnVoltar = document.getElementById("btn-voltar");
const btnVoltarContainer = document.getElementById("btn-voltar-container");

atalhos.forEach(botao => {
  botao.addEventListener("click", () => {
    const cat = botao.getAttribute("data-categoria").toLowerCase();
    categorias.forEach(catDiv => {
      const categoriaNome = (catDiv.getAttribute("data-categoria") || "").toLowerCase();
      if(categoriaNome === cat) {
        catDiv.style.display = "block";
      } else {
        catDiv.style.display = "none";
      }
    });
    btnVoltarContainer.style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

btnVoltar.addEventListener("click", () => {
  categorias.forEach(catDiv => {
    catDiv.style.display = "block";
  });
  btnVoltarContainer.style.display = "none";
});

      //--------------------------------------------------------------------

      const atalhos1 = document.querySelectorAll("#atalhos-categorias .btn-atalho");
  const categorias1 = document.querySelectorAll(".categoria-container");
  const btnVoltar1 = document.getElementById("btn-voltar");
  const btnVoltarContainer1 = document.getElementById("btn-voltar-container");

  const carrossel1 = document.getElementById("carouselExample");
  const stories1 = document.getElementById("stories-container");
  const atalhosContainer1 = document.getElementById("atalhos-categorias");
  const campoBusca1 = document.getElementById("campo-busca");

  atalhos1.forEach(botao => {
    botao.addEventListener("click", () => {
      const cat = botao.getAttribute("data-categoria").toLowerCase();

      // Filtrar categorias
      categorias1.forEach(catDiv => {
        const categoriaNome = (catDiv.getAttribute("data-categoria") || "").toLowerCase();
        catDiv.style.display = categoriaNome === cat ? "block" : "none";
      });

      // Ocultar elementos extras usando classe
      if(carrossel1) carrossel1.classList.add("oculto");
      if(stories1) stories1.classList.add("oculto");
      if(atalhosContainer1) atalhosContainer1.classList.add("oculto");
      if(campoBusca1) campoBusca1.classList.add("oculto");

      // Mostrar botão voltar
      if(btnVoltarContainer1) btnVoltarContainer1.classList.remove("oculto");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  if(btnVoltar1){
    btnVoltar1.addEventListener("click", () => {
      categorias1.forEach(catDiv => {
        catDiv.style.display = "block";
      });

      // Mostrar elementos extras removendo classe
      if(carrossel1) carrossel1.classList.remove("oculto");
      if(stories1) stories1.classList.remove("oculto");
      if(atalhosContainer1) atalhosContainer1.classList.remove("oculto");
      if(campoBusca1) campoBusca1.classList.remove("oculto");

      // Esconder botão voltar
      if(btnVoltarContainer1) btnVoltarContainer1.classList.add("oculto");
    });
  }

        //--------------------------------------------------------------------

        function atualizarMensagemCarrinhoVazio() {
  const container = document.getElementById("itens-carrinho");
  const mensagem = document.getElementById("mensagem-vazio");

  const temItens = container.children.length > 0;

  if (!temItens) {
    mensagem.style.display = "block";
  } else {
    mensagem.style.display = "none";
  }
}

        //--------------------------------------------------------------------

        const sheetID = '1LzPCbEkzyfXOel2UEYDlcyIBFRlgdep9G3ENvui8cqU';
  const apiKey = 'AIzaSyA-OqANUQu2qfRGsyFlB60oZ7XdcbaaMpI'; // Substitua pela sua chave
  const range = 'Página1!A2:C235';

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const linhas = data.values;

      document.querySelectorAll('.card').forEach(card => {
        const nome = card.querySelector('.card-title')?.textContent?.trim().toLowerCase();
        const precoEl = card.querySelector('.card-text');
        const statusEl = card.querySelector('.status-text');
        const botao = card.querySelector('.btn-comprar');

        if (!nome || !precoEl || !statusEl || !botao) return;

        let encontrado = false;

        for (let linha of linhas) {
          const [produto, preco, status] = linha;
          if (produto.trim().toLowerCase() === nome) {
            precoEl.textContent = preco;
            // ...dentro do seu fetch...
if (status && status.trim().toLowerCase() === 'esgotado') {
  botao.disabled = true;
  botao.classList.remove('btn-adicionar-carrinho');
  botao.classList.add('btn-secondary');
  botao.textContent = 'Esgotado';
} else {
  botao.disabled = false;
  botao.classList.remove('btn-secondary');
  botao.classList.add('btn-adicionar-carrinho');
  botao.textContent = 'Adicionar ao Carrinho';
}
            encontrado = true;
            break;
          }
        }

        if (!encontrado) {
          precoEl.textContent = 'Preço indisponível';
          statusEl.style.display = 'none';
          botao.disabled = true;
          botao.classList.remove('btn-adicionar-carrinho');
          botao.classList.add('btn-secondary');
          botao.textContent = 'Indisponível';
        }
      });
    })
    .catch(error => {
      console.error('Erro ao buscar dados da planilha:', error);
      document.querySelectorAll('.card-text').forEach(el => {
        el.textContent = 'Erro ao carregar';
      });
    });

            //--------------------------------------------------------------------

            const carrinho = [];
    let mostrarTodos = false;

    function alterarQuantidade(button, delta) {
      const input = button.parentElement.querySelector("input");
      let value = parseInt(input.value, 10);
      value = isNaN(value) ? 0 : value + delta;
      if (value < 0) value = 0;
      input.value = value;
    }

    document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".btn-adicionar-carrinho").forEach(btn => {
    btn.addEventListener("click", function () {
      const card = btn.closest(".card-body");
      const nome = card.querySelector(".card-title").innerText;
      const preco = parseFloat(card.querySelector(".card-text").innerText.replace("R$", "").replace(",", "."));
      const quantidade = parseInt(card.querySelector("input").value, 10);
      const imagem = card.parentElement.querySelector("img").src;
      if (quantidade > 0) {
        adicionarAoCarrinho(nome, quantidade, preco, imagem);
        card.querySelector("input").value = 0;
      }
    });
  });
});

    function adicionarAoCarrinho(nome, quantidade, preco, imagem) {
  const existente = carrinho.find(item => item.nome === nome);
  if (existente) {
    existente.quantidade += quantidade;
  } else {
    carrinho.push({ nome, quantidade, preco, imagem }); // <-- Adicione o campo imagem aqui!
  }
  
  atualizarCarrinho();
  atualizarMensagemCarrinhoVazio();
}

    function removerItem(index) {
      if (confirm("Remover este item do carrinho?")) {
        carrinho.splice(index, 1);
        
        atualizarCarrinho();
        atualizarMensagemCarrinhoVazio();
      }
    }

    function atualizarCarrinho() {
  const container = document.getElementById("itens-carrinho");
  container.innerHTML = "";
  let total = 0;
  let totalItens = 0;

  carrinho.forEach((item, index) => {
    const subtotal = item.quantidade * item.preco;
    total += subtotal;
    totalItens += item.quantidade;

    // ...existing code...
container.innerHTML += `
  <div class="item d-flex justify-content-between align-items-center">
    <div class="me-2" style="width:48px; min-width:48px; height:48px; display:flex; align-items:center; justify-content:center;">
      <img src="${item.imagem}" alt="${item.nome}" style="height:40px; width:40px; object-fit:contain;">
    </div>
    <div class="flex-grow-1">
      <div><strong>${item.nome}</strong></div>
      <div>${item.quantidade} × R$ ${item.preco.toFixed(2).replace(".", ",")} = 
        <strong>R$ ${subtotal.toFixed(2).replace(".", ",")}</strong>
      </div>
    </div>
    <button class="btn btn-sm  ms-2" onclick="removerItem(${index})">
  <img src="icones/lixo.png" alt="Remover" style="height:20px; width:20px;">
</button>
  </div>
`;
// ...existing code...
  });

  const totalFormatado = `R$${total.toFixed(2).replace(".", ",")}`;
  document.getElementById("total-geral").innerText = totalFormatado;
  document.getElementById("total-carrinho").innerText = totalFormatado;

  // Atualiza o da barra mobile também
  const totalCarrinhoMobile = document.getElementById("total-carrinho-mobile");
  if (totalCarrinhoMobile) {
    totalCarrinhoMobile.innerText = totalFormatado;
  }
}


    function expandirCarrinho() {
  const carrinho = document.getElementById("carrinho");
  const overlay = document.getElementById("carrinho-overlay");

  carrinho.classList.add("aberto");
  overlay.classList.add("carrinho-ativo");

  document.getElementById("botao-expandir").classList.add("d-none");
}

function minimizarCarrinho() {
  const carrinho = document.getElementById("carrinho");
  const overlay = document.getElementById("carrinho-overlay");

  carrinho.classList.remove("aberto");
  overlay.classList.remove("carrinho-ativo");

  document.getElementById("botao-expandir").classList.remove("d-none");
}

let toqueInicialX = 0;

function iniciarToque(event) {
  toqueInicialX = event.touches[0].clientX;
}

function encerrarToque(event) {
  const toqueFinalX = event.changedTouches[0].clientX;
  const diferencaX = toqueFinalX - toqueInicialX;

  if (diferencaX > 70) {
    minimizarCarrinho();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const carrinho = document.getElementById("carrinho");
  carrinho.addEventListener("touchstart", iniciarToque);
  carrinho.addEventListener("touchend", encerrarToque);
});


    function enviarPedido() {
  if (carrinho.length === 0) {
    alert("O carrinho está vazio!");
    return;
  }

  // Coleta forma de pagamento, local e observações
  const formaPagamento = document.querySelector('input[name="pagamento"]:checked')?.value || "";
  const localEntrega = document.querySelector('input[name="entrega"]:checked')?.value || "";
  const observacoes = document.getElementById("observacoes")?.value || "";

  let mensagem = "*88ML DELIVERY*\n";
  mensagem += "‐----------------------------------------------------\n";
  mensagem += "*Pedido:*\n";

  carrinho.forEach(item => {
    const subtotal = item.quantidade * item.preco;
    mensagem += `* ${item.nome}\n${item.quantidade} × R$ ${item.preco.toFixed(2).replace(".", ",")} = R$ ${subtotal.toFixed(2).replace(".", ",")}\n\n`;
  });

  const total = carrinho.reduce((s, i) => s + i.quantidade * i.preco, 0);
  mensagem += `*Total:* R$ ${total.toFixed(2).replace(".", ",")}\n`;
  mensagem += "‐----------------------------------------------------\n";
  mensagem += `*Forma de pagamento:* ${formaPagamento}\n`;
  mensagem += "‐----------------------------------------------------\n";
  mensagem += `*Local de entrega:* ${localEntrega}\n`;

  if (observacoes.trim() !== "") {
    mensagem += "‐----------------------------------------------------\n";
    mensagem += `*Observações:* ${observacoes.trim()}\n`;
  }

  mensagem += "‐----------------------------------------------------\n";
  mensagem += "Pedido feito pelo\n*88ml Delivery App*";

  const texto = encodeURIComponent(mensagem);
  const telefone = "5535999658021";
  const link = `https://wa.me/${telefone}?text=${texto}`;

  window.open(link, "_blank");
}


    function alternarProdutos() {
  const produtos = document.querySelectorAll(".produto-longneck");
  const btn = document.getElementById("btnVerMais");
  mostrarTodos = !mostrarTodos;

  produtos.forEach((produto, index) => {
    if (mostrarTodos || index < 5) {
      produto.classList.add("visivel");
    } else {
      produto.classList.remove("visivel");
    }
  });

  btn.innerText = mostrarTodos ? "Ver menos produtos" : "Ver mais produtos";
}