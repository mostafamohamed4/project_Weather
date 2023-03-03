let searchbar = document.getElementById("searchbar")
let btn = document.getElementById("btn")
let today = document.getElementById("today")
let Month = document.getElementById("Month")
let city = document.getElementById("city")
let icon = document.getElementById("icon")
let text = document.querySelector(".text")
let num = document.querySelector(".num")
let wind_degree = document.getElementById("wind_degree")
let wind_dir = document.getElementById("wind_dir")
let wind_kph = document.getElementById("wind_kph")
let nextday = document.getElementsByClassName("nextday")
let nextmonth = document.getElementsByClassName("nextmonth")
let iconnext = document.getElementsByClassName("icon")
let numnext = document.getElementsByClassName("numm")
let small = document.getElementsByClassName("small")
let textnext = document.getElementsByClassName("textnext")
let carentcity;
let resposedata, respose;
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September"
    , "October", "November", "December"];
async function getdata(carentcity = "cairo") {
    respose = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=01c77be2ad934e01a48114330232002&q=${carentcity}&days=3`)
    resposedata = await respose.json()
    displayToday()
    displayNextToday()
}
getdata()

btn.addEventListener("click", search)
function search() {
    carentcity = searchbar.value
    console.log(carentcity);
    getdata(carentcity)
}


function displayToday() {
    let date = new Date();
    dateToday = days[date.getDay()]
    dateMonth = monthNames[date.getDay()]

    da = monthNames[date.getDate()]
    today.innerHTML = dateToday;
    Month.innerHTML = date.getDate() + " "+dateMonth;
    city.innerHTML = resposedata.location.name
    icon.innerHTML = `  <img src="https:${resposedata.current.condition.icon}" alt="" width="90">`
    text.innerHTML = resposedata.forecast.forecastday[0].day.condition.text
    num.innerHTML = ` ${resposedata.current.temp_c}<sup>o</sup>c`
    wind_degree.innerHTML = resposedata.current.wind_degree
    wind_dir.innerHTML = resposedata.current.wind_dir
    wind_kph.innerHTML = resposedata.current.wind_kph
}


function displayNextToday() {
    temp = ""
    for (let i = 0; i < nextday.length; i++) {
        nextday[i].innerHTML = days[new Date(resposedata.forecast.forecastday[i + 1].date).getDay()]
        nextmonth[i].innerHTML = new Date(resposedata.forecast.forecastday[i + 1].date).getDate() + ' ' + dateMonth
        iconnext[i].innerHTML = `<img src="https:${resposedata.forecast.forecastday[i + 1].day.condition.icon}">`
        numnext[i].innerHTML = resposedata.forecast.forecastday[i + 1].day.maxtemp_c + `    <sup>o</sup>c`
        small[i].innerHTML = resposedata.forecast.forecastday[i + 1].day.mintemp_c + `   <sup>o</sup>`
        textnext[i].innerHTML = resposedata.forecast.forecastday[i + 1].day.condition.text
    }
}
