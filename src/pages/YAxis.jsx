import React from 'react'
import { useEffect, useRef } from 'react';

const YAxis = ({ctx,calculateHeight,margin}) => {
    const yAxisCanvasRef = useRef(null);
    const [dynamicHeight, setDynamicHeight] = useState(calculateHeight());

    useEffect(() => {
        if (!yAxisCanvasRef.current) return;
        
        const ctx = yAxisCanvasRef.current.getContext('2d');
        if (!ctx) return;
    
        const height = dynamicHeight;
        const width = 60;
        yAxisCanvasRef.current.width = width;
        yAxisCanvasRef.current.height = height;
    
        ctx.clearRect(0, 0, width, height);
    
        // Price range
        const minPrice = 21600;
        const maxPrice = 24400;
        const priceRange = maxPrice - minPrice;
        const adjustedChartHeight = dynamicHeight * 0.8;
    
        // Draw y-axis labels
        const yTicks = 10;
        ctx.fillStyle = '#6b7280';
        ctx.font = '10px Arial';
        ctx.textAlign = 'right';
    
        for (let i = 0; i <= yTicks; i++) {
          const y = margin.top + (adjustedChartHeight - (adjustedChartHeight / yTicks) * i);
          ctx.fillText(
            (minPrice + (priceRange / yTicks) * i).toLocaleString(),
            55,
            y + 4
          );
        }
      }, [dynamicHeight]);

  return (
    <div>YAxis</div>
  )
}

export default YAxis
