"use client";
import Image from "next/image";
import { ThemeSwitcher } from "@/components/supabase/theme-switcher";
export default function Layout({ }) {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-black z-40 sticky top-0">
      <div className="w-full pl-4 md:p-3 pt-3 flex font-semibold justify-between items-centerpr-0 gap-2 text-sm">
        <div className="flex gap-5  justify-center items-center ">
          <p>Portfolio</p>
          <p>Nutthawat Witdumrong</p>
        </div>

        <div>
          <div className="flex justify-center items-center w-full">
            {" "}
            powered by
            <div className=" mx-5">
              <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
                {/* <NextLogo /> */}
                <Image
                  className="dark:invert"
                  src="https://nextjs.org/icons/next.svg"
                  alt="Next.js logo"
                  width={90}
                  height={18}
                  priority
                />
              </a>
            </div>
            <div>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
