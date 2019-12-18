/* Global Variables */
let comma = ', ';
let comma2 = ',';
// Create a new date instance dynamically with JS
//let d = new Date();
//let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
              
let baseURL = 'http://api.geonames.org/searchJSON?q=';
let apiKey = '&maxRows=10&username=tgilmore';

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
const location =  document.getElementById('location').value;
let departingDate = document.getElementById('departing').value;
getLocation(baseURL,location, apiKey)

.then(function(data){
  //console.log(data);
  //console.log(data.geonames[0].lat);
  //console.log(data.geonames[0].lng);
  //console.log(data.geonames[0].name);
  //console.log(data.geonames[0].countryName);
  postData('/wheather', {latitude : data.geonames[0].lat, longitude: data.geonames[0].lng, city: data.geonames[0].name, country: data.geonames[0].countryName, departingDate: departingDate})
  let latitude = data.geonames[0].lat;
  let longitude = data.geonames[0].lng;
  let darkSky = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/3850f94f44aebe0584283d915ff18a45/';
  getDarkSky(darkSky, latitude, comma2, longitude);
  console.log("OUTSIDE OF FUNCTION");
  console.log(data2);
  updateUI();
})
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
    console.log("INSIDE FUNCTION");
    console.log(data2);
    return data2;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

const updateUI = async () => {
  const request = await fetch('/all2');
  try{
    const allData = await request.json();
    //console.log(allData);
    //console.log(allData[0].latitude);
    //console.log(allData[0].longitude);
    //console.log(allData[0].city);
    //console.log(allData[0].country);
    //console.log(allData[0].departingDate);
    //document.getElementById('latitude').innerHTML = allData[0].latitude;
    //document.getElementById('longitude').innerHTML = allData[0].longitude;
    document.getElementById('city').innerHTML = allData[0].city;
    document.getElementById('comma').innerHTML = comma;
    document.getElementById('country').innerHTML = allData[0].country;
    document.getElementById('departingDate').innerHTML = allData[0].departingDate;

  }catch(error){
    console.log("error", error);
  }
}

module.exports = performAction;
module.exports = updateUI;