import { Bookmark, Heart, MessageSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Tooltip } from "../ui/Tooltip";

export const Header = ({ title, user }) => {
  const [height, setheight] = useState(undefined);
  const [tooltipMessage, settooltipMessage] = useState("");
  const [tooltipPosition, settooltipPosition] = useState({
    x: -1,
    y: -1,
  });

  const titleRef = useRef(null);
  useEffect(() => {
    if (titleRef.current) {
      setheight(-titleRef.current.offsetHeight + 80);
    }
  }, [titleRef]);

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    settooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top,
    });

    settooltipMessage(`Follow ${user.name}`);
  };

  const handleMouseLeave = () => {
    settooltipMessage("");
    settooltipPosition({ x: -1, y: -1 });
  };

  return (
    <>
      <Tooltip
        text={tooltipMessage}
        x={tooltipPosition.x}
        y={tooltipPosition.y}
      />
      <section
        className={`${height == undefined ? "relative" : `sticky`} bg-white w-full md:mt-17.5 mt-10 pb-3 lg:px-0 sm:px-4 px-3 z-1 relative`}
        style={height !== undefined ? { top: `${height}px` } : {}}
      >
        <div className="max-w-237.5 mx-auto ">
          {/* Title */}
          <h1
            ref={titleRef}
            className="md:text-2xl text-xl font-semibold text-gray-900 mb-6 "
          >
            {title}
          </h1>

          {/* Profile Row */}
          <div className="flex items-center gap-3 w-full">
            {/* Left Section */}
            <div className="flex items-center sm:gap-3 gap-2 sm:w-auto max-w-[40%]">
              <img
                src="./user.webp"
                alt="Danny Amacher"
                className="md:w-12 w-8 md:h-12 h-8 rounded-full object-cover"
              />

              <div className="flex items-center md:justify-normal justify-between sm:text-sm text-xs">
                <span className="font-medium text-gray-900 leading-tight">
                  {user.name}
                </span>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-1 items-center justify-between md:gap-4 gap-2">
              <div className=" flex items-center text-sm gap-3">
                <span className="text-green-600 font-normal whitespace-nowrap">
                  {user.status}
                </span>

                <button
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="relative cursor-pointer text-gray-500 md:block hidden hover:text-gray-700"
                >
                  Follow
                </button>
              </div>
              <div className=" flex items-center  md:gap-3 gap-1">
                {/* Icon Buttons */}
                <button className="md:w-10 md:h-10 w-8 h-8 cursor-pointer flex items-center justify-center rounded-full border-2 border-gray-100 bg-white hover:border-gray-200 transition">
                  <Heart size={17} className="text-gray-700" />
                </button>

                <button className="md:w-10 md:h-10 w-8 h-8 cursor-pointer flex items-center justify-center rounded-full border-2 border-gray-100 bg-white hover:border-gray-200 transition">
                  <Bookmark size={17} className="text-gray-700" />
                </button>

                <button className="sm:block hidden md:px-4 px-3 whitespace-nowrap md:py-2.5 py-2 md:text-sm text-xs bg-[#0B0D2E] text-white rounded-full font-medium hover:bg-[#1a1a28e2] cursor-pointer transition">
                  Get in touch
                </button>

                <button className=" p-2 sm:hidden  bg-[#0B0D2E] text-white rounded-full font-medium hover:bg-[#1a1a28e2] cursor-pointer transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    role="img"
                    aria-hidden="true"
                    className="icon w-3 h-3"
                  >
                    <path
                      d="M21.5 18L14.8571 12M9.14286 12L2.50003 18M2 7L10.1649 12.7154C10.8261 13.1783 11.1567 13.4097 11.5163 13.4993C11.8339 13.5785 12.1661 13.5785 12.4837 13.4993C12.8433 13.4097 13.1739 13.1783 13.8351 12.7154L22 7M6.8 20H17.2C18.8802 20 19.7202 20 20.362 19.673C20.9265 19.3854 21.3854 18.9265 21.673 18.362C22 17.7202 22 16.8802 22 15.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H6.8C5.11984 4 4.27976 4 3.63803 4.32698C3.07354 4.6146 2.6146 5.07354 2.32698 5.63803C2 6.27976 2 7.11984 2 8.8V15.2C2 16.8802 2 17.7202 2.32698 18.362C2.6146 18.9265 3.07354 19.3854 3.63803 19.673C4.27976 20 5.11984 20 6.8 20Z"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
