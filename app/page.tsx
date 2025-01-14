import ChartComponent from "@/app/(portfolio)/projects/chart/chartjs";
import PopulationGrowthGraph from "@/app/(portfolio)/projects/chart/chartperyear";
import Chartlegend from "@/app/(portfolio)/projects/chart/chartlegend";
import DigitalClockPage from "@/components/time/digital-clock";
import Git from "@/app/(portfolio)/git/page";
import Projects from "@/app/(portfolio)/projects/page";
import ME from "@/app/(portfolio)/about/page";
export default async function Index() {
  return (
    <>
      {/* <Hero /> */} <DigitalClockPage />
      <div className="min-h-full flex-1 flex flex-col gap-6 h-full md:px-12 md:pb-12 ">
        <Git />
        <div className="py-20 ">
          <Projects />
        </div>
        <ME />
      </div>
    </>
  );
}
