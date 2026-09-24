import { Link } from "wouter";
import { Menu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4 md:px-6">
      <div
        className="
          mx-auto
          max-w-[1500px]
          rounded-[24px]
          border border-white/60
          bg-white/60
          backdrop-blur-3xl
          shadow-[0_8px_40px_rgba(124,58,237,0.14)]
        "
      >
        <div className="h-[82px] px-5 md:px-7 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="shrink-0">
            <div className="flex items-center gap-3">

              {/* GOAL DIGGER ICON */}
              <div
                className="
                  relative
                  w-12
                  h-12
                  rounded-full
                  overflow-hidden
                  shrink-0
                  shadow-[0_6px_20px_rgba(124,58,237,0.30)]
                "
              >
                <img
                  src="/goal-digger-icon.png"
                  alt="Goal Digger"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* BRAND NAME */}
              <div className="leading-none">
                <div className="flex items-baseline gap-1">
                  <span
                    className="
                      font-serif
                      text-[30px]
                      md:text-[32px]
                      font-semibold
                      tracking-tight
                      text-[#35246B]
                    "
                  >
                    Goal
                  </span>

                  <span
                    className="
                      font-serif
                      italic
                      text-[30px]
                      md:text-[32px]
                      font-semibold
                      tracking-tight
                      bg-gradient-to-r
                      from-violet-600
                      via-purple-500
                      to-fuchsia-500
                      bg-clip-text
                      text-transparent
                    "
                  >
                    Digger
                  </span>
                </div>

                <p
                  className="
                    hidden
                    sm:block
                    mt-1
                    text-[8px]
                    tracking-[0.32em]
                    font-medium
                    text-violet-400
                  "
                >
                  DISCOVER · PLAN · GROW
                </p>
              </div>

            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden lg:flex items-center gap-2">
            <Link href="/">
              <span
                className="
                  px-5
                  py-3
                  rounded-full
                  bg-violet-100/70
                  text-violet-700
                  font-medium
                  cursor-pointer
                  transition-all
                  duration-300
                "
              >
                About
              </span>
            </Link>

            <Link href="/">
              <span
                className="
                  px-5
                  py-3
                  rounded-full
                  text-gray-600
                  font-medium
                  cursor-pointer
                  hover:bg-white/70
                  hover:text-violet-700
                  transition-all
                  duration-300
                "
              >
                Features
              </span>
            </Link>

            <Link href="/">
              <span
                className="
                  px-5
                  py-3
                  rounded-full
                  text-gray-600
                  font-medium
                  cursor-pointer
                  hover:bg-white/70
                  hover:text-violet-700
                  transition-all
                  duration-300
                "
              >
                How It Works
              </span>
            </Link>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            <Link href="/questionnaire">
              <Button
                className="
                  hidden
                  sm:flex
                  h-12
                  px-7
                  rounded-full
                  border-0
                  bg-gradient-to-r
                  from-violet-600
                  via-purple-600
                  to-fuchsia-500
                  text-white
                  font-semibold
                  shadow-[0_8px_25px_rgba(124,58,237,0.25)]
                  hover:shadow-[0_10px_30px_rgba(168,85,247,0.35)]
                  hover:-translate-y-0.5
                  transition-all
                  duration-300
                "
              >
                Get Started
                <ArrowRight
                  className="ml-2 w-4 h-4"
                  strokeWidth={2}
                />
              </Button>
            </Link>

            {/* MENU BUTTON */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="
                    w-12
                    h-12
                    rounded-full
                    bg-white/65
                    border
                    border-white/70
                    text-gray-700
                    shadow-sm
                    hover:bg-white
                    hover:text-violet-600
                    transition-all
                    duration-300
                  "
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="
                  w-[300px]
                  bg-white/95
                  backdrop-blur-xl
                  border-l
                  border-violet-100
                "
              >
                <div className="flex flex-col mt-10 gap-3">

                  <Link href="/">
                    <span className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-violet-50 hover:text-violet-700 cursor-pointer transition-colors">
                      About
                    </span>
                  </Link>

                  <Link href="/">
                    <span className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-violet-50 hover:text-violet-700 cursor-pointer transition-colors">
                      Features
                    </span>
                  </Link>

                  <Link href="/">
                    <span className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-violet-50 hover:text-violet-700 cursor-pointer transition-colors">
                      How It Works
                    </span>
                  </Link>

                  <div className="pt-4">
                    <Link href="/questionnaire">
                      <Button
                        className="
                          w-full
                          h-12
                          rounded-full
                          bg-gradient-to-r
                          from-violet-600
                          to-fuchsia-500
                          text-white
                          font-semibold
                        "
                      >
                        Start Your Journey
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>

                </div>
              </SheetContent>
            </Sheet>

          </div>

        </div>
      </div>
    </nav>
  );
}