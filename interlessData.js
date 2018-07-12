const fs = require('fs')

let dailyJson = JSON.parse(fs.readFileSync('daily.json', 'utf8')).docs

let accumulator = {}

let x = dailyJson.forEach(e => {

    delete e.date
    delete e.version_id
    delete e.season

    if (!accumulator[e.program_code]) {
        accumulator[e.program_code] = e
        accumulator[e.program_code].channel = [accumulator[e.program_code].channel]

        Object.keys(accumulator[e.program_code]).forEach(k => {
            if (accumulator[e.program_code][k] === "") {
                delete accumulator[e.program_code][k]
            }
        })

    }
    else if (accumulator[e.program_code]) {
        if (!accumulator[e.program_code].channel.includes(e.channel))
        accumulator[e.program_code].channel.push(e.channel)
    }

    delete e.program_code
})

let arr = []
Object.keys(accumulator).forEach(e => {
    arr.push(accumulator[e])
})

console.log(arr)
// fs.writeFileSync('intelessData.json', JSON.stringify(accumulator, null, 2), 'utf8')
// console.log(JSON.stringify(accumulator, null, 2))