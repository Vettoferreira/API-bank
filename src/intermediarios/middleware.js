const {contas} = require("../bancodedados")
const validarDados = (req, res, next) =>{

    const body = req.body
    
    //validar propriedades---
    
    for (const propriedade in body) {
        
        if (!body[propriedade]) {
            return res.status(400).json({"mensagem": `O(a) ${propriedade} é obrigatório(a)!`})
        }
        
    }
    
    next()
}

module.exports = {

    validarDados
}