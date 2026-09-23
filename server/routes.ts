import { Express, Request, Response } from "express";
import { createServer, Server } from "http";
import { z, ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

const careerAnalysisSchema = z.object({
  interests: z.string().min(1),
  education: z.string().min(1),
  experience: z.string().min(1),
  goals: z.string().min(1),
});

const ikigaiProfileSchema = z.object({
  responses: z.record(z.number().min(0).max(5)),
});

const recommendationSchema = z.object({
  profile: z.string(),
  ikigaiProfile: z.string(),
  personalityScores: z.record(z.string(), z.number()),
  dimensions: z.object({
    passion: z.number(),
    mission: z.number(),
    profession: z.number(),
    vocation: z.number(),
  }),
  careerAnalysis: careerAnalysisSchema.optional(),
});

function handleValidationError(res: Response, error: unknown) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: fromZodError(error).message,
    });
  }

  return res.status(400).json({
    message: "Invalid request data",
  });
}

/*
 * Career data used by the recommendation engine.
 *
 * This is intentionally deterministic.
 * The same profile and assessment scores always produce
 * the same career recommendations.
 */
const careerProfiles = [
  {
    id: "data-scientist",
    title: "Data Scientist",
    description:
      "Uses statistics, programming and machine learning to discover patterns and solve complex problems.",
    profiles: ["analyzer", "visionary", "builder"],
    interests: ["technology", "research", "analysis", "problem-solving"],
    skills: ["Python", "Statistics", "Machine Learning", "SQL"],
    environments: ["research", "corporate", "technology"],
    impact: ["knowledge", "technology", "systems"],
  },

  {
    id: "software-engineer",
    title: "Software Engineer",
    description:
      "Designs, builds and maintains software systems that solve practical problems.",
    profiles: ["analyzer", "builder", "craftsperson"],
    interests: ["technology", "problem-solving", "building", "systems"],
    skills: ["Programming", "Problem Solving", "Data Structures", "Git"],
    environments: ["technology", "corporate"],
    impact: ["technology", "solutions", "systems"],
  },

  {
    id: "product-manager",
    title: "Product Manager",
    description:
      "Connects users, business goals and technology to guide products from idea to execution.",
    profiles: ["visionary", "connector", "builder"],
    interests: ["technology", "strategy", "communication", "innovation"],
    skills: ["Communication", "Strategy", "Leadership", "Product Thinking"],
    environments: ["corporate", "entrepreneurial", "technology"],
    impact: ["systems", "innovation", "people"],
  },

  {
    id: "ux-ui-designer",
    title: "UX/UI Designer",
    description:
      "Creates intuitive digital experiences by combining creativity, user research and visual design.",
    profiles: ["creator", "visionary", "connector"],
    interests: ["design", "creativity", "people", "technology"],
    skills: ["UI Design", "UX Research", "Prototyping", "Visual Design"],
    environments: ["creative", "technology", "entrepreneurial"],
    impact: ["people", "creativity", "technology"],
  },

  {
    id: "strategic-consultant",
    title: "Strategic Consultant",
    description:
      "Analyzes complex business problems and develops structured recommendations for organizations.",
    profiles: ["analyzer", "visionary", "builder"],
    interests: ["strategy", "research", "business", "problem-solving"],
    skills: ["Analysis", "Research", "Communication", "Strategy"],
    environments: ["corporate", "research"],
    impact: ["systems", "business", "knowledge"],
  },

  {
    id: "project-manager",
    title: "Project Manager",
    description:
      "Coordinates people, resources, timelines and processes to deliver projects successfully.",
    profiles: ["builder", "connector", "visionary"],
    interests: ["organization", "leadership", "planning", "people"],
    skills: ["Planning", "Leadership", "Communication", "Risk Management"],
    environments: ["corporate", "entrepreneurial", "technology"],
    impact: ["systems", "people", "organizations"],
  },

  {
    id: "hr-development",
    title: "HR Development Specialist",
    description:
      "Helps organizations develop people, improve workplace experiences and build stronger teams.",
    profiles: ["connector", "nurturer", "builder"],
    interests: ["people", "communication", "psychology", "community"],
    skills: ["Communication", "People Management", "Conflict Resolution"],
    environments: ["corporate", "community"],
    impact: ["people", "community", "wellbeing"],
  },

  {
    id: "content-strategist",
    title: "Content Strategist",
    description:
      "Uses storytelling, research and communication strategy to create meaningful content experiences.",
    profiles: ["creator", "connector", "visionary"],
    interests: ["writing", "creativity", "communication", "research"],
    skills: ["Writing", "Storytelling", "Content Strategy", "Research"],
    environments: ["creative", "technology", "entrepreneurial"],
    impact: ["people", "creativity", "knowledge"],
  },

  {
    id: "research-specialist",
    title: "Research Specialist",
    description:
      "Investigates questions systematically and converts evidence into useful insights.",
    profiles: ["analyzer", "craftsperson", "visionary"],
    interests: ["research", "science", "analysis", "learning"],
    skills: ["Research", "Analysis", "Documentation", "Critical Thinking"],
    environments: ["research", "academic"],
    impact: ["knowledge", "technology"],
  },

  {
    id: "operations-specialist",
    title: "Operations Specialist",
    description:
      "Improves processes, coordinates resources and helps organizations operate efficiently.",
    profiles: ["builder", "analyzer", "craftsperson"],
    interests: ["systems", "organization", "efficiency", "problem-solving"],
    skills: ["Process Improvement", "Planning", "Analysis", "Operations"],
    environments: ["corporate", "technology"],
    impact: ["systems", "organizations"],
  },
];

/**
 * Convert personality/Ikigai data into a deterministic career score.
 */
function calculateCareerScore(
  career: (typeof careerProfiles)[number],
  profile: string,
  dimensions: {
    passion: number;
    mission: number;
    profession: number;
    vocation: number;
  }
) {
  let score = 0;

  /*
   * Personality compatibility.
   */
  if (career.profiles.includes(profile)) {
    score += 35;
  }

  /*
   * Secondary compatibility based on the four Ikigai dimensions.
   */
  const average =
    (dimensions.passion +
      dimensions.mission +
      dimensions.profession +
      dimensions.vocation) /
    4;

  score += average * 0.45;

  /*
   * Strong vocation/profession alignment gets a small additional boost.
   */
  score += dimensions.profession * 0.1;
  score += dimensions.vocation * 0.1;

  return Math.round(Math.min(score, 100));
}

/**
 * POST /api/ikigai-profile
 *
 * Calculates the user's complete assessment.
 */
export function registerRoutes(app: Express): Server {
  app.post("/api/ikigai-profile", async (req: Request, res: Response) => {
    try {
      const parsed = ikigaiProfileSchema.parse(req.body);

      const responses: Record<number, number> = {};

      Object.entries(parsed.responses).forEach(([questionId, answer]) => {
        responses[Number(questionId)] = answer;
      });

      /*
       * Dimension calculation.
       */
      const calculateDimension = (
        category: "passion" | "mission" | "profession" | "vocation"
      ) => {
        const ids = {
          passion: [1, 2, 3],
          mission: [4, 5, 6],
          profession: [7, 8, 9],
          vocation: [10, 11, 12],
        }[category];

        const answers = ids
          .map((id) => responses[id])
          .filter((answer) => typeof answer === "number");

        if (!answers.length) return 0;

        return Math.round(
          (answers.reduce((sum, answer) => sum + answer, 0) /
            answers.length /
            5) *
            100
        );
      };

      const passion = calculateDimension("passion");
      const mission = calculateDimension("mission");
      const profession = calculateDimension("profession");
      const vocation = calculateDimension("vocation");

      /*
       * Personality scoring.
       *
       * Q13 and Q14 are the dedicated personality questions.
       */
      const personalityScores: Record<string, number> = {
        visionary: 0,
        craftsperson: 0,
        connector: 0,
        analyzer: 0,
        nurturer: 0,
        creator: 0,
        builder: 0,
      };

      const q13 = responses[13];
      const q14 = responses[14];

      const q13Map: Record<number, Record<string, number>> = {
        1: { analyzer: 10, builder: 6 },
        2: { craftsperson: 10, builder: 6 },
        3: { connector: 10, nurturer: 7 },
        4: { analyzer: 9, builder: 8 },
        5: { visionary: 10, creator: 8 },
      };

      const q14Map: Record<number, Record<string, number>> = {
        1: { visionary: 10, builder: 8 },
        2: { visionary: 9, creator: 10 },
        3: { connector: 10, nurturer: 9 },
        4: { builder: 10, craftsperson: 8 },
        5: { analyzer: 10 },
      };

      if (q13Map[q13]) {
        Object.entries(q13Map[q13]).forEach(([profile, score]) => {
          personalityScores[profile] += score;
        });
      }

      if (q14Map[q14]) {
        Object.entries(q14Map[q14]).forEach(([profile, score]) => {
          personalityScores[profile] += score;
        });
      }

      const dominantProfile =
        Object.entries(personalityScores).sort(
          (a, b) => b[1] - a[1]
        )[0]?.[0] ?? "visionary";

      const profileDescriptions: Record<
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
            "You naturally look beyond the obvious and enjoy exploring possibilities, innovation and new directions.",
          strengths: [
            "Big-picture thinking",
            "Creative problem-solving",
            "Future-oriented perspective",
          ],
          careers: [
            "Product Manager",
            "Strategic Consultant",
            "Entrepreneur",
          ],
        },

        craftsperson: {
          title: "Practical Craftsperson",
          description:
            "You prefer hands-on work, practical problem-solving and producing tangible, high-quality results.",
          strengths: [
            "Attention to detail",
            "Technical precision",
            "Practical problem-solving",
          ],
          careers: [
            "Software Engineer",
            "Technical Specialist",
            "Quality Assurance Professional",
          ],
        },

        connector: {
          title: "Community Connector",
          description:
            "You naturally build relationships, communicate across perspectives and help people work together.",
          strengths: [
            "Building relationships",
            "Effective communication",
            "Collaboration",
          ],
          careers: [
            "HR Development Specialist",
            "Project Manager",
            "Relationship Manager",
          ],
        },

        analyzer: {
          title: "Strategic Analyzer",
          description:
            "You enjoy understanding complex information, identifying patterns and solving problems systematically.",
          strengths: [
            "Critical thinking",
            "Data interpretation",
            "Systematic problem-solving",
          ],
          careers: [
            "Data Scientist",
            "Research Specialist",
            "Strategic Consultant",
          ],
        },

        nurturer: {
          title: "Compassionate Nurturer",
          description:
            "You are naturally motivated by supporting people, understanding their needs and helping them grow.",
          strengths: [
            "Empathy",
            "Supportive guidance",
            "Understanding people",
          ],
          careers: [
            "HR Development Specialist",
            "Counselor",
            "Community Support Specialist",
          ],
        },

        creator: {
          title: "Artistic Creator",
          description:
            "You enjoy expressing ideas through creativity, design and original perspectives.",
          strengths: [
            "Original thinking",
            "Aesthetic sensibility",
            "Creative expression",
          ],
          careers: [
            "UX/UI Designer",
            "Content Strategist",
            "Brand Developer",
          ],
        },

        builder: {
          title: "Systems Builder",
          description:
            "You enjoy turning ideas into organized, functional systems and improving how things work.",
          strengths: [
            "Process optimization",
            "Structure creation",
            "Long-term planning",
          ],
          careers: [
            "Project Manager",
            "Operations Specialist",
            "Systems Architect",
          ],
        },
      };

      const profile = profileDescriptions[dominantProfile];

      res.json({
        success: true,

        profile: {
          id: dominantProfile,
          title: profile.title,
          description: profile.description,
          strengths: profile.strengths,
          careers: profile.careers,
        },

        personalityScores,

        dimensions: {
          passion,
          mission,
          profession,
          vocation,
        },

        overallScore: Math.round(
          (passion + mission + profession + vocation) / 4
        ),
      });
    } catch (error) {
      return handleValidationError(res, error);
    }
  });

  /*
   * Career recommendations.
   */
  app.post(
    "/api/career-recommendations",
    async (req: Request, res: Response) => {
      try {
        const data = recommendationSchema.parse(req.body);

        const scoredCareers = careerProfiles
          .map((career) => {
            const score = calculateCareerScore(
              career,
              data.profile,
              data.dimensions
            );

            return {
              id: career.id,
              title: career.title,
              description: career.description,
              matchScore: score,
              skills: career.skills,
              profiles: career.profiles,
            };
          })
          .sort((a, b) => b.matchScore - a.matchScore);

        res.json({
          success: true,
          message: "Career recommendations generated successfully",
          recommendations: scoredCareers.slice(0, 6),
          furtherSteps: [
            "Explore your top career matches",
            "Review the skills required for each career",
            "Compare careers based on your interests and strengths",
            "Build a personalized skill-development roadmap",
          ],
        });
      } catch (error) {
        return handleValidationError(res, error);
      }
    }
  );

  /*
   * Free-text career analysis.
   *
   * This endpoint currently validates and stores the structured
   * information supplied by the user. The AI layer can be connected
   * later without changing the assessment architecture.
   */
  app.post(
    "/api/career-analysis",
    async (req: Request, res: Response) => {
      try {
        const data = careerAnalysisSchema.parse(req.body);

        res.json({
          success: true,
          status: "processed",
          message: "Career information received successfully",
          analysis: {
            interests: data.interests,
            education: data.education,
            experience: data.experience,
            goals: data.goals,
          },
        });
      } catch (error) {
        return handleValidationError(res, error);
      }
    }
  );

  return createServer(app);
}