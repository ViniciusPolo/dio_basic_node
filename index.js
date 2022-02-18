const express = require('express') //npm install express --save
const bodyParser = require('body-parser') //transforma em objeto

const userRoute = require('./routes/userRoutes.js') 

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false}))

userRoute(app)

app.get('/',(req, res) => res.send(`Olá Mundo  pelo Express!!!`))

app.listen(port, () => console.log('Api rodando na porta ' + port))
// node index.js
// No browser colque localhost:"porta"




/* 
//Hello World

const express = require('express') //npm install express --save

const app = express()
const port = 3000


app.get('/',(req, res) => res.send(`Olá Mundo  pelo Express!!!`))

*/