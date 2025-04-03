import React from 'react'

const LinkTemp = ({data}) => {
  return (
    <div className="flex items-center">
          <div className="flex mr-2">
            <button className="w-10 h-10 bg-gray-200 mr-2 rounded hover:bg-gray-300 transition-colors"></button>
            <button className="w-10 h-10 bg-gray-200 rounded hover:bg-gray-300 transition-colors"></button>
          </div>
          <div className="flex-grow text-right">
            <div className="inline-block relative group">
              <a href="#" className="text-white font-bold relative inline-block">
                {data}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-white transition-all duration-300 ease-in group-hover:w-full"></span>
              </a>
            </div>
          </div>
        </div>
  )
}

export default LinkTemp