"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FullScreenDiv: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isResized, setIsResized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsResized(true);
      } else {
        setIsResized(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`transition-height duration-300 ease-in-out 
        bg-gray-800 text-white p-6 rounded-lg text-xl
        ${isResized ? "h-fit mt-56 w-3/5 mx-12" : "h-screen w-full -mr-12 -mt-[22px]"} `}
    >
      {children}
      {!isResized && (
        <nav className="flex justify-center border-b border-b-foreground/10 h-16 bg-black z-40 absolute inset-x-[50%] bottom-0 items-center">
          <div className="w-full flex font-semibold items-center p-3 text-sm">
            <div className="transition-transform duration-1000 animate-bounce gap-5 justify-between">
              <p className="m-[5px]">Scroll</p>
              <i
                className={` material-icons  items-center flex`}
                style={{ fontSize: "48px" }}
              >
                keyboard_double_arrow_down
              </i>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default FullScreenDiv;
