const fs = require('fs')
const app = require('express')()

const data = JSON.parse(fs.readFileSync('intelessData.json', 'utf8'))

app.get('/', (req, res) => {
    res.json(data)
})

const port = 3000
// app.listen(port)
// console.log('App listening on port ' + port)


let arr = Object.keys(data).map(e => data[e])

console.log(arr.filter(e => {
    if (e.series_title === 'Life Discovery Series') {
        return e
    }
}))