import ChartComponent from "@/app/(portfolio)/projects/chart/chartjs";
import PopulationGrowthGraph from "@/app/(portfolio)/projects/chart/chartperyear";
import Chartlegend from "@/app/(portfolio)/projects/chart/chartlegend";
import Loading from "./loading";

export default function Page() {
  return (
    <>
      {/* <Loading /> */}
      <ChartComponent />
      <PopulationGrowthGraph />
    </>
  );
}
