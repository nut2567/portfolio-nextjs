import Hero from "@/components/supabase/hero";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import ChartComponent from "@/app/(portfolio)/projects/chart/chartjs";
import PopulationGrowthGraph from "@/app/(portfolio)/projects/chart/chartperyear";
import Chartlegend from "@/app/(portfolio)/projects/chart/chartlegend";
import DigitalClockPage from "@/components/time/digital-clock";
export default async function Index() {
  return (
    <>
      {/* <Hero /> */}
      <main className="min-h-screen flex-1 flex flex-col gap-6 px-4">
        <DigitalClockPage />
        {/* <h2 className="font-medium text-xl mb-4">Next steps</h2> */}
        {/* {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}
        กราฟย้ายไปอยู๋ส่วนของโปรเจค
      </main>
    </>
  );
}
