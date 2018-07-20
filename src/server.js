const fs = require('fs')
const app = require('express')()

const data = JSON.parse(fs.readFileSync('data/interlessData.json', 'utf8'))

app.get('/', (req, res) => {
    res.json(data)
})

const port = 3300
app.listen(port)
console.log('App listening on port ' + port)

