import React, { useEffect } from 'react'

const WeatherInfo = ({ location, type, unit }) => {

    useEffect(() => {
        console.log(unit)
    }, [unit])

    useEffect(() => {
        if (typeof location === 'string') {
            console.log("city");
        } else {
            console.log("geo");
        }

    }, [location])

    return (
        <div>
            <h1> {type} </h1>
        </div>
    )
}

export default WeatherInfo;
