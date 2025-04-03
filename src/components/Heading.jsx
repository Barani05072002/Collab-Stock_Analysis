import React from 'react'

const Heading = ({data}) => {
  return (
    <div className="mb-8">
          <h1 className="text-white text-3xl font-bold">{data}</h1>
          <div className="w-12 h-1 bg-white mt-1 rounded"></div>
    </div>
  )
}

export default Heading