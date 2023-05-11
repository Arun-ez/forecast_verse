import { useEffect } from 'react'
import { getWeather, getLatitudeAndLongitude } from '@/services/weather'

const WeatherInfo = ({ location, type, unit }) => {

    useEffect(() => {
        // console.log(unit)
    }, [unit])

    useEffect(() => {

        if (typeof location === 'string' && location !== "") {
            getLatitudeAndLongitude(location).then(async (data) => {
                try {
                    let response = await getWeather("onecall", data);
                    console.log({ city: response });
                } catch (error) {
                    console.log(error);
                }
            })
        } else if (typeof location === 'object') {
            getWeather("onecall", location).then((data) => {
                console.log({ geo: data })
            })
        }

    }, [location])

    return (
        <div>
            <h1> {type} </h1>
        </div>
    )
}

export default WeatherInfo;
