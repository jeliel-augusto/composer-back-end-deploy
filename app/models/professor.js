function professor(connection){
    this._connection = connection;
}

professor.prototype.getLastIDProfessor = function(callback){
    this._connection.query("SELECT MAX(id_professor) as id_professor FROM professor", callback);
}

professor.prototype.idDadosPessoais = function(callback){
    this._connection.query("SELECT MAX(id_dados_pessoais) as id_dados_pessoais "
    + "FROM dados_pessoais", callback);
}

professor.prototype.cadastraDados = function(params, callback){
    this._connection.query("INSERT INTO dados_pessoais SET ?", params, callback);
}

professor.prototype.cadastraProfessor = function(params, callback){
    this._connection.query("INSERT INTO professor SET ?", params, callback);
}

professor.prototype.login = function(cpf, callback){
    this._connection.query("SELECT *FROM dados_pessoais WHERE "
    + "CPF = '" + cpf + "'", callback);
}

professor.prototype.cpfExist = function(cpf, callback){
    this._connection.query("SELECT CPF FROM dados_pessoais WHERE "
    + "CPF = '" + cpf + "'", callback);
}

professor.prototype.rgExiste = function(rg, callback){
    this._connection.query("SELECT RG FROM dados_pessoais WHERE "
    + "RG = '" + rg + "'", callback);
}

/*----------------- Queries relacionadas a endereço */

professor.prototype.getLastUF = function(callback){
    this._connection.query("SELECT MAX(id_UF) as id_UF FROM uf", callback);
}

professor.prototype.addUF = function(params, callback){
    this._connection.query("INSERT INTO uf SET ?", params, callback);
}

professor.prototype.getLastCidade = function(callback){
    this._connection.query("SELECT MAX(id_cidade) as id_cidade FROM cidade", callback);
}

professor.prototype.addCidade = function(params, callback){
    this._connection.query("INSERT INTO cidade SET ?", params, callback);
}

professor.prototype.getLastBairro = function(callback){
    this._connection.query("SELECT MAX(id_bairro) as id_bairro FROM bairro", callback);
}

professor.prototype.addBairro = function(params, callback){
    this._connection.query("INSERT INTO bairro SET ?", params, callback);
}

professor.prototype.getLastEndereco = function(callback){
    this._connection.query("SELECT MAX(idendereco) as id_endereco FROM rua", callback);
}

professor.prototype.addEndereco = function(params, callback){
    this._connection.query("INSERT INTO rua SET ?", params, callback);
}

module.exports = professor;