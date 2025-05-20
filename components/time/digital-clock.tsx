"use client";
import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  startTransition,
} from "react";
import { Card } from "./card";
import dynamic from "next/dynamic";
import { useRealTime } from "./useRealTime";
import { motion, AnimatePresence } from "framer-motion";

// Note on unstable_ViewTransition as ViewTransition from "react":
// This component is primarily for Suspense-based transitions.
// For DOM morphing effects (browser's View Transition API),
// you'd use document.startViewTransition() around state updates.

export const DataUseContext = createContext<{
  hours: string;
  minutes: string;
  seconds: string;
} | null>(null); // Typed context
const Countdown = dynamic(() => import("./time"), { ssr: false });

function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  if (!currentTime) return null;

  return (
    <div className="flex">
      <h2 className="font-sans text-[#8b5cf6] text-lg md:text-2xl font-bold mb-5">
        {currentTime.toLocaleDateString("th-TH", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </h2>
    </div>
  );
}

const DigitalClockPage = () => {
  const [is24Hour, setIs24Hour] = useState<boolean>(true);
  const { hours, minutes, seconds } = useRealTime(is24Hour);
  const [isResized, setIsResized] = useState(false);
  const [time, setTime] = useState({ hours, minutes, seconds });

  useEffect(() => {
    const handleScroll = () => {
      startTransition(() => {
        // Mark state update as a transition
        if (window.scrollY > 0) {
          setIsResized(true);
        } else {
          setIsResized(false);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Update time state for context when hours, minutes, or seconds change
    setTime({ hours, minutes, seconds });
  }, [hours, minutes, seconds]);

  const scrollIndicatorVariants = {
    hidden: { opacity: 0, y: 20, transition: { duration: 0.3 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    bounce: {
      y: ["0%", "-30%", "0%"],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <DataUseContext.Provider value={time}>
      <motion.div
        className={`flex justify-center border bg-gradient-to-r from-[#261139] via-indigo-500 to-[#4e1431] py-5 mb-5 
        shadow relative transition-all duration-700 ease-in-out 
        ${isResized ? "h-fit mt-56 " : "h-screen pt-20 md:pt-[250px] "}`}
        style={{ boxShadow: "rgba(0, 0, 0, 0.5) 0px -10px 60px inset" }}
      >
        <Card
          className="h-fit md:p-8 p-2 pb-8 pt-4 shadow-2xl rounded-3xl bg-[#303640] bg-opacity-80 backdrop-blur-md z-10" // Added z-10
          style={{ boxShadow: "#6366a1 0px -5px 40px inset" }}
        >
          <div className="flex flex-col items-center justify-center">
            <motion.div // Example: replacing animate-pulse with framer-motion
              className="text-4xl font-extrabold text-gray-500"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <CurrentTime />
            </motion.div>
            <div className="my-5 ">
              <Countdown />
            </div>
          </div>
        </Card>

        <AnimatePresence>
          {!isResized && (
            <motion.nav
              className="flex justify-center border-b border-b-foreground/10 h-16 z-0 absolute inset-x-0 md:inset-x-[48%] bottom-[80px] items-center" // Centered inset-x-0 for small screens
              variants={scrollIndicatorVariants}
              initial="hidden"
              animate={["visible", "bounce"]}
              exit="hidden" // Use hidden variant for exit animation
            >
              <div className="w-full flex flex-col items-center font-semibold text-sm">
                <p className="m-[5px]">Scroll</p>
                <i
                  className="material-icons" // Removed items-center flex from here
                  style={{ fontSize: "48px" }}
                >
                  keyboard_double_arrow_down
                </i>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </DataUseContext.Provider>
  );
};

export default DigitalClockPage;
