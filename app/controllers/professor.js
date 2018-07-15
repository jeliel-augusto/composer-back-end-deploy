var connection = require('../../config/connection');
var professorModel = require('../models/professor');
var cpf = require('cpf');
var professor = new professorModel(connection);

exports.cadastrarProfessor = function (request, resposta) {
    validacao(request)
    .then((response) => {
        if(response){
            console.log(response);
            resposta(200, "Erro de validação: " + response);
            return null;
        }
        else if(!cpf.isValid(request.body.cpf)){
            resposta(400, "CPF inválido!");
            return null;
        }
        else
            return exist(request.body.cpf, request.body.rg);
    })
    .then((response) => {
        if(response == null)
            return null;
        else if(response){
            resposta(400, "CPF Já existe!");
            return null;
        }
        else
            return cadastraEnderecos(request);
    })
    .then((response) => {
        if(response == null)
            return null;
        return cadastra(request, response);
    })
    .then((response) => {
        if(response == null)
            return null;
        if(response){
            resposta(200, "OK");
            return true;
        }
        else{
            resposta(400, "Erro: " + response);
            return false;
        }
    })
    .catch((error) => {
        console.log(error);
        resposta(400, "Erro: " + error);
    });
}

exports.login = function (req, resposta) {
    if (!cpf.isValid(req.cpf)) {
        resposta(400, "CPF Inválido!!");
        return;
    }

    const id_professor = req.cpf;
    professor.login(id_professor, (error, dados) => {
        if (error) {
            resposta(400, 'Erro: ' + error);
            return;
        }

        if (dados.length == 0) {
            resposta(200, 'CPF ou senha inválido(s)!');
        }
        else {
            resposta(200, "OK");
        }
    });
}

/*--------------Funções auxiliares------------------*/

function validacao(req) {
    return new Promise((resolve, reject) => {
        req.assert('nome', 'Campo Obrigatório').notEmpty();
        req.assert('data_admissao', 'Campo obrigatório').notEmpty();
        req.assert('salario_base', 'Campo obrigatório').notEmpty();
        req.assert('salario_base', 'Somente números').isDecimal(); //Não funciona

        req.assert('cpf', 'Campo Obrigatório').notEmpty();
        req.assert('rg', 'Campo obrigatório').notEmpty();

        req.assert('data_nascimento', 'Campo obrigatório').notEmpty();
        req.assert('idade', 'Campo obrigatório').notEmpty();
        req.assert('telefone', 'Campo obrigatório').notEmpty();
        req.assert('senha', 'Campo obrigatório!').notEmpty();

        req.assert('nome_rua', 'Campo obrigatório!').notEmpty();
        req.assert('numero_casa', 'Campo obrigatório!').notEmpty();
        req.assert('nome_bairro', 'Campo obrigatório!').notEmpty();
        req.assert('CEP', 'Campo obrigatório!').notEmpty();
        req.assert('complemento', 'Campo obrigatório!').notEmpty();
        req.assert('nome_cidade', 'Campo obrigatório!').notEmpty();

        var errors = req.validationErrors();
        if (errors)
            resolve(errors);
        resolve(false);
    });
}

function exist(cpf, rg) {
    return new Promise((resolve, reject) => {
        professor.cpfExist(cpf, function(error, result){
            if(error){
                reject(error);
            }
            else if(result.length > 0)
                resolve(true);
            else
                resolve(false);
        });
    });
}

function cadastraEnderecos(request){
    return new Promise((resolve, reject) => {
        var params = request.body;
        professor.getLastUF(function(error, result){
            if(error)
                return reject(error);
            var id_UF = result[0].id_UF == null ? 1 : result[0].id_UF + 1;
            let uf_json = {
                id_UF : id_UF,
                nome_UF : params.nome_UF
            }

            professor.addUF(uf_json, function(error, response){
                if(error)
                    return reject(error);
                professor.getLastCidade(function(error, result){
                    if(error)
                        return reject(error);
                    var id_cidade = result[0].id_cidade == null ? 1 : result[0].id_cidade + 1;
                    let cidade_json = {
                        id_cidade : id_cidade,
                        nome_cidade : params.nome_cidade,
                        nome_estado : params.nome_UF,
                        id_UF : id_UF
                    }

                    professor.addCidade(cidade_json, function(error, response){
                        if(error)
                            return reject(error);
                        professor.getLastBairro(function(error, result){
                            if(error)
                                return reject(error);
                            var id_bairro = result[0].id_bairro == null ? 1 : result[0].id_bairro;
                            let bairro_json = {
                                nome_bairro : params.nome_bairro,
                                id_cidade : id_cidade
                            }

                            professor.addBairro(bairro_json, function(error, response){
                                if(error)
                                    return reject(error);
                                professor.getLastEndereco(function(error, result){
                                    if(error)
                                        return reject(error);
                                    var id_endereco = result[0].id_endereco == null ? 1 : result[0].id_endereco + 1;
                                    let endereco_json = {
                                        idendereco : id_endereco,
                                        nome_rua : params.nome_rua,
                                        numero_casa : params.numero_casa,
                                        CEP : params.CEP,
                                        complemento : params.complemento,
                                        id_bairro : id_bairro
                                    }

                                    professor.addEndereco(endereco_json, function(error, response){
                                        if(error)
                                            return reject(error);
                                        return resolve(id_endereco);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function cadastra(params, id_endereco){
    return new Promise((resolve, reject) => {
        var req = params.body;
        professor.idDadosPessoais(function (error, result) { //Pega o último ID da tabela dados_pessoais
            if (error) {
                return reject(error);
            }
            var id_dados_pessoais = result[0].id_dados_pessoais;
            if (id_dados_pessoais == null)
                id_dados_pessoais = 0;
            id_dados_pessoais++;

            let dados_json = { //JSON com os dados pessoais
                id_dados_pessoais: id_dados_pessoais,
                CPF: req.cpf,
                RG: req.rg,
                data_nascimento: req.data_nascimento,
                idade: req.idade,
                sexo: req.sexo,
                telefone: req.telefone,
                senha : req.senha,
                rua_idendereco: id_endereco
            }

            professor.cadastraDados(dados_json, function (error, response) { //Adiciona campo na tabela dados_pessoais
                if (error) {
                    return reject(error);
                }

                professor.getLastIDProfessor(function (error, result) { //Último ID da tabela professor
                    if (error) {
                        return reject(error);
                    }

                    var id_professor = result[0].id_professor == null ? 1 : result[0].id_professor + 1;
                    let professor_json = {
                        id_professor: id_professor,
                        nome: req.nome,
                        data_admissao: req.data_admissao,
                        salario_base: req.salario_base,
                        id_dados_pessoais: id_dados_pessoais
                    }

                    professor.cadastraProfessor(professor_json, function (error, response) {
                        if (error) {
                            return reject(error);
                        }
                        return resolve("OK");
                    });
                });
            });
        });
    });
}