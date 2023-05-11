"use client"
import { useEffect, useRef, useState } from 'react'
import { BsArrowRightShort } from 'react-icons/bs'
import { GiIndianPalace } from 'react-icons/gi'
import { FaFlagUsa } from 'react-icons/fa'
import { GiJapaneseBridge } from 'react-icons/gi'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import WeatherInfo from './WeatherInfo'

const Search = () => {

    const input_ref = useRef(null);
    const [unit, set_unit] = useState('°F');
    const [input, set_input] = useState("");
    const [data_state, set_data_state] = useState('current');
    const [translate, set_translate] = useState('translate-x-0');
    const [date_and_time, set_date_and_time] = useState(". . .");

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const types = [
        {
            name: "Current",
            active_class: "bg-sky-500 px-4 py-2 text-white rounded-3xl",
            onClick: () => { set_data_state("Current") }
        },
        {
            name: "Daily",
            active_class: "bg-sky-500 px-4 py-2 text-white rounded-3xl",
            onClick: () => { set_data_state("Daily") }
        },
        {
            name: "Hourly",
            active_class: "bg-sky-500 px-4 py-2 text-white rounded-3xl",
            onClick: () => { set_data_state("Hourly") }
        }
    ]

    const getDateAndTime = () => {
        let date = new Date();
        let day = days[date.getDay() - 1];
        let current_date = date.getDate();
        let month = months[date.getMonth()];
        let year = date.getFullYear();
        let hour = date.getHours();
        let minutes = date.getMinutes();

        return `${day}, ${current_date} ${month} ${year} | Local time ${hour < 10 ? '0' + hour : hour}:${minutes < 10 ? '0' + minutes : minutes} ${hour > 12 ? 'PM' : 'AM'}`
    }

    const toggle_unit = () => {

        if (unit === "°F") {
            set_unit("°C");
            set_translate('translate-x-10');
        } else {
            set_unit("°F")
            set_translate('translate-x-0');
        }
    }

    const location_handler = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
                set_input({ lat: latitude, lon: longitude });
            })
        }
    }

    const search = (city) => {
        set_input(city);
    }

    useEffect(() => {
        set_date_and_time(getDateAndTime())
        set_data_state('Current');
        location_handler();

        let intervalId = setInterval(() => {
            set_date_and_time(getDateAndTime());
        }, 500);

        return () => { clearInterval(intervalId) }
    }, [])

    return (


        <div>

            <div className='flex justify-center flex-col md:flex-col lg:flex-row'>

                <div className='w-[100%] flex flex-col gap-2 p-10'>
                    <div className='bg-sky-100 flex w-[100%]'>
                        <input ref={input_ref} className='border-1 bg-sky-100 p-5 w-[100%] outline-none' type="text" placeholder='Enter City Name' />
                        <button className='p-6'> <BsArrowRightShort className='text-3xl text-slate-600 hover:text-stone-900' onClick={() => { search(input_ref.current.value) }} /> </button>
                        <button className='p-6 bg-slate-300'> <HiOutlineLocationMarker onClick={location_handler} /> </button>
                    </div>

                    <div className='w-[100%]'>
                        <p className='p-1 opacity-80 text-sm md:text-sm lg:text-base'> {date_and_time} </p>
                    </div>

                    <div className='bg-slate-400 w-[80px] h-10 rounded-3xl flex items-center p-1 cursor-pointer' onClick={toggle_unit}>
                        <div className={`${translate} transition-transform duration-500 flex justify-center items-center h-8 w-8 bg-slate-800 rounded-full text-white select-none`}> {unit} </div>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 w-[100%] p-10 select-none'>

                    <div
                        className='flex justify-center flex-col items-center bg-slate-400 p-4 gap-2 cursor-pointer'
                        onClick={() => { search("Kolkata") }}
                    >
                        <GiIndianPalace className='text-4xl' />
                        <div className='text-center '>
                            <h1 className='font-bold'> Kolkata </h1>
                            <p> India </p>
                        </div>

                    </div>

                    <div
                        className='flex justify-center flex-col items-center bg-slate-400 p-4 gap-2 cursor-pointer'
                        onClick={() => { search("New York") }}
                    >
                        <FaFlagUsa className='text-4xl' />
                        <div className='text-center '>
                            <h1 className='font-bold'> New York </h1>
                            <p> United states </p>
                        </div>

                    </div>

                    <div
                        className='flex justify-center flex-col items-center bg-slate-400 p-4 gap-2 cursor-pointer'
                        onClick={() => { search("Tokyo") }}
                    >
                        <GiJapaneseBridge className='text-4xl' />
                        <div className='text-center '>
                            <h1 className='font-bold'> Tokyo </h1>
                            <p> Japan </p>
                        </div>

                    </div>

                </div>
            </div>

            <div className='flex w-[100%] justify-center items-center gap-16'>
                {types.map(({ name, active_class, onClick }, id) => {
                    return (
                        <p key={id} className={`cursor-pointer ${name === data_state ? active_class : ""}`} onClick={onClick}>
                            {name}
                        </p>
                    )
                })}
            </div>

            <WeatherInfo location={input} type={data_state} unit={unit} />

        </div>
    )
}

export default Search
