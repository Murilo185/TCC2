const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const port = 3000

const Login = mongoose.model('Login', {
    email: String,
    password: String,
});


app.get("/login",  async (req, res) => {
    const login = await Login.find()
    return res.send(login)

})

app.delete("/login/delete/:id", async(req, res) => {
    const login = await Login.findByIdAndDelete(req.params.id)
    return res.send(login)
})

app.put("/login/update/:id", async(req, res) => {
    const login = await Login.findByIdAndUpdate(req.params.id, {
     
        email: req.body.email,
        password: req.body.password,
    })
return res.send(login)
})

app.post("/login/create/", async (req, res) => {
    
    const email = req.body.email
    const password = req.body.password


    if (!email){
        res.send("Email não corresponde.")
        return
    }
    if (!password){
        res.send("Senha não corresponde.")
        return
    }
    const login = new Login({
        
         email: email,
         password: password,
         })
        await login.save()
        return res.send(login)
})

const Registro = mongoose.model('Registro', {
    name: String,
    email: String,
    password: String,
});


app.get("/registro",  async (req, res) => {
    const registro = await Registro.find()
  res.send(registro)
})

app.delete("/registro/delete/:id", async(req, res) => {
    const registro = await Registro.findByIdAndDelete(req.params.id)
    return res.send(registro)
})

app.put("/registro/update/:id", async(req, res) => {
    const registro = await Registro.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
return res.send(registro)
})

app.post("/registro/create/", async (req, res) => {
     
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

   
    const registro = new Registro({
        
         name: name,        
         email: email,
         password: password,
         })
        await registro.save()
        return res.send(registro)
})


app.listen(port, () => {
    mongoose.connect('mongodb+srv://rodolfomanoel470:ocJEjARPbVd68YIS@bdpresente.fttzn1n.mongodb.net/?retryWrites=true&w=majority&appName=bdpresente')
    console.log('app rodando')
})

