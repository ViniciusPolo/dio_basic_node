const fs = require('fs')
const { join } = require('path') //modulo nativo do node para lidar com paths

const filePath = join (__dirname, 'users.json')

const getUsers = () => {
    const data = fs.existsSync(filePath) //verifica se o arquivo existe
        ? fs.readFileSync(filePath) //realiza a leitura de maneira sincrona, ou seja, espera o retorno
        :[] //se não existir retorna vázio

    try {
        return JSON.parse(data)
    } catch (error) {
        return []
    }

}
const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t')) //'\t'cria tabulação

const userRoute = (app) => {
    app.route('/users/:id?')
        .get((req, res) => {
            const users = getUsers()

            res.send({ users })
        })

        .post((req,res) => {
            const users = getUsers()

            users.push(req.body)

            saveUser(users)

            res.send(201).send('Ok, user created')
            
            
        })
        .put((req,res) => {
            const users = getUsers()

            saveUser(users.map( user => {
                if(user.id === req.params.id){
                    return {
                        ...user,
                        ...req.body
                    }
                }
                return user
            }))
            res.send(201).send('Ok, user Uptaded')
        })
        .delete((req,res) => {
            const users = getUsers()

            saveUser(users.filter( user => user.id !== req.params.id))
            res.send(201).send('Ok, user deleted')
        })
}

module.exports = userRoute

