const axios = require('axios')

module.exports = (req, res) => {
    const API_URL = 'https://geql.globo.com/graphql'

    axios(API_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        withCredentials: true,
        credentials: 'same-origin'
    }).then(response => {
        res.status(200).send(response)
    })
}