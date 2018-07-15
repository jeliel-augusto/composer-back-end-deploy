function questao(connection){
    this._connection = connection;
}
questao.prototype.addQuestao = function(questao,callback){
    this._connection
    .query("INSERT INTO oa_questoes SET ?",questao,callback);
}
questao.prototype.getLastID = function(callback){
    this._connection.query("SELECT MAX(id_questao) AS id "
    + "FROM oa_questoes", callback);
}
module.exports = function(){
    return questao;
}