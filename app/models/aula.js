function aula(connection){
    this._connection = connection;
}
aula.prototype.addAula = function(aula,callback){
    this._connection
    .query("INSERT INTO aula SET ?",aula,callback);
}
aula.prototype.getLastID = function(callback){
    this._connection.query("SELECT MAX(id_aula) AS id "
    + "FROM aula", callback);
}
aula.prototype.aulas = function(id_disciplina,callback){
    this._connection.query("SELECT id_aula as id, descricao_aula FROM aula WHERE id_disciplina = ?",[id_disciplina],callback);
}
aula.prototype.vincularQuestionario = function(vincularQuestionario,callback){
    this._connection.query("INSERT INTO aula_has_oa_questionario SET ?",[vincularQuestionario],callback);   
}
module.exports = aula;