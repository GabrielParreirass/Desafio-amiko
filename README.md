# Desafio Amiko Back-End

Neste desafio foi proposta a criação de uma API RESTFull para a gestão de chamados de hospitais.

A API é composta de 02 endpoints em /calls, sendo um GET e um POST.

GET -> Era preciso ler as mensagens, armazenadas em um banco de dados, atribuidas a um determinado quarto do hospital e retorná-las ao usuário.

POST -> Era preciso criar novos chamados para os quartos, usando como parâmetros o conteúdo do chamado, o nome do hospital e o número do quarto, todos inseridos pelo usuário, e salvar esses chamados em um banco de dados.

# Solução

Para o desenvolvimento, utilizei o MONGOdb como banco de dados e NodeJS junto com Express para o servidor

ROTA GET, responsável por ler as chamadas armazenadas e retorná-las para o usuário

    app.get("/calls", async (req, res) => {
    
    //recebe o número do quarto que o usuário deseja checar os chamados
    const roomNumber = req.body.roomNumber; 

    // define o numero do quarto como parêmetro de busca
    const filter = {
      "hospital.roomNumber": roomNumber,  
    };

     // busca as chamadas de acordo com o filtro definido
    const chamadas = await Chamadas.find(filter);

    // verifica se existem chamadas
    if (chamadas.length > 0) { 
        // pega apenas as mensagens do chamado e as retorna para o usuário
      const calls = chamadas.map((i) => i.name);
      res.send(calls);  
    } else {
      res.send("Nao existem chamadas registradas nesse apartamento!");
    }
    });

    

ROTA POST, responsável por receber os dados de uma nova chamada inseridos pelo usuário e armazená-los no banco de dados e tratando as condições especificadas no desafio.

    app.post("/calls", async (req, res) => {
          const msg = req.body.msg;  // recebe a mensagem inserida pelo usuário
          const hospitalName = req.body.hospitalName; // recebe o nome do hospital
          const roomNumber = req.body.roomNumber; // recebe o numero do quarto
        
          if (roomNumber > 0) { // trata condicao do numero ser maior que 0
            const chamadaCriada = await Chamadas.create({ // cria um novo chamado com as infos recebidas
              name: msg,
              hospital: {
                name: hospitalName,
                roomNumber: roomNumber,
              },
            });
        
            if (chamadaCriada) { // caso a chamada seja criada com sucesso
              res.send("Chamado criado com sucesso");
            } else { // casa aconteça um erro
              res.send("Erro na criação do chamdo");
            }
          } else { // se o numero for menor ou igual a 0
            res.status(503);
            res.send("O número do quarto deve ser maior ou igual a 1");
          }
        });


# Como executar o código

Para a execução do código na sua máquina ser bem sucedida, é necessária a clonagem do projeto ou o download dos arquivos para seu computador.

Pelo terminal, abra a pasta onde se econtram os arquivos e insira o código "npm i" para instalar as dependencias necessárias.

No mesmo terminal execute o comando "npm run dev", após isso, o servidor deverá começar a rodar!

!! É PRECISO ALTERAR A STRING DE CONEXÃO COM O BANCO DE DADOS, INSERINDO A SENHA CORRETA
