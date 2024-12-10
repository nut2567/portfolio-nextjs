import { useRealTime } from "./useRealTime";
import TimerCircle from "./TimerCircle";

function Countdown() {
  const { hours, minutes, seconds } = useRealTime(true); // หรือ false ถ้าต้องการ 12 ชั่วโมง

  const styleWithCustomProperty = (time: string) => {
    return { "--value": time.toString() } as React.CSSProperties;
  };

  return (
    <div className="grid grid-flow-col gap-[90px] text-center auto-cols-max ">
      <div className="relative">
        <div className="absolute top-[-55px] left-[-65px]">
          <TimerCircle time={""} minutes={""} hours={hours} />
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={styleWithCustomProperty(hours)}></span>
          </span>
          hours
        </div>
      </div>
      <div className="relative">
        <div className="absolute top-[-55px] left-[-65px]">
          <TimerCircle time={""} minutes={minutes} hours={""} />
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={styleWithCustomProperty(minutes)}></span>
          </span>
          min
        </div>
      </div>
      <div className="relative">
        <div className="absolute top-[-55px] left-[-65px]">
          <TimerCircle time={seconds} minutes={""} hours={""} />
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={styleWithCustomProperty(seconds)}></span>
          </span>
          sec
        </div>
      </div>
    </div>
  );
}

export default Countdown;
