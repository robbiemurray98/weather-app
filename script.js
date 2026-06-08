// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London?key=NUA2JQ2XKGNC9GNHM8DRPWW4T

// display resolved address, currentConditions.conditions, temp, feelsLike, precipitation, description
// convert to celsius (32°F − 32) × 5/9 = 0°C



const input = document.querySelector('#location');
const btn = document.querySelector('#btn')



async function getLocation() {

    const inputValue = input.value;

    const location = inputValue;


    try{

        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=NUA2JQ2XKGNC9GNHM8DRPWW4T`)
        const weatherData = await response.json();

        if(!response.ok){
            throw new Error(`HTTP error! status ${response.status}`);
        }


        const weatherInfo = {
            resolvedAddress: weatherData.resolvedAddress,
            conditions: weatherData.currentConditions.conditions,
            temp: weatherData.currentConditions.temp,
            feelsLike: weatherData.currentConditions.feelslike,
            precip: weatherData.currentConditions.precip,
            desc: weatherData.description
        }

        return weatherInfo;


    } catch(error){
        console.log(error)
    }

}



const locationElement = document.querySelector('#location-container > :nth-child(2)')
const conditions = document.querySelector('#conditions-container > :nth-child(2)')
const temp = document.querySelector('#temp-container > :nth-child(2)')
const feelsLike = document.querySelector('#feelslike-container > :nth-child(2)')
const precip = document.querySelector('#precip-container > :nth-child(2)')
const desc = document.querySelector('#desc-container > :nth-child(2)')


btn.addEventListener('click', (e) => {
    e.preventDefault();

    getLocation();



    getLocation().then(function(data){
        locationElement.textContent = data.resolvedAddress;
        conditions.textContent = data.conditions;
        temp.textContent = `${data.temp} F°`
        feelsLike.textContent = `${data.feelsLike} F°`
        precip.textContent = data.precip
        desc.textContent = data.desc;


        getGif(data.conditions)
    })

    input.value = ''


})




const img = document.querySelector('img')
const conditionsP = document.querySelector('#conditions-p')

function getGif(conditions){
    console.log(conditions)
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=TJOVixYc5Tp5XEdkLssF0LdfJOAGnqf6&s=${conditions}`)
    .then(function(response){
        if(!response.ok){
            throw new Error(`HTTP error ${response.status}`)
        }

        return response.json()
    })
    .then(function(response){
        img.src = response.data.images.original.url;
    })
    .catch(function(error){
        console.log(error)
    })
}






const tempButton = document.querySelector('#temp-button')
const tempP = document.querySelector('#temp-p')
const feelsLikeP = document.querySelector('#feelslike-p')

tempButton.addEventListener('click', (e) =>{
    e.preventDefault()
    const tempValue = tempP.textContent.slice(0,-2);
    const tempNumValue = Number(tempValue);
    const feelsLikeValue = feelsLikeP.textContent.slice(0, -2)
    const feelsLikeNumValue = Number(feelsLikeValue)
    if(tempButton.textContent === 'Celsius'){
        tempP.textContent = `${convertToCelsius(tempNumValue)} C°`;
        feelsLikeP.textContent = `${convertToCelsius(feelsLikeNumValue)} C°`
        tempButton.textContent = 'Fahrenheit'

    
    } else if(tempButton.textContent === 'Fahrenheit'){
        tempP.textContent = `${convertToFahrenheit(tempNumValue)} F°`
        feelsLikeP.textContent = `${convertToFahrenheit(feelsLikeNumValue)} F°`
        tempButton.textContent = 'Celsius'
    }
})

function convertToCelsius(num){
    c = (num - 32) * 5/9 
    
    return c


}


function convertToFahrenheit(num){
    f = (num * 9/5) + 32
    return f

}
