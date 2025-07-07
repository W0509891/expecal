function $(id) {
    return document.getElementById(id)
}

function $qs(clss) {
    return document.querySelector(clss)
}

function $qsa(clss) {
    return document.querySelectorAll(clss)
}

let today = new Date()

const year = today.getFullYear()
const month = today.getFullYear()
const day = today.getDate()

let days = 31
let daysInWeek = 7

$("output").innerText = day

let tablebody = $("calenderbody")
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let table = document.createElement('table')
let dow = document.createElement("tr")
dow.id = 'daysOfWeek'

table.appendChild(dow)
count = 1 ;

tablebody.appendChild(table)
daysOfWeek.forEach(item => {
    let dayCell = document.createElement("th")
    dayCell.innerText = item
    dow.appendChild(dayCell)
    
})
for (let i = 1; i <= Math.ceil(days/daysInWeek) ; i++) {
    let tr = document.createElement("tr")
    for (let j = 1; j <= daysInWeek ; j++) {

        let td = document.createElement("td")
        tr.appendChild(td)
        td.innerText = count++
        if (count > days){
            break;
        }
    }
    table.appendChild(tr)
}

// $qsa("th, td").forEach(e => {
//     e.addEventListener("mouseover", () => {
//         e.style.backgroundColor = '#00ff49'
//     });
//
//     e.addEventListener("mouseout", () => {
//         e.style.backgroundColor = 'none';
//     })
// })

$qsa('td').forEach(e => {
    if ( Number(e.innerText) === day){
        e.style.backgroundColor = "rgba(47,0,255,0.3)"
    }
})