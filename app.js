const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//config ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));

//body-parser
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.render('index.ejs')
})

app.get('/perguntar',(req,res)=>{
    res.render('perguntar.ejs')
})

app.post('/salvarpergunta',(req,res)=>{
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    console.log(descricao)
    console.log(titulo)
    res.send('TITULO DA PERGUNTA: '+titulo+' DESCRIÇÃO DA PERGUNTA: '+descricao)
})

app.listen(8080,()=>{
    console.log('app rodando')
})