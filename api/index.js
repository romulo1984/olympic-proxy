const express = require('express')
const axios = require('axios')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.listen(80)

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

const query = `
    query GET_MEDALS {
        medalTable {
            ranking
            country {
              code
              name
              flag {
                svg {
                  name
                  url
                  width
                  height
                  type
                  rightsHolder
                  isAnimated
                }
              }
            }
            gold
            silver
            bronze
            total
          }
          sports {
            code
            name
            hasMedal
            imageURL(format: SVG)
          }
    }
`

app.post('/api', async(req, res) => {
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
    const API_URL = 'https://geql.globo.com/graphql'

    console.log('api url', API_URL)

    const result = axios.post(API_URL, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        query
    }).then(response => {
        console.log(response.data)
        console.log(response.headers)
        console.log(response.status)
        return response
    }).catch(error => {
        return error
    })

    console.log('result', JSON.stringify(result))

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify(result))
    res.end()
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