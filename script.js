// =====================================
// CADASTRO DO USUÁRIO
// =====================================

const formCadastro = document.getElementById("formCadastro");

if (formCadastro) {
  const nome = document.getElementById("nome");
  const telefone = document.getElementById("telefone");
  const nascimento = document.getElementById("nascimento");
  const mensagemCadastro = document.getElementById("mensagemCadastro");

  const cadastroSalvo = localStorage.getItem("cadastroGuardiao");

  if (cadastroSalvo) {
    const dados = JSON.parse(cadastroSalvo);

    nome.value = dados.nome || "";
    telefone.value = dados.telefone || "";
    nascimento.value = dados.nascimento || "";
  }

  formCadastro.addEventListener("submit", function (event) {
    event.preventDefault();

    const dadosUsuario = {
      nome: nome.value,
      telefone: telefone.value,
      nascimento: nascimento.value,
    };

    localStorage.setItem("cadastroGuardiao", JSON.stringify(dadosUsuario));

    if (mensagemCadastro) {
      mensagemCadastro.textContent = "Cadastro salvo com sucesso!";
    }

    setTimeout(function () {
      window.location.href = "contatos.html";
    }, 700);
  });
}

// =====================================
// CONTATOS DE CONFIANÇA
// =====================================

const formContato = document.getElementById("formContato");
const listaContatos = document.getElementById("listaContatos");
const toggleContatos = document.getElementById("toggleContatos");
const areaContatos = document.getElementById("areaContatos");

if (formContato && listaContatos) {
  let contatos = JSON.parse(localStorage.getItem("contatosGuardiao")) || [];
  let contatosAbertos = false;

  function atualizarBotaoContatos() {
    if (toggleContatos) {
      toggleContatos.textContent = contatosAbertos
        ? `Meus contatos (${contatos.length}) ▲`
        : `Meus contatos (${contatos.length}) ▼`;
    }
  }

  function mostrarContatos() {
    listaContatos.innerHTML = "";

    if (contatos.length === 0) {
      listaContatos.innerHTML =
        "<p class='sem-contatos'>Nenhum contato cadastrado.</p>";
    } else {
      contatos.forEach(function (contato, indice) {
        const card = document.createElement("div");
        card.classList.add("card-contato");

        const nome = document.createElement("strong");
        nome.textContent = contato.nome;

        const telefone = document.createElement("span");
        telefone.textContent = contato.telefone;

        const relacao = document.createElement("small");
        relacao.textContent = contato.relacao
          ? contato.relacao
          : "Contato de confiança";

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.classList.add("botao-excluir");

        botaoExcluir.addEventListener("click", function () {
          contatos.splice(indice, 1);

          localStorage.setItem("contatosGuardiao", JSON.stringify(contatos));

          mostrarContatos();
        });

        card.appendChild(nome);
        card.appendChild(telefone);
        card.appendChild(relacao);
        card.appendChild(botaoExcluir);

        listaContatos.appendChild(card);
      });
    }

    atualizarBotaoContatos();
  }

  formContato.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nomeContato").value.trim();
    const telefone = document.getElementById("telefoneContato").value.trim();
    const relacao = document.getElementById("relacaoContato").value;

    if (!nome || !telefone) {
      return;
    }

    const novoContato = {
      nome: nome,
      telefone: telefone,
      relacao: relacao,
    };

    contatos.push(novoContato);

    localStorage.setItem("contatosGuardiao", JSON.stringify(contatos));

    formContato.reset();
    mostrarContatos();
  });

  if (toggleContatos && areaContatos) {
    toggleContatos.addEventListener("click", function () {
      contatosAbertos = !contatosAbertos;

      if (contatosAbertos) {
        areaContatos.classList.remove("escondido");
      } else {
        areaContatos.classList.add("escondido");
      }

      atualizarBotaoContatos();
    });
  }

  mostrarContatos();
}
