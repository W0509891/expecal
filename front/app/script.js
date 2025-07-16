function $(id) {
    return document.getElementById(id)
}

function $qs(clss) {
    return document.querySelector(clss)
}

function $qsa(clss) {
    return document.querySelectorAll(clss)
}

/*===================CONSTANTS=====================*/
const month_d = month_data
let today = new Date()
const year = today.getFullYear()
const month = today.getMonth()
const day = today.getDate()


const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthsOfYear = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let days = 35
let daysInWeek = 7

/*===================ELEMENTS=====================*/
let calenderbody = $("calenderbody")

let dow = document.createElement("div")
dow.id = 'daysOfWeek'
dow.classList.add('d-flex', 'justify-content-evenly', 'w-100')

let diw = document.createElement("div")
diw.id = 'daysInWeek';
diw.classList.add('d-flex', 'flex-column', 'flex-wrap', 'justify-content-evenly')

calenderbody.append(dow, diw)


let count = 1 ;
$("output").innerText = `${day} ${month}, ${year}`


/*===================FUNCTIONS=====================*/

// $('moredeets-banner-heading').innerText =`${day} ${monthsOfYear[month]}, ${year}`

//creates mini circle on timeline
function createTimelineCircle() {
    let circledot = document.createElement("div")
    circledot.className = 'circledot'

    $('timeline').appendChild(circledot)
}

function createTimeLineItem(time, type, amount) {
    let timelineitem = document.createElement("div")
    timelineitem.className = 'timeline-item'
    timelineitem.innerHTML = `<div class="time">${time}</div> 
                              <div class="dr">${amount}</div>
                              <div class="cr">${amount}</div>`
    $('timeline-time').appendChild(timelineitem)
}

// Populates weekday table
daysOfWeek.forEach(item => {
    let dayCell = document.createElement("div")
    dayCell.innerText = item
    dow.appendChild(dayCell)

})


//Populates days in calendar
for (let i = 1; i <= Math.ceil(days/daysInWeek) ; i++) {
        let diwRow = document.createElement("div")
        diwRow.id = `wk${i}`
    for (let j = 1; j <= daysInWeek ; j++) {

        let diwCell = document.createElement("div")
        diwRow.appendChild(diwCell)
        diwCell.innerHTML = `<p class="dayNumber">${count++}</p>`
        if (count > days){
            break;
        }
    }
    diw.appendChild(diwRow)
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

$qsa('div[id^=wk] > div').forEach(e => {
    
    // Highlights the current day
    if ( Number(e.innerText) === day){
        e.style.backgroundColor = "rgba(47,0,255,0.3)"
    }
    
    // actions to be performed on the click of an individual cell
    e.addEventListener("click", ()=>{
        $("timeline").innerHTML = ''
        $("timeline-time").innerHTML = ''
        console.log(e.innerText)
        $("moredeets").style.display = 'block';
        $("moredeets-banner-heading").innerText = `${e.innerText} ${monthsOfYear[month]}, ${year}`
        
        
        let temp = month_d.find(val => Number(e.innerText) === val.day)
        console.log(temp)
        
        if (typeof temp === "object"){
            for (const tempElement of temp.transaction) {
                createTimelineCircle()
                console.log("here" ,tempElement)
                createTimeLineItem(tempElement.timestamp, tempElement.type, tempElement.amount)
            }
        }
        
        else {
            $('timeline-time').innerHTML = `<h3>No Transactions on this day</h3>`
            // for (let i = 0; i < 24 ; i++) {
            //    createTimelineCircle()
            // }
        }
        
    })
    
    

})



// console.log(month_d.find(e => e.day === day))0