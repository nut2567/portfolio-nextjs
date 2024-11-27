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
      <WatercolorEffect />
      {!isResized && (
        <nav className="flex justify-center border-b border-b-foreground/10 h-16 bg-black z-40 absolute inset-x-[50%] bottom-0 items-center">
          <div className="w-full flex font-semibold items-center p-3 text-sm">
            <div className="transition-transform duration-[1200] animate-bounce gap-5 justify-between">
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

const WatercolorEffect = () => {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      className="w-full h-[300px] flex items-center justify-center rounded-lg shadow-lg"
      style={{
        background: hover
          ? "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(0,116,224,0.5) 40%, rgba(0,0,0,0.8) 100%)"
          : "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(32,32,32,1) 100%)",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      animate={{
        background: hover
          ? [
              "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(0,116,224,0.3) 50%, rgba(0,0,0,0.8) 100%)",
              "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(0,116,224,0.6) 60%, rgba(0,0,0,0.8) 100%)",
            ]
          : [
              "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(32,32,32,1) 50%, rgba(64,64,64,1) 100%)",
            ],
      }}
      transition={{
        duration: 2,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <motion.div
        className="text-white text-xl font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: hover ? 1 : 0 }}
        transition={{
          delay: 0.5,
          duration: 1,
        }}
      >
        {hover ? "Color spreading like watercolor!" : "Hover me"}
      </motion.div>
    </motion.div>
  );
};
