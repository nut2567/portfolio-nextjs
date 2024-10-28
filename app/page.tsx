import Hero from '@/components/hero'
import ConnectSupabaseSteps from '@/components/tutorial/connect-supabase-steps'
import SignUpUserSteps from '@/components/tutorial/sign-up-user-steps'
import { hasEnvVars } from '@/utils/supabase/check-env-vars'
import Loading from '@/app/(portfolio)/git/loading'

export default async function Index() {
  return (
    <>
      {/* <Hero /> */}
      <div className="bg-gray-800 text-white w-full p-6 rounded-lg text-xl mb-4">
        <ul className="list-none space-y-2">
          <h1 className="text-xl font-bold text-blue-400">
            Content commingsoon.......
          </h1>
        </ul>
      </div>
      <Loading />
      <main className="flex-1 flex flex-col gap-6 px-4">
        {/* <h2 className="font-medium text-xl mb-4">Next steps</h2> */}
        {/* {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}
      </main>
    </>
  )
}
