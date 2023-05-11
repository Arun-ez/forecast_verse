
// const getLatitudeAndLongitude = async () => {
//     try {

//     } catch (error) {
//         throw new Error(error);
//     }

// }

// const formatData = () => {

// }

// const getWheather = async () => {
//     try {

//     } catch (error) {
//         throw new Error(error);
//     }
// }

class Weather {
    constructor(city) {
        this.city = city;
    }

    setLatitudeAndLongitude = async () => {
        try {
            let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${process.env.API_KEY}`);
            let data = await response.json();
            let { coord: { lon, lat } } = data;
            this.lon = lon;
            this.lat = lat;
        } catch (error) {
            throw new Error(error);
        }
    }

    current = async () => {
        try {
            let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${process.env.API_KEY}`);
            let data = await response.json();
            let h = data;
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }

}

export default Weather