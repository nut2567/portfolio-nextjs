import Hero from '@/components/supabase/hero'
import ConnectSupabaseSteps from '@/components/tutorial/connect-supabase-steps'
import SignUpUserSteps from '@/components/tutorial/sign-up-user-steps'
import { hasEnvVars } from '@/utils/supabase/check-env-vars'
import ChartComponent from '@/components/chart/chartjs'
import PopulationGrowthGraph from '@/components/chart/chartperyear'
import Chartlegend from '@/components/chart/chartlegend'
import Loading from '@/app/(portfolio)/git/loading'

export default async function Index() {
  return (
    <>
      {/* <Hero /> */}
      {/* <Loading /> */}
      <main className="flex-1 flex flex-col gap-6 px-4">
        {/* <h2 className="font-medium text-xl mb-4">Next steps</h2> */}
        {/* {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}

        <ChartComponent />
        {/* <PopulationGrowthGraph /> */}
        <Chartlegend />
      </main>
    </>
  )
}
