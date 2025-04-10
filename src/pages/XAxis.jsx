import { useEffect, useRef } from "react";

const XAxis = ({ data, candleWidth, margin }) => {
    const canvasRef = useRef(null);
    const height = 40;
  
    useEffect(() => {
      if (!canvasRef.current) return;
      
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;
  
      const width = data.length * candleWidth + margin.left + margin.right;
      canvasRef.current.width = width;
      canvasRef.current.height = height;
  
      ctx.clearRect(0, 0, width, height);
  
      // Draw month labels
      const xTicks = 6;
      ctx.fillStyle = '#6b7280';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
  
      for (let i = 0; i <= xTicks; i++) {
        const tickIndex = Math.floor((data.length / xTicks) * i);
        if (tickIndex < data.length) {
          const x = margin.left + (data.length * candleWidth / xTicks) * i;
          ctx.fillText(data[tickIndex].month, x, 15);
        }
      }
  
      // Draw year label
      ctx.fillText('2025', width / 2, 30);
    }, [data, candleWidth, margin]);
  
    return (
      <canvas 
        ref={canvasRef} 
        className="w-full"
        style={{ height: `${height}px` }} 
      />
    );
  };

export default XAxis