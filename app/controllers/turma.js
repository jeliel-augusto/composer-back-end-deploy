const connection = require('../../config/connection');
var turma = require('../models/turma');
turma = new turma(connection);

exports.addSimTurma = function(req, resposta){
    var id_turmas = req.id_turmas;
    var id_simulado = req.id_simulado;

    let insert = new Promise((resolve, reject) => {
        var cont = 0;
        id_turmas.forEach(id => {
            let sim_turma_json = {
                turma_id_turma : id,
                simulado_id_simulado : id_simulado
            }
    
            turma.addSimTurma(sim_turma_json, function(error, result){
                if(error)
                    return reject(error);
                cont++;
                if(cont == id_turmas.length)
                    return resolve("OK");
            });
        });
    });
    
    insert.then((response) => {
        resposta(200, "OK");
        //addSimuladoAluno(id_turmas);
    }).catch((error) => {
        if(error.errno == 1062) //Erro 1062 = Chaves primárias duplicadas
            resposta(400, "A(s) turma(s) selecionadas já possui(em) este simulado!");
        else{
            console.log(error);
            resposta(400, "Erro de conexão! Tente novamente");
        }
    });
}

function addSimuladoAluno(id_turmas, resposta){
    //Parte de vincular versão de simulado ao aluno
}