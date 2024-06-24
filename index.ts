import express from "express";
import mongoose from "mongoose";
import ChamadaSchema from "./Schemas/ChamadaSchema";
import bodyParser from "body-parser";

const db = mongoose.connection;
const app = express();

mongoose.connect(
  "mongodb+srv://gepeto:#######@cluster0.kg0uz.mongodb.net/DesafioAmiko"
);

app.use(express.json());

db.on("error", () => {
  console.log("Houve um erro");
});
db.once("open", () => {
  console.log("DataBase loaded");
});

const Chamadas = mongoose.model("Chamadas", ChamadaSchema);

app.get("/calls", async (req, res) => {

    const roomNumber = req.body.roomNumber

    
  const filter = {
    "hospital.roomNumber": roomNumber,
  };

  const chamadas = await Chamadas.find(filter);

  if (chamadas.length > 0) {
    const calls = chamadas.map((i) => i.name);
    res.send(calls);
  } else {
    res.send("Nao existem chamadas registradas nesse apartamento!");
  }
});

app.post("/calls", async (req, res) => {
  const msg = req.body.msg;
  const hospitalName = req.body.hospitalName;
  const roomNumber = req.body.roomNumber;

  if (roomNumber > 0) {
    const chamadaCriada = await Chamadas.create({
      name: msg,
      hospital: {
        name: hospitalName,
        roomNumber: roomNumber,
      },
    });

    if(chamadaCriada){
        res.send("Chamado criado com sucesso")
    }else{
        res.send("Erro na criação do chamdo")
    }

  }else{
    res.status(503)
    res.send("O número do quarto deve ser maior ou igual a 1")
  }

  
});

app.listen(3030, () => {
  console.log("Servidor rodando na porta 3030!");
});
