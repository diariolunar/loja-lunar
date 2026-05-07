const servicos = [
  {
    titulo: "Book Trailer",
    subtitulo: "2 min",
    icone: "🎬",
    categoria: "marketing",
    categoriaNome: "Divulgação & Marketing",
    pontos: "1.000 P",
    valor: "R$30,00",
    descricao: "Trailer em formato de vídeo criado especialmente para divulgação da sua obra, despertando o interesse dos leitores e destacando os melhores elementos da sua história.",
    inclusos: [
      "Roteiro e estrutura do trailer",
      "Seleção de trechos e imagens",
      "Edição de vídeo com música e efeitos",
      "Entrega em alta qualidade",
      "1 revisão inclusa"
    ],
    extra: "+50 pontos por minuto adicional"
  },
  {
    titulo: "Chuva de Estrelas",
    subtitulo: "",
    icone: "🌠",
    categoria: "marketing",
    categoriaNome: "Divulgação & Marketing",
    pontos: "900 P",
    valor: "R$15,00",
    descricao: "Serviço voltado para impulsionar a visibilidade da sua obra dentro dos espaços de divulgação do Projeto Lunar.",
    inclusos: [
      "Divulgação personalizada",
      "Texto de chamada para atrair leitores",
      "Postagem nos canais disponíveis",
      "Organização visual do destaque"
    ],
    extra: "Ideal para obras que precisam ganhar mais alcance."
  },
  {
    titulo: "Divulgação Lunar",
    subtitulo: "",
    icone: "🌙",
    categoria: "marketing",
    categoriaNome: "Divulgação & Marketing",
    pontos: "250 P",
    valor: "R$8,00",
    descricao: "Divulgação simples e direta para apresentar sua obra ao público Lunar.",
    inclusos: [
      "Chamada de divulgação",
      "Destaque da sinopse ou proposta da obra",
      "Publicação nos espaços combinados"
    ],
    extra: "Uma opção rápida para dar movimento à sua história."
  },
  {
    titulo: "Divulgação no Jornal Lunar",
    subtitulo: "",
    icone: "📰",
    categoria: "marketing",
    categoriaNome: "Divulgação & Marketing",
    pontos: "350 P",
    valor: "R$10,00",
    descricao: "Matéria ou destaque publicado no Jornal Lunar para apresentar sua obra de forma mais elaborada e chamativa.",
    inclusos: [
      "Texto em formato jornalístico Lunar",
      "Destaque dos pontos fortes da obra",
      "Publicação no Jornal Lunar",
      "Chamada para atrair leitores"
    ],
    extra: "Perfeito para obras que merecem uma apresentação mais forte."
  },
  {
    titulo: "Aesthetic",
    subtitulo: "",
    icone: "🌙",
    categoria: "design",
    categoriaNome: "Design & Identidade Visual",
    pontos: "200 P",
    valor: "R$9,00",
    descricao: "Imagem estética inspirada na atmosfera da sua obra ou personagem.",
    inclusos: [
      "Composição visual temática",
      "Cores e elementos baseados na obra",
      "Imagem pronta para divulgação",
      "1 ajuste simples incluso"
    ],
    extra: "Ideal para posts, perfis e apresentação de personagens."
  },
  {
    titulo: "Divisória",
    subtitulo: "",
    icone: "📖",
    categoria: "design",
    categoriaNome: "Design & Identidade Visual",
    pontos: "350 P",
    valor: "R$10,50",
    descricao: "Divisória visual para capítulos, cenas, posts ou organização estética da obra.",
    inclusos: [
      "Design personalizado",
      "Adaptação ao tema da história",
      "Entrega em imagem pronta para uso",
      "1 revisão inclusa"
    ],
    extra: "Boa para deixar a obra mais organizada e bonita."
  },
  {
    titulo: "Banner",
    subtitulo: "",
    icone: "🖼️",
    categoria: "design",
    categoriaNome: "Design & Identidade Visual",
    pontos: "400 P",
    valor: "R$15,00",
    descricao: "Banner personalizado para divulgação da sua obra, evento, capítulo ou projeto.",
    inclusos: [
      "Criação visual personalizada",
      "Adaptação para divulgação",
      "Texto principal no banner",
      "Entrega em alta qualidade"
    ],
    extra: "Pode ser feito em formato horizontal ou vertical."
  },
  {
    titulo: "Capa Gerada por IA",
    subtitulo: "",
    icone: "🤖",
    categoria: "design",
    categoriaNome: "Design & Identidade Visual",
    pontos: "350 P",
    valor: "R$20,00",
    descricao: "Criação de capa com auxílio de inteligência artificial, pensada para representar a essência da sua obra.",
    inclusos: [
      "Criação do conceito visual",
      "Geração da imagem base",
      "Ajustes de composição",
      "Inserção de título e nome do autor"
    ],
    extra: "Indicada para autores que ainda não têm uma identidade visual definida."
  },
  {
    titulo: "Capa Manipulada",
    subtitulo: "",
    icone: "📕",
    categoria: "design",
    categoriaNome: "Design & Identidade Visual",
    pontos: "500 P",
    valor: "Valor em R$ a tratar",
    descricao: "Capa criada por manipulação de imagem, com composição mais personalizada e acabamento elaborado.",
    inclusos: [
      "Composição com imagens e elementos visuais",
      "Tratamento de cores e atmosfera",
      "Inserção de título e nome do autor",
      "Acabamento personalizado"
    ],
    extra: "O valor pode variar conforme a complexidade do pedido."
  }
];

const catalogo = document.getElementById("catalogo");
const filtros = document.querySelectorAll(".filtro");

const modal = document.getElementById("modal");
const fecharModal = document.getElementById("fecharModal");
const botaoFechar = document.getElementById("botaoFechar");

const modalIcone = document.getElementById("modalIcone");
const modalTitulo = document.getElementById("modalTitulo");
const modalCategoria = document.getElementById("modalCategoria");
const modalPontos = document.getElementById("modalPontos");
const modalValor = document.getElementById("modalValor");
const modalDescricao = document.getElementById("modalDescricao");
const modalInclusos = document.getElementById("modalInclusos");
const modalExtra = document.getElementById("modalExtra");
const botaoWhatsapp = document.getElementById("botaoWhatsapp");

const numeroWhatsapp = "5588999999999";

function carregarCatalogo(categoria = "todos") {
  catalogo.innerHTML = "";

  const listaFiltrada = categoria === "todos"
    ? servicos
    : servicos.filter(servico => servico.categoria === categoria);

  listaFiltrada.forEach((servico, index) => {
    const card = document.createElement("article");
    card.classList.add("card");

    card.innerHTML = `
      <div class="icone">${servico.icone}</div>
      <h2>${servico.titulo}</h2>
      ${servico.subtitulo ? `<p>${servico.subtitulo}</p>` : ""}
      <div class="preco">${servico.pontos} / ${servico.valor}</div>
    `;

    card.addEventListener("click", () => abrirModal(servico));

    catalogo.appendChild(card);
  });
}

function abrirModal(servico) {
  modalIcone.textContent = servico.icone;
  modalTitulo.textContent = servico.subtitulo
    ? `${servico.titulo} (${servico.subtitulo})`
    : servico.titulo;

  modalCategoria.textContent = servico.categoriaNome;
  modalPontos.textContent = `✦ ${servico.pontos}`;
  modalValor.textContent = servico.valor;
  modalDescricao.textContent = servico.descricao;
  modalExtra.textContent = `✦ ${servico.extra}`;

  modalInclusos.innerHTML = "";

  servico.inclusos.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    modalInclusos.appendChild(li);
  });

  const mensagem = `Olá! Tenho interesse no serviço: ${servico.titulo}. Poderia me passar mais informações?`;
  const link = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;

  botaoWhatsapp.href = link;

  modal.classList.add("ativo");
}

function fechar() {
  modal.classList.remove("ativo");
}

filtros.forEach(botao => {
  botao.addEventListener("click", () => {
    filtros.forEach(filtro => filtro.classList.remove("ativo"));
    botao.classList.add("ativo");

    const categoria = botao.dataset.categoria;
    carregarCatalogo(categoria);
  });
});

fecharModal.addEventListener("click", fechar);
botaoFechar.addEventListener("click", fechar);

modal.addEventListener("click", evento => {
  if (evento.target === modal) {
    fechar();
  }
});

carregarCatalogo();
