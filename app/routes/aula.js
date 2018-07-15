const Aula = require('../controllers/aula');
module.exports = function(app){
    //Criar uma aula
    app.post('/professor/disciplinas/aulas/criar', function(req, res){
         //Objeto de resposta para o Front-End
        const resposta = (status, resposta) => {
            res.status = status
            res.send(resposta);
        }
        // app.app.controllers.aula.criarAula(req.body, app,resposta);
        Aula.criarAula(req.body, app,resposta);
    });
    //Listagem de Aulas
    app.get('/professor/disciplinas/aulas/:id_professor&:id_disciplina',function(req,res){
        //Objeto de resposta para o Front-End
        const resposta = (status, resposta) => {
            res.status = status
            res.send(resposta);
        }
        Aula.listaAulas(req.params,app,resposta);   
    });
    //Listagem de Objetos
    app.get('/aula/objetos/:id_aula',function(req,res){
        //Objeto de resposta para o Front-End
        const resposta = (status, resposta) => {
            res.status = status
            res.send(resposta);
        };
        Aula.listaObjetos(req.params,app,resposta);   
    });
}