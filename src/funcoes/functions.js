
function validarObrigatorieda(objeto) {

    //validar obrigatoriedade
    for (const propriedade in objeto) {
        
        if (!objeto[propriedade]) {
            return {"mensagem": `O(a) ${propriedade} é obrigatório(a)!`}
        }
    }
}

module.exports = {
    validarObrigatorieda
    
}