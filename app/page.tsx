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
      {/* <Hero /> */}
      <main className="min-h-screen flex-1 flex flex-col gap-6 px-4 h-full">
        <DigitalClockPage />
        {/* <h2 className="font-medium text-xl mb-4">Next steps</h2> */}
        {/* {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}

        <Git />
        <div className="py-20 -mx-4">
          <Projects />
        </div>
        <ME />
      </main>
    </>
  );
}
