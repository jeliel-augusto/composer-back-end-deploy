const Coordenador = require('../controllers/coordenador');
module.exports = function(app){
    app.get('/coordenador/disciplinas/:id_curso&:id_coordenador', function(req,res){
        const resposta = (status, resposta) => {
            res.status(status).send(resposta);
        }
        Coordenador.listaTodasDisciplinas(req.params,app,resposta);
    });
    app.get('/coordenador/disciplinas/turmas/:id_curso&:id_coordenador&:id_disciplina',function(req,res){
        const resposta = (status, resposta) => {
            res.status(status).send(resposta);
        }
        Coordenador.listaTurmasDisciplina(req.params,app,resposta);
    });
    app.get('/coordenador/disciplinas/turmas/aulas/:id_disciplina&:id_turma',function(req,res){
        const resposta = (status, resposta) => {
            res.status(status).send(resposta);        
        }
        Coordenador.listaAulasDisciplinaTurma(req.params,app,resposta);
    });
    app.get('/coordenador/disciplinas/turmas/aulas/questionarios/:id_aula',function(req,res){
        const resposta = (status, resposta) => {
            res.status(status).send(resposta);
        }
        Coordenador.listaQuestionariosAula(req.params,app,resposta);
    });
    app.get('/coordenador/turmas/:id_coordenador',function(req,res){
        const resposta = (status, resposta) => {
            res.status(status).send(resposta);
        }
        Coordenador.listarAllTurmas(req.params,app,resposta);
    });
    app.get('/coordenador/turmas/pesquisa/:id',function(req,res){
        const resposta = (status, resposta) => {
            res.status(status).send(resposta);
        }
        Coordenador.pesquisarQuestionariosPorId(req.params,app,resposta);
    });
}