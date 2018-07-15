var Connection = require('../../config/connection');
exports.listarDisciplinas = function(params,app,resposta){
    var Conn = Connection;
    var Disciplina  = new app.app.models.disciplina(Conn);
    var id_disciplina = params.id_disciplina;
    Disciplina.listarDisciplinas(id_disciplina,function(err,results){
        if(err){
            console.log("Erro ao listar disciplinas: %s",err);
            resposta(400,'Erro');
            return;
        }
        resposta(200,results);
    });
    
} 