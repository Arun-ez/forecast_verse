
const getLatitudeAndLongitude = async (city) => {
    try {
        let response = await fetch(`${process.env.BASE_URL}/weather?q=${city}&appid=${process.env.API_KEY}`);
        let data = await response.json();
        let { coord: { lon, lat } } = data;
        return { lon, lat }
    } catch (error) {
        throw new Error(error);
    }
}

const formatCurrent = (data) => {
    let { dt, feels_like, humidity, pressure, temp, wind_speed, weather } = data.current;
    let current = { weather: weather[0].main, icon: weather[0].icon, dt, feels_like, humidity, pressure, temp, wind_speed }
    console.log(data);
}


const getWeather = async (param, query) => {
    const url = new URL(process.env.BASE_URL + '/' + param);
    url.search = new URLSearchParams({ ...query, appid: process.env.API_KEY })


    try {
        let response = await fetch(url);
        let data = await response.json();
        formatCurrent(data);
        return data;
    } catch (error) {
        throw new Error(error);
    }
}

export { getWeather, getLatitudeAndLongitude };









