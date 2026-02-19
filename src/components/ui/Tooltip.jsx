import { useEffect, useState } from "react";

export const Tooltip = ({ text, x, y }) => {
  console.log(x , y)
  if (!text || x === -1) return null;
  return (
    <div
      className="fixed pointer-events-none z-[9999] flex flex-col items-center -translate-x-1/2 -translate-y-full"
      style={{
        left: `${x}px`,
        top: `${y - 8}px`,
      }}
    >
      <div className="relative bg-[#0F111A] text-white text-sm py-2 px-3 rounded-sm whitespace-nowrap shadow-2xl border border-white/10">
        {text}
        {/* Bottom Arrow */}
        <div
          className="absolute top-[98%] left-1/2 -translate-x-1/2 w-0 h-0 
          border-l-[5px] border-l-transparent 
          border-r-[5px] border-r-transparent 
          border-t-[5px] border-t-[#0F111A]"
        ></div>
      </div>
    </div>
  );
};
