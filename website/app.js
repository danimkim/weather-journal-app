/* Global Variables */
const countryCode = "us";

// Personal API Key for OpenWeatherMap API
const myApiKey = "fd0cdd49a8017b2716b377bad75c78d6";
const apiKey = `${myApiKey}&units=imperial`;

const BASE_URL = "http://localhost:8000";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.querySelector("#generate").addEventListener("click", handleClick);

/* Function called by event listener */
async function handleClick() {
  getWeatherData()
    .then((res) => {
      const { main } = res;
      const feeling = document.querySelector("#feelings").value;

      const data = {
        temperature: main.temp,
        date: newDate,
        feeling,
      };

      postData(BASE_URL, data);
    })
    .then((res) => {
      getPostData();
    });
}

/* Function to GET Web API Data*/
const getWeatherData = async () => {
  const zipCodeInput = document.querySelector("#zip").value.trim();
  try {
    const resJson = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?zip=${zipCodeInput},${countryCode}&appid=${apiKey}`
    ).then((res) => res.json());

    return resJson;
  } catch (error) {
    alert("Something went wrong!");
    console.error(error.status);
  }
};

/* Function to POST data */
const postData = async (baseUrl = "", data) => {
  try {
    const res = await fetch(`${baseUrl}/post`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};

/* Function to GET Project Data */
const getPostData = async () => {
  const res = await fetch(`${BASE_URL}/all`);

  try {
    const data = await res.json();

    // Update UI
    document.querySelector("#date").innerHTML = `Date: ${data.date}`;
    document.querySelector(
      "#temp"
    ).innerHTML = `Temperature: ${data.temperature} degree`;
    document.querySelector("#content").innerHTML = `Content: ${data.feeling}`;
  } catch (e) {
    console.error(e);
  }
};
