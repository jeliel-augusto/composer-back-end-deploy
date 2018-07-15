var Connection = require('../../config/connection');
exports.criarQuestao = function(params,app,resposta){
    /*--- Inicio de Campos da Questão---*/
    let questao = params.objeto;
    let topicos = params.topicos;
    questao = JSON.parse(JSON.stringify(questao));
    questao = JSON.parse(questao);
    topicos = JSON.parse(topicos);
    const id_questionario_ = JSON.parse(input.id_questionario);
    let questao_json = { //JSON Questão
        id_questao: 0,
        descricao_OA: '',
        disciplina_id_disciplina: disciplina_id_disciplina,
        professor_id_professor: professor_id_professor,
        enunciado: enunciado,
        desvio_opcaoA: desvio_opcaoA,
        desvio_opcaoB: desvio_opcaoB,
        desvio_opcaoC: desvio_opcaoC,
        desvio_opcaoD: desvio_opcaoD,
        desvio_opcaoE: desvio_opcaoE
    }
    /*--- Fim de Campos da Questão---*/
    var Conn = Connection; //conexão com o banco de dados
    var Questao = new app.app.models.questao(Conn); //objeto que faz requisições para o banco de dados    
    var Topico = new app.app.models.topico(Conn); //objeto que faz requisições para o banco de dados
    var Questionario = new app.app.models.questionario(Conn); //objeto que faz requisições para o banco de dados
    //Recuperar último id inserido no banco
    Questao.getLastId(function(err,result){
        if(err){
            console.log("Erro ao inserir %s",err);
            resposta(400,'Erro');
            return;            
        }
        const id_questao = ((result[0].id == null ? 0 : result[0].id)+1); //Atribui o último id inserido e incrementa (se for null, vai receber 1)
        questao_json.id_questao = id_questao;
        
        //Adicionar Questão
        Questao.addQuestao(questao_json,function(err,result){
            if(err){
                console.log("Erro ao inserir: %s",err);
                return;
            }

            //Vincular questão ao questionário
            const id_questao_inserida = objeto.id_questao;
            let vincular_questao_questionario = {OA_questionario_id_questionario: id_questionario_,
            OA_questoes_id_questao: id_questao_inserida}
            Questionario.vincularQuestao(vincular_questao_questionario,function(err,result){
                if(err){
                    console.log("Erro ao inserir: %s",err);
                    resposta(400,'Erro');
                    return;
                }
            });

            //Recuperar último id e vincular tópicos à questão
            Topico.getLastId(function(err,result){
                var id_topico = ((result[0].id == null ? 0 : result[0].id)+1);
                //Vincular aos tópicos, se não existir algum, será criado
                for(let i = 0; i < topicos.length;i++){
                    //Tópico existente
                    if(topicos[i].id_topico > 0){
                        Topico.vincularQuestao(function(err,result){
                            if(err){
                                console.log("Erro ao inserir: %s",err);
                                resposta(400,"Erro ao inserir");
                                return;
                            }
                            if(i==(topicos.length-1)){//Se for o último tópico, enviar.
                                resposta(200,"Ok");
                            }
                        });
                    }
                    else{//Tópico não existente
                        id_topico++;
                        let topico_ = { //Novo Tópico
                            NDT: topicos[i].NDT,id_topico: id_topico,nome_topico: topicos[i].nome_topico
                        };
                        //Cria tópico
                        Topico.addTopico(topico_,function(err,result){
                            if(err){
                                console.log("Erro ao inserir: %s",err);
                                resposta(400,"Erro ao inserir");
                                return;
                            }
                            let vincular_topicos = {OA_questoes_id_questao: id_questao_inserida
                                ,topico_id_topico:topico_.id_topico};
                            Topico.vincularTopicoQuestao(vincular_topicos,function(err,result){
                                if(err){
                                    console.log("Erro ao inserir: %s",err);
                                    resposta(400,"Erro ao inserir");
                                    return;
                                }
                                if(i==(topicos.length-1)){//Se for o último tópico, enviar.
                                    resposta(200,"Ok");
                                }
                            });
                        });
                    }
                }

            });

        });
    });
  
}