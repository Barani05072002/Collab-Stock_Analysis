//Data Generation Function

export const generateChartData = () => {
    const data = [];
    const startDate = new Date(2025, 0, 1);
    let currentPrice = 23800;
    
    for (let i = 0; i < 90; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const open = currentPrice;
      let close = open + (Math.random() - 0.6) * 200;
      let high = Math.max(open, close) + Math.random() * 50;
      let low = Math.min(open, close) - Math.random() * 50;
      
      if (Math.random() > 0.9) {
        high += 100;
        low -= 100;
      }
      
      high = Math.min(high, 24400);
      low = Math.max(low, 21600);
      
      data.push({
        date,
        open,
        high,
        low,
        close,
        volume: Math.floor(Math.random() * 200000000) + 100000000,
        month: date.toLocaleString('default', { month: 'short' }),
        year: date.getFullYear(),
        isUp: close > open
      });
      
      currentPrice = close;
    }
    
    // Set specific values for the last data point
    const lastIndex = data.length - 1;
    data[lastIndex].open = 22460.30;
    data[lastIndex].high = 22468.70;
    data[lastIndex].low = 22353.25;
    data[lastIndex].close = 22399.15;
    data[lastIndex].volume = 358460000;
    
    return data;
  };