import { Loader } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return (
    <div className='h-screen flex items-center justify-center'>
      <Loader size={70} className='animate-spin'/>
    </div>
  )
}
