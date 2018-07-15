function pesquisa(connection){
    this._connection = connection;
}
pesquisa.prototype.pesquisar_questionario_por_id = function(id,callback){
    let query = "SELECT *, 'Q' as tipo FROM oa_questionario WHERE id_questionario = "+id;
    this._connection.query(query,callback);
}
module.exports = pesquisa;