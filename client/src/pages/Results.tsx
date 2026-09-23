import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  Check,
  ArrowRight,
  Award,
  ChevronRight,
  BarChart3,
  Library,
  BriefcaseBusiness,
  BookOpen,
  LineChart,
  Sparkles,
  Target,
  Compass,
  RotateCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import CareerCard from "@/components/CareerCard";

import { careerAnalysisQuestions } from "@/lib/questions";
import {
  Career,
  findMatchingCareers,
  recommendSkills,
  getSkillDevelopmentPath,
  generateCareerInsights,
} from "@/lib/career-data";

type Dimension = {
  title: string;
  subtitle: string;
  description: string;
  score?: number;
};

type ProfileData = {
  id?: string;
  title?: string;
  description?: string;

  profileId?: string;
  profileTitle?: string;
  profileDescription?: string;

  strengths?: string[];
  careers?: string[];
};

type StoredResults = {
  profileId?: string;
  profileTitle?: string;
  profileDescription?: string;
  strengths?: string[];
  careers?: string[];

  profile?: ProfileData;

  dimensions?: Record<string, number | Dimension>;

  scores?: {
    passion?: number;
    mission?: number;
    vocation?: number;
    profession?: number;
  };

  personalityScores?: Record<string, number>;

  overallScore?: number;
};

type NormalizedResults = {
  profileId: string;
  profileTitle: string;
  profileDescription: string;
  strengths: string[];
  careers: string[];
  dimensions: Record<string, Dimension>;
  scores: {
    passion: number;
    mission: number;
    vocation: number;
    profession: number;
  };
  overallScore: number;
};

const profileDefaults: Record<
  string,
  {
    title: string;
    description: string;
    strengths: string[];
    careers: string[];
  }
> = {
  visionary: {
    title: "Visionary Innovator",
    description:
      "You naturally look beyond the obvious, connect possibilities, and enjoy creating new approaches to meaningful problems.",
    strengths: [
      "Big-picture thinking",
      "Creative problem-solving",
      "Future-oriented thinking",
      "Opportunity recognition",
    ],
    careers: ["Product Manager", "Innovation Consultant", "Entrepreneur"],
  },

  craftsperson: {
    title: "Practical Craftsperson",
    description:
      "You prefer turning ideas into tangible results and tend to thrive when precision, practical thinking, and hands-on execution matter.",
    strengths: [
      "Attention to detail",
      "Technical precision",
      "Practical problem-solving",
      "Quality-focused execution",
    ],
    careers: [
      "Software Engineer",
      "Technical Specialist",
      "Quality Assurance Engineer",
    ],
  },

  connector: {
    title: "Community Connector",
    description:
      "You naturally understand people, communicate across perspectives, and enjoy creating meaningful connections.",
    strengths: [
      "Communication",
      "Relationship building",
      "Empathy",
      "Collaboration",
    ],
    careers: ["HR Specialist", "Customer Success Manager", "Community Manager"],
  },

  analyzer: {
    title: "Strategic Analyzer",
    description:
      "You enjoy understanding complex information, identifying patterns, and using structured reasoning to solve problems.",
    strengths: [
      "Critical thinking",
      "Data interpretation",
      "Systematic problem-solving",
      "Pattern recognition",
    ],
    careers: ["Data Scientist", "Research Specialist", "Strategic Consultant"],
  },

  nurturer: {
    title: "Compassionate Nurturer",
    description:
      "You are motivated by helping others grow, feel supported, and move toward better outcomes.",
    strengths: [
      "Empathy",
      "Supportive communication",
      "Active listening",
      "Guidance and mentoring",
    ],
    careers: [
      "Education Specialist",
      "People Development Specialist",
      "Community Support Specialist",
    ],
  },

  creator: {
    title: "Creative Builder",
    description:
      "You combine imagination with execution and enjoy turning ideas into experiences, designs, or content.",
    strengths: [
      "Creative expression",
      "Visual thinking",
      "Ideation",
      "Communication through design",
    ],
    careers: [
      "UX/UI Designer",
      "Content Strategist",
      "Creative Product Designer",
    ],
  },

  builder: {
    title: "Execution Builder",
    description:
      "You enjoy organizing moving parts, creating structure, and turning plans into measurable results.",
    strengths: ["Execution", "Organization", "Planning", "Process improvement"],
    careers: [
      "Project Manager",
      "Operations Specialist",
      "Product Operations Manager",
    ],
  },
};

const dimensionMeta: Record<
  string,
  {
    title: string;
    subtitle: string;
    description: string;
  }
> = {
  passion: {
    title: "Passion",
    subtitle: "What you love",
    description:
      "The activities, topics, and problems that naturally hold your attention.",
  },
  mission: {
    title: "Mission",
    subtitle: "What the world needs",
    description:
      "The kind of impact and problems you feel motivated to contribute toward.",
  },
  vocation: {
    title: "Vocation",
    subtitle: "What you can be paid for",
    description:
      "The abilities and work environments that can translate into professional value.",
  },
  profession: {
    title: "Profession",
    subtitle: "What you're good at",
    description:
      "The capabilities you can develop into reliable professional strengths.",
  },
};

function normalizeResults(raw: StoredResults): NormalizedResults {
  const profile = raw.profile ?? {};

  const profileId =
    raw.profileId ?? profile.profileId ?? profile.id ?? "analyzer";

  const defaults = profileDefaults[profileId] ?? profileDefaults.analyzer;

  const dimensions = Object.entries(dimensionMeta).reduce(
    (acc, [key, meta]) => {
      const rawValue = raw.dimensions?.[key];

      acc[key] = {
        ...meta,
        score: typeof rawValue === "number" ? rawValue : undefined,
      };

      return acc;
    },
    {} as Record<string, Dimension>,
  );

  const scores = {
    passion:
      raw.scores?.passion ??
      (typeof raw.dimensions?.passion === "number"
        ? raw.dimensions.passion
        : 0),

    mission:
      raw.scores?.mission ??
      (typeof raw.dimensions?.mission === "number"
        ? raw.dimensions.mission
        : 0),

    vocation:
      raw.scores?.vocation ??
      (typeof raw.dimensions?.vocation === "number"
        ? raw.dimensions.vocation
        : 0),

    profession:
      raw.scores?.profession ??
      (typeof raw.dimensions?.profession === "number"
        ? raw.dimensions.profession
        : 0),
  };

  const calculatedOverall =
    (scores.passion + scores.mission + scores.vocation + scores.profession) / 4;

  return {
    profileId,

    profileTitle:
      raw.profileTitle ??
      profile.profileTitle ??
      profile.title ??
      defaults.title,

    profileDescription:
      raw.profileDescription ??
      profile.profileDescription ??
      profile.description ??
      defaults.description,

    strengths: raw.strengths?.length
      ? raw.strengths
      : profile.strengths?.length
        ? profile.strengths
        : defaults.strengths,

    careers: raw.careers?.length
      ? raw.careers
      : profile.careers?.length
        ? profile.careers
        : defaults.careers,
    dimensions,

    scores,

    overallScore: raw.overallScore ?? Math.round(calculatedOverall),
  };
}

export default function Results() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [results, setResults] = useState<NormalizedResults | null>(null);

  const [loading, setLoading] = useState(false);

  const [currentAnalysisStep, setCurrentAnalysisStep] = useState(0);

  const [analysisResponses, setAnalysisResponses] = useState<
    Record<string, string>
  >({});

  const [ageRange, setAgeRange] = useState("18-24");

  const [educationLevel, setEducationLevel] = useState("Bachelor's Degree");

  const [careerPreference, setCareerPreference] = useState("");

  const [matchedCareers, setMatchedCareers] = useState<Career[]>([]);

  const [recommendedSkills, setRecommendedSkills] = useState<
    { skill: string; relevance: number }[]
  >([]);

  const [careerInsights, setCareerInsights] = useState<string[]>([]);

  const [analysisComplete, setAnalysisComplete] = useState(false);

  useEffect(() => {
    const storedResults = sessionStorage.getItem("ikigaiResults");

    if (!storedResults) {
      setLocation("/");

      toast({
        title: "No results found",
        description: "Please complete the questionnaire first.",
        variant: "destructive",
      });

      return;
    }

    try {
      const parsed: StoredResults = JSON.parse(storedResults);

      setResults(normalizeResults(parsed));
    } catch (error) {
      console.error("Failed to parse Ikigai results:", error);

      sessionStorage.removeItem("ikigaiResults");

      toast({
        title: "Results could not be loaded",
        description: "Please complete the assessment again.",
        variant: "destructive",
      });

      setLocation("/questionnaire");
    }
  }, [setLocation, toast]);

  const averageScore = useMemo(() => {
    if (!results) return 0;

    const values = Object.values(results.scores);

    return Math.round(
      values.reduce((sum, value) => sum + value, 0) / values.length,
    );
  }, [results]);

  const handleAnalysisInputChange = (id: string, value: string) => {
    setAnalysisResponses((previous) => ({
      ...previous,
      [id]: value,
    }));
  };

  const handleAnalysisBack = () => {
    if (currentAnalysisStep > 0) {
      setCurrentAnalysisStep((previous) => previous - 1);
    }
  };

  const submitAnalysisData = () => {
    if (!results) return;

    setLoading(true);

    try {
      const interests =
        analysisResponses.interests
          ?.split(",")
          .map((item) => item.trim())
          .filter(Boolean) ?? [];

      const skills =
        analysisResponses.experience
          ?.split(",")
          .map((item) => item.trim())
          .filter(Boolean) ?? [];

      const futureGoals =
        analysisResponses.goals
          ?.split(".")
          .map((item) => item.trim())
          .filter(Boolean) ?? [];

      const enrichedInterests = careerPreference.trim()
        ? [...interests, careerPreference.trim()]
        : interests;

      const careers = findMatchingCareers(
        {
          ikigaiProfile: results.profileId,
          skills,
          interests: enrichedInterests,
          educationLevel,
          ageRange,
          futureGoals,
        },
        5,
      );

      setMatchedCareers(careers);

      setRecommendedSkills(recommendSkills(careers));

      setCareerInsights(generateCareerInsights(results.profileId, careers));

      setAnalysisComplete(true);

      toast({
        title: "Career analysis complete",
        description:
          "Your career matches, skill priorities, and insights are ready.",
      });
    } catch (error) {
      console.error("Career matching failed:", error);

      toast({
        title: "Analysis failed",
        description:
          "We couldn't generate your career matches. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnalysisNext = () => {
    const currentQuestion = careerAnalysisQuestions[currentAnalysisStep];

    const answer = analysisResponses[currentQuestion.id];

    if (!answer?.trim()) {
      toast({
        title: "Please provide an answer",
        description: "This information helps personalize your career matches.",
        variant: "destructive",
      });

      return;
    }

    if (currentAnalysisStep < careerAnalysisQuestions.length - 1) {
      setCurrentAnalysisStep((previous) => previous + 1);

      return;
    }

    submitAnalysisData();
  };

  const resetAssessment = () => {
    sessionStorage.removeItem("ikigaiResults");
    sessionStorage.removeItem("userResponses");

    setLocation("/questionnaire");
  };

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-white to-purple-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Preparing your results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
      <Navbar />

      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* HEADER */}
          <motion.section
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-5">
              <Sparkles className="w-4 h-4" />
              Your personalized profile
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-5">
              Your Ikigai Profile
              <span className="block bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                is ready.
              </span>
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your answers reveal a pattern in what you enjoy, what you're good
              at, what matters to you, and where those strengths can create
              professional value.
            </p>
          </motion.section>

          {/* PROFILE CARD */}
          <motion.section
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-5xl mx-auto mb-12"
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-500 p-[1px] shadow-[0_20px_60px_rgba(124,58,237,0.20)]">
              <div className="relative rounded-3xl bg-white/95 backdrop-blur-xl p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center shrink-0 shadow-lg">
                    <Compass className="w-10 h-10 text-white" />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium text-violet-600 mb-2">
                      Primary profile
                    </p>

                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                      {results.profileTitle}
                    </h2>

                    <p className="text-gray-600 leading-relaxed">
                      {results.profileDescription}
                    </p>
                  </div>

                  <div className="md:text-right shrink-0">
                    <div className="text-4xl font-bold text-violet-600">
                      {averageScore}%
                    </div>

                    <p className="text-sm text-gray-500">profile alignment</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* IKIGAI DIMENSIONS */}
          <section className="max-w-5xl mx-auto mb-16">
            <div className="text-center mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500 mb-2">
                Your pattern
              </p>

              <h2 className="text-3xl font-bold text-gray-900">
                The four dimensions of your Ikigai
              </h2>

              <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                These dimensions show where your motivations and capabilities
                are strongest.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {Object.entries(results.dimensions).map(
                ([key, dimension], index) => {
                  const score =
                    results.scores[key as keyof typeof results.scores] ?? 0;

                  return (
                    <motion.div
                      key={key}
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                      }}
                      className="group bg-white rounded-2xl border border-violet-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-4 mb-5">
                        <div>
                          <p className="text-sm text-violet-500 font-medium mb-1">
                            {dimension.subtitle}
                          </p>

                          <h3 className="text-xl font-bold text-gray-900">
                            {dimension.title}
                          </h3>
                        </div>

                        <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center">
                          <Target className="w-6 h-6 text-violet-600" />
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm leading-relaxed mb-5">
                        {dimension.description}
                      </p>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-500">Alignment</span>

                          <span className="font-semibold text-violet-600">
                            {score}%
                          </span>
                        </div>

                        <div className="h-2 bg-violet-50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${Math.min(100, Math.max(0, score))}%`,
                            }}
                            transition={{
                              duration: 1,
                              delay: 0.3 + index * 0.1,
                            }}
                            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                },
              )}
            </div>
          </section>

          {/* STRENGTHS + INITIAL CAREERS */}
          <section className="max-w-5xl mx-auto mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                className="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center">
                    <Award className="w-5 h-5 text-violet-600" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Your strengths
                    </h3>

                    <p className="text-sm text-gray-500">
                      Patterns detected from your assessment
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {results.strengths.map((strength, index) => (
                    <motion.div
                      key={`${strength}-${index}`}
                      initial={{
                        opacity: 0,
                        x: -10,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        delay: index * 0.08,
                      }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-violet-600" />
                      </div>

                      <span className="text-gray-700">{strength}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                className="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-fuchsia-100 flex items-center justify-center">
                    <BriefcaseBusiness className="w-5 h-5 text-fuchsia-600" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Career directions
                    </h3>

                    <p className="text-sm text-gray-500">
                      Roles aligned with your profile
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {results.careers.map((career, index) => (
                    <button
                      key={`${career}-${index}`}
                      type="button"
                      onClick={() => {
                        setCareerPreference(career);

                        setTimeout(() => {
                          document
                            .getElementById("career-analysis")
                            ?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                        }, 50);
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-violet-50 hover:shadow-sm transition-all duration-200 text-left group"
                    >
                      <span className="font-medium text-gray-700 group-hover:text-violet-700 transition-colors">
                        {career}
                      </span>

                      <ArrowRight className="w-4 h-4 text-violet-500 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* DEEPER CAREER ANALYSIS */}
          <section id="career-analysis" className="max-w-5xl mx-auto">
            {!analysisComplete ? (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                className="bg-white rounded-3xl border border-violet-100 shadow-sm overflow-hidden"
              >
                <div className="bg-gradient-to-r from-violet-600 to-fuchsia-500 p-8 md:p-10 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <BarChart3 className="w-6 h-6" />

                    <span className="font-semibold">
                      Next-level career analysis
                    </span>
                  </div>

                  <h2 className="text-3xl font-bold mb-3">
                    Go beyond your Ikigai profile
                  </h2>

                  <p className="text-white/85 max-w-2xl">
                    Tell us a little more about your background and goals. We'll
                    combine that information with your Ikigai profile to
                    generate more specific career matches and skill priorities.
                  </p>
                </div>

                <div className="p-8 md:p-10">
                  {/* BASIC PROFILE */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age range
                      </label>

                      <Select value={ageRange} onValueChange={setAgeRange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="13-17">13-17</SelectItem>

                          <SelectItem value="18-24">18-24</SelectItem>

                          <SelectItem value="25-34">25-34</SelectItem>

                          <SelectItem value="35-44">35-44</SelectItem>

                          <SelectItem value="45-54">45-54</SelectItem>

                          <SelectItem value="55+">55+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Education level
                      </label>

                      <Select
                        value={educationLevel}
                        onValueChange={setEducationLevel}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="High School">
                            High School
                          </SelectItem>

                          <SelectItem value="Associate's Degree">
                            Associate's Degree
                          </SelectItem>

                          <SelectItem value="Bachelor's Degree">
                            Bachelor's Degree
                          </SelectItem>

                          <SelectItem value="Master's Degree">
                            Master's Degree
                          </SelectItem>

                          <SelectItem value="Ph.D.">Ph.D.</SelectItem>

                          <SelectItem value="Medical Degree">
                            Medical Degree
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Career you're curious about
                    </label>

                    <Input
                      value={careerPreference}
                      onChange={(event) =>
                        setCareerPreference(event.target.value)
                      }
                      placeholder="e.g. Data Scientist, Product Manager, UX Designer"
                    />
                  </div>

                  {/* PROGRESS */}
                  <div className="mb-8">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-700">
                        Question {currentAnalysisStep + 1} of{" "}
                        {careerAnalysisQuestions.length}
                      </span>

                      <span className="text-violet-600 font-medium">
                        {Math.round(
                          ((currentAnalysisStep + 1) /
                            careerAnalysisQuestions.length) *
                            100,
                        )}
                        %
                      </span>
                    </div>

                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                        animate={{
                          width: `${
                            ((currentAnalysisStep + 1) /
                              careerAnalysisQuestions.length) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* QUESTION */}
                  <motion.div
                    key={currentAnalysisStep}
                    initial={{
                      opacity: 0,
                      x: 20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {careerAnalysisQuestions[currentAnalysisStep].question}
                    </h3>

                    <p className="text-gray-600 mb-5">
                      {careerAnalysisQuestions[currentAnalysisStep].subtext}
                    </p>

                    {currentAnalysisStep === 0 || currentAnalysisStep === 3 ? (
                      <Input
                        value={
                          analysisResponses[
                            careerAnalysisQuestions[currentAnalysisStep].id
                          ] || ""
                        }
                        onChange={(event) =>
                          handleAnalysisInputChange(
                            careerAnalysisQuestions[currentAnalysisStep].id,
                            event.target.value,
                          )
                        }
                        placeholder={
                          careerAnalysisQuestions[currentAnalysisStep]
                            .placeholder
                        }
                        className="h-12"
                      />
                    ) : (
                      <Textarea
                        value={
                          analysisResponses[
                            careerAnalysisQuestions[currentAnalysisStep].id
                          ] || ""
                        }
                        onChange={(event) =>
                          handleAnalysisInputChange(
                            careerAnalysisQuestions[currentAnalysisStep].id,
                            event.target.value,
                          )
                        }
                        placeholder={
                          careerAnalysisQuestions[currentAnalysisStep]
                            .placeholder
                        }
                        className="min-h-32 resize-none"
                      />
                    )}
                  </motion.div>

                  {/* ACTIONS */}
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      onClick={handleAnalysisBack}
                      disabled={currentAnalysisStep === 0 || loading}
                      className="rounded-full px-6"
                    >
                      Back
                    </Button>

                    <Button
                      onClick={handleAnalysisNext}
                      disabled={loading}
                      className="rounded-full px-7 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white hover:from-violet-700 hover:to-fuchsia-600"
                    >
                      {loading ? (
                        "Analyzing..."
                      ) : currentAnalysisStep ===
                        careerAnalysisQuestions.length - 1 ? (
                        <>
                          Generate My Matches
                          <Sparkles className="ml-2 w-4 h-4" />
                        </>
                      ) : (
                        <>
                          Next
                          <ChevronRight className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="space-y-8"
              >
                {/* ANALYSIS HEADER */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-4">
                    <Sparkles className="w-4 h-4" />
                    Analysis complete
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Your career map
                  </h2>

                  <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                    These recommendations combine your Ikigai profile with the
                    additional information you provided.
                  </p>
                </div>

                <Tabs defaultValue="careers" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-violet-50 p-1 rounded-xl mb-8">
                    <TabsTrigger value="careers" className="rounded-lg">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Careers
                    </TabsTrigger>

                    <TabsTrigger value="skills" className="rounded-lg">
                      <Library className="w-4 h-4 mr-2" />
                      Skills
                    </TabsTrigger>

                    <TabsTrigger value="insights" className="rounded-lg">
                      <LineChart className="w-4 h-4 mr-2" />
                      Insights
                    </TabsTrigger>
                  </TabsList>

                  {/* CAREERS */}
                  <TabsContent value="careers" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {matchedCareers.slice(0, 4).map((career, index) => (
                        <CareerCard
                          key={index}
                          career={career}
                          delay={index * 0.1}
                          color={
                            index === 0
                              ? "purple"
                              : index === 1
                                ? "blue"
                                : index === 2
                                  ? "green"
                                  : "yellow"
                          }
                        />
                      ))}
                    </div>

                    {matchedCareers.length === 0 && (
                      <div className="text-center bg-white rounded-2xl border border-gray-100 p-10">
                        <BriefcaseBusiness className="w-10 h-10 text-violet-400 mx-auto mb-3" />

                        <h3 className="font-semibold text-lg text-gray-900">
                          No exact matches yet
                        </h3>

                        <p className="text-gray-500 mt-2">
                          Try broadening your interests or career preference.
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  {/* SKILLS */}
                  <TabsContent value="skills" className="mt-0">
                    <div className="bg-white rounded-2xl border border-gray-100 p-7">
                      <div className="flex items-center gap-3 mb-7">
                        <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-violet-600" />
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            Skill priorities
                          </h3>

                          <p className="text-sm text-gray-500">
                            Skills connected to your strongest career matches
                          </p>
                        </div>
                      </div>

                      <div className="space-y-7">
                        {recommendedSkills.slice(0, 6).map((skill, index) => (
                          <div key={`${skill.skill}-${index}`}>
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium text-gray-800">
                                {skill.skill}
                              </span>

                              <span className="text-sm font-semibold text-violet-600">
                                {skill.relevance}%
                              </span>
                            </div>

                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <motion.div
                                initial={{
                                  width: 0,
                                }}
                                animate={{
                                  width: `${skill.relevance}%`,
                                }}
                                transition={{
                                  duration: 1,
                                  delay: index * 0.1,
                                }}
                                className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
                              />
                            </div>

                            <div className="mt-3 p-3 rounded-xl bg-violet-50">
                              <p className="text-xs font-semibold text-violet-700 mb-1">
                                Suggested development path
                              </p>

                              <p className="text-sm text-gray-600">
                                {getSkillDevelopmentPath(skill.skill)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* INSIGHTS */}
                  <TabsContent value="insights" className="mt-0">
                    <div className="bg-white rounded-2xl border border-gray-100 p-7">
                      <div className="flex items-center gap-3 mb-7">
                        <div className="w-11 h-11 rounded-xl bg-fuchsia-100 flex items-center justify-center">
                          <LineChart className="w-5 h-5 text-fuchsia-600" />
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            Career insights
                          </h3>

                          <p className="text-sm text-gray-500">
                            What your profile suggests about your direction
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {careerInsights.map((insight, index) => (
                          <motion.div
                            key={`${insight}-${index}`}
                            initial={{
                              opacity: 0,
                              y: 10,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            transition={{
                              delay: index * 0.08,
                            }}
                            className="p-4 rounded-xl bg-violet-50 border border-violet-100"
                          >
                            <p className="text-gray-700 leading-relaxed">
                              {insight}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* RESET */}
                <div className="text-center pt-4">
                  <Button
                    variant="outline"
                    onClick={resetAssessment}
                    className="rounded-full px-6"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Retake Assessment
                  </Button>
                </div>
              </motion.div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
