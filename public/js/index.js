const submitBtn = document.getElementById("submit-btn");
const cityName = document.getElementById("cityName");
const citylocation = document.getElementById("citylocation");
const tempStatus = document.getElementById('temp-status');
const tempRealVal = document.getElementById('temp-real-val');
const dataHide = document.querySelector(".middle-layer");
const day = document.getElementById('day');
const todayDate = document.getElementById('today-date');

// Set Date and Time
const getCurrentDay = () => {

    var weekday = new Array(7);
    weekday[0] = "SUNDAY"
    weekday[1] = "MONDAY"
    weekday[2] = "TUESDAY"
    weekday[3] = "WEDNESDAY"
    weekday[4] = "THRUSDAY"
    weekday[5] = "FRIDAY"
    weekday[6] = "SATURDAY"

    let currentTime = new Date();
    let day = weekday[currentTime.getDay()];
    return day;
}

day.innerText = getCurrentDay();

const getCurrentDate = () => {

    var months = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC"
    ]

    var now = new Date();
    var month = now.getMonth();
    var date = now.getDate();

    return ` ${date} ${months[month]} `;
}

todayDate.innerText = getCurrentDate();

// Fecthing Data from Api

const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;

    if (cityVal === '') {
        citylocation.innerText = "Please enter the city name before search ";
        dataHide.classList.add('data-hide');
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=34333147b8b4e31cedc5450edc338c5d`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
          
            citylocation.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            tempRealVal.innerText = arrData[0].main.temp;
            
            const tempMood = arrData[0].weather[0].main;
            // condition to check sunny or cloudy

            if(tempMood == "Clear"){
                tempStatus.innerHTML = "<i class = 'fa fa-sun' style ='color : #eccc68;'></i>"
            
            }
            else if (tempMood == "Clouds"){
                tempStatus.innerHTML = "<i class = 'fa fa-cloud' style ='color :#f1f2f6;'></i>"
            }

            else if (tempMood == "Rain"){
                tempStatus.innerHTML = "<i class = 'fa fa-cloud-rain' style ='color : #a4b0be;'></i>"
            }

            else{
                tempStatus.innerHTML = "<i class = 'fa fa-sun' style ='color : #eccc68;'></i>"
            }

             dataHide.classList.remove('data-hide');

        } catch{
            citylocation.innerText = "Please enter the city name properly ";
            dataHide.classList.add("data-hide");
        }

    }



}

submitBtn.addEventListener('click', getInfo);