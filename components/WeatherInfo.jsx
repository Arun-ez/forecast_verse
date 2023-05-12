import { useEffect, useState } from 'react'
import { getWeather, getLatitudeAndLongitude } from '@/services/weather'
import { Loading } from './Loading';
import { CiTempHigh } from 'react-icons/ci';
import { WiHumidity } from 'react-icons/wi';
import { BiWind } from 'react-icons/bi'

const WeatherInfo = ({ location, unit, scrollTo }) => {

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
                    scrollTo.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                    return;
                }

                try {
                    let response = await getWeather("onecall", { ...data, units: unit });
                    set_data(response);
                    set_loading(false);
                    setTimeout(() => {
                        scrollTo.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                    }, 500)
                } catch (error) {
                    set_error("Failed to catch weather");
                    set_loading(false);
                    scrollTo.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                }
            })
        } else if (typeof location === 'object') {
            set_loading(true);
            set_error("");
            getWeather("onecall", { ...location, units: unit }).then((data) => {
                set_data(data);
                set_loading(false);
                setTimeout(() => {
                    scrollTo.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                }, 500)

            }).catch(() => {
                set_error("Failed to catch weather");
                set_loading(false);
                scrollTo.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
            })
        } else {
            set_loading(false);
            set_error("Enter a city name or Give location permission");
            scrollTo.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        }

    }, [location, unit])

    return (
        <div className='flex flex-col items-center my-16'>
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
                            <h1 className='font-bold text-3xl tracking-in-contract'> {data.city}, {data.country} </h1>
                            <p className='text-sm opacity-90'> {data.current.day}, {data.current.hour} </p>


                            <div className='flex w-[100%] justify-center items-center my-8 flex-col md:flex-row lg:flex-row gap-6'>

                                <div className="flex flex-col justify-center items-center md:items-center lg:items-end w-[100%]">
                                    <img className='w-[120px] h-[120px] md:w-[120px] md:h-[120px] lg:w-[120px] lg:h-[120px]' src={data.current.icon} alt="weather_status" />
                                    <h1 className='text-center w-[60px] md:w-[120px] lg:w-[120px]'> {data.current.weather} </h1>
                                </div>

                                <div className="flex flex-col justify-center items-center w-[100%]">
                                    <h1 className='text-7xl font-medium font-mono text-slate-800'> {data.current.temp} </h1>
                                </div>

                                <div className="flex flex-row md:flex-col lg:flex-col justify-center items-center md:items-center lg:items-start w-[100%] gap-2 text-xs md:text-base lg:text-base">
                                    <h1 className='w-46 flex items-center gap-1 opacity-90'> <CiTempHigh /> Feels like : {data.current.feels_like} </h1>
                                    <h1 className='w-46 flex items-center gap-1 opacity-90'> <WiHumidity /> Humidity : {data.current.humidity} </h1>
                                    <h1 className='w-46 flex items-center gap-1 opacity-90'> <BiWind /> Wind : {data.current.wind_speed} </h1>
                                </div>
                            </div>

                            <div className='flex flex-col md:flex-row lg:flex-row w-[100%] my-5'>
                                <div className='flex w-[100%] flex-col items-center'>
                                    <h1 className='font-bold text-xl'> Hourly Forecast </h1>
                                    <div className="flex flex-col gap-4 w-[90%] my-6">
                                        {data.hourly.map(({ hour, humidity, temp, icon }, idx) => {
                                            return (
                                                <div className="flex justify-around items-center w-[100%] rounded-xl bg-slate-200 p-4" key={idx}>
                                                    <div>
                                                        <h1 className='font-bold'> {hour} </h1>
                                                        <p className='text-xs'> humidity: {humidity} </p>
                                                    </div>

                                                    <h1 className='font-bold text-2xl text-slate-700'> {temp} </h1>

                                                    <img width={80} height={80} src={icon} alt="weather_status" />

                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className='flex w-[100%] flex-col items-center'>
                                    <h1 className='font-bold text-xl'> Daily Forecast </h1>
                                    <div className="flex flex-col gap-4 w-[90%] my-6">
                                        {data.daily.map(({ day, humidity, temp, icon }, idx) => {
                                            return (
                                                <div className="flex justify-around items-center w-[100%] rounded-xl bg-slate-200 p-4" key={idx}>
                                                    <div>
                                                        <h1 className='font-bold'> {day} </h1>
                                                        <p className='text-xs'> humidity: {humidity} </p>
                                                    </div>

                                                    <h1 className='font-bold text-2xl text-slate-700'> {temp} </h1>

                                                    <img width={80} height={80} src={icon} alt="weather_status" />

                                                </div>
                                            )
                                        })}
                                    </div>
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
