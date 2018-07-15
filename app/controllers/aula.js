var Connection = require('../../config/connection');
const Aula_ = require('../models/aula');
exports.criarAula = function(params,app,resposta){
    const Conn = Connection; //conexão com o banco de dados
    var Aula = new Aula_(Conn); //objeto que faz requisições para o banco de dados    
    console.log(params);
    let aula_json = {
        id_aula: 0,
        id_disciplina:  params.id_disciplina,
        descricao_aula: params.descricao_aula};
    Aula.getLastID(function(err,results){
        if(err){
            console.log("Erro ao selecionar ultimo Id: %s",err);
            resposta(400,'Erro');
            return;
        }
        let id_aula = (results[0].id == null ? 1 : (results[0].id+1));
        aula_json.id_aula = id_aula;
        Aula.addAula(aula_json,function(err,res){
            if(err){
                console.log("Erro ao inserir %s",err);
                return;
            }
            resposta(200,'ok');
        });
    });
}
exports.listaAulas = function(params,app,resposta){
    const Conn = Connection; //conexão com o banco de dados    
    var Aula = new Aula_(Conn); //objeto que faz requisições para o banco de dados    
    
    let id_disciplina = params.id_disciplina;
    Aula.aulas(id_disciplina,function(err,results){
        if(err){
            console.log("Erro ao selecionar aulas: %s",err);
            resposta(400,'Erro');
            return;
        }
        resposta(200,results);
    });
}
exports.listaObjetos = function(params,app,resposta){
    var idAula = params.id_aula;
    const Conn = Connection;
    const Objetos = new app.app.models.objetos(Conn); //objeto que faz requisições para o banco de dados    
    Objetos.listarObjetos(idAula,function(err,results){
        if(err){
            console.log("Error: %s",err);
            resposta(400,'Erro');
        }
        resposta(200,results);
    });
}