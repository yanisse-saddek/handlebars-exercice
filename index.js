const express = require('express')
const app = express()
const engine = require('express-handlebars').engine
var path = require('path')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

const questions = [
    {
        question:"Est ce que la capitale de la france est Paris ?",
        answer:{
            oui:0,
            non:0
        },

    },
    {
        question:"Est-ce que vous êtes raciste ?",
        answer:{
            oui:0,
            non:0
        },

    },
    {
        question:"Avez-vous voté Lepen ?",
        answer:{
            oui:0,
            non:0
        },

    },
    {
        question:"Est-ce que vous êtes Alexandre ?",
        answer:{
            oui:0,
            non:0
        },

    },
    {
        question:"Est-ce que Alex est une fille ?",
        answer:{
            oui:0,
            non:0
        },

    }
]
var random = 0
app.get('/', (req, res)=>{
    random = Math.floor(Math.random()*questions.length)
    const question = questions[random]
    res.render('home', {
        question
    })
})
app.post('/submit', (req, res)=>{
    console.log(Object.keys(req.body))
    questions[random].answer[Object.keys(req.body)] = questions[random].answer[Object.keys(req.body)]+1
    console.log(questions[random])
    res.redirect('/')   
})
app.get('/results', (req, res)=>{
    res.render('results', {
        questions
    })
})
app.post("/results", (req, res)=>{
    const reqNewQuestion = {
        question:req.body.question,
        answer:{
            oui:0,
            non:0
        }
    }
    questions.push(reqNewQuestion)
    res.redirect('/results')
})
app.listen(3000, ()=>{
    console.log('salut ca baigne')
})