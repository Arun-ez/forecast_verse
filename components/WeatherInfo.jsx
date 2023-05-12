import { useEffect, useState } from 'react'
import { getWeather, getLatitudeAndLongitude } from '@/services/weather'
import { Loading } from './Loading';
import { CiTempHigh } from 'react-icons/ci';
import { WiHumidity } from 'react-icons/wi';
import { BiWind } from 'react-icons/bi'

const WeatherInfo = ({ location, unit }) => {

    const [data, set_data] = useState({});
    const [loading, set_loading] = useState(true);
    const [error, set_error] = useState("");

    useEffect(() => {

        if (typeof location === 'string' && location !== "") {
            set_loading(true);
            set_error("");
            getLatitudeAndLongitude(location).then(async (data) => {

                if (data.failed) {
                    set_loading(false);
                    set_error(data.failed);
                    return;
                }

                try {
                    let response = await getWeather("onecall", { ...data, units: unit });
                    set_data(response);
                    set_loading(false);
                } catch (error) {
                    set_error("Failed to catch weather");
                    set_loading(false);
                }
            })
        } else if (typeof location === 'object') {
            set_loading(true);
            set_error("");
            getWeather("onecall", { ...location, units: unit }).then((data) => {
                set_data(data);
                set_loading(false);
            }).catch(() => {
                set_error("Failed to catch weather");
                set_loading(false);
            })
        } else {
            set_loading(false);
            set_error("Enter a city name or Give location permission")
        }

    }, [location, unit])

    return (
        <div className='flex flex-col items-center my-8'>
            {loading ?
                <>
                    <Loading />
                </>

                :

                <>
                    {error ?
                        <>
                            <h1> {error} </h1>
                        </>

                        :

                        <>
                            <h1 className='font-bold text-3xl'> {data.city}, {data.country} </h1>
                            <p className='text-sm opacity-90'> {data.current.day}, {data.current.hour} </p>


                            <div className='flex w-[100%] justify-center items-center my-8'>

                                <div className="flex flex-col justify-center items-center md:items-center lg:items-end w-[100%]">
                                    <img className='w-[60px] h-[60px] md:w-[120px] md:h-[120px] lg:w-[120px] lg:h-[120px]' src={data.current.icon} alt="weather_status" />
                                    <h1 className='text-center w-[60px] md:w-[120px] lg:w-[120px]'> {data.current.weather} </h1>
                                </div>

                                <div className="flex flex-col justify-center items-center w-[100%]">
                                    <h1 className='text-4xl md:text-7xl lg:text-7xl font-medium font-mono text-slate-800'> {data.current.temp} </h1>
                                </div>

                                <div className="flex flex-col justify-center items-center md:items-center lg:items-start w-[100%] gap-2 text-xs md:text-base lg:text-base">
                                    <h1 className='w-48 flex items-center gap-1 opacity-90'> <CiTempHigh /> Feels like : {data.current.feels_like} </h1>
                                    <h1 className='w-48 flex items-center gap-1 opacity-90'> <WiHumidity /> Humidity : {data.current.humidity} </h1>
                                    <h1 className='w-48 flex items-center gap-1 opacity-90'> <BiWind /> Wind Speed : {data.current.wind_speed} </h1>
                                </div>

                            </div>
                        </>

                    }
                </>

            }
        </div>
    )
}

export default WeatherInfo;
