import { DateTime, Zone } from 'luxon'

const getLatitudeAndLongitude = async (city) => {
    try {
        let response = await fetch(`${process.env.BASE_URL}/weather?q=${city}&appid=${process.env.API_KEY}`);
        let data = await response.json();
        let { coord: { lon, lat } } = data;
        return { lon, lat }
    } catch (error) {
        return { failed: "Invalid City" }
    }
}

const formatTimezone = (seconds, timezone, format) => {

    return DateTime.fromSeconds(seconds).setZone(timezone).toFormat(format);
}

const formatCurrent = (data, unit) => {
    let { dt, feels_like, humidity, pressure, temp, wind_speed, weather } = data.current;

    let current = {
        weather: weather[0].main,
        hour: formatTimezone(dt, data.timezone, 'hh:mm a'),
        day: formatTimezone(dt, data.timezone, 'ccc'),
        icon: `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
        feels_like: Math.round(feels_like) + (unit === "metric" ? "°C" : "°F"),
        humidity: Math.round(humidity) + "%",
        pressure,
        temp: Math.round(temp) + (unit === "metric" ? "°C" : "°F"),
        wind_speed: Math.round(wind_speed) + "km/h"
    }

    let hourly = data.hourly.slice(1, 8).map(({ dt, temp, pressure, feels_like, humidity, wind_speed, weather }) => {
        return {
            hour: formatTimezone(dt, data.timezone, 'hh:mm a'),
            temp: Math.round(temp) + (unit === "metric" ? "°C" : "°F"),
            pressure,
            feels_like: Math.round(feels_like) + (unit === "metric" ? "°C" : "°F"),
            humidity: Math.round(humidity) + "%",
            wind_speed: Math.round(wind_speed) + "km/h",
            weather: weather[0].main,
            icon: `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
        }
    });


    let daily = data.daily.slice(1, 8).map(({ dt, temp, pressure, feels_like, humidity, wind_speed, weather }) => {
        return {
            day: formatTimezone(dt, data.timezone, 'ccc'),
            temp: Math.round(temp.max) + (unit === "metric" ? "°C" : "°F"),
            pressure,
            feels_like: Math.round(feels_like.day) + (unit === "metric" ? "°C" : "°F"),
            humidity: Math.round(humidity) + "%",
            wind_speed: Math.round(wind_speed) + "km/h",
            weather: weather[0].main,
            icon: `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
        }
    });

    return { current, daily, hourly, city: data.name, state: data.state, country: data.country }

}


const getWeather = async (param, query) => {

    const FORECAST_URL = new URL(process.env.BASE_URL + '/' + param);
    FORECAST_URL.search = new URLSearchParams({ ...query, appid: process.env.API_KEY })

    const LOCATION_URL = new URL(process.env.GEO_URL);
    LOCATION_URL.search = new URLSearchParams({ ...query, appid: process.env.API_KEY })

    try {
        let forecast_response = await fetch(FORECAST_URL);
        let location_response = await fetch(LOCATION_URL);
        let forecast = await forecast_response.json();
        let location = await location_response.json();
        let data = formatCurrent({ ...forecast, name: location[0].name, state: location[0].state || location[0].country, country: location[0].country }, query.units);
        return data;
    } catch (error) {
        throw new Error(error);
    }
}

export { getWeather, getLatitudeAndLongitude };









