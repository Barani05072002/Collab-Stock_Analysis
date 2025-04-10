export const handleMouseMove = (e) => {
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
