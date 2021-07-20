const express = require('express')
const axios = require('axios')
const app = express()
const cors = require('cors')

app.listen(80)
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/api', async(req, res) => {
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
    const API_URL = 'https://geql.globo.com/graphql'

    const result = await axios.post(API_URL, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        query: req.body.query
    }).then(response => {
        console.log('data', response.data)
        console.log(response.headers)
        console.log(response.status)
        return response
    }).catch(error => {
        console.log({ error })
        return error
    })

    res.send(result.data)
})

app.get('/api/test', (req, res) => {
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
    res.end(`Test route, again!`)
})

module.exports = app

// const axios = require('axios')

// module.exports = (req, res) => {
//     const API_URL = 'https://geql.globo.com/graphql'

//     axios(API_URL, {
//         method: 'POST',
//         mode: 'no-cors',
//         headers: {
//             'Access-Control-Allow-Origin': '*',
//             'Content-Type': 'application/json'
//         },
//         withCredentials: true,
//         credentials: 'same-origin'
//     }).then(response => {
//         res.status(200).send(response)
//     })
// }