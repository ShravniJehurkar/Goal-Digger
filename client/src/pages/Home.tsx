import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  Globe,
  Award,
  Coins,
  User,
  Medal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import IkigaiCard from "@/components/IkigaiCard";
import SakuraBackground from "@/components/SakuraBackground";
import ConsentModal from "@/components/ConsentModal";

export default function Home() {
  const [, setLocation] = useLocation();

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const handleGetStarted = () => {
    setLocation("/questionnaire");
  };

  const [showConsentModal, setShowConsentModal] = useState(true);

  const handleConsent = () => {
    setShowConsentModal(false);
  };

  const handleGetStartedClick = () => {
    const hasConsent = sessionStorage.getItem("userConsent") === "true";

    if (hasConsent) {
      handleGetStarted();
    } else {
      setShowConsentModal(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <SakuraBackground count={30} />

      <ConsentModal
        isOpen={showConsentModal}
        onConsent={handleConsent}
        onClose={() => setShowConsentModal(false)}
      />

      {/* HERO SECTION */}
      <section
        id="hero"
        className="hero-gradient relative overflow-hidden min-h-screen flex items-center pt-24 pb-8"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* HERO TITLE */}
            <motion.h1
              className="font-bold text-3xl md:text-5xl leading-tight text-[#24164f] mb-4"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover Your Ikigai: The Path to a Meaningful Career
            </motion.h1>

            {/* HERO DESCRIPTION */}
            <motion.p
              className="text-lg md:text-xl text-[#51466f] mb-7"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Find the perfect career based on your passion, mission, vocation,
              and profession.
            </motion.p>

            {/* HERO BUTTON */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Button
                onClick={handleGetStartedClick}
                className="btn-glow bg-white text-violet-700 hover:text-indigo-700 font-semibold px-7 py-5 rounded-full text-base shadow-lg transition-all duration-300"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            {/* ========================================================= */}
            {/* IKIGAI DIAGRAM */}
            {/* ========================================================= */}

            <motion.div
              className="mt-8 mx-auto w-full max-w-[700px]"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {/* DESKTOP */}
              <div className="hidden md:flex flex-col items-center">

                {/* TOP: PASSION */}
                <motion.div
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="flex flex-col items-center"
                >
                  <div
                    className="
                      w-36
                      h-24
                      rounded-2xl
                      border border-violet-200/80
                      bg-white/60
                      backdrop-blur-xl
                      flex flex-col items-center justify-center
                      text-center
                      shadow-[0_8px_24px_rgba(124,58,237,0.08)]
                    "
                  >
                    <Heart className="h-6 w-6 text-violet-500 mb-2" />

                    <h3 className="text-base font-semibold text-[#35246B]">
                      Passion
                    </h3>

                    <p className="text-xs text-[#6B6085] mt-1">
                      What you love
                    </p>
                  </div>

                  {/* vertical connector */}
                  <div className="w-px h-8 bg-violet-300/70" />
                </motion.div>


                {/* MIDDLE ROW */}
                <div className="flex items-center">

                  {/* MISSION */}
                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.6, duration: 0.5 }}
                    whileHover={{ x: -3, scale: 1.02 }}
                    className="flex items-center"
                  >
                    <div
                      className="
                        w-36
                        h-24
                        rounded-2xl
                        border border-violet-200/80
                        bg-white/60
                        backdrop-blur-xl
                        flex flex-col items-center justify-center
                        text-center
                        shadow-[0_8px_24px_rgba(124,58,237,0.08)]
                      "
                    >
                      <Globe className="h-6 w-6 text-violet-500 mb-2" />

                      <h3 className="text-base font-semibold text-[#35246B]">
                        Mission
                      </h3>

                      <p className="text-xs text-[#6B6085] mt-1">
                        What the world needs
                      </p>
                    </div>

                    {/* connector to center */}
                    <div className="w-16 h-px bg-violet-300/70" />
                  </motion.div>


                  {/* CENTER IKIGAI */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 1.7,
                      duration: 0.6,
                      type: "spring",
                    }}
                    className="relative z-20 shrink-0"
                  >
                    <div
                      className="
                        w-24
                        h-24
                        rounded-full
                        border border-violet-300/80
                        bg-white/90
                        backdrop-blur-xl
                        flex items-center justify-center
                        shadow-[0_8px_30px_rgba(124,58,237,0.12)]
                      "
                    >
                      <div className="text-center">
                        <p className="text-[7px] uppercase tracking-[0.35em] text-violet-500">
                          YOUR
                        </p>

                        <p className="text-lg font-bold text-[#35246B] tracking-wide">
                          IKIGAI
                        </p>

                        <p className="text-[7px] text-[#7C6F9B]">
                          your direction
                        </p>
                      </div>
                    </div>
                  </motion.div>


                  {/* PROFESSION */}
                  <motion.div
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                    whileHover={{ x: 3, scale: 1.02 }}
                    className="flex items-center"
                  >
                    {/* connector from center */}
                    <div className="w-16 h-px bg-violet-300/70" />

                    <div
                      className="
                        w-36
                        h-24
                        rounded-2xl
                        border border-violet-200/80
                        bg-white/60
                        backdrop-blur-xl
                        flex flex-col items-center justify-center
                        text-center
                        shadow-[0_8px_24px_rgba(124,58,237,0.08)]
                      "
                    >
                      <Award className="h-6 w-6 text-violet-500 mb-2" />

                      <h3 className="text-base font-semibold text-[#35246B]">
                        Profession
                      </h3>

                      <p className="text-xs text-[#6B6085] mt-1">
                        What you're good at
                      </p>
                    </div>
                  </motion.div>

                </div>


                {/* BOTTOM: VOCATION */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 0.5 }}
                  whileHover={{ y: 3, scale: 1.02 }}
                  className="flex flex-col items-center"
                >
                  {/* vertical connector */}
                  <div className="w-px h-8 bg-violet-300/70" />

                  <div
                    className="
                      w-36
                      h-24
                      rounded-2xl
                      border border-violet-200/80
                      bg-white/60
                      backdrop-blur-xl
                      flex flex-col items-center justify-center
                      text-center
                      shadow-[0_8px_24px_rgba(124,58,237,0.08)]
                    "
                  >
                    <Coins className="h-6 w-6 text-violet-500 mb-2" />

                    <h3 className="text-base font-semibold text-[#35246B]">
                      Vocation
                    </h3>

                    <p className="text-xs text-[#6B6085] mt-1">
                      What you can be paid for
                    </p>
                  </div>
                </motion.div>

              </div>

              {/* MOBILE */}
              <div className="grid grid-cols-2 gap-4 md:hidden">
                <IkigaiCard
                  icon="heart"
                  title="Passion"
                  description="What you love"
                />

                <IkigaiCard
                  icon="globe"
                  title="Mission"
                  description="What the world needs"
                />

                <IkigaiCard
                  icon="award"
                  title="Profession"
                  description="What you're good at"
                />

                <IkigaiCard
                  icon="coins"
                  title="Vocation"
                  description="What you can be paid for"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Ambient lights */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 30, -15, 0],
              y: [0, -20, 15, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              -top-32
              -left-32
              w-72
              h-72
              rounded-full
              bg-fuchsia-400/15
              blur-3xl
            "
          />

          <motion.div
            animate={{
              x: [0, -30, 20, 0],
              y: [0, 30, -15, 0],
              scale: [1, 0.95, 1.05, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              top-1/3
              -right-32
              w-72
              h-72
              rounded-full
              bg-violet-300/15
              blur-3xl
            "
          />
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              The Philosophy of Ikigai
            </h2>

            <p className="text-lg text-gray-600">
              Ikigai is a Japanese concept that means "a reason for being." It
              is the intersection of what you love, what you're good at, what
              the world needs, and what you can be paid for.
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div className="w-full aspect-square relative">
              <motion.div
                className="absolute inset-0 rounded-full bg-white shadow-md flex items-center justify-center"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <motion.div
                  className="text-xl font-bold text-gray-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  Ikigai
                </motion.div>
              </motion.div>

              <motion.div
                className="absolute top-0 left-0 right-0 mx-auto w-3/4 h-3/4 rounded-full border-4 border-yellow-300 opacity-70"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.7 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />

              <motion.div
                className="absolute bottom-0 left-0 right-0 mx-auto w-3/4 h-3/4 rounded-full border-4 border-red-300 opacity-70"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.7 }}
                transition={{ delay: 0.45, duration: 0.8 }}
              />

              <motion.div
                className="absolute inset-0 mx-auto w-3/4 h-3/4 rounded-full border-4 border-blue-300 opacity-70"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.7 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                style={{ marginLeft: "-10%" }}
              />

              <motion.div
                className="absolute inset-0 mx-auto w-3/4 h-3/4 rounded-full border-4 border-green-300 opacity-70"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.7 }}
                transition={{ delay: 0.75, duration: 0.8 }}
                style={{ marginLeft: "10%" }}
              />

              <div className="absolute top-[10%] left-[50%] transform -translate-x-1/2 text-center">
                <div className="text-yellow-500 font-semibold mb-1">
                  WHAT YOU LOVE
                </div>
              </div>

              <div className="absolute top-[50%] left-[10%] transform -translate-y-1/2 text-center">
                <div className="text-red-500 font-semibold mb-1">
                  WHAT THE
                  <br />
                  WORLD NEEDS
                </div>
              </div>

              <div className="absolute bottom-[10%] left-[50%] transform -translate-x-1/2 text-center">
                <div className="text-blue-500 font-semibold mb-1">
                  WHAT YOU CAN
                  <br />
                  BE PAID FOR
                </div>
              </div>

              <div className="absolute top-[50%] right-[10%] transform -translate-y-1/2 text-center">
                <div className="text-green-500 font-semibold mb-1">
                  WHAT YOU'RE
                  <br />
                  GOOD AT
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              How Our Ikigai Approach Helps You
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our structured assessment helps you discover a career path that
              aligns with your interests, strengths, values, and goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Heart className="text-yellow-600 w-6 h-6" />
              </div>

              <h3 className="font-semibold text-xl mb-2 text-gray-800">
                Discover Your Passion
              </h3>

              <p className="text-gray-600">
                Identify activities and subjects that naturally engage you and
                bring you joy, even when they're challenging.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Globe className="text-red-600 w-6 h-6" />
              </div>

              <h3 className="font-semibold text-xl mb-2 text-gray-800">
                Clarify Your Mission
              </h3>

              <p className="text-gray-600">
                Connect your career to meaningful causes and identify how your
                work can serve the greater good.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="bg-violet-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Award className="text-violet-600 w-6 h-6" />
              </div>

              <h3 className="font-semibold text-xl mb-2 text-gray-800">
                Develop Your Vocation
              </h3>

              <p className="text-gray-600">
                Recognize your natural talents and learn how to cultivate them
                into valuable professional skills.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Coins className="text-blue-600 w-6 h-6" />
              </div>

              <h3 className="font-semibold text-xl mb-2 text-gray-800">
                Balance Your Profession
              </h3>

              <p className="text-gray-600">
                Find career options that not only support you financially but
                also align with your values and strengths.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Medal className="text-purple-600 w-6 h-6" />
              </div>

              <h3 className="font-semibold text-xl mb-2 text-gray-800">
                Actionable Career Plan
              </h3>

              <p className="text-gray-600">
                Get a customized roadmap with specific steps to pivot your
                career path toward meaningful fulfillment.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <User className="text-indigo-600 w-6 h-6" />
              </div>

              <h3 className="font-semibold text-xl mb-2 text-gray-800">
                Enhanced with AI
              </h3>

              <p className="text-gray-600">
                Receive personalized career guidance based on your unique
                profile, interests, strengths, and goals.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={handleGetStartedClick}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Begin Your Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
