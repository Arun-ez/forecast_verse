import React from 'react'
import Image from 'next/image'

const Logo = () => {
    return (
        <div className='flex w-[100%] justify-center items-center p-6 gap-2'>
            <Image src="/icon.png" width={37} height={37} alt='logo' />
            <h1 className='text-3xl font-bold flex align-middle h-10'> Forecast <span className='text-sky-500'>Verse</span> </h1>
        </div>
    )
}

export default Logo
