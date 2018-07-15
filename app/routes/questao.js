const Questao = require('../controllers/questao');
module.exports = function(app){
    app.post('/criarQuestao', function(req, res){
         //Objeto de resposta para o Front-End
        const resposta = (status, resposta) => {
            res.status = status
            res.send(resposta);
        }
        Questao.criarQuestao(req.body, app,resposta);
    });
}