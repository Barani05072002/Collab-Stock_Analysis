import React, { useState, useRef, useEffect } from 'react';
import XAxis from './XAxis';
import TooltipBox from './TooltipBox';
import { generateChartData } from '../test/generateChartData';

const CandlestickChart = () => {

  const [data] = useState(generateChartData());
  
  const [hoveredData, setHoveredData] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [crosshairPos, setCrosshairPos] = useState(null);
  const mainCanvasRef = useRef(null);
  const volumeCanvasRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const yAxisCanvasRef = useRef(null);
  const containerRef = useRef(null);

  const lastDataPoint = data[data.length - 1];
  const candleWidth = 12;
  const margin = { top: 10, right: 60, bottom: 20, left: 20 };
  const chartHeight = 400;
  const volumeHeight = 80;
  const xAxisHeight = 40;
  const totalHeight = chartHeight + volumeHeight;
  const chartWidth = data.length * candleWidth;

  // Calculate dynamic height based on viewport
  const calculateHeight = () => {
    if (!containerRef.current) return totalHeight;
    const viewportHeight = window.innerHeight;
    const containerTop = containerRef.current.getBoundingClientRect().top;
    const availableHeight = viewportHeight - containerTop - 60;
    return Math.max(availableHeight, 300);
  };

  const [dynamicHeight, setDynamicHeight] = useState(calculateHeight());

  useEffect(() => {
    const handleResize = () => {
      setDynamicHeight(calculateHeight());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Draw y-axis
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

  // Draw main chart and volume
  useEffect(() => {
    if (!mainCanvasRef.current || !volumeCanvasRef.current) return;

    const mainCtx = mainCanvasRef.current.getContext('2d');
    const volumeCtx = volumeCanvasRef.current.getContext('2d');

    if (!mainCtx || !volumeCtx) return;

    // Set dimensions
    mainCanvasRef.current.width = chartWidth + margin.left;
    mainCanvasRef.current.height = dynamicHeight;
    volumeCanvasRef.current.width = chartWidth + margin.left;
    volumeCanvasRef.current.height = dynamicHeight;

    // Clear canvases
    mainCtx.clearRect(0, 0, mainCanvasRef.current.width, dynamicHeight);
    volumeCtx.clearRect(0, 0, volumeCanvasRef.current.width, dynamicHeight);

    // Price range
    const minPrice = 21600;
    const maxPrice = 24400;
    const priceRange = maxPrice - minPrice;

    // Volume range
    const maxVolume = Math.max(...data.map(d => d.volume));
    const volumeRange = maxVolume;

    // Calculate adjusted heights based on dynamic height
    const adjustedChartHeight = dynamicHeight * 0.8;
    const adjustedVolumeHeight = dynamicHeight * 0.2;

    // Draw grid lines
    mainCtx.strokeStyle = '#e5e7eb';
    mainCtx.lineWidth = 1;

    // Horizontal grid lines (price)
    const yTicks = 10;
    for (let i = 0; i <= yTicks; i++) {
      const y = margin.top + (adjustedChartHeight - (adjustedChartHeight / yTicks) * i);
      mainCtx.beginPath();
      mainCtx.moveTo(0, y);
      mainCtx.lineTo(chartWidth, y);
      mainCtx.stroke();
    }

    // Draw candlesticks
    data.forEach((d, i) => {
      const x = i * candleWidth;
      const yHigh = margin.top + ((maxPrice - d.high) / priceRange) * adjustedChartHeight;
      const yLow = margin.top + ((maxPrice - d.low) / priceRange) * adjustedChartHeight;
      const yOpen = margin.top + ((maxPrice - d.open) / priceRange) * adjustedChartHeight;
      const yClose = margin.top + ((maxPrice - d.close) / priceRange) * adjustedChartHeight;

      // Wick
      mainCtx.strokeStyle = d.isUp ? '#10b981' : '#ef4444';
      mainCtx.lineWidth = 1;
      mainCtx.beginPath();
      mainCtx.moveTo(x + candleWidth / 2, yHigh);
      mainCtx.lineTo(x + candleWidth / 2, yLow);
      mainCtx.stroke();

      // Candle body
      const candleTop = Math.min(yOpen, yClose);
      const candleHeight = Math.abs(yOpen - yClose);
      mainCtx.fillStyle = d.isUp ? '#10b981' : '#ef4444';
      mainCtx.fillRect(
        x + 1,
        candleTop,
        candleWidth - 2,
        candleHeight || 1
      );
    });

    // Draw crosshair if hovering
    if (crosshairPos) {
      mainCtx.strokeStyle = '#3b82f6';
      mainCtx.lineWidth = 1;
      mainCtx.setLineDash([5, 3]);
      
      // Vertical line
      mainCtx.beginPath();
      mainCtx.moveTo(crosshairPos.x, margin.top);
      mainCtx.lineTo(crosshairPos.x, dynamicHeight - adjustedVolumeHeight);
      mainCtx.stroke();
      
      // Horizontal line
      mainCtx.beginPath();
      mainCtx.moveTo(0, crosshairPos.y);
      mainCtx.lineTo(chartWidth, crosshairPos.y);
      mainCtx.stroke();
      
      mainCtx.setLineDash([]);
      
      // Price label at right
      const price = maxPrice - ((crosshairPos.y - margin.top) / adjustedChartHeight) * priceRange;
      mainCtx.fillStyle = '#3b82f6';
      mainCtx.font = '10px Arial';
      mainCtx.textAlign = 'right';
      mainCtx.fillText(price.toFixed(2), chartWidth - 5, crosshairPos.y - 5);
    }

    // Draw volume bars (aligned with candlesticks and y-axis)
    const volumeMaxHeight = adjustedVolumeHeight * 0.9;
    data.forEach((d, i) => {
      const x = i * candleWidth;
      const volumeHeightPx = (d.volume / volumeRange) * volumeMaxHeight;
      volumeCtx.fillStyle = d.isUp ? '#10b981' : '#ef4444';
      volumeCtx.fillRect(
        x + 1,
        dynamicHeight - volumeHeightPx - 5,
        candleWidth - 2,
        volumeHeightPx
      );
    });

  }, [data, crosshairPos, chartWidth, margin, dynamicHeight, lastDataPoint]);

  // Handle mouse move for hover effect
  const handleMouseMove = (e) => {
    if (!scrollContainerRef.current) return;

    const rect = scrollContainerRef.current.getBoundingClientRect();
    const scrollLeft = scrollContainerRef.current.scrollLeft;
    const x = e.clientX - rect.left + scrollLeft;
    const index = Math.floor(x / candleWidth);

    if (index >= 0 && index < data.length) {
      const dataPoint = data[index];
      setHoveredData({ ...dataPoint, index });
      setShowTooltip(true);
      
      // Calculate crosshair position
      const minPrice = 21600;
      const maxPrice = 24400;
      const priceRange = maxPrice - minPrice;
      const adjustedChartHeight = dynamicHeight * 0.8;
      
      const candleCenterX = index * candleWidth + candleWidth / 2;
      const candleCenterY = margin.top + ((maxPrice - dataPoint.close) / priceRange) * adjustedChartHeight;
      
      setCrosshairPos({ x: candleCenterX, y: candleCenterY });
    } else {
      setShowTooltip(false);
      setCrosshairPos(null);
    }
  };

  return (
    <div ref={containerRef} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 w-full max-w-5xl mx-auto relative">
      {/* Tooltip Box */}
      {showTooltip && hoveredData && <TooltipBox data={hoveredData} />}

      {/* Chart container with fixed y-axis */}
      <div className="flex">
        {/* Scrollable chart area */}
        <div 
          ref={scrollContainerRef}
          className="relative overflow-x-auto flex-1"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            setShowTooltip(false);
            setCrosshairPos(null);
          }}
          style={{ 
            height: `${dynamicHeight}px`,
            overflowY: 'hidden'
          }}
        >
          <div className="relative" style={{ width: `${chartWidth}px` }}>
            {/* Main chart canvas */}
            <canvas 
              ref={mainCanvasRef} 
              className="absolute top-0 left-0 pointer-events-none"
              style={{ height: `${dynamicHeight}px` }} 
            />
            
            {/* Volume canvas */}
            <canvas 
              ref={volumeCanvasRef} 
              className="absolute top-0 left-0 pointer-events-none"
              style={{ height: `${dynamicHeight}px` }} 
            />
          </div>
        </div>

        {/* Fixed y-axis */}
        <div className="relative" style={{ width: '60px' }}>
          <canvas 
            ref={yAxisCanvasRef} 
            className="absolute top-0 right-0 pointer-events-none"
            style={{ height: '100%' }} 
          />
        </div>
      </div>

      {/* X-axis positioned below the scroll container */}
      <div className="mt-1">
        <XAxis 
          data={data} 
          candleWidth={candleWidth} 
          margin={margin} 
        />
      </div>
    </div>
  );
};

export default CandlestickChart;