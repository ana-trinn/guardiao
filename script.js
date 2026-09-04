// ========================================
// CADASTRO DO USUÁRIO
// ========================================

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
      nome: nome.value.trim(),

      telefone: telefone.value.trim(),

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

// ========================================
// CONTATOS DE CONFIANÇA
// ========================================

const formContato = document.getElementById("formContato");

const listaContatos = document.getElementById("listaContatos");

if (formContato && listaContatos) {
  let contatos = JSON.parse(localStorage.getItem("contatosGuardiao")) || [];

  function salvarContatos() {
    localStorage.setItem("contatosGuardiao", JSON.stringify(contatos));
  }

  function mostrarContatos() {
    listaContatos.innerHTML = "";

    if (contatos.length === 0) {
      const mensagem = document.createElement("p");

      mensagem.textContent = "Nenhum contato cadastrado.";

      mensagem.classList.add("sem-contatos");

      listaContatos.appendChild(mensagem);

      return;
    }

    contatos.forEach(function (contato, indice) {
      const card = document.createElement("div");

      card.classList.add("card-contato");

      const nomeContato = document.createElement("strong");

      nomeContato.textContent = contato.nome || "Contato";

      const telefoneContato = document.createElement("span");

      telefoneContato.textContent = contato.telefone || "";

      const relacaoContato = document.createElement("small");

      relacaoContato.textContent = contato.relacao || "Contato de confiança";

      const botaoExcluir = document.createElement("button");

      botaoExcluir.type = "button";

      botaoExcluir.textContent = "Excluir";

      botaoExcluir.classList.add("botao-excluir");

      botaoExcluir.addEventListener("click", function () {
        const confirmar = confirm("Deseja excluir este contato?");

        if (!confirmar) {
          return;
        }

        contatos.splice(indice, 1);

        salvarContatos();

        mostrarContatos();
      });

      card.appendChild(nomeContato);

      card.appendChild(telefoneContato);

      card.appendChild(relacaoContato);

      card.appendChild(botaoExcluir);

      listaContatos.appendChild(card);
    });
  }

  formContato.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nomeContato").value.trim();

    const telefone = document.getElementById("telefoneContato").value.trim();

    const relacao = document.getElementById("relacaoContato").value;

    if (!nome || !telefone) {
      alert("Preencha o nome e o telefone.");

      return;
    }

    const novoContato = {
      nome: nome,

      telefone: telefone,

      relacao: relacao || "Contato de confiança",
    };

    contatos.push(novoContato);

    salvarContatos();

    formContato.reset();

    mostrarContatos();
  });

  mostrarContatos();
}
