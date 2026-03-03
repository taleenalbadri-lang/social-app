import React from 'react'
import { BarLoader } from 'react-spinners'

export default function Loading() {
  return (
    <div className='h-screen flex justify-center items-center'>
      <BarLoader color='#594C5B'/>
    </div>
  )
}
