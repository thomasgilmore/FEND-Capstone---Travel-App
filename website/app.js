/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
              
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
let apiKey = '&appid=2bb66a089109955e2291e796e6a76439';

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
const newZip =  document.getElementById('zip').value;
let feelings = document.getElementById('feelings').value;
getZip(baseURL,newZip, apiKey)

.then(function(data){
  //console.log(data);
  postData('/wheather', {temperature : data.main.temp, date: newDate, userResponse: feelings})

  updateUI();
});
}

const getZip = async (baseURL, zip, key)=>{

  const res = await fetch(baseURL+zip+key)
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

const updateUI = async () => {
  const request = await fetch('/all2');
  try{
    const allData = await request.json();
    console.log(allData);
    console.log(allData[0].temperature);
    console.log(allData[0].date);
    console.log(allData[0].userResponse)
    document.getElementById('temp').innerHTML = allData[0].temperature;
    document.getElementById('date').innerHTML = allData[0].date;
    document.getElementById('content').innerHTML = allData[0].userResponse;

  }catch(error){
    console.log("error", error);
  }
}