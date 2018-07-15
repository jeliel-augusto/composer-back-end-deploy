function coordenador(connection){
    this._connection = connection;
}
coordenador.prototype.getLastID = function(callback){
    this._connection.query("SELECT MAX(id_coordenador) AS id "
    + "FROM coordenador", callback);
}
coordenador.prototype.getAllDisciplinas = function(id_coordenador,callback){
    this._connection.query("SELECT DISTINCT disciplina.id_disciplina,disciplina.nome_disciplina FROM coordenador,turma,curso, turma_has_disciplina, disciplina WHERE coordenador.id_coordenador = ?"
    +" AND turma.id_curso = curso.id_curso AND curso.id_curso = coordenador.curso_id_curso AND turma.id_turma = turma_has_disciplina.turma_id_turma"+
    " AND disciplina.id_disciplina = turma_has_disciplina.disciplina_id_disciplina ",[id_coordenador], callback);
}
coordenador.prototype.getTurmasDisciplinas = function(id_disciplina,id_coordenador,callback){
    this._connection.query("SELECT turma.id_turma,turma.turno FROM coordenador, turma, disciplina,turma_has_disciplina WHERE turma.id_curso = coordenador.curso_id_curso"+ 
    " AND coordenador.id_coordenador = ?"+ 
    " AND turma_has_disciplina.disciplina_id_disciplina = disciplina.id_disciplina AND turma.id_turma = turma_has_disciplina.turma_id_turma AND disciplina.id_disciplina = ?",[id_coordenador,id_disciplina],callback);
}
coordenador.prototype.getAulasTurma = function(id_turma,id_disciplina,callback){
    this._connection.query("SELECT aula.id_aula, aula.descricao_aula FROM aula_has_turma, aula WHERE aula.id_aula = aula_has_turma.aula_id_aula AND aula_has_turma.turma_id_turma = ? AND aula.id_disciplina = ?",[id_turma,id_disciplina],callback);
}
coordenador.prototype.getQuestionariosAula = function(id_aula,callback){
    this._connection.query("SELECT oa_questionario.id_questionario, oa_questionario.descricao_OA FROM oa_questionario, aula_has_oa_questionario WHERE aula_has_oa_questionario.aula_id_aula = ? AND aula_has_oa_questionario.OA_questionario_id_questionario = oa_questionario.id_questionario",[id_aula],callback);
}
coordenador.prototype.getTurmas = function(id_coordenador,callback){
    this._connection.query("SELECT turma.id_turma, turma.turno FROM turma, coordenador WHERE coordenador.curso_id_curso = turma.id_curso AND coordenador.id_coordenador = ?",[id_coordenador],callback);
}
module.exports = coordenador;