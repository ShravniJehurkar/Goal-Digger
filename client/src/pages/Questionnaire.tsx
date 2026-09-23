import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Check,
  ArrowLeft,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { questions } from "@/lib/questions";
import Navbar from "@/components/Navbar";

export default function Questionnaire() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState<Record<number, number>>(
    {},
  );
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const categories = [
    "passion",
    "mission",
    "profession",
    "vocation",
    "personality",
  ];

  const currentCategory = currentQuestion.category;

  const getCategoryStatus = (category: string) => {
    if (category === currentCategory) return "active";

    const categoryQuestions = questions.filter(
      (q) => q.category === category,
    );

    const answeredAll = categoryQuestions.every(
      (q) => userResponses[q.id] !== undefined,
    );

    if (answeredAll) return "completed";

    const answeredAny = categoryQuestions.some(
      (q) => userResponses[q.id] !== undefined,
    );

    if (answeredAny) return "in-progress";

    return "inactive";
  };

  const getCategoryName = (category: string) => {
    const names: Record<string, string> = {
      passion: "Passion",
      mission: "Mission",
      vocation: "Vocation",
      profession: "Profession",
      personality: "Personality",
    };

    return names[category] || category;
  };

  useEffect(() => {
    setIsAnswerSelected(
      userResponses[currentQuestion.id] !== undefined,
    );
  }, [currentQuestionIndex, userResponses, currentQuestion.id]);

  const handleOptionSelect = (optionIndex: string) => {
    setUserResponses((prev) => ({
      ...prev,
      [currentQuestion.id]: parseInt(optionIndex),
    }));

    setIsAnswerSelected(true);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (Object.keys(userResponses).length < questions.length) {
      const unanswered = questions.filter(
        (q) => userResponses[q.id] === undefined,
      );

      const unansweredCategories: string[] = [];

      unanswered.forEach((q) => {
        if (!unansweredCategories.includes(q.category)) {
          unansweredCategories.push(q.category);
        }
      });

      toast({
        title: "Please answer all questions",
        description: `You still have unanswered questions in these categories: ${unansweredCategories.join(
          ", ",
        )}.`,
        variant: "destructive",
      });

      return;
    }

    try {
      setIsSubmitting(true);

      const responses: Record<string, number> = {};

      Object.entries(userResponses).forEach(([key, value]) => {
        responses[key] = value;
      });

      const res = await apiRequest(
        "POST",
        "/api/ikigai-profile",
        { responses },
      );

      const data = await res.json();

      sessionStorage.setItem(
        "ikigaiResults",
        JSON.stringify(data),
      );

      sessionStorage.setItem(
        "userResponses",
        JSON.stringify(responses),
      );

      setLocation("/results");
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Failed to process your answers. Please try again.",
        variant: "destructive",
      });

      console.error("Error submitting responses:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-gradient-to-br from-violet-50 via-white to-fuchsia-50">
      <Navbar />

      <main className="flex-1 overflow-hidden pt-24 pb-4">
        <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 text-center"
          >
            <div className="mb-3 flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-violet-500" />

              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
                Self Discovery
              </span>

              <Sparkles className="h-5 w-5 text-fuchsia-500" />
            </div>

            <h1 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Discover where your{" "}
              <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                Ikigai
              </span>{" "}
              lies.
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Answer these questions thoughtfully to understand your
              passions, strengths, purpose, and direction.
            </p>
          </motion.div>

          {/* Progress */}
          <div className="mb-4">
            <div className="relative flex items-start justify-between">
              {/* Connecting line */}
              <div className="absolute left-[10%] right-[10%] top-6 h-1 rounded-full bg-violet-100" />

              <div
                className="absolute left-[10%] top-6 h-1 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 transition-all duration-500"
                style={{
                  width: `${Math.max(0, progress - 10) * 0.8}%`,
                }}
              />

              {categories.map((category, index) => {
                const status = getCategoryStatus(category);

                return (
                  <div
                    key={category}
                    className="relative z-10 flex w-1/5 flex-col items-center"
                  >
                    <div
                      className={`
                        flex h-12 w-12 items-center justify-center rounded-full
                        border-2 font-semibold transition-all duration-300
                        ${
                          status === "active"
                            ? "border-violet-500 bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-200"
                            : status === "completed"
                              ? "border-violet-500 bg-violet-100 text-violet-700"
                              : "border-violet-100 bg-white text-slate-400 shadow-sm"
                        }
                      `}
                    >
                      {status === "completed" ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        index + 1
                      )}
                    </div>

                    <span
                      className={`
                        mt-3 text-xs font-medium sm:text-sm
                        ${
                          status === "active"
                            ? "text-violet-700"
                            : "text-slate-500"
                        }
                      `}
                    >
                      {getCategoryName(category)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Progress bar */}
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-violet-100">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <div className="mt-2 text-right text-xs font-medium text-violet-600">
              {currentQuestionIndex + 1} of {questions.length}
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="
                rounded-3xl
                border border-violet-100
                bg-white/80
                p-5
                shadow-[0_20px_60px_rgba(124,58,237,0.10)]
                backdrop-blur-xl
                sm:p-6
              "
            >
              <div className="mb-8">
                <div className="mb-2 text-sm font-semibold text-violet-600">
                  {getCategoryName(currentCategory)}
                </div>

                <h2 className="text-xl font-bold leading-tight text-slate-900 sm:text-2xl">
                  {currentQuestion.question}
                </h2>

                {currentQuestion.subtext && (
                  <p className="mt-3 text-base leading-7 text-slate-600">
                    {currentQuestion.subtext}
                  </p>
                )}
              </div>

              <Select
                value={
                  userResponses[currentQuestion.id]?.toString()
                }
                onValueChange={handleOptionSelect}
              >
                <SelectTrigger
                  className="
                    h-14
                    w-full
                    rounded-xl
                    border-violet-200
                    bg-white
                    px-5
                    text-left
                    text-slate-700
                    shadow-sm
                    transition-all
                    hover:border-violet-400
                    focus:ring-2
                    focus:ring-violet-200
                  "
                >
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>

                <SelectContent className="rounded-xl border-violet-100 bg-white shadow-xl">
                  <SelectGroup>
                    {currentQuestion.options.map((option, index) => (
                      <SelectItem
                        key={index}
                        value={index.toString()}
                        className="cursor-pointer rounded-lg py-3 text-slate-700 focus:bg-violet-50 focus:text-violet-700"
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-4 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="
                rounded-full
                border-violet-200
                bg-white/80
                px-6
                text-slate-600
                shadow-sm
                hover:border-violet-300
                hover:bg-violet-50
                hover:text-violet-700
              "
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={!isAnswerSelected || isSubmitting}
              className="
                rounded-full
                bg-gradient-to-r
                from-violet-600
                to-fuchsia-500
                px-7
                text-white
                shadow-lg
                shadow-violet-200
                transition-all
                duration-300
                hover:from-violet-700
                hover:to-fuchsia-600
                hover:shadow-xl
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              {currentQuestionIndex === questions.length - 1 ? (
                isSubmitting ? (
                  "Processing..."
                ) : (
                  "See Results"
                )
              ) : (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}