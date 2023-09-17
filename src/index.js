const express = require("express")
const app = express()
const {listarContas, criarConta, atualizarConta, deletarConta, depositarValor, 
    sacarValor, transferirValor, verSaldo, verExtrato} = require("./controladores/controladores");
const { validarDados } = require("./intermediarios/middleware");

app.use(express.json());

app.get("/contas", listarContas)
app.post("/contas", validarDados, criarConta)
app.put("/contas/:numeroConta/usuario", atualizarConta)
app.delete("/contas/:numeroConta", deletarConta)
app.post("/transacoes/depositar", depositarValor)
app.post("/transacoes/sacar", sacarValor)
app.post("/transacoes/transferir", transferirValor)
app.get("/contas/saldo", verSaldo)
app.get("/contas/extrato", verExtrato)

app.listen(8000)