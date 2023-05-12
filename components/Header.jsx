import React from 'react'

const Header = () => {
    return (
        <div className='flex justify-center gap-5 flex-col md:flex-row lg:flex-row p-8'>

            <div className='flex flex-col gap-3 w-auto text-3xl font-bold md:text-5xl lg:text-6xl md:w-[700px] lg:w-[700px]'>
                <h1 className='m-0 whitespace-nowrap'> Provides a worldwide </h1>
                <h1 className='m-0 whitespace-nowrap'> weather forecast </h1>
            </div>

            <div className='w-[100%] md:w-[500px] lg:w-[500px]'>
                <p className='p-1 opacity-90 text-sm md:text-sm lg:text-base'> Most Accurate forecasted weather with extreme weather on the rise, it easy to receive the weather condition of your current locations </p>
            </div>
        </div>
    )
}

export default Header
