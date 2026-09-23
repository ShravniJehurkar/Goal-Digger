import { questions, ikigaiProfiles, IkigaiProfile } from "./questions";

export type IkigaiDimension =
  | "passion"
  | "mission"
  | "profession"
  | "vocation";

export type PersonalityProfile =
  | "visionary"
  | "craftsperson"
  | "connector"
  | "analyzer"
  | "nurturer"
  | "creator"
  | "builder";

export interface DimensionResult {
  score: number;
  label: string;
  description: string;
}

export interface IkigaiResult {
  passion: DimensionResult;
  mission: DimensionResult;
  profession: DimensionResult;
  vocation: DimensionResult;
  overallScore: number;
  balance: "Highly Balanced" | "Balanced" | "Developing";
}

export interface PersonalityResult {
  profile: PersonalityProfile;
  title: string;
  description: string;
  strengths: string[];
  careers: string[];
  scores: Record<PersonalityProfile, number>;
}

const dimensionDescriptions: Record<
  IkigaiDimension,
  { high: string; medium: string; low: string }
> = {
  passion: {
    high: "You show strong alignment between your natural interests and the activities that energize you.",
    medium:
      "You have several meaningful interests, with some areas showing stronger personal engagement than others.",
    low: "Your interests are still developing and may benefit from exploring different activities and environments.",
  },

  mission: {
    high: "You have a clear sense of the problems, people, or causes you want your work to positively influence.",
    medium:
      "You care about meaningful impact, although the specific direction may still be evolving.",
    low: "Your desired impact is still taking shape and can become clearer through exploration and experience.",
  },

  profession: {
    high: "Your responses indicate strong confidence in your abilities and the kinds of work you can perform effectively.",
    medium:
      "You have identifiable strengths, with some skills still developing through practice and experience.",
    low: "Your professional strengths are still developing and can become clearer as you gain more experience.",
  },

  vocation: {
    high: "Your interests and abilities show strong potential to translate into valuable professional opportunities.",
    medium:
      "You have several marketable directions, although more exploration may help identify the strongest fit.",
    low: "The connection between your interests and professional opportunities is still developing.",
  },
};

/**
 * Converts a 1-5 answer into a normalized contribution.
 *
 * 1 = very weak alignment
 * 5 = very strong alignment
 */
function answerToScore(answer: number): number {
  if (answer < 1 || answer > 5) return 0;

  return ((answer - 1) / 4) * 100;
}

/**
 * Calculate the score of one Ikigai dimension.
 */
export function calculateDimensionScore(
  responses: Record<number, number>,
  dimension: IkigaiDimension
): number {
  const dimensionQuestions = questions.filter(
    (question) => question.category === dimension
  );

  if (dimensionQuestions.length === 0) {
    return 0;
  }

  const scores = dimensionQuestions
    .map((question) => responses[question.id])
    .filter(
      (answer): answer is number =>
        typeof answer === "number" && answer >= 1 && answer <= 5
    )
    .map(answerToScore);

  if (scores.length === 0) {
    return 0;
  }

  const total = scores.reduce((sum, score) => sum + score, 0);

  return Math.round(total / scores.length);
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Very Strong";
  if (score >= 60) return "Strong";
  if (score >= 40) return "Moderate";
  return "Developing";
}

function getDimensionDescription(
  dimension: IkigaiDimension,
  score: number
): string {
  if (score >= 70) {
    return dimensionDescriptions[dimension].high;
  }

  if (score >= 45) {
    return dimensionDescriptions[dimension].medium;
  }

  return dimensionDescriptions[dimension].low;
}

/**
 * Calculate all four Ikigai dimensions.
 */
export function calculateIkigai(
  responses: Record<number, number>
): IkigaiResult {
  const passion = calculateDimensionScore(responses, "passion");
  const mission = calculateDimensionScore(responses, "mission");
  const profession = calculateDimensionScore(responses, "profession");
  const vocation = calculateDimensionScore(responses, "vocation");

  const scores = [passion, mission, profession, vocation];

  const overallScore = Math.round(
    scores.reduce((sum, score) => sum + score, 0) / scores.length
  );

  const lowest = Math.min(...scores);
  const highest = Math.max(...scores);
  const spread = highest - lowest;

  let balance: IkigaiResult["balance"];

  if (overallScore >= 70 && spread <= 20) {
    balance = "Highly Balanced";
  } else if (overallScore >= 55) {
    balance = "Balanced";
  } else {
    balance = "Developing";
  }

  return {
    passion: {
      score: passion,
      label: getScoreLabel(passion),
      description: getDimensionDescription("passion", passion),
    },

    mission: {
      score: mission,
      label: getScoreLabel(mission),
      description: getDimensionDescription("mission", mission),
    },

    profession: {
      score: profession,
      label: getScoreLabel(profession),
      description: getDimensionDescription("profession", profession),
    },

    vocation: {
      score: vocation,
      label: getScoreLabel(vocation),
      description: getDimensionDescription("vocation", vocation),
    },

    overallScore,
    balance,
  };
}

/**
 * Personality scoring.
 *
 * Q13 and Q14 are specifically personality questions.
 * Their five answer choices are mapped to the seven personality
 * archetypes using the meaning of the options already present
 * in questions.ts.
 */
function calculatePersonalityScores(
  responses: Record<number, number>
): Record<PersonalityProfile, number> {
  const scores: Record<PersonalityProfile, number> = {
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

  /*
   * Q13:
   * 1 = research + planning      -> analyzer / builder
   * 2 = hands-on                 -> craftsperson / builder
   * 3 = discuss with others     -> connector / nurturer
   * 4 = break into parts        -> analyzer / builder
   * 5 = unconventional ideas    -> visionary / creator
   */
  const q13Weights: Record<
    number,
    Partial<Record<PersonalityProfile, number>>
  > = {
    1: { analyzer: 10, builder: 6 },
    2: { craftsperson: 10, builder: 6 },
    3: { connector: 10, nurturer: 7 },
    4: { analyzer: 9, builder: 8 },
    5: { visionary: 10, creator: 8 },
  };

  /*
   * Q14:
   * 1 = leader                     -> visionary / builder
   * 2 = innovator                  -> visionary / creator
   * 3 = mediator                   -> connector / nurturer
   * 4 = implementer                -> builder / craftsperson
   * 5 = analyst                    -> analyzer
   */
  const q14Weights: Record<
    number,
    Partial<Record<PersonalityProfile, number>>
  > = {
    1: { visionary: 10, builder: 8 },
    2: { visionary: 9, creator: 10 },
    3: { connector: 10, nurturer: 9 },
    4: { builder: 10, craftsperson: 8 },
    5: { analyzer: 10 },
  };

  if (q13Weights[q13]) {
    Object.entries(q13Weights[q13]).forEach(([profile, score]) => {
      scores[profile as PersonalityProfile] += score ?? 0;
    });
  }

  if (q14Weights[q14]) {
    Object.entries(q14Weights[q14]).forEach(([profile, score]) => {
      scores[profile as PersonalityProfile] += score ?? 0;
    });
  }

  /*
   * Add subtle signals from the other questions.
   * This prevents personality from depending entirely on only
   * two answers while still keeping Q13/Q14 dominant.
   */

  const passion1 = responses[1];
  const passion2 = responses[2];
  const passion3 = responses[3];

  if (passion1 === 1) {
    scores.creator += 4;
    scores.craftsperson += 3;
  }

  if (passion1 === 2) {
    scores.analyzer += 5;
  }

  if (passion1 === 3) {
    scores.connector += 5;
    scores.nurturer += 4;
  }

  if (passion1 === 4) {
    scores.builder += 5;
  }

  if (passion1 === 5) {
    scores.analyzer += 5;
  }

  if (passion2 === 1) {
    scores.creator += 4;
  }

  if (passion2 === 2) {
    scores.analyzer += 4;
    scores.visionary += 3;
  }

  if (passion2 === 3) {
    scores.connector += 4;
    scores.nurturer += 4;
  }

  if (passion2 === 4) {
    scores.craftsperson += 4;
    scores.builder += 4;
  }

  if (passion2 === 5) {
    scores.analyzer += 3;
    scores.visionary += 3;
  }

  if (passion3 === 1) {
    scores.nurturer += 4;
    scores.connector += 3;
  }

  if (passion3 === 2) {
    scores.creator += 5;
  }

  if (passion3 === 3) {
    scores.analyzer += 5;
    scores.visionary += 3;
  }

  if (passion3 === 4) {
    scores.builder += 5;
  }

  if (passion3 === 5) {
    scores.visionary += 4;
    scores.creator += 3;
  }

  return scores;
}

/**
 * Determine the dominant personality profile.
 */
export function determineProfile(
  responses: Record<number, number>
): PersonalityResult {
  const scores = calculatePersonalityScores(responses);

  const profiles = Object.entries(scores) as [
    PersonalityProfile,
    number
  ][];

  profiles.sort((a, b) => b[1] - a[1]);

  const dominantProfile = profiles[0]?.[0] ?? "visionary";

  const profileData: IkigaiProfile = ikigaiProfiles[dominantProfile];

  return {
    profile: dominantProfile,
    title: profileData.title,
    description: profileData.description,
    strengths: profileData.strengths,
    careers: profileData.careers,
    scores,
  };
}

/**
 * Complete assessment result.
 */
export function calculateCompleteAssessment(
  responses: Record<number, number>
) {
  const ikigai = calculateIkigai(responses);
  const personality = determineProfile(responses);

  return {
    ikigai,
    personality,
  };
}

/**
 * Returns the strongest areas within the Ikigai assessment.
 */
export function getTopDimensions(
  responses: Record<number, number>
): Array<{ dimension: IkigaiDimension; score: number }> {
  const dimensions: IkigaiDimension[] = [
    "passion",
    "mission",
    "profession",
    "vocation",
  ];

  return dimensions
    .map((dimension) => ({
      dimension,
      score: calculateDimensionScore(responses, dimension),
    }))
    .sort((a, b) => b.score - a.score);
}