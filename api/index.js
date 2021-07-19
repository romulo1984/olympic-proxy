module.exports = (req, res) => {
    const API_URL = 'https://geql.globo.com/graphql'
    fetch(API_URL, {
            mode: 'no-cors',
            method: 'post'
        })
        .then(blob => blob.json())
        .then(json => [
            res.status(200).send(json)
        ])
}