# API-bank

### 💻:books:sobre o projeto 
Projeto de uma API simulando um banco digital desenvolvida para o desafio do **Modulo-2** do curso **Intensivo** de </br>
**DESENVOLVIMENTO DE SOFTWARE - BACKEND** ministrado pela **[cubos academy](https://cubos.academy/)**

---
### ⚙️Funcionalidades 
Como a API simula um banco digital, ela tem varias funções como: 


:white_check_mark: 1. Criar conta bancária </br>
:white_check_mark: 2. Listar contas bancárias</br>
:white_check_mark: 3. Atualizar os dados do usuário da conta bancária</br>
:white_check_mark: 4. Excluir uma conta bancária</br>
:white_check_mark: 5. Depósitar em uma conta bancária</br>
:white_check_mark: 6. Sacar de uma conta bancária</br>
:white_check_mark: 7. Transferir valores entre contas bancárias </br>
:white_check_mark: 8. Consultar saldo da conta bancária </br>
:white_check_mark: 9. Emitir extrato bancário </br>

---

### 🖼️Layout

Abaixo tem algumas imagens da API rodando no Insomnia*
> *Insomnia é o programa que executa o servidor criado pela API

![imagem-do-projeto](https://github.com/Vettoferreira/API-bank/assets/72666573/69139812-b170-4e23-8f04-8650be02ce41)
![imagem-do-projeto](https://github.com/Vettoferreira/API-bank/assets/72666573/ae566330-2b48-4914-ac49-599cc9b98909)
![imagem-do-projeto](https://github.com/Vettoferreira/API-bank/assets/72666573/c99c4341-4917-481c-838a-51a9d9e1a789)

---

### ⌨️Como executar o projeto

#### pré-requesitos

O projeto precisa de alguns programas para ser executados como: </br>

![git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
 ![nodejs](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
 ![insomnia](https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white)
 ![vscode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white) 
 > (editor de código de sua preferencia)

---

### 🖥️Rodando a API 

	
 ```
# Clone este repositório
~ $ git clone git@github.com:Vettoferreira/API-bank.git

# Acesse a pasta do projeto no terminal/cmd
$ cd API-bank //exemplo

# Vá para a pasta src
$ cd src

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev:src

# O servidor inciará na porta:8000 - acesse http://localhost/8000 
```

### Executando no insomnia

Já no insomnia, vão ter algumas requisições obrigatórias para se seguir </br>
como se trata de uma API bancária ela requer que você digite algumas senhas ou numero da conta para acessar o conteudo </br>
você determina a senha no controlador "listarConta" </br>
crie as requisiçôes de acordo com os verbos citados no arquivos index.js 
> exemplo: app.get("/contas, listarContas) </br>

No insominia fica: `requisição GET url: localhost/8000/contas?senha_banco=senha_desejada` </br>

segue lista de requisições:</br>
```
app.get("/contas", listarContas) ~ requer parametros na url ~ senha_banco="senha_desejada"

app.post("/contas", criarConta)| e |app.put("/contas/:numeroConta/usuario", atualizarConta)
~ requer um objeto no body com os seguintes parametros: 
{
	"nome":	 	
	"cpf": 
	"data_nascimento": 
	"telefone": 
	"email": 
	"senha":
}
app.delete("/contas/:numeroConta", deletarConta) ~ requer um parametro numerico na url

app.post("/transacoes/depositar", depositarValor) ~ requer um objeto no body com os seguintes parametros:

{
	"numero_conta": ,
	"valor": ,
	
}

app.post("/transacoes/sacar", sacarValor) ~ requer um objeto no body com os seguintes parametros:
{
	"numero_conta": ,
	"valor": ,
	"senha": 
}

app.post("/transacoes/transferir", transferirValor) ~ requer um objeto no body com os seguintes parametros:
{
	"numero_conta_origem": ,
	"numero_conta_destino": ,
	"valor": ,
	"senha": 
}
app.get("/contas/saldo", verSaldo)| e |app.get("/contas/extrato", verExtrato) ~ requer dois parametros na url: ?numero_conta=3&senha=12345
```

--- 

### Agora é só desfrutar da nossa API-Bank 👋









