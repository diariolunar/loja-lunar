const servicos = [
  {
    titulo: "Diagramação",
    subtitulo: "",
    icone: "📄",
    categoria: "escrita",
    categoriaNome: "Escrita e Conteúdo",
    pontos: "500 P",
    valor: "R$12,00",
    descricao:
      "Organização visual do interior da obra, deixando o texto mais limpo, bonito, agradável para leitura e preparado em formato de impressão.",
    detalhes:
      "A diagramação é indicada para autores que querem deixar o material mais apresentável e organizado, seja para leitura digital, envio para leitores ou preparação em formato de livro. O serviço também ajusta as margens do arquivo, deixando o conteúdo mais adequado para impressão.",
    inclusos: [
      "Organização dos capítulos",
      "Ajuste de espaçamento",
      "Padronização de títulos",
      "Organização das margens do livro",
      "Preparação do arquivo em formato de impressão",
      "Melhor distribuição visual do texto",
    ],
    extra:
      "O serviço pode variar conforme o tamanho e a complexidade do material.",
  },
  {
    titulo: "Organização de Ebook",
    subtitulo: "",
    icone: "📚",
    categoria: "escrita",
    categoriaNome: "Escrita e Conteúdo",
    pontos: "1.500 P",
    valor: "R$30,00",
    descricao:
      "Preparação e organização completa do ebook, incluindo capa e contracapa no arquivo final.",
    detalhes:
      "Esse serviço é voltado para autores que já têm a obra escrita, mas precisam organizar o material em formato de ebook, com uma estrutura mais bonita, funcional e adequada para leitura. O arquivo é entregue já organizado, incluindo capa, contracapa e conteúdo interno.",
    inclusos: [
      "Organização do arquivo",
      "Inclusão da capa no ebook",
      "Inclusão da contracapa no ebook",
      "Estruturação de capítulos",
      "Ajuste de títulos e divisões internas",
      "Sumário simples",
      "Padronização visual",
      "Preparação final do ebook",
    ],
    extra:
      "Indicado para quem quer transformar o texto em um material mais completo e apresentável.",
  },
  {
    titulo: "Arquitetura Universal",
    subtitulo: "",
    icone: "🌌",
    categoria: "escrita",
    categoriaNome: "Escrita e Conteúdo",
    pontos: "A combinar",
    valor: "A combinar",
    descricao: "Construção ou organização da base do universo da obra.",
    detalhes:
      "A Arquitetura Universal ajuda o autor a organizar o mundo da história, suas regras, estruturas, povos, sistemas, poderes, lugares, conflitos e elementos principais. É ideal para histórias de fantasia, ficção, distopia, sobrenatural ou qualquer obra com universo próprio.",
    inclusos: [
      "Organização do universo da história",
      "Estruturação de regras internas",
      "Apoio na construção de povos, reinos, grupos ou sistemas",
      "Organização de poderes, magia ou habilidades",
      "Coerência entre mundo, personagens e conflito",
    ],
    extra:
      "O valor é definido conforme o tamanho e a complexidade do universo.",
  },
  {
    titulo: "Leitura Lunar",
    subtitulo: "",
    icone: "🌙",
    categoria: "leitura",
    categoriaNome: "Leitura e Avaliação",
    pontos: "1.000 P",
    valor: "R$18,00",
    descricao:
      "Dois capítulos da sua obra serão lidos, votados e comentados por todos os membros do Lunar, independentemente do sub em que estejam.",
    detalhes:
      "A Leitura Lunar é um serviço de movimentação e engajamento para obras no Wattpad. Dois capítulos da obra escolhida serão lidos por todos os membros do Lunar, mesmo que estejam em subs diferentes, garantindo mais alcance, votos, comentários e interação dentro da plataforma.",
    inclusos: [
      "Leitura de 2 capítulos da obra",
      "Participação dos membros do Lunar",
      "Votos nos capítulos lidos",
      "Comentários nos capítulos lidos",
      "Engajamento dentro do Wattpad",
      "Movimentação da obra entre diferentes subs",
    ],
    extra:
      "A leitura acontece no Wattpad e segue o padrão de votação e comentários da comunidade Lunar.",
  },
  {
    titulo: "Jornada Mística",
    subtitulo: "",
    icone: "🔮",
    categoria: "leitura",
    categoriaNome: "Leitura e Avaliação",
    pontos: "1.200 P",
    valor: "R$23,00",
    descricao:
      "Leitura completa da sua obra no Wattpad, com votos e comentários ao longo dos capítulos.",
    detalhes:
      "A Jornada Mística é voltada para autores que desejam receber uma leitura completa da obra. O serviço acompanha a história do início ao fim no Wattpad, gerando engajamento, votos, comentários e maior movimentação para o livro.",
    inclusos: [
      "Leitura completa da obra",
      "Votos nos capítulos",
      "Comentários nos capítulos",
      "Engajamento dentro do Wattpad",
      "Acompanhamento da obra até o final",
      "Maior movimentação para o livro",
    ],
    extra:
      "A leitura acontece no Wattpad. Por isso, votos e comentários fazem parte do padrão do serviço.",
  },
  {
    titulo: "Leitura Extra de Sub",
    subtitulo: "",
    icone: "📖",
    categoria: "leitura",
    categoriaNome: "Leitura e Avaliação",
    pontos: "250 P",
    valor: "R$9,00",
    descricao:
      "Leitura adicional de capítulo para autores que desejam retorno extra dentro do sub.",
    detalhes:
      "A Leitura Extra de Sub é pensada para quem quer receber mais uma leitura além das leituras comuns, com comentários e votos em um capítulo específico no Wattpad.",
    inclusos: [
      "Leitura de 1 capítulo extra",
      "Voto no capítulo",
      "Comentário no capítulo",
    ],
    extra: "Valor cobrado por capítulo extra. Serviço realizado pelo Wattpad.",
  },
  {
    titulo: "Feedback Editorial",
    subtitulo: "",
    icone: "📝",
    categoria: "leitura",
    categoriaNome: "Leitura e Avaliação",
    pontos: "600 P",
    valor: "R$15,00",
    descricao:
      "Feedback mais técnico sobre capítulos, com sugestões para melhorar estrutura, clareza e impacto da narrativa.",
    detalhes:
      "O Feedback Editorial é voltado para autores que desejam um retorno mais direcionado sobre a construção da história. O serviço observa pontos como narrativa, ritmo, cenas, personagens, coerência, impacto e possíveis ajustes.",
    inclusos: [
      "Avaliação de até 5 capítulos",
      "Comentários sobre estrutura narrativa",
      "Pontos fortes da escrita",
      "Pontos que podem ser melhorados",
      "Sugestões de ajuste",
      "Observações sobre ritmo e desenvolvimento",
    ],
    extra: "Capítulos adicionais podem ser negociados.",
  },
  {
    titulo: "Revisão de Capítulo",
    subtitulo: "",
    icone: "✍️",
    categoria: "leitura",
    categoriaNome: "Leitura e Avaliação",
    pontos: "A combinar",
    valor: "A combinar",
    descricao:
      "Revisão de capítulo com foco em correção, clareza e melhoria do texto.",
    detalhes:
      "A Revisão de Capítulo é indicada para autores que desejam corrigir e melhorar um capítulo específico, deixando o texto mais claro, organizado e agradável para leitura.",
    inclusos: [
      "Correção de erros gramaticais básicos",
      "Ajustes de pontuação",
      "Sugestões de clareza",
      "Melhorias na fluidez do texto",
      "Observações sobre frases confusas ou repetitivas",
    ],
    extra:
      "O valor depende do tamanho do capítulo e do nível de revisão necessário.",
  },
  {
    titulo: "Book Trailer",
    subtitulo: "2 min",
    icone: "🎬",
    categoria: "marketing",
    categoriaNome: "Divulgação & Marketing",
    pontos: "1.000 P",
    valor: "R$30,00",
    descricao:
      "Vídeo de divulgação para apresentar a obra de forma visual, dinâmica e chamativa.",
    detalhes:
      "O Book Trailer é um vídeo curto criado para despertar curiosidade sobre a obra, usando imagens, frases, música, efeitos e uma estética que combine com a história.",
    inclusos: [
      "Trailer de até 2 minutos",
      "Montagem visual com clima da obra",
      "Inserção de frases ou chamadas",
      "Música ou efeito sonoro",
      "Edição final em vídeo",
    ],
    extra: "São cobrados 50 pontos adicionais por cada minuto extra.",
  },
  {
    titulo: "Chuva de Estrelas",
    subtitulo: "",
    icone: "🌠",
    categoria: "marketing",
    categoriaNome: "Divulgação & Marketing",
    pontos: "900 P",
    valor: "R$15,00",
    descricao:
      "Todos os membros do Lunar entram na sua obra no Wattpad e votam em todos os capítulos publicados.",
    detalhes:
      "A Chuva de Estrelas é um serviço de impulsionamento por votos. Todos os membros do Lunar acessam a obra da pessoa no Wattpad e votam em todos os capítulos disponíveis. Não é uma leitura completa nem avaliativa, o foco é exclusivamente aumentar a quantidade de votos e movimentar a obra dentro da plataforma.",
    inclusos: [
      "Entrada dos membros do Lunar na obra",
      "Votos em todos os capítulos publicados",
      "Movimentação da obra no Wattpad",
      "Aumento de engajamento por votação",
      "Apoio coletivo dos membros do Lunar",
    ],
    extra:
      "Esse serviço não inclui leitura dos capítulos. O foco é apenas votação.",
  },
  {
    titulo: "Divulgação Lunar",
    subtitulo: "Instagram ou TikTok",
    icone: "📣",
    categoria: "marketing",
    categoriaNome: "Divulgação & Marketing",
    pontos: "350 P",
    valor: "R$8,00",
    descricao: "Divulgação da obra no Instagram ou TikTok do Lunar.",
    detalhes:
      "A Divulgação Lunar apresenta a obra em uma das redes sociais do Lunar, com uma chamada simples, direta e pensada para atrair atenção do público. O cliente escolhe entre Instagram ou TikTok.",
    inclusos: [
      "Divulgação no Instagram ou TikTok",
      "Escolha de uma das plataformas disponíveis",
      "Chamada para a obra",
      "Destaque do título e proposta",
      "Apoio visual básico para divulgação",
    ],
    extra:
      "Ideal para quem quer levar a obra para fora do grupo e alcançar mais leitores.",
  },
  {
    titulo: "Divulgação no Jornal Lunar",
    subtitulo: "",
    icone: "📰",
    categoria: "marketing",
    categoriaNome: "Divulgação & Marketing",
    pontos: "350 P",
    valor: "R$8,00",
    descricao:
      "Divulgação da obra em formato de matéria ou destaque no Jornal Lunar.",
    detalhes:
      "Esse serviço apresenta a obra dentro do Jornal Lunar, com uma abordagem mais textual e chamativa, valorizando a proposta da história e despertando curiosidade nos leitores.",
    inclusos: [
      "Texto de divulgação no estilo Jornal Lunar",
      "Destaque dos pontos fortes da obra",
      "Apresentação da premissa",
      "Chamada para leitura",
      "Publicação no Jornal Lunar",
    ],
    extra:
      "Indicado para obras que precisam de uma apresentação mais elaborada.",
  },
  {
    titulo: "Aesthetic",
    subtitulo: "",
    icone: "✨",
    categoria: "design",
    categoriaNome: "Design & Identidade",
    pontos: "200 P",
    valor: "R$9,00",
    descricao:
      "Imagem estética inspirada na obra, personagem, casal, universo ou cena.",
    detalhes:
      "O Aesthetic é uma composição visual que traduz a atmosfera da história em imagens, cores e elementos simbólicos. Serve para divulgação, apresentação de personagens ou fortalecimento da identidade visual da obra.",
    inclusos: [
      "Montagem estética personalizada",
      "Escolha de imagens e elementos visuais",
      "Paleta inspirada na obra",
      "Composição pronta para divulgação",
      "Ajuste simples, se necessário",
    ],
    extra: "Pode ser feito para obra, personagem, casal, cena ou universo.",
  },
  {
    titulo: "Divisória",
    subtitulo: "",
    icone: "📜",
    categoria: "design",
    categoriaNome: "Design & Identidade",
    pontos: "350 P",
    valor: "R$10,50",
    descricao:
      "Arte divisória para capítulos, cenas, posts ou materiais da obra.",
    detalhes:
      "A Divisória ajuda a deixar o material mais bonito e organizado, criando uma separação visual personalizada de acordo com a estética da história.",
    inclusos: [
      "Criação de divisória personalizada",
      "Elementos visuais combinando com a obra",
      "Arquivo pronto para uso",
      "Ajuste de cores e estilo",
      "Entrega em imagem",
    ],
    extra: "Pode ser usada em capítulos, ebooks, posts ou apresentações.",
  },
  {
    titulo: "Banner",
    subtitulo: "",
    icone: "🖼️",
    categoria: "design",
    categoriaNome: "Design & Identidade",
    pontos: "400 P",
    valor: "R$15,00",
    descricao:
      "Banner personalizado para divulgar obra, personagem, evento, capítulo ou projeto.",
    detalhes:
      "O Banner é uma arte de divulgação mais completa, feita para chamar atenção e apresentar uma informação principal de forma visualmente forte.",
    inclusos: [
      "Criação de arte personalizada",
      "Inserção de título e texto principal",
      "Composição visual com a estética desejada",
      "Ajuste para formato combinado",
      "Entrega em imagem pronta para publicação",
    ],
    extra:
      "Pode ser feito em formato horizontal, vertical ou quadrado, conforme necessidade.",
  },
  {
    titulo: "Capa Gerada por IA",
    subtitulo: "",
    icone: "🤖",
    categoria: "design",
    categoriaNome: "Design & Identidade",
    pontos: "350 P",
    valor: "R$20,00",
    descricao:
      "Capa criada com auxílio de inteligência artificial, pensada para representar a essência da obra.",
    detalhes:
      "Esse serviço utiliza IA para criar a imagem-base da capa, com ajustes de composição e inserção das informações principais da obra.",
    inclusos: [
      "Criação do conceito visual",
      "Geração da imagem por IA",
      "Ajuste da composição",
      "Inserção de título",
      "Inserção do nome do autor",
      "Finalização básica da capa",
    ],
    extra:
      "Indicado para autores que querem uma capa visualmente bonita com custo mais acessível.",
  },
  {
    titulo: "Capa Manipulada",
    subtitulo: "",
    icone: "📕",
    categoria: "design",
    categoriaNome: "Design & Identidade",
    pontos: "500 P",
    valor: "Valor a combinar",
    descricao:
      "Capa criada ou manipulada por um astronauta, com acabamento mais personalizado.",
    detalhes:
      "A Capa Manipulada envolve uma criação mais manual e personalizada, feita por um astronauta da Loja Lunar, a partir de composição, edição, desenho ou manipulação visual, dependendo da proposta da obra.",
    inclusos: [
      "Criação personalizada da capa",
      "Manipulação ou composição visual",
      "Ajuste de cores e atmosfera",
      "Inserção de título e nome do autor",
      "Acabamento mais elaborado",
    ],
    extra: "O valor em dinheiro é combinado conforme a complexidade da capa.",
  },
  {
    titulo: "Trilha Sonora Autoral",
    subtitulo: "Composição",
    icone: "🎼",
    categoria: "design",
    categoriaNome: "Design & Identidade",
    pontos: "200 P",
    valor: "R$8,00",
    descricao:
      "Criação da letra de uma trilha sonora autoral inspirada na obra, personagem ou universo.",
    detalhes:
      "Esse serviço entrega uma composição em formato de letra musical, criada com base na atmosfera, nos temas e nas emoções da história.",
    inclusos: [
      "Criação de letra autoral",
      "Tema inspirado na obra ou personagem",
      "Estrutura musical básica",
      "Adaptação ao clima desejado",
      "Entrega do texto da composição",
    ],
    extra: "Esse serviço inclui apenas a letra, não inclui produção musical.",
  },
  {
    titulo: "Trilha Sonora Autoral",
    subtitulo: "Composição + Produção",
    icone: "🎧",
    categoria: "design",
    categoriaNome: "Design & Identidade",
    pontos: "400 P",
    valor: "R$12,00",
    descricao:
      "Criação da letra e produção musical com programa, formando uma trilha sonora mais completa.",
    detalhes:
      "Esse serviço inclui a composição da letra e uma produção feita com auxílio de programa, criando uma versão musical mais próxima de uma trilha finalizada.",
    inclusos: [
      "Criação da letra autoral",
      "Produção musical com programa",
      "Adaptação ao clima da obra",
      "Estrutura sonora básica",
      "Entrega da trilha produzida",
    ],
    extra:
      "Indicado para autores que querem uma música personalizada para obra, personagem, casal ou cena.",
  },
  {
    titulo: "Audiobook",
    subtitulo: "Narração",
    icone: "🎙️",
    categoria: "design",
    categoriaNome: "Design & Identidade",
    pontos: "A partir de 500 P",
    valor: "A partir de R$10,00",
    descricao: "Narração de um poema ou trecho da obra em formato de áudio.",
    detalhes:
      "O Audiobook é indicado para autores que desejam transformar um poema ou trecho da obra em uma narração personalizada, criando uma experiência sonora para divulgação, apresentação ou ambientação do projeto.",
    inclusos: [
      "Narração de poema ou trecho da obra",
      "Até 2 min: 500 P / R$10,00",
      "Até 5 min: 800 P / R$15,00",
      "Mais de 5 min: valores e tempo a tratar",
    ],
    extra:
      "O prazo e o valor podem variar conforme o tamanho do trecho e a complexidade da narração.",
  },
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
let ultimoFocoAntesDoModal = null;

/*
  LINK DO GRUPO DA LOJA LUNAR

  Quando você tiver o link real do grupo, troque aqui.
  Exemplo:
  const linkGrupoWhatsapp = "https://chat.whatsapp.com/ABC123456789";
*/

const linkGrupoWhatsapp = "https://chat.whatsapp.com/LvYSa0171jXEPFCFXAaX1w";
botaoWhatsapp.href = linkGrupoWhatsapp;

function carregarCatalogo(categoria = "todos") {
  catalogo.replaceChildren();

  const listaFiltrada =
    categoria === "todos"
      ? servicos
      : servicos.filter((servico) => servico.categoria === categoria);

  listaFiltrada.forEach((servico) => {
    const card = document.createElement("article");
    const icone = document.createElement("div");
    const titulo = document.createElement("h2");
    const preco = document.createElement("div");

    card.classList.add("card");
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-haspopup", "dialog");
    card.setAttribute(
      "aria-label",
      `Ver detalhes de ${servico.titulo}${servico.subtitulo ? " — " + servico.subtitulo : ""}`,
    );

    icone.classList.add("icone");
    icone.textContent = servico.icone;

    titulo.textContent = servico.titulo;

    preco.classList.add("preco");
    preco.textContent = `${servico.pontos} / ${servico.valor}`;

    card.append(icone, titulo);

    if (servico.subtitulo) {
      const subtitulo = document.createElement("p");
      subtitulo.classList.add("subtitulo-card");
      subtitulo.textContent = servico.subtitulo;
      card.appendChild(subtitulo);
    }

    card.appendChild(preco);

    card.addEventListener("click", () => abrirModal(servico));
    card.addEventListener("keydown", (evento) => {
      if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault();
        abrirModal(servico);
      }
    });

    catalogo.appendChild(card);
  });
}

function abrirModal(servico) {
  ultimoFocoAntesDoModal = document.activeElement;
  modalIcone.textContent = servico.icone;

  modalTitulo.textContent = servico.subtitulo
    ? `${servico.titulo} — ${servico.subtitulo}`
    : servico.titulo;

  modalCategoria.textContent = servico.categoriaNome;
  modalPontos.textContent = `✦ ${servico.pontos}`;
  modalValor.textContent = servico.valor;

  modalDescricao.replaceChildren();
  const descricaoDestaque = document.createElement("strong");
  descricaoDestaque.textContent = servico.descricao;
  modalDescricao.append(
    descricaoDestaque,
    document.createElement("br"),
    document.createElement("br"),
    document.createTextNode(servico.detalhes),
  );

  modalExtra.textContent = `✦ ${servico.extra}`;

  modalInclusos.replaceChildren();

  servico.inclusos.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    modalInclusos.appendChild(li);
  });

  const mensagem = `Olá! Tenho interesse no serviço: ${servico.titulo}${servico.subtitulo ? " — " + servico.subtitulo : ""}.

Categoria: ${servico.categoriaNome}
Valor em pontos: ${servico.pontos}
Valor em dinheiro: ${servico.valor}

Poderia me passar mais informações sobre como solicitar?`;

  botaoWhatsapp.textContent = "Solicitar no grupo ✦";

  botaoWhatsapp.onclick = async function (event) {
    event.preventDefault();

    try {
      if (!navigator.clipboard || !window.isSecureContext) {
        throw new Error("Clipboard indisponível neste contexto.");
      }

      await navigator.clipboard.writeText(mensagem);
      alert(
        "Mensagem copiada! Agora é só colar e enviar no grupo da Loja Lunar.",
      );
    } catch (erro) {
      alert(
        "Não consegui copiar automaticamente. Copie as informações do serviço e envie no grupo da Loja Lunar.",
      );
    }

    window.open(linkGrupoWhatsapp, "_blank", "noopener");
  };

  modal.classList.add("ativo");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-aberto");
  fecharModal.focus();
}

function fechar() {
  modal.classList.remove("ativo");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-aberto");

  if (ultimoFocoAntesDoModal instanceof HTMLElement) {
    ultimoFocoAntesDoModal.focus();
  }
}

function atualizarEstadoFiltros(botaoAtivo) {
  filtros.forEach((filtro) => {
    const ativo = filtro === botaoAtivo;
    filtro.classList.toggle("ativo", ativo);
    filtro.setAttribute("aria-pressed", String(ativo));
  });
}

function manterFocoNoModal(evento) {
  if (evento.key !== "Tab" || !modal.classList.contains("ativo")) {
    return;
  }

  const elementosFocaveis = modal.querySelectorAll(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
  );

  if (elementosFocaveis.length === 0) {
    return;
  }

  const primeiroElemento = elementosFocaveis[0];
  const ultimoElemento = elementosFocaveis[elementosFocaveis.length - 1];

  if (evento.shiftKey && document.activeElement === primeiroElemento) {
    evento.preventDefault();
    ultimoElemento.focus();
  } else if (!evento.shiftKey && document.activeElement === ultimoElemento) {
    evento.preventDefault();
    primeiroElemento.focus();
  }
}

filtros.forEach((botao) => {
  botao.addEventListener("click", () => {
    atualizarEstadoFiltros(botao);

    const categoria = botao.dataset.categoria;
    carregarCatalogo(categoria);
  });
});

fecharModal.addEventListener("click", fechar);
botaoFechar.addEventListener("click", fechar);

modal.addEventListener("click", (evento) => {
  if (evento.target === modal) {
    fechar();
  }
});

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape" && modal.classList.contains("ativo")) {
    fechar();
  }
});

document.addEventListener("keydown", manterFocoNoModal);

carregarCatalogo();
