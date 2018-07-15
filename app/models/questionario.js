function questionario(connection){
    this._connection = connection;
}

questionario.prototype.questions = function(id_questionario, callback){
    this._connection.query("SELECT OA_questoes_id_questao as id,oa_questoes.enunciado, oa_questoes.NDQ FROM oa_questionario_has_oa_questoes,oa_questoes "
        + "WHERE OA_questionario_id_questionario = '"+id_questionario+"'"
        + "AND OA_questoes_id_questao = oa_questoes.id_questao", callback);
}

questionario.prototype.addVersao = function(params, callback){
    this._connection.query("INSERT INTO versao_questionario SET ?", params,
        callback);
}
questionario.prototype.vincularQuestao = function(vincular_questao_questionario,callback){
    this._connection.query("INSERT INTO oa_questionario_has_oa_questoes SET ?"
    ,vincular_questao_questionario,callback);    
}
questionario.prototype.getLastIDVersaoQuestionario = function(callback){
    this._connection.query("SELECT MAX(id_versao_questionario) AS id "
    + "FROM versao_questionario", callback);
}
questionario.prototype.getLastIDQuestionario = function(callback){
    this._connection.query("SELECT MAX(id_questionario) AS id "
    + "FROM oa_questionario", callback);
}
questionario.prototype.addQuestionario = function(questionario,callback){
    this._connection.query("INSERT INTO oa_questionario SET ?",questionario,callback); 
}
module.exports = questionario;