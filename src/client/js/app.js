/* Global Variables */
let comma = ', ';
let comma2 = ',';
// Create a new date instance dynamically with JS
//let d = new Date();
//let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
              
let baseURL = 'http://api.geonames.org/searchJSON?q=';
let apiKey = '&maxRows=10&username=tgilmore';

let api3 = 'https://pixabay.com/api/?key=14673748-c80fdbe3100fbacb5399456d8&q=';
let api3Key = '&image_type=photo&pretty=true';

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
const location =  document.getElementById('location').value;
let departingDate = document.getElementById('departing').value;
getLocation(baseURL,location, apiKey)

.then(function(data){
  //console.log("OUTSIDE");
  //console.log(data3);
  //console.log(data);
  //console.log(data.geonames[0].lat);
  //console.log(data.geonames[0].lng);
  //console.log(data.geonames[0].name);
  //console.log(data.geonames[0].countryName);
  postData('/wheather', {latitude : data.geonames[0].lat, longitude: data.geonames[0].lng, city: data.geonames[0].name, country: data.geonames[0].countryName, departingDate: departingDate});
  let latitude = data.geonames[0].lat;
  let longitude = data.geonames[0].lng;
  let darkSky = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/3850f94f44aebe0584283d915ff18a45/';
  getDarkSky(darkSky, latitude, comma2, longitude)
  .then(function(data2){
    //console.log("OUTSIDE OF FUNCTION");
    //console.log(data2);
    //console.log(data2.daily.data[0].summary);
    //console.log(data2.daily.data[0].temperatureHigh);
    //console.log(data2.daily.data[0].temperatureLow);
    postData('/wheather', {summary : data2.daily.data[0].summary, temperatureHigh: data2.daily.data[0].temperatureHigh, temperatureLow: data2.daily.data[0].temperatureLow});
  });
  getPicture(api3, location, api3Key)
  .then(function(data3){
    //console.log("data3");
    //console.log(data3);
  });
  updateUI();
});
}

const getLocation = async (baseURL, location, key)=>{

  const res = await fetch(baseURL+location+key)
  try {

    const data = await res.json();
    //console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

const postData = async (url='', data = {}) => {
  //console.log(data)
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        //console.log(newData);
        return newData;
      }catch(error) {
        console.log("error", error);
      }
}

const getDarkSky = async (darkSky, latitude, comma2, longitude)=>{

  const res = await fetch(darkSky+latitude+comma2+longitude)
  try {

    const data2 = await res.json();
    //console.log("INSIDE FUNCTION");
    //console.log(data2);
    return data2;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

const getPicture = async (api3, location, api3Key)=>{

  const res = await fetch(api3+location+api3Key)
  try {

    const data3 = await res.json();
    //console.log(data3)
    return data3;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

const updateUI = async () => {
  const request = await fetch('/all2');
  try{
    const allData = await request.json();
    console.log(allData);
    //console.log(allData[0].latitude);
    //console.log(allData[0].longitude);
    //console.log(allData[0].city);
    //console.log(allData[0].country);
    //console.log(allData[0].departingDate);
    console.log(allData[2].summary);
    //document.getElementById('latitude').innerHTML = allData[0].latitude;
    //document.getElementById('longitude').innerHTML = allData[0].longitude;
    document.getElementById('city').innerHTML = allData[0].city;
    document.getElementById('comma').innerHTML = comma;
    document.getElementById('country').innerHTML = allData[0].country;
    document.getElementById('departingDate').innerHTML = allData[0].departingDate;
    document.getElementById('weather').innerHTML = allData[2].summary;

  }catch(error){
    console.log("error", error);
  }
}

module.exports = performAction;
module.exports = updateUI;
module.exports = getDarkSky;