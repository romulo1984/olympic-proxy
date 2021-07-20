const express = require('express')
const axios = require('axios')
const app = express()
const cors = require('cors')

app.listen(80)

app.use(cors())
app.post('/api', async(req, res) => {
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
    const API_URL = 'https://geql.globo.com/graphql'

    console.log('api url', API_URL)

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

    res.end({
        ...result
    })
})

app.get('/api/test', (req, res) => {
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
    res.end(`Test route!`)
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