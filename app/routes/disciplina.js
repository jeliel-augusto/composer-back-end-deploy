const Disciplina = require('../controllers/disciplina');
module.exports = function(app){
    app.get('/professor/disciplinas/:id_professor', function(req, res){
         //Objeto de resposta para o Front-End
        const resposta = (status, resposta) => {
            res.status = status
            res.send(resposta);
        }
        Disciplina.listarDisciplinas(req.params,app,resposta);
    });
}