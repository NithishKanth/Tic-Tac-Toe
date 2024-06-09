import Image from 'next/image'
import React from 'react'

const Banner = () => {
  return (
    <div className='w-fit h-fit relative'>
        <div className='absolute w-full h-full ban'>
            <Image src={'./left_right.svg'} width={0} height={10}  className='w-full'/>
        </div>
        <div className='div-1 flex gap-2 mb-2'>
            <div className='box'>
                <Image src={'./x_icon.svg'} width={10} height={10}  className='w-full'/>
            </div>
            <div className='box'></div>
            <div className='box'>
                <Image src={'./o_icon.svg'} width={10} height={10}  className='w-full'/>
            </div>
        </div>
        <div className='div-2 flex gap-2 mb-2'>
            <div className='box'>
                <Image src={'./o_icon.svg'} width={10} height={10}  className='w-full'/>
            </div>
            <div className='box'>
                <Image src={'./x_icon.svg'} width={10} height={10}  className='w-full'/>
            </div>
            <div className='box'></div>
        </div>
        <div className='div-3 flex gap-2'>
            <div className='box'>
            </div>
            <div className='box'></div>
            <div className='box'>
                <Image src={'./x_icon.svg'} width={10} height={10}  className='w-full'/>
            </div>
        </div>
    </div>
  )
}

export default Banner