const {contas, saques, depositos, transferencias} = require("../bancodedados")
const {format} = require("date-fns")

const listarContas = (req, res) =>{

    const {senha_banco} = req.query

    if (!senha_banco) {

        return res.status(400).json("Senha não digitada")
    }
    if (senha_banco !== "Cubos123Bank") {

        return res.status(401).json("A senha do banco informada é inválida.")
    }

    if (contas.length === 0) {

        res.json("Nenhuma conta cadastrada no momento!")
    } else {

        return res.json(contas)
    }
    
    
}

const criarConta = (req, res) =>{

    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body
    let identificador = contas.length + 1

    const novaConta = {

        id: identificador,
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha,
        saldo: 0
    }
    
    for (let i = 0; i < contas.length; i++) {
        const {cpf, email} = contas[i]
        if (cpf === novaConta.cpf || email === novaConta.email) {
            return res.status(400).json({"mensagem": "Já existe uma conta com o cpf ou e-mail informado!"})
        }
        
    }
    contas.push(novaConta)
    return res.status(201).json()

}

const atualizarConta = (req, res) =>{

const {nome, cpf, data_nascimento, telefone, email, senha} = req.body
const objetoBody = req.body
const {numeroConta} = req.params

//validando campos obritatórios
for (const propriedade in objetoBody) {
        
    if (!objetoBody[propriedade]) {
        return res.status(400).json({"mensagem": `O(a) ${propriedade} é obrigatório(a)!`})
    }
    
}

const contaEncontrada = contas.find((conta) =>{ //conta com o id do url 

    return conta.id === Number(numeroConta)
        
})

//validando campos iguais
for (let i = 0; i < contas.length; i++) {
    const {cpf, email} = contas[i]
    if (cpf === objetoBody.cpf || email === objetoBody.email) {
        return res.status(400).json({"mensagem": "Já existe uma conta com o cpf ou e-mail informado!"})
    }
}

//atualizando dados
contaEncontrada.nome = nome
contaEncontrada.cpf = cpf
contaEncontrada.data_nascimento = data_nascimento
contaEncontrada.telefone = telefone
contaEncontrada.email = email
contaEncontrada.senha = senha

return res.status(203).send()
}

const deletarConta = (req, res) =>{
    const {numeroConta} = req.params
    const id = Number(numeroConta)
    
    //validando parametro
    const validarId = contas.some( conta =>{
        return conta.id === id
    })
    if (!validarId) {
        
        return res.status(404).json({"mensagem": "Numero da conta inválido!"})
    }
    const contaEncontrada = contas.find((conta) =>{ //conta com o id do url 

        return conta.id === Number(numeroConta)
            
    })
    if (contaEncontrada.saldo === 0) {
        const indice = contas.findIndex((conta) =>{
            return conta.id === id
        })
        contas.splice(indice, 1)
        return res.status(204).json() 
    } else {

        return res.status(400).json({"mensagem": "A conta só pode ser removida se o saldo for zero!"})
    }

}

const depositarValor = (req, res) =>{
    const {numero_conta, valor} = req.body
    
    //validar numero da conta
    const validar_numero_conta = contas.some( (conta) =>{
        return conta.id === Number(numero_conta)
    })
    
    //validar obrigatoriedade
    if (numero_conta === "" || valor <= 0 ) {
        
        return res.status(400).json({"mensagem": "O número da conta e o valor são obrigatórios!"})
    }
    //verificar se existe conta
    if (!validar_numero_conta) {

        return res.status(404).json({"mensagem": "Não existe conta com o numero informado!"})
    }
    
    const contaEncontrada = contas.find((conta) =>{ //conta com o id do url 

        return conta.id === Number(numero_conta)
            
    })

    contaEncontrada.saldo = contaEncontrada.saldo + valor
    depositos.push({
        
        "data": format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        "numero_conta": numero_conta,
        "valor": valor
        
    })
    return res.status(204).json()

}

const sacarValor = (req, res) =>{
    const {numero_conta, valor, senha} = req.body
    //validar numero da conta
    const validar_numero_conta = contas.some( (conta) =>{
        return conta.id === Number(numero_conta)
    })
    //validar obrigatoriedade
    if (numero_conta === "" || valor <= 0 || senha === "") {
        
        return res.status(400).json({"mensagem": "Todos os campos são obrigatórios!"})
    }
    //verificar se existe conta
    if (!validar_numero_conta) {

        return res.status(404).json({"mensagem": "Não existe conta com o numero informado!"})
    }
    //verificar senha
    const verificarSenha = contas.some((conta) =>{
        return conta.senha === senha
    })
    if (!verificarSenha) {
        return res.status(403).json({"mensagem": "Senha incorreta!"})
    }
    //verificar saldo
    const contaEncontrada = contas.find((conta) =>{ //conta com o id do url 

        return conta.id === Number(numero_conta)
            
    })
    //realizar saque
    const saque = contaEncontrada.saldo - valor
    if (saque < 0) {
        return res.status(400).json({"mensagem": "saldo insuficiente"})
    } else {
        saques.push({
        "data": format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        "numero_conta": numero_conta,
        "valor": valor
        })
        contaEncontrada.saldo -= valor;
        
        return res.status(204).json()
    }
}

const transferirValor = (req, res) =>{

    const {numero_conta_origem, numero_conta_destino, valor, senha} = req.body
    //validar numero da conta
    const validar_conta_origem = contas.some( (conta) =>{
        return conta.id === Number(numero_conta_origem)
    })
    const validar_conta_destino = contas.some( (conta) =>{
        return conta.id === Number(numero_conta_destino)
    })
    //validar obrigatoriedade
    if (numero_conta_origem === "" || numero_conta_destino === "" || valor <= 0 || senha === "") {
        
        return res.status(400).json({"mensagem": "Todos os campos são obrigatórios!"})
    }
    //verificar se existe conta
    if (!validar_conta_origem) {

        return res.status(404).json({"mensagem": "Não existe conta com o numero informado!"})
    }
    if (!validar_conta_destino) {

        return res.status(404).json({"mensagem": "Não existe conta com o numero informado!"})
    }
    //verificar senha
    const verificarSenha = contas.some((conta) =>{
        return conta.senha === senha
    })
    if (!verificarSenha) {
        return res.status(403).json({"mensagem": "Senha incorreta!"})
    }
    //verificar conta existente
    const contaOrigemEncontrada = contas.find((conta) =>{ //conta com o id do url 

        return conta.id === Number(numero_conta_origem)
            
    })
    const contaDestinoEncontrada = contas.find((conta) =>{ //conta com o id do url 

        return conta.id === Number(numero_conta_destino)
            
    })

    if (contaOrigemEncontrada.saldo - valor < 0) {
        
        return res.status(400).json({"mensagem": "Saldo insuficiente"})
    } else {

        contaDestinoEncontrada.saldo += valor
        contaOrigemEncontrada.saldo -= valor
        //registro da transferencia
        transferencias.push({
        "data": format(new Date(), "yyyy-MM-dd HH:mm:ss") ,
        "numero_conta_origem": numero_conta_origem,
        "numero_conta_destino": numero_conta_destino,
        "valor": valor
        })

        return res.status(204).json()
        
    }
}

const verSaldo = (req, res) =>{
    //verificar numero da conta e senha
    const {numero_conta, senha} = req.query
    
    const validar_numero_conta = contas.some( (conta) =>{
        return conta.id === Number(numero_conta)
    })
    //validar obrigatoriedade
    if (numero_conta === "" || senha === "") {
        
        return res.status(400).json({"mensagem": "Numero da conta ou senha não informado!"})
    }
    //verificar se existe conta
    if (!validar_numero_conta) {

        return res.status(404).json({"mensagem": "Conta bancária não encontrada!"})
    }
    //verificar senha
    const verificarSenha = contas.some((conta) =>{
        return conta.senha === senha
    })
    if (!verificarSenha) {
        return res.status(400).json({"mensagem": "Senha incorreta!"})
    }
    const contaEncontrada = contas.find((conta) =>{ //conta com o id do url 

        return conta.id === Number(numero_conta)
            
    })
    return res.status(200).json({"saldo": contaEncontrada.saldo})
}

const verExtrato = (req, res) =>{
    //verificar numero da conta e senha
    const {numero_conta, senha} = req.query
    
    const validar_numero_conta = contas.some( (conta) =>{
        return conta.id === Number(numero_conta)
    })
    //validar obrigatoriedade
    if (numero_conta === "" || senha === "") {
        
        return res.status(400).json({"mensagem": "Numero da conta ou senha não informado!"})
    }
    //verificar se existe conta
    if (!validar_numero_conta) {

        return res.status(404).json({"mensagem": "Conta bancária não encontrada!"})
    }
    //verificar senha
    const verificarSenha = contas.some((conta) =>{
        return conta.senha === senha
    })
    if (!verificarSenha) {
        return res.status(403).json({"mensagem": "Senha incorreta!"})
    }
    
    const depositosConta = depositos.filter((elemento) =>{
        return elemento.numero_conta === numero_conta
    })
    
    const saquesConta = saques.filter((elemento) =>{
        return elemento.numero_conta === numero_conta
    })
    const transfEnviadas = transferencias.filter((elemento) =>{
        return elemento.numero_conta_origem === numero_conta
    })
    const transfRecebidas = transferencias.filter((elemento) =>{
        return elemento.numero_conta_destino === numero_conta
    })

    //extrato bancário
    return res.status(201).json(
    {
        "depositos": depositosConta,
        "saques": saquesConta,
        "transferenciasEnviadas": transfEnviadas,
        "transferenciasRecebidas": transfRecebidas
            
    })
    

}
module.exports = {
    listarContas,
    criarConta,
    atualizarConta,
    deletarConta,
    depositarValor,
    sacarValor,
    transferirValor,
    verSaldo,
    verExtrato
}