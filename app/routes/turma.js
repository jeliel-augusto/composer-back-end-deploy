const turma = require('../controllers/turma');

module.exports = function(app){
    app.post('/addSimuladoTurma', function(req, res){
        const resposta = (status, resposta) => {
            res.status = status;
            res.send(resposta);
        }
        turma.addSimTurma(req.body, resposta);
    });
}