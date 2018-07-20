const fs = require('fs')

let dailyJson = JSON.parse(fs.readFileSync('daily.json', 'utf8')).docs

let accumulator = {}

let x = dailyJson.forEach(e => {

    delete e.date
    delete e.version_id
    delete e.season

    if ((!accumulator[e.program_code]) & (e.program_code[0] !== '!')) {
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

    // delete e.program_code
})

/* helper function to make an array ouf of the accumulator */
// let arr = Object.keys(accumulator).map(e => accumulator[e])
let arr = Object.keys(accumulator).map(e => accumulator[e].program_code)
arr.sort()

fs.writeFileSync('interlessData.json', JSON.stringify(accumulator, null, 2), 'utf8')
// console.log(JSON.stringify(accumulator, null, 2))
