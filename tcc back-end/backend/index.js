const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
const port = 3000

const user_name = 'Murilo'
const password = 'PhE5XXcpknuhBLXV'

//MODELO DO OBJETO DO BANCO DE DADOS
const Person = mongoose.model('Person', {
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    img: {
        type: String,
        required: false
    }
});

//ROTA DE LOGIN FEITA PARA  FAZER LOGIN
app.get("/login/:email",  async (req, res) => {
    //PEGA OS DADOS PELA REQUISIÇÃO
    const email = req.params.email

    //PROCURA POR UM USUARIO COM O CAMPO ESPECIFICADO
    const person = await Person.findOne({ email: email })

    //RETORNA OS DADOS PARA FEEDBACK DO USUÁRIO
    return res.send(person)
})

//ROTA DE REGISTRO FEITA PARA REGISTRAR CLIENTE
app.post("/register", async (req, res) => {
    //PEGA OS DADOS DA REQUISIÇÃO
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const img = req.body.img

    //VERIFICA SE OS CAMPOS FORAM PASSADOS OU NÃO
    if (!name){
        res.send("Nome não corresponde.")
        return
    }
    //VERIFICA SE OS CAMPOS FORAM PASSADOS OU NÃO
    if (!email){
        res.send("Email não corresponde.")
        return
    }
    //VERIFICA SE OS CAMPOS FORAM PASSADOS OU NÃO
    if (!password){
        res.send("Senha não corresponde.")
        return
    }
    //VERIFICA SE OS CAMPOS FORAM PASSADOS OU NÃO
    if (!img){
        img = "n tem foto"
    }

    //CRIA UM NOVO USUÁRIO COM BASE NO BANCO DE DADOS
    const person = new Person({
        name: name,
        email: email,
        password: password,
        img: img,
    })

    //SALVA NO BANCO DE DADOS O USUÁRIO
    await person.save()

    //RETORNA OS DADOS PARA FEEDBACK DO USUÁRIO
    return res.send(person)
})

app.listen(port, () => {
    mongoose.connect(`mongodb+srv://${user_name}:${password}@bdpresente.fttzn1n.mongodb.net/?retryWrites=true&w=majority&appName=bdpresente`)
    console.log('app rodando')
})