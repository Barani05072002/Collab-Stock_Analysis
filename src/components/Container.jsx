import React from 'react'
import img from '../assets/Rectangle 2.png'

const Container = ({ children }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black" 
        // style={{
        //   backgroundImage: 'linear-gradient(rgba(75, 75, 75, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(75, 75, 75, 0.2) 1px, transparent 1px)',  
        //   backgroundSize: '30px 30px'
        // }}
        style={{
            backgroundImage: `url(${img})`, // Replace with your pattern PNG image
            backgroundRepeat: 'repeat',
          }}
        >
      <div className="w-full max-w-xs px-auto py-8 border">
        {React.Children.map(children, (child) => (
          <div>{child}</div>
        ))}
      </div>
      </div>
    );
  }
export default Container