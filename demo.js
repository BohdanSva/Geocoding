// GEOLOCATION API PROJECT
// V. 1

// Get data from user and save to local storage
document.addEventListener("submit", (event) => {
    event.preventDefault(); // do not reload page on submit
    const locationSearch = new FormData(locationInput);
    const input = Object.fromEntries(locationSearch);
    console.log(input); // Show what the form sends in console to check for correct behaviour. 
    localStorage.setItem("userInput", JSON.stringify(input)); // We can only store strings in the window.localStorage object.
});

// Take data from local storage and send to API
document.getElementById("generateMap").addEventListener("click", (event) => {
    event.preventDefault(); // do not reload page on submit
    
    let locationQuery = window.localStorage.getItem("userInput"); // This is a string in JSON format.
    let queryObject = JSON.parse(locationQuery); // This conversts JSON string into an object.
    let query = Object.values(queryObject); // This gets just the saved value.
    console.log(query); // Show what the browser sends to API in console to check for correct behaviour. 
    
    const geocodingURL = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${query}&format=json&limit=1`;

    const getLocation = async () => {
        const {data} = await axios.get(geocodingURL);
        console.log(data[0]); // whole data set
        console.log(data[0].address); // address object
        console.log(data[0].lat); // latitude
        console.log(data[0].lon); // longitude

        let latitude = data[0].lat; // This is a string.
        let longitude = data[0].lon; // This is a string.

        document.getElementById("map").src=
        `https://www.openstreetmap.org/export/embed.html?bbox=${longitude},${latitude},${longitude},${latitude}`;

    }

    getLocation();
    localStorage.clear;

});