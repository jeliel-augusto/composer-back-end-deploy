function topico(connection){
    this._connection = connection;
}
topico.prototype.addtopico = function(topico,callback){
    this._connection
    .query("INSERT INTO topico SET ?",topico,callback);
}
topico.prototype.getLastID = function(callback){
    this._connection.query("SELECT MAX(id_topico) AS id "
    + "FROM topico", callback);
}
topico.prototype.vincularQuestaoTopico = function(vincular_questao_topico,callback){
    this._connection.query("INSERT INTO oa_questoes_has_topico SET ?",vincular_questao_topico,callback);
}
module.exports = function(){
    return topico;
}