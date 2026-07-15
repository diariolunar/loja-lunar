import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD6FJS3RdyHFjumCdPUVyslx8sl9gcfnUU",
  authDomain: "loja-lunar-catalogo.firebaseapp.com",
  projectId: "loja-lunar-catalogo",
  storageBucket: "loja-lunar-catalogo.firebasestorage.app",
  messagingSenderId: "500388137265",
  appId: "1:500388137265:web:7e78575c1ed008e6964810",
};

const ADMIN_EMAIL = "mayke.arrais@gmail.com";
const LINK_GRUPO_WHATSAPP = "https://chat.whatsapp.com/LvYSa0171jXEPFCFXAaX1w";
const CHAVE_CARRINHO = "loja-lunar-carrinho-v1";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const $ = (seletor) => document.querySelector(seletor);

const estado = {
  servicos: [],
  categoria: "todos",
  servicoAberto: null,
  usuarioAdmin: null,
  carrinho: carregarCarrinho(),
};

const elementos = {
  catalogo: $("#catalogo"),
  estadoCatalogo: $("#estadoCatalogo"),
  contadorCarrinho: $("#contadorCarrinho"),
  modalProduto: $("#modalProduto"),
  produtoIcone: $("#produtoIcone"),
  produtoTitulo: $("#produtoTitulo"),
  produtoCategoria: $("#produtoCategoria"),
  produtoPontos: $("#produtoPontos"),
  produtoValor: $("#produtoValor"),
  produtoDescricao: $("#produtoDescricao"),
  produtoInclusos: $("#produtoInclusos"),
  produtoExtra: $("#produtoExtra"),
  produtoQuantidade: $("#produtoQuantidade"),
  produtoSubtotal: $("#produtoSubtotal"),
  adicionarArea: $("#adicionarArea"),
  avisoEsgotado: $("#avisoEsgotado"),
  carrinho: $("#carrinho"),
  overlayCarrinho: $("#overlayCarrinho"),
  carrinhoItens: $("#carrinhoItens"),
  carrinhoVazio: $("#carrinhoVazio"),
  carrinhoResumo: $("#carrinhoResumo"),
  totalPontos: $("#totalPontos"),
  totalDinheiro: $("#totalDinheiro"),
  avisoTotal: $("#avisoTotal"),
  modalLogin: $("#modalLogin"),
  formLogin: $("#formLogin"),
  loginEmail: $("#loginEmail"),
  loginSenha: $("#loginSenha"),
  mensagemLogin: $("#mensagemLogin"),
  entrarAdmin: $("#entrarAdmin"),
  modalAdmin: $("#modalAdmin"),
  adminServico: $("#adminServico"),
  formAdmin: $("#formAdmin"),
  mensagemAdmin: $("#mensagemAdmin"),
  salvarServico: $("#salvarServico"),
  toast: $("#toast"),
};

function carregarCarrinho() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE_CARRINHO));
    return Array.isArray(dados)
      ? dados.filter((item) => typeof item.id === "string" && Number(item.quantidade) > 0)
      : [];
  } catch {
    return [];
  }
}

function persistirCarrinho() {
  localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(estado.carrinho));
  atualizarContador();
}

function atualizarContador() {
  const quantidade = estado.carrinho.reduce((total, item) => total + item.quantidade, 0);
  elementos.contadorCarrinho.textContent = String(quantidade);
  $("#abrirCarrinho").setAttribute("aria-label", `Abrir carrinho com ${quantidade} item(ns)`);
}

function abrirModal(modal) {
  modal.classList.add("ativo");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-aberto");
  modal.querySelector("button, input, select, textarea")?.focus();
}

function fecharModal(modal) {
  modal.classList.remove("ativo");
  modal.setAttribute("aria-hidden", "true");
  if (!document.querySelector(".modal.ativo") && !elementos.carrinho.classList.contains("ativo")) {
    document.body.classList.remove("modal-aberto");
  }
}

function mostrarToast(mensagem) {
  elementos.toast.textContent = mensagem;
  elementos.toast.classList.add("ativo");
  window.clearTimeout(mostrarToast.timer);
  mostrarToast.timer = window.setTimeout(() => elementos.toast.classList.remove("ativo"), 2800);
}

function nomeCompleto(servico) {
  return servico.subtitulo ? `${servico.titulo} — ${servico.subtitulo}` : servico.titulo;
}

function renderizarCatalogo() {
  elementos.catalogo.replaceChildren();
  const lista = estado.categoria === "todos"
    ? estado.servicos
    : estado.servicos.filter((servico) => servico.categoria === estado.categoria);

  elementos.estadoCatalogo.hidden = lista.length > 0;
  if (!lista.length) elementos.estadoCatalogo.textContent = "Nenhum serviço encontrado nesta categoria.";

  lista.forEach((servico) => {
    const card = document.createElement("article");
    card.className = `card${servico.esgotado ? " esgotado" : ""}`;
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-haspopup", "dialog");
    card.setAttribute("aria-label", `Ver detalhes de ${nomeCompleto(servico)}${servico.esgotado ? ", esgotado" : ""}`);

    const icone = document.createElement("div");
    icone.className = "icone";
    icone.textContent = servico.icone;
    const titulo = document.createElement("h2");
    titulo.textContent = servico.titulo;
    card.append(icone, titulo);

    if (servico.subtitulo) {
      const subtitulo = document.createElement("p");
      subtitulo.className = "subtitulo-card";
      subtitulo.textContent = servico.subtitulo;
      card.appendChild(subtitulo);
    }

    const preco = document.createElement("div");
    preco.className = "preco";
    preco.textContent = `${servico.pontos} / ${servico.valor}`;
    card.appendChild(preco);

    if (servico.esgotado) {
      const selo = document.createElement("span");
      selo.className = "selo-esgotado";
      selo.textContent = "Esgotado";
      card.appendChild(selo);
    }

    const abrir = () => abrirProduto(servico);
    card.addEventListener("click", abrir);
    card.addEventListener("keydown", (evento) => {
      if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault();
        abrir();
      }
    });
    elementos.catalogo.appendChild(card);
  });
}

function abrirProduto(servico) {
  estado.servicoAberto = servico;
  elementos.produtoIcone.textContent = servico.icone;
  elementos.produtoTitulo.textContent = nomeCompleto(servico);
  elementos.produtoCategoria.textContent = servico.categoriaNome;
  elementos.produtoPontos.textContent = `✦ ${servico.pontos}`;
  elementos.produtoValor.textContent = servico.valor;
  elementos.produtoDescricao.replaceChildren();

  const destaque = document.createElement("strong");
  destaque.textContent = servico.descricao;
  elementos.produtoDescricao.append(destaque, document.createElement("br"), document.createElement("br"), document.createTextNode(servico.detalhes));

  elementos.produtoInclusos.replaceChildren();
  servico.inclusos.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    elementos.produtoInclusos.appendChild(li);
  });
  elementos.produtoExtra.textContent = `✦ ${servico.extra}`;
  elementos.produtoQuantidade.value = "1";
  elementos.adicionarArea.hidden = Boolean(servico.esgotado);
  elementos.avisoEsgotado.hidden = !servico.esgotado;
  atualizarSubtotalProduto();
  abrirModal(elementos.modalProduto);
}

function extrairNumero(texto, tipo) {
  if (!texto || /combinar|tratar/i.test(texto)) return null;
  const correspondencia = texto.match(tipo === "dinheiro" ? /(?:R\$\s*)?(\d+(?:\.\d{3})*(?:,\d{1,2})?)/ : /(\d+(?:\.\d{3})*)/);
  if (!correspondencia) return null;
  return Number(correspondencia[1].replace(/\./g, "").replace(",", "."));
}

function formatarDinheiro(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatarPontos(valor) {
  return `${Math.round(valor).toLocaleString("pt-BR")} P`;
}

function calcularValores(servico, quantidade) {
  return {
    dinheiro: extrairNumero(servico.valor, "dinheiro") === null ? null : extrairNumero(servico.valor, "dinheiro") * quantidade,
    pontos: extrairNumero(servico.pontos, "pontos") === null ? null : extrairNumero(servico.pontos, "pontos") * quantidade,
    aproximado: /partir/i.test(`${servico.valor} ${servico.pontos}`),
  };
}

function textoValores(valores, servico, quantidade) {
  const pontos = valores.pontos === null ? servico.pontos : formatarPontos(valores.pontos);
  const dinheiro = valores.dinheiro === null ? servico.valor : formatarDinheiro(valores.dinheiro);
  return `${valores.aproximado ? "A partir de " : ""}${pontos} / ${dinheiro}${quantidade > 1 ? ` para ${quantidade} unidades` : ""}`;
}

function quantidadeProduto() {
  const quantidade = Math.min(99, Math.max(1, Number.parseInt(elementos.produtoQuantidade.value, 10) || 1));
  elementos.produtoQuantidade.value = String(quantidade);
  return quantidade;
}

function atualizarSubtotalProduto() {
  if (!estado.servicoAberto) return;
  const quantidade = quantidadeProduto();
  elementos.produtoSubtotal.textContent = `Subtotal: ${textoValores(calcularValores(estado.servicoAberto, quantidade), estado.servicoAberto, quantidade)}`;
}

function adicionarAoCarrinho() {
  const servico = estado.servicoAberto;
  if (!servico || servico.esgotado) return;
  const quantidade = quantidadeProduto();
  const existente = estado.carrinho.find((item) => item.id === servico.id);
  if (existente) existente.quantidade = Math.min(99, existente.quantidade + quantidade);
  else estado.carrinho.push({ id: servico.id, quantidade });
  persistirCarrinho();
  fecharModal(elementos.modalProduto);
  mostrarToast(`${nomeCompleto(servico)} foi adicionado ao carrinho.`);
}

function servicoDoCarrinho(id) {
  return estado.servicos.find((servico) => servico.id === id);
}

function alterarQuantidadeCarrinho(id, diferenca) {
  const item = estado.carrinho.find((carrinhoItem) => carrinhoItem.id === id);
  if (!item) return;
  item.quantidade = Math.min(99, item.quantidade + diferenca);
  if (item.quantidade <= 0) estado.carrinho = estado.carrinho.filter((carrinhoItem) => carrinhoItem.id !== id);
  persistirCarrinho();
  renderizarCarrinho();
}

function renderizarCarrinho() {
  estado.carrinho = estado.carrinho.filter((item) => {
    const servico = servicoDoCarrinho(item.id);
    return servico && !servico.esgotado;
  });
  persistirCarrinho();
  elementos.carrinhoItens.replaceChildren();
  elementos.carrinhoVazio.hidden = estado.carrinho.length > 0;
  elementos.carrinhoResumo.hidden = estado.carrinho.length === 0;

  let totalDinheiro = 0;
  let totalPontos = 0;
  let possuiDinheiroVariavel = false;
  let possuiPontosVariaveis = false;
  let possuiValorInicial = false;

  estado.carrinho.forEach((item) => {
    const servico = servicoDoCarrinho(item.id);
    const valores = calcularValores(servico, item.quantidade);
    if (valores.dinheiro === null) possuiDinheiroVariavel = true;
    else totalDinheiro += valores.dinheiro;
    if (valores.pontos === null) possuiPontosVariaveis = true;
    else totalPontos += valores.pontos;
    possuiValorInicial ||= valores.aproximado;

    const artigo = document.createElement("article");
    artigo.className = "item-carrinho";
    const topo = document.createElement("div");
    topo.className = "item-carrinho-topo";
    const nome = document.createElement("strong");
    nome.textContent = `${servico.icone} ${nomeCompleto(servico)}`;
    const remover = document.createElement("button");
    remover.type = "button";
    remover.className = "remover-item";
    remover.textContent = "Remover";
    remover.addEventListener("click", () => alterarQuantidadeCarrinho(item.id, -item.quantidade));
    topo.append(nome, remover);

    const rodape = document.createElement("div");
    rodape.className = "item-carrinho-rodape";
    const quantidade = document.createElement("div");
    quantidade.className = "seletor-quantidade pequeno";
    const diminuir = document.createElement("button");
    diminuir.type = "button";
    diminuir.textContent = "−";
    diminuir.setAttribute("aria-label", `Diminuir ${nomeCompleto(servico)}`);
    diminuir.addEventListener("click", () => alterarQuantidadeCarrinho(item.id, -1));
    const numero = document.createElement("span");
    numero.textContent = String(item.quantidade);
    const aumentar = document.createElement("button");
    aumentar.type = "button";
    aumentar.textContent = "+";
    aumentar.setAttribute("aria-label", `Aumentar ${nomeCompleto(servico)}`);
    aumentar.addEventListener("click", () => alterarQuantidadeCarrinho(item.id, 1));
    quantidade.append(diminuir, numero, aumentar);
    const subtotal = document.createElement("span");
    subtotal.className = "item-subtotal";
    subtotal.textContent = textoValores(valores, servico, item.quantidade);
    rodape.append(quantidade, subtotal);
    artigo.append(topo, rodape);
    elementos.carrinhoItens.appendChild(artigo);
  });

  elementos.totalPontos.textContent = `${possuiValorInicial ? "A partir de " : ""}${formatarPontos(totalPontos)}${possuiPontosVariaveis ? " + a combinar" : ""}`;
  elementos.totalDinheiro.textContent = `${possuiValorInicial ? "A partir de " : ""}${formatarDinheiro(totalDinheiro)}${possuiDinheiroVariavel ? " + a combinar" : ""}`;
  elementos.avisoTotal.textContent = possuiDinheiroVariavel || possuiPontosVariaveis || possuiValorInicial
    ? "Alguns valores dependem da complexidade e serão confirmados no atendimento."
    : "Você poderá escolher entre pontos ou pagamento em dinheiro no atendimento.";
}

function abrirCarrinho() {
  renderizarCarrinho();
  elementos.carrinho.classList.add("ativo");
  elementos.carrinho.setAttribute("aria-hidden", "false");
  elementos.carrinho.removeAttribute("inert");
  elementos.overlayCarrinho.hidden = false;
  document.body.classList.add("modal-aberto");
  $("#fecharCarrinho").focus();
}

function fecharCarrinho() {
  elementos.carrinho.classList.remove("ativo");
  elementos.carrinho.setAttribute("aria-hidden", "true");
  elementos.carrinho.setAttribute("inert", "");
  elementos.overlayCarrinho.hidden = true;
  document.body.classList.remove("modal-aberto");
}

function montarMensagemPedido() {
  const linhas = ["Olá! Quero solicitar os seguintes serviços da Loja Lunar:", ""];
  let totalDinheiro = 0;
  let totalPontos = 0;
  let variavelDinheiro = false;
  let variavelPontos = false;
  let valorInicial = false;

  estado.carrinho.forEach((item, indice) => {
    const servico = servicoDoCarrinho(item.id);
    const valores = calcularValores(servico, item.quantidade);
    linhas.push(`${indice + 1}. ${item.quantidade}x ${nomeCompleto(servico)}`);
    linhas.push(`   ${textoValores(valores, servico, item.quantidade)}`);
    if (valores.dinheiro === null) variavelDinheiro = true;
    else totalDinheiro += valores.dinheiro;
    if (valores.pontos === null) variavelPontos = true;
    else totalPontos += valores.pontos;
    valorInicial ||= valores.aproximado;
  });

  linhas.push("", "Resumo do pedido:");
  linhas.push(`Pontos: ${valorInicial ? "a partir de " : ""}${formatarPontos(totalPontos)}${variavelPontos ? " + valor a combinar" : ""}`);
  linhas.push(`Dinheiro: ${valorInicial ? "a partir de " : ""}${formatarDinheiro(totalDinheiro)}${variavelDinheiro ? " + valor a combinar" : ""}`);
  linhas.push("", "Poderiam confirmar a disponibilidade, a forma de pagamento e o prazo?");
  return linhas.join("\n");
}

async function finalizarPedido() {
  if (!estado.carrinho.length) return;
  const mensagem = montarMensagemPedido();
  try {
    await navigator.clipboard.writeText(mensagem);
    mostrarToast("Pedido copiado. Cole a mensagem no grupo do WhatsApp.");
  } catch {
    window.prompt("Copie seu pedido e envie no grupo:", mensagem);
  }
  window.open(LINK_GRUPO_WHATSAPP, "_blank", "noopener,noreferrer");
}

function preencherListaAdmin() {
  const selecionado = elementos.adminServico.value;
  elementos.adminServico.replaceChildren();
  estado.servicos.forEach((servico) => {
    const option = document.createElement("option");
    option.value = servico.id;
    option.textContent = `${servico.esgotado ? "[ESGOTADO] " : ""}${nomeCompleto(servico)}`;
    elementos.adminServico.appendChild(option);
  });
  if (estado.servicos.some((servico) => servico.id === selecionado)) elementos.adminServico.value = selecionado;
  preencherFormularioAdmin();
}

function preencherFormularioAdmin() {
  const servico = servicoDoCarrinho(elementos.adminServico.value) || estado.servicos[0];
  if (!servico) return;
  elementos.adminServico.value = servico.id;
  $("#adminTituloCampo").value = servico.titulo;
  $("#adminSubtitulo").value = servico.subtitulo || "";
  $("#adminIcone").value = servico.icone;
  $("#adminCategoria").value = servico.categoria;
  $("#adminCategoriaNome").value = servico.categoriaNome;
  $("#adminPontos").value = servico.pontos;
  $("#adminValor").value = servico.valor;
  $("#adminDescricao").value = servico.descricao;
  $("#adminDetalhes").value = servico.detalhes;
  $("#adminInclusos").value = servico.inclusos.join("\n");
  $("#adminExtra").value = servico.extra;
  $("#adminEsgotado").checked = Boolean(servico.esgotado);
  elementos.mensagemAdmin.textContent = "";
}

async function salvarServico(evento) {
  evento.preventDefault();
  if (!estado.usuarioAdmin || estado.usuarioAdmin.email !== ADMIN_EMAIL) return;
  const id = elementos.adminServico.value;
  const inclusos = $("#adminInclusos").value.split("\n").map((item) => item.trim()).filter(Boolean);
  elementos.salvarServico.disabled = true;
  elementos.salvarServico.textContent = "Salvando…";
  elementos.mensagemAdmin.textContent = "";
  try {
    await updateDoc(doc(db, "servicos", id), {
      titulo: $("#adminTituloCampo").value.trim(),
      subtitulo: $("#adminSubtitulo").value.trim(),
      icone: $("#adminIcone").value.trim(),
      categoria: $("#adminCategoria").value,
      categoriaNome: $("#adminCategoriaNome").value.trim(),
      pontos: $("#adminPontos").value.trim(),
      valor: $("#adminValor").value.trim(),
      descricao: $("#adminDescricao").value.trim(),
      detalhes: $("#adminDetalhes").value.trim(),
      inclusos,
      extra: $("#adminExtra").value.trim(),
      esgotado: $("#adminEsgotado").checked,
      atualizadoEm: serverTimestamp(),
    });
    elementos.mensagemAdmin.textContent = "Alterações salvas com sucesso.";
    mostrarToast("Serviço atualizado.");
  } catch (erro) {
    console.error(erro);
    elementos.mensagemAdmin.textContent = "Não foi possível salvar. Verifique sua conexão e tente novamente.";
  } finally {
    elementos.salvarServico.disabled = false;
    elementos.salvarServico.textContent = "Salvar alterações";
  }
}

async function entrarAdmin(evento) {
  evento.preventDefault();
  elementos.mensagemLogin.textContent = "";
  elementos.entrarAdmin.disabled = true;
  elementos.entrarAdmin.textContent = "Entrando…";
  try {
    const credencial = await signInWithEmailAndPassword(auth, elementos.loginEmail.value.trim(), elementos.loginSenha.value);
    if (credencial.user.email !== ADMIN_EMAIL) {
      await signOut(auth);
      throw new Error("unauthorized");
    }
    elementos.formLogin.reset();
    fecharModal(elementos.modalLogin);
    preencherListaAdmin();
    abrirModal(elementos.modalAdmin);
  } catch {
    elementos.mensagemLogin.textContent = "E-mail ou senha inválidos.";
  } finally {
    elementos.entrarAdmin.disabled = false;
    elementos.entrarAdmin.textContent = "Entrar";
  }
}

function abrirAcessoAdmin() {
  if (estado.usuarioAdmin?.email === ADMIN_EMAIL) {
    preencherListaAdmin();
    abrirModal(elementos.modalAdmin);
  } else {
    elementos.mensagemLogin.textContent = "";
    abrirModal(elementos.modalLogin);
    elementos.loginEmail.focus();
  }
}

document.querySelectorAll(".filtro").forEach((botao) => {
  botao.addEventListener("click", () => {
    document.querySelectorAll(".filtro").forEach((filtro) => {
      const ativo = filtro === botao;
      filtro.classList.toggle("ativo", ativo);
      filtro.setAttribute("aria-pressed", String(ativo));
    });
    estado.categoria = botao.dataset.categoria;
    renderizarCatalogo();
  });
});

document.querySelectorAll("[data-fechar]").forEach((botao) => {
  botao.addEventListener("click", () => fecharModal(document.getElementById(botao.dataset.fechar)));
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (evento) => {
    if (evento.target === modal) fecharModal(modal);
  });
});

$("#diminuirQuantidade").addEventListener("click", () => {
  elementos.produtoQuantidade.value = String(Math.max(1, quantidadeProduto() - 1));
  atualizarSubtotalProduto();
});
$("#aumentarQuantidade").addEventListener("click", () => {
  elementos.produtoQuantidade.value = String(Math.min(99, quantidadeProduto() + 1));
  atualizarSubtotalProduto();
});
elementos.produtoQuantidade.addEventListener("input", atualizarSubtotalProduto);
$("#adicionarCarrinho").addEventListener("click", adicionarAoCarrinho);
$("#abrirCarrinho").addEventListener("click", abrirCarrinho);
$("#fecharCarrinho").addEventListener("click", fecharCarrinho);
elementos.overlayCarrinho.addEventListener("click", fecharCarrinho);
$("#limparCarrinho").addEventListener("click", () => {
  estado.carrinho = [];
  persistirCarrinho();
  renderizarCarrinho();
});
$("#finalizarPedido").addEventListener("click", finalizarPedido);
$("#abrirAdmin").addEventListener("click", abrirAcessoAdmin);
elementos.formLogin.addEventListener("submit", entrarAdmin);
elementos.adminServico.addEventListener("change", preencherFormularioAdmin);
elementos.formAdmin.addEventListener("submit", salvarServico);
$("#sairAdmin").addEventListener("click", async () => {
  await signOut(auth);
  fecharModal(elementos.modalAdmin);
  mostrarToast("Sessão administrativa encerrada.");
});

document.addEventListener("keydown", (evento) => {
  if (evento.key !== "Escape") return;
  const modalAtivo = document.querySelector(".modal.ativo");
  if (modalAtivo) fecharModal(modalAtivo);
  else if (elementos.carrinho.classList.contains("ativo")) fecharCarrinho();
});

onAuthStateChanged(auth, async (usuario) => {
  if (usuario && usuario.email !== ADMIN_EMAIL) {
    await signOut(auth);
    estado.usuarioAdmin = null;
    return;
  }
  estado.usuarioAdmin = usuario;
});

onSnapshot(
  query(collection(db, "servicos"), orderBy("ordem")),
  (snapshot) => {
    estado.servicos = snapshot.docs.map((documento) => ({ id: documento.id, ...documento.data() }));
    elementos.estadoCatalogo.hidden = estado.servicos.length > 0;
    renderizarCatalogo();
    renderizarCarrinho();
    if (estado.usuarioAdmin && elementos.modalAdmin.classList.contains("ativo")) preencherListaAdmin();
  },
  (erro) => {
    console.error(erro);
    elementos.estadoCatalogo.hidden = false;
    elementos.estadoCatalogo.textContent = "Não foi possível carregar o catálogo. Tente novamente em instantes.";
  },
);

atualizarContador();
