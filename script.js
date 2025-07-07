function $(id) {
    return document.getElementById(id)
}

function $qs(clss) {
    return document.querySelector(clss)
}

function $qsa(clss) {
    return document.querySelectorAll(clss)
}

let days = 30
let daysInWeek = 7

$("output").innerText = Math.ceil(days/daysInWeek)

let table = $qs("table")

count = 1 ;
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

$qsa("th, td").forEach(e => {
    e.addEventListener("mouseover", () => {
        e.style.backgroundColor = '#ff4500'
    });
    
    e.addEventListener("mouseout", () => {
        e.style
    })
})
