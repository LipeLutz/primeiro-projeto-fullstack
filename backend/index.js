const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db/conn')

app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())
app.use(cors())

app.get('/matcheslist', (req, res) =>{

    const query = `SELECT * FROM matches`

    pool.query(query, (err, data) =>{
        if(err){
            console.log('Erro na consulta, tente novamente mais tarde', err)
            return
        }

        res.json(data)
    })
})

app.post('/matcheslist/post', (req, res) =>{

    const match = req.body.match

    const query = `INSERT INTO matches (??) VALUES (?)`
    const data = ['game', match]

    pool.query(query, data, (err) =>{
        if(err){
            console.log(err)
            return
        }

    })
}) 

app.delete('/matcheslist/remove/:id', (req, res) =>{

    const id = req.params.id

    const query = `DELETE FROM matches WHERE (??) = (?)`
    const data = ['id', id]

    pool.query(query, data, (err) =>{
        if(err){
            console.log(err)
            res.status(500).json({error: "Erro ao deletar"})
            return
        }

        res.status(200).json({message: "Deletado com sucesso!"})
    })
}) 

app.put('/matcheslist/update/:id', (req, res) =>{

    const id = req.params.id
    const match = req.body.match

    const query = `UPDATE matches SET ?? = ? WHERE ?? = ?`
    const data = ['game', match, 'id', id]

    pool.query(query, data, (err) =>{
        if(err){
            console.log(err)
            res.status(500).json({error: "Erro ao deletar"})
            return
        }

        res.status(200).json({message: "Deletado com sucesso!"})
    })
})

app.listen(3000)

