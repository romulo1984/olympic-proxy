const express = require('express')
const axios = require('axios')
const app = express()
const cors = require('cors')

app.listen(80)

app.use(cors())
app.post('/api', async(req, res) => {
    res.end(`Hello! Go to item: <a href="${path}">${path}</a>`)
    const API_URL = 'https://geql.globo.com/graphql'

    const result = axios.post(API_URL, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
    }).then(response => {
        console.log(response.data)
        console.log(response.headers)
        console.log(response.status)
        return response
    }).catch(error => {
        return error
    })

    res.send({
        ...result
    })
})

app.get('/api/test', async(req, res) => {
    res.end({
        data: 'Hello, people!'
    })
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