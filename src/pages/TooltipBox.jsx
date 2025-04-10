
const TooltipBox = ({ data }) => {
    if (!data) return null;
  
    return (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[650px] h-[40px] bg-white border border-gray-300 rounded-lg shadow-lg p-1 z-10 flex items-center justify-center">
        <div className="grid grid-cols-4 gap-4 w-full">
          <div className="text-center">
            <div className="text-gray-600 text-xs">High</div>
            <div className="font-medium text-sm">{data.high.toFixed(2)}</div>
          </div>
          <div className="text-center">
            <div className="text-gray-600 text-xs">Low</div>
            <div className="font-medium text-sm">{data.low.toFixed(2)}</div>
          </div>
          <div className="text-center">
            <div className="text-gray-600 text-xs">Open</div>
            <div className="font-medium text-sm">{data.open.toFixed(2)}</div>
          </div>
          <div className="text-center">
            <div className="text-gray-600 text-xs">Close</div>
            <div className="font-medium text-sm">{data.close.toFixed(2)}</div>
          </div>
        </div>
      </div>
    );
  };

export default TooltipBox;