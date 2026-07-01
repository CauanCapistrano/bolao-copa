const express = require("express"); 
const app = express();

app.use(express.json());

let palpites = [
    {
        id : 1, 
        palpitea : {pais : "Brasil", palpite : 3},
        palpiteb : {pais : "Noruega", palpite : 1}, 
        participante: "Cauan"
    }
];

app.get("/palpites",(req,res) =>{
    res.status(200).json(palpites);
}); 

app.post("/palpites", (req,res) => {

    if(!req.body.palpitea || !req.body.palpiteb){
        return res.status(400).json({
            message : "Não foi informado um palpite valido."
        })
    }

    let palpite = {
        id : palpites.length +1,
        palpitea : {pais : req.body.palpitea.pais, palpite : req.body.palpitea.palpite},
        palpiteb : {pais : req.body.palpiteb.pais, palpite : req.body.palpiteb.palpite},
        participante : req.body.participante
    }

    palpites.push(palpite); 

    res.status(200).json(palpite);
})

app.put("/palpites/:id", (req,res) => {
    if(!palpites.find(u => u.id == req.params.id)){
        return res.status(404).json({
            message : "O item informado não foi encontrado."
        })
    }
    if(!req.body.palpitea || !req.body.palpiteb){
        return res.status(400).json({
            message : "Não foi informado um palpite valido."
        })
    }

    let palpite = palpites.find(u => u.id == req.params.id); 
    palpite.palpitea.pais    = req.body.palpitea.pais;
    palpite.palpitea.palpite = req.body.palpitea.palpite;
    palpite.palpiteb.pais    = req.body.palpiteb.pais;
    palpite.palpiteb.palpite = req.body.palpiteb.palpite;
    palpite.participante     = req.body.participante;

    res.status(200).json(palpite);
}) 

app.delete("/palpites/:id", (req,res) => {
   const index = palpites.findIndex(
       u => u.id == req.params.id
   );

   if (index === -1) {
       return res.status(404).json({
           message : "palpite não encontrado"
       });
   }

   palpites.splice(index, 1);

   res.json({
        message : "Palpite removido!" 
   });
});

app.use(express.static("public"));

app.listen(3000, () => {console.log("Servidor iniciado na porta 3000")})