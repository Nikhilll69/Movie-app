import React from 'react'
import loader from '../../public/820.gif'

const Loader = () => {
  return (
    <div className="flex justify-center items-center mt-10 w-full">
                 <img src={loader} alt="Loading..." className="w-12 h-12" />
               </div>
  )
}

export default Loader