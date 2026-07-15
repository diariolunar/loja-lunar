import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import {
  addDoc,
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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const $ = (seletor) => document.querySelector(seletor);

const estado = {
  servicos: [],
  selecionadoId: null,
  categoria: "todos",
  busca: "",
  alterado: false,
  novo: false,
  usuario: null,
};

const elementos = {
  carregando: $("#adminCarregando"),
  aplicacao: $("#adminAplicacao"),
  cards: $("#adminCards"),
  semResultados: $("#adminSemResultados"),
  quantidadeVisivel: $("#quantidadeVisivel"),
  busca: $("#buscaAdmin"),
  editor: $("#adminEditor"),
  editorVazio: $("#adminEditorVazio"),
  editorConteudo: $("#adminEditorConteudo"),
  form: $("#formAdmin"),
  mensagem: $("#mensagemAdmin"),
  salvar: $("#salvarServico"),
  estadoEdicao: $("#estadoEdicao"),
  novo: $("#novoServico"),
  cancelarNovo: $("#cancelarNovo"),
  toast: $("#toast"),
};

function nomeCompleto(servico) {
  return servico.subtitulo ? `${servico.titulo} — ${servico.subtitulo}` : servico.titulo;
}

function normalizar(texto) {
  return String(texto || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function opcoesDoServico(servico) {
  return Array.isArray(servico?.opcoes) ? servico.opcoes : [];
}

function criarIdOpcao(nome, indice) {
  return normalizar(nome).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `opcao-${indice + 1}`;
}

function servicoSelecionado() {
  return estado.servicos.find((servico) => servico.id === estado.selecionadoId) || null;
}

function mostrarToast(mensagem) {
  elementos.toast.textContent = mensagem;
  elementos.toast.classList.add("ativo");
  window.clearTimeout(mostrarToast.timer);
  mostrarToast.timer = window.setTimeout(() => elementos.toast.classList.remove("ativo"), 2600);
}

function definirAlterado(alterado) {
  estado.alterado = alterado;
  elementos.estadoEdicao.textContent = alterado ? "Alterações ainda não salvas" : "Nenhuma alteração pendente";
  elementos.estadoEdicao.style.color = alterado ? "#ffe17a" : "";
}

function atualizarResumo() {
  $("#resumoTotal").textContent = String(estado.servicos.length);
  $("#resumoDisponiveis").textContent = String(estado.servicos.filter((servico) => !servico.esgotado).length);
  $("#resumoEsgotados").textContent = String(estado.servicos.filter((servico) => servico.esgotado).length);
}

function listaFiltrada() {
  return estado.servicos.filter((servico) => {
    const correspondeCategoria = estado.categoria === "todos"
      || (estado.categoria === "esgotados" ? servico.esgotado : servico.categoria === estado.categoria);
    const conteudo = normalizar(`${servico.titulo} ${servico.subtitulo} ${servico.categoriaNome}`);
    return correspondeCategoria && conteudo.includes(estado.busca);
  });
}

function criarCard(servico) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = `admin-card${servico.id === estado.selecionadoId ? " selecionado" : ""}`;
  card.setAttribute("aria-label", `Editar ${nomeCompleto(servico)}`);

  const icone = document.createElement("div");
  icone.className = "admin-card-icone";
  icone.textContent = servico.icone;
  const titulo = document.createElement("h3");
  titulo.textContent = servico.titulo;
  card.append(icone, titulo);

  if (servico.subtitulo) {
    const subtitulo = document.createElement("p");
    subtitulo.className = "admin-card-subtitulo";
    subtitulo.textContent = servico.subtitulo;
    card.appendChild(subtitulo);
  }

  const categoria = document.createElement("p");
  categoria.className = "admin-card-categoria";
  categoria.textContent = servico.categoriaNome;
  const preco = document.createElement("p");
  preco.className = "admin-card-preco";
  preco.textContent = `${servico.pontos} / ${servico.valor}`;
  card.append(categoria, preco);

  if (servico.esgotado) {
    const status = document.createElement("span");
    status.className = "admin-card-status";
    status.textContent = "Esgotado";
    card.appendChild(status);
  }

  card.addEventListener("click", () => selecionarServico(servico.id));
  return card;
}

function renderizarCards() {
  const lista = listaFiltrada();
  elementos.cards.replaceChildren(...lista.map(criarCard));
  elementos.semResultados.hidden = lista.length > 0;
  elementos.quantidadeVisivel.textContent = `${lista.length} ${lista.length === 1 ? "serviço" : "serviços"}`;
}

function preencherFormulario(servico) {
  estado.novo = false;
  $("#editorModo").textContent = "✦ Editando serviço";
  $("#editorIcone").textContent = servico.icone;
  $("#editorTitulo").textContent = nomeCompleto(servico);
  $("#editorCategoria").textContent = servico.categoriaNome;
  $("#adminTituloCampo").value = servico.titulo;
  $("#adminSubtitulo").value = servico.subtitulo || "";
  $("#adminIcone").value = servico.icone;
  $("#adminCategoria").value = servico.categoria;
  $("#adminCategoriaNome").value = servico.categoriaNome;
  $("#adminPontos").value = servico.pontos;
  $("#adminValor").value = servico.valor;
  $("#adminOpcoes").value = opcoesDoServico(servico).map((opcao) => `${opcao.nome} | ${opcao.pontos} | ${opcao.valor}`).join("\n");
  $("#adminDescricao").value = servico.descricao;
  $("#adminDetalhes").value = servico.detalhes;
  $("#adminInclusos").value = servico.inclusos.join("\n");
  $("#adminExtra").value = servico.extra;
  $("#adminEsgotado").checked = Boolean(servico.esgotado);
  elementos.mensagem.textContent = "";
  elementos.salvar.textContent = "Salvar alterações";
  elementos.cancelarNovo.hidden = true;
  definirAlterado(false);
}

function fecharEditor() {
  estado.selecionadoId = null;
  estado.novo = false;
  elementos.editorConteudo.hidden = true;
  elementos.editorVazio.hidden = false;
  elementos.cancelarNovo.hidden = true;
  elementos.form.reset();
  definirAlterado(false);
  renderizarCards();
}

function abrirNovoServico() {
  if (estado.alterado && !window.confirm("Existem alterações não salvas. Deseja descartá-las e criar um novo serviço?")) return;
  estado.selecionadoId = null;
  estado.novo = true;
  elementos.editorVazio.hidden = true;
  elementos.editorConteudo.hidden = false;
  elementos.form.reset();
  $("#editorModo").textContent = "✦ Novo serviço";
  $("#editorIcone").textContent = "✦";
  $("#editorTitulo").textContent = "Adicionar ao catálogo";
  $("#editorCategoria").textContent = "Preencha os dados do novo card";
  $("#adminIcone").value = "✦";
  $("#adminCategoria").value = "escrita";
  $("#adminCategoriaNome").value = "Escrita e Conteúdo";
  $("#adminPontos").value = "A combinar";
  $("#adminValor").value = "A combinar";
  elementos.mensagem.textContent = "";
  elementos.salvar.textContent = "Criar serviço";
  elementos.cancelarNovo.hidden = false;
  definirAlterado(false);
  renderizarCards();
  $("#adminTituloCampo").focus();
  if (window.matchMedia("(max-width: 1100px)").matches) {
    elementos.editor.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function selecionarServico(id) {
  if (id === estado.selecionadoId) return;
  if (estado.alterado && !window.confirm("Existem alterações não salvas. Deseja trocar de serviço e descartá-las?")) return;
  const servico = estado.servicos.find((item) => item.id === id);
  if (!servico) return;
  estado.selecionadoId = id;
  elementos.editorVazio.hidden = true;
  elementos.editorConteudo.hidden = false;
  preencherFormulario(servico);
  renderizarCards();
  if (window.matchMedia("(max-width: 1100px)").matches) {
    elementos.editor.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

async function salvarServico(evento) {
  evento.preventDefault();
  if (!estado.usuario || estado.usuario.email !== ADMIN_EMAIL || (!estado.selecionadoId && !estado.novo)) return;
  const criando = estado.novo;
  elementos.salvar.disabled = true;
  elementos.salvar.textContent = criando ? "Criando…" : "Salvando…";
  elementos.mensagem.textContent = "";

  try {
    const inclusos = $("#adminInclusos").value.split("\n").map((item) => item.trim()).filter(Boolean);
    const opcoes = $("#adminOpcoes").value.split("\n").map((linha) => linha.trim()).filter(Boolean).map((linha, indice) => {
      const [nome, pontos, valor] = linha.split("|").map((parte) => parte.trim());
      if (!nome || !pontos || !valor) throw new Error("invalid-options");
      return { id: criarIdOpcao(nome, indice), nome, pontos, valor };
    });

    const dados = {
      titulo: $("#adminTituloCampo").value.trim(),
      subtitulo: $("#adminSubtitulo").value.trim(),
      icone: $("#adminIcone").value.trim(),
      categoria: $("#adminCategoria").value,
      categoriaNome: $("#adminCategoriaNome").value.trim(),
      pontos: $("#adminPontos").value.trim(),
      valor: $("#adminValor").value.trim(),
      opcoes,
      descricao: $("#adminDescricao").value.trim(),
      detalhes: $("#adminDetalhes").value.trim(),
      inclusos,
      extra: $("#adminExtra").value.trim(),
      esgotado: $("#adminEsgotado").checked,
      atualizadoEm: serverTimestamp(),
    };

    if (criando) {
      const maiorOrdem = estado.servicos.reduce((maior, servico) => Math.max(maior, Number(servico.ordem) || 0), 0);
      const novaOrdem = maiorOrdem + 10;
      const referencia = await addDoc(collection(db, "servicos"), {
        ...dados,
        ordem: novaOrdem,
        criadoEm: serverTimestamp(),
      });
      estado.selecionadoId = referencia.id;
      estado.novo = false;
      const servicoCriado = { id: referencia.id, ...dados, ordem: novaOrdem };
      if (!estado.servicos.some((servico) => servico.id === referencia.id)) estado.servicos.push(servicoCriado);
      preencherFormulario(servicoCriado);
      atualizarResumo();
      renderizarCards();
    } else {
      await updateDoc(doc(db, "servicos", estado.selecionadoId), dados);
    }

    definirAlterado(false);
    elementos.cancelarNovo.hidden = true;
    elementos.salvar.textContent = "Salvar alterações";
    elementos.mensagem.textContent = criando ? "Serviço criado com sucesso." : "Alterações salvas com sucesso.";
    mostrarToast(criando ? "Novo serviço adicionado ao catálogo." : "Serviço atualizado no catálogo.");
  } catch (erro) {
    console.error(erro);
    elementos.mensagem.textContent = erro.message === "invalid-options"
      ? "Use o formato: Nome | Pontos | Valor, uma modalidade por linha."
      : "Não foi possível salvar. Verifique sua conexão e tente novamente.";
  } finally {
    elementos.salvar.disabled = false;
    elementos.salvar.textContent = estado.novo ? "Criar serviço" : "Salvar alterações";
  }
}

elementos.busca.addEventListener("input", () => {
  estado.busca = normalizar(elementos.busca.value.trim());
  renderizarCards();
});

document.querySelectorAll(".admin-filtro").forEach((botao) => {
  botao.addEventListener("click", () => {
    document.querySelectorAll(".admin-filtro").forEach((filtro) => filtro.classList.toggle("ativo", filtro === botao));
    estado.categoria = botao.dataset.categoria;
    renderizarCards();
  });
});

elementos.form.addEventListener("input", () => definirAlterado(true));
elementos.form.addEventListener("change", () => definirAlterado(true));
elementos.form.addEventListener("submit", salvarServico);
$("#adminCategoria").addEventListener("change", () => {
  const nomes = {
    escrita: "Escrita e Conteúdo",
    leitura: "Leitura e Avaliação",
    marketing: "Divulgação & Marketing",
    design: "Design & Identidade",
  };
  $("#adminCategoriaNome").value = nomes[$("#adminCategoria").value] || "";
});
elementos.novo.addEventListener("click", abrirNovoServico);
elementos.cancelarNovo.addEventListener("click", () => {
  if (estado.alterado && !window.confirm("Descartar os dados deste novo serviço?")) return;
  fecharEditor();
});

$("#sairAdmin").addEventListener("click", async () => {
  await signOut(auth);
  window.location.replace("index.html");
});

window.addEventListener("beforeunload", (evento) => {
  if (!estado.alterado) return;
  evento.preventDefault();
  evento.returnValue = "";
});

onAuthStateChanged(auth, (usuario) => {
  if (!usuario || usuario.email !== ADMIN_EMAIL) {
    window.location.replace("index.html");
    return;
  }

  estado.usuario = usuario;
  elementos.carregando.hidden = true;
  elementos.aplicacao.hidden = false;

  onSnapshot(
    query(collection(db, "servicos"), orderBy("ordem")),
    (snapshot) => {
      estado.servicos = snapshot.docs.map((documento) => ({ id: documento.id, ...documento.data() }));
      atualizarResumo();
      renderizarCards();
      const selecionado = servicoSelecionado();
      if (selecionado && !estado.alterado) preencherFormulario(selecionado);
    },
    (erro) => {
      console.error(erro);
      elementos.cards.replaceChildren();
      elementos.semResultados.hidden = false;
      elementos.semResultados.textContent = "Não foi possível carregar os serviços.";
    },
  );
});
