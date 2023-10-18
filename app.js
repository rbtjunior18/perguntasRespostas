const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');

//DB connection

connection.authenticate().then(()=>{
    console.log('conexão feita com banco de dados');
}).catch((msgerro)=>{
    console.log(msgerro);
});

//config ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));

//body-parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//rotas

app.get('/',(req,res)=>{
    Pergunta.findAll({raw: true, order: [
        ['id', 'DESC'] // colocando a ordem das perguntas em decrescente
    ]}).then(perguntas =>{
        res.render('index.ejs',{
            perguntas: perguntas
        });
    });
});

app.get('/perguntar',(req,res)=>{
    res.render('perguntar.ejs');
})

app.post('/salvarpergunta',(req,res)=>{
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect('/')
    });
    
})

app.get('/pergunta/:id',(req,res)=>{
    let id = req.params.id;
    Pergunta.findOne({
        where:{id:id}
    }).then(pergunta =>{
        if(pergunta != undefined){
            res.render('pergunta.ejs')
        }
        else{
            res.redirect('/')
        }
    })
})

app.listen(8080,()=>{
    console.log('app rodando');
});