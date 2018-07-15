const Questionario = require('../controllers/questionario');
module.exports = function(app){
    app.get('/', function(req, res){
        res.render("index", {errors : {}, dados : {}});
    });
    app.get('/questionario/questoes/:id_questionario',function(req,res){
        //Objeto de resposta para o Front-End
        const resposta = (status, resposta) => {
            res.status(status).send(resposta);
        }
        Questionario.listarQuestoesFromQuestionario(req.params, app,resposta);
    });
    app.post('/gerarVersoes', function(req, res){
        //Objeto de resposta para o Front-End
        const resposta = (status, resposta) => {
            res.status(status).send(resposta);
        }
        Questionario.gerarVersoes(req.body, app,resposta);
    });
    app.post('/questionario/criar',function(req,res){
        //Objeto de resposta para o Front-End
        const resposta = (status, resposta) => {
            res.status(status).send(resposta);
        }
        Questionario.criarQuestionario(req.body,app,resposta);
    });
}