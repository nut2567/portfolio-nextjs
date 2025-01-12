import { useRealTime } from "./useRealTime";
import TimerCircle from "./TimerCircle";

function Countdown() {
  const { hours, minutes, seconds } = useRealTime(true); // หรือ false ถ้าต้องการ 12 ชั่วโมง

  const styleWithCustomProperty = (time: string) => {
    return { "--value": time.toString() } as React.CSSProperties;
  };

  return (
    <div className="flex flex-col md:flex-row gap-16 md:gap-12 items-center justify-center">
      {/* Hours */}
      <div className="relative flex flex-col items-center">
        <div className="absolute top-[-65px] md:top-[-50px] left-1/2 transform -translate-x-1/2 ">
          <TimerCircle time={""} minutes={""} hours={hours} />
        </div>
        <div className="flex flex-col items-center bg-neutral rounded-box text-neutral-content p-3">
          <span className="countdown font-mono text-xl sm:text-2xl md:text-4xl">
            <span style={styleWithCustomProperty(hours)}></span>
          </span>
          <span className="text-xs sm:text-sm md:text-base">hours</span>
        </div>
      </div>

      {/* Minutes */}
      <div className="relative flex flex-col items-center">
        <div className="absolute top-[-65px] md:top-[-50px] sm:left-1/2  left-1/2 transform -translate-x-1/2">
          <TimerCircle time={""} minutes={minutes} hours={""} />
        </div>
        <div className="flex flex-col items-center bg-neutral rounded-box text-neutral-content p-3">
          <span className="countdown font-mono text-xl sm:text-2xl md:text-4xl">
            <span style={styleWithCustomProperty(minutes)}></span>
          </span>
          <span className="text-xs sm:text-sm md:text-base">minutes</span>
        </div>
      </div>

      {/* Seconds */}
      <div className="relative flex flex-col items-center">
        <div className="absolute top-[-65px] md:top-[-50px] left-1/2 transform -translate-x-1/2">
          <TimerCircle time={seconds} minutes={""} hours={""} />
        </div>
        <div className="flex flex-col items-center bg-neutral rounded-box text-neutral-content p-3">
          <span className="countdown font-mono text-xl sm:text-2xl md:text-4xl">
            <span style={styleWithCustomProperty(seconds)}></span>
          </span>
          <span className="text-xs sm:text-sm md:text-base">seconds</span>
        </div>
      </div>
    </div>
  );
}

export default Countdown;
