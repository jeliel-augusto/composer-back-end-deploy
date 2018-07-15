var simulado = require('../controllers/simulado');
module.exports = function(app){
    app.post('/criarsimulado', function(req, res){
        simulado.criarSimulado(req.body, res);
    });
    app.post('/vincularquestionario', function(req, res){
        simulado.addQuestionarios(req.body, res);
    });
    app.post('/simulado', function(req, res){
        simulado.gerarVersoesSimulados(req.body, res);
    });
}