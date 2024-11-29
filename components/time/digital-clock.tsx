"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Card } from "./card";
import dynamic from "next/dynamic";

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
      <h2 className="font-sans text-[#8b5cf6] text-3xl font-bold mb-5">
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
      className={`flex justify-center border bg-gradient-to-r from-[#261139] via-indigo-500 to-[#4e1431] py-5 mb-5 
        shadow relative transition-height duration-1000 ease-in-out 
        ${isResized ? "h-fit mt-56 -mx-12" : "h-screen -mx-16 pt-[250px] -mt-12"}`}
      style={{ boxShadow: "rgba(0, 0, 0, 0.5) 0px -10px 60px inset" }}
    >
      <Card
        className="h-fit p-8 shadow-2xl rounded-3xl bg-[#303640] bg-opacity-80 backdrop-blur-md"
        style={{ boxShadow: "#6366a1 0px -5px 40px inset" }}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="text-4xl font-extrabold text-gray-500 animate-pulse">
            <CurrentTime />
          </div>
          <div className="my-5 ">
            <Countdown />
          </div>
        </div>
      </Card>
      {/* <TimerCircle /> */}
      {!isResized && (
        <nav
          className="flex justify-center border-b border-b-foreground/10 h-16 z-40 absolute inset-x-[48%] 
        bottom-[80px] items-center"
        >
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

export default DigitalClockPage;
