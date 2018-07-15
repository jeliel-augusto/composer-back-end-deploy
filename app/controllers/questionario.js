const Connection = require('../../config/connection');
const Questionario_ = require('../models/questionario');
const Aula_ = require('../models/aula');
exports.gerarVersoes = function (params, app,resposta) {
    var id_questionario = params.id; //id questionário
    var N = params.quantidade;
    var Conn = Connection; //conexão com o banco de dados
    var questionario = new Questionario_(Conn); //objeto que faz requisições para o banco de dados

    questionario.questions(id_questionario, function (err, result) { //Pega todas as questões vinculadas a um questionário
        if(err) {
            console.log("Erro ao se conectar com o banco de dados!" + err.msg);
            resposta(400,'Erro ao se conectar');
            return;
        }

        var id_questoes = []; //Lista que vai armazenar todos os ids das questões
        for (var i = 0; i < result.length; i++) {
            id_questoes.push(result[i].id); //Adicionando
        }

        questionario.getLastIDVersaoQuestionario(function (err, result) { //Pega o ultimo ID da versao_questionario 
            if (err) {
                console.log("Erro ao conectar com o banco de dados! " + err.msg);
                resposta(400,'Erro ao se conectar');
                return;
            }

            var id_versao = (result[0].id == null ? 0 : result[0].id); //Atribui o último id inserido na variável id_versao (se for null, vai receber 0)

            for(var i = 0; i < N; i++) { //Gerador de versões
                id_versao++;
                var ordem = ""; //String para armazenar a ordem
                var aux = id_questoes.slice(); //Copio o vetor
                var index = 0;

                //Algoritmo para gerar versões
                while (aux.length > 1) {
                    index = (index + i) % aux.length;
                    ordem += aux.splice(index, 1)[0] + ",";
                }
                ordem += aux[0];

                let versaoQuestionario = { //JSON para armazenar a versao
                    id_versao_questionario: id_versao,
                    OA_questionario_id_questionario: id_questionario,
                    ordem: ordem
                };

                questionario.addVersao(versaoQuestionario, function (err, result) {
                    if (err) {
                        console.log("Erro ao conectar com o banco de dados!" + err);
                        return;
                    }
                    resposta(200,'Ok');//Enviar a resposta ao Front.
                });
            }
        });
    });
}
exports.listarQuestoesFromQuestionario = function(params,app,resposta){
    var id_questionario = params.id_questionario; //id do questionario
    var Conn = Connection; //conexão com o banco de dados
    var Questionario = new Questionario_(Conn); //objeto que faz requisições para o banco de dados
    Questionario.questions(id_questionario,function(err,results){
        if(err){
            console.log("Erro ao listar questões: %s",err);
            resposta(400,results);
            return;
        }
        resposta(200,results); //Enviar a resposta ao Front.
    });
}
exports.criarQuestionario = function(params,app,resposta){
    let id_aula = params.id_aula;
    let assunto = params.assunto;
    let id_disciplina = params.id_disciplina;
    var Conn = Connection; //conexão com o banco de dados
    var Questionario =  new Questionario_(Conn); //objeto que faz requisições para o banco de dados
    let questionario_json = {//JSON para enviar ao banco
        id_questionario: -1,
        flag_avaliacao: 1,
        disciplina_id_disciplina: id_disciplina,
        descricao_OA: assunto
    };
    console.log(questionario_json);
    //Recuperar último id inserido na tabela questionário
    Questionario.getLastIDQuestionario(function(err,results){
        if(err){
            console.log("Erro ao selecionar último Id: %s", err);
            resposta(400,'Erro');
            return;
        }
        //Incrementa e set do id ao inserir.
        let last_id = (results[0].id == null ? 0 : results[0].id);
        questionario_json.id_questionario = last_id + 1;
        //Adicionar Questionário
        Questionario.addQuestionario(questionario_json,function(err,results){
            if(err){
                console.log("Erro ao inserir questionário: %s",err);
                resposta(400,'Erro');
                return;
            }
            //Vincular Questionário à Aula
            let Aula = new Aula_(Conn);
            let vincularquestionario_json =  {
                aula_id_aula: id_aula,
                OA_questionario_id_questionario:questionario_json.id_questionario,
            }
            Aula.vincularQuestionario(vincularquestionario_json,function(err,res){
                if(err){
                    console.log("Erro ao vincular questionário: %s",err);
                    resposta(400,'Erro');
                    return;
                }
                resposta(200,'Ok');//Resposta
            });
        });
    });
}