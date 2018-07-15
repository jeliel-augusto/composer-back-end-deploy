function disciplina(connection){
    this._connection = connection;
}
disciplina.prototype.listarDisciplinas = function(id_disciplina,callback){
    this._connection.query("SELECT id_disciplina, nome_disciplina FROM disciplina",id_disciplina,callback);
}
module.exports = function(){
    return disciplina;
}