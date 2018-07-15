const Consts = require('../utils/consts');
function objeto(connection){
    this._connection = connection;
}
//Adicionar Objetos(Fora a questão, que é um caso especial, que se encontra no models/questao.js)
objeto.prototype.addObjeto = function(objeto,callback){
    console.log("NÃO IMPLEMENTADO");
}
objeto.prototype.getLastID = function(callback){
    this._connection.query("SELECT MAX(id_objeto) AS id "
    + "FROM objeto", callback);
}
objeto.prototype.listarObjetos = function(id_aula,callback){
    this._connection.query("SELECT oa_questionario.id_questionario as id,oa_questionario.descricao_OA as nome,oa_questionario.disciplina_id_disciplina as id_disciplina FROM oa_questionario,aula_has_oa_questionario WHERE oa_questionario.id_questionario = aula_has_oa_questionario.OA_questionario_id_questionario and aula_has_oa_questionario.aula_id_aula = ?",id_aula,callback);
}
module.exports = function(){
    return objeto;
}