const Professor = require('../controllers/professor');

module.exports = function(app){
    app.post('/cadastroProfessor', function(req, res){
        const resposta = (status, resposta) => {
            res.status = status;
            res.send(resposta);
        }
        Professor.cadastrarProfessor(req, resposta);
    });

    app.post('/login', function(req, res){
        const resposta = (status, resposta) => {
            res.status = status;
            res.send(resposta);
        }
        Professor.login(req.body, resposta);
    });

    app.get('/login', function(req, res){
        res.render('login');
    });
}