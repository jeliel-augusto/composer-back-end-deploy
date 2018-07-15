var Connection = require('../../config/connection');
var Pesquisa = require('../models/pesquisa');
const CoordenadorModel = require('../models/coordenador');
exports.listaTodasDisciplinas = function(params,app,resposta){
    var id_coordenador = params.id_coordenador;
    //Todas as disciplinas de um curso de um coordenador
    var Coordenador = new CoordenadorModel(Connection);
    Coordenador.getAllDisciplinas(id_coordenador,(err,results)=>{
        if(err){
            resposta(400,err);
            return;
        }
        resposta(200,results);
    });
};
exports.listaTurmasDisciplina = function(params,app,resposta){
    var id_disciplina = params.id_disciplina;
    var id_coordenador = params.id_coordenador;
    var Coordenador = new CoordenadorModel(Connection);
    //Todas as turmas da disciplina do curso do coordenador
    Coordenador.getTurmasDisciplinas(id_disciplina,id_coordenador,(err,results)=>{
        if(err){
            resposta(400,err);
            return;
        }
        resposta(200,results);
    });
};
exports.listaAulasDisciplinaTurma = function(params,app,resposta){
    var id_disciplina =  params.id_disciplina;
    var id_turma = params.id_turma;
    //Todas as aulas da turma
    var Coordenador = new CoordenadorModel(Connection);
    Coordenador.getAulasTurma(id_turma,id_disciplina,(err,results)=>{
        if(err){
            resposta(400,err);
            return;
        }
        resposta(200,results);
    });
};
exports.listaQuestionariosAula = function(params,app,resposta){
    var id_aula = params.id_aula;
    //Todos os questionarios da turma e da disciplina
    var Coordenador = new CoordenadorModel(Connection);
    Coordenador.getQuestionariosAula(id_aula,(err,results)=>{
        if(err){
            resposta(400,err);
            return;
        }
        resposta(200,results);
    });
};
exports.pesquisarQuestionariosPorId = function(params,app,resposta){
    var id = params.id;
    var pesquisa = new Pesquisa(Connection);
    pesquisa.pesquisar_questionario_por_id(id,(err,results)=>{
        if(err){resposta(400,err); return;}
        resposta(200,results);
    });
}
exports.listarAllTurmas = function(params,app,resposta){
    var id_coordenador = params.id_coordenador;
    var Coordenador = new CoordenadorModel(Connection);
    Coordenador.getTurmas(id_coordenador,(err,results)=>{
        if(err){
            resposta(400,err);
            return;
        }
        resposta(200,results);
    });
}
// exports.ligar_simulado_turma = function(req,res){
//     var id_turma = req.params.id_turma;
//     var id_simulado = req.params.id_simulado;
//     data={
//         id_turma: id_turma,
//         id_simulado: id_simulado
//     };
//     //Todos os questionarios da turma e da disciplina
//     req.getConnection(function(err,connection){
//         connection
//         .query("INSERT INTO turma_has_simulado SET ?",data,(err,rows)=>{
//             if(err) console.log("Error saving: %s",err);
//             res.send(rows);
//         });
//     });
// };