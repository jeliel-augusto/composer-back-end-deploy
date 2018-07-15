function turma(connection){
    this._connection = connection;
}

turma.prototype.lastSimTurma = function(callback){
    this._connection.query("SELECT MAX(id_turma) as id_turma FROM "
    + "turma_has_simulado", callback);
}

turma.prototype.addSimTurma = function(params, callback){
    this._connection.query("INSERT INTO turma_has_simulado SET ?", params, callback);
}

module.exports = turma;