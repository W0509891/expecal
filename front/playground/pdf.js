const pdf2table = require("pdf2table");

const fs  = require('fs')


fs.readFile('./JanState.pdf', (err, buffer) => {
    if (err) return console.log(err)

    pdf2table.parse(buffer, (err, rows, rowsdeb) => {
        if (err) return console.log(err);

        console.log(rows)
    })
})


