// Career dataset for recommendation engine

export interface Career {
  title: string;
  description: string;
  category: string;
  growthRate: number; // percentage
  skills: string[];
  educationLevel: string;
}

export const careerData: Career[] = [
  // Software & Tech
  {
    title: "Software Developer",
    description: "Designs, codes, and maintains applications and systems software.",
    category: "Software & Technology",
    growthRate: 22,
    skills: ["Programming", "Problem Solving", "Logical Thinking", "Attention to Detail", "Communication"],
    educationLevel: "Bachelor's Degree"
  },
  {
    title: "AI Engineer",
    description: "Develops artificial intelligence models and integrates them into applications.",
    category: "Software & Technology",
    growthRate: 36,
    skills: ["Machine Learning", "Programming", "Mathematics", "Data Analysis", "Critical Thinking"],
    educationLevel: "Master's Degree"
  },
  {
    title: "Cybersecurity Analyst",
    description: "Protects systems and data from cyber threats, breaches, and malware.",
    category: "Software & Technology",
    growthRate: 32,
    skills: ["Network Security", "Risk Assessment", "Penetration Testing", "Security Protocols", "Problem Solving"],
    educationLevel: "Bachelor's Degree"
  },
  {
    title: "Cloud Architect",
    description: "Designs scalable and reliable cloud-based infrastructure and services.",
    category: "Software & Technology",
    growthRate: 25,
    skills: ["Cloud Platforms", "Network Architecture", "System Design", "DevOps", "Security"],
    educationLevel: "Bachelor's Degree"
  },
  {
    title: "Game Developer",
    description: "Creates interactive games across various platforms using game engines and graphics tools.",
    category: "Software & Technology",
    growthRate: 18,
    skills: ["Game Engines", "Graphics Programming", "3D Modeling", "Storytelling", "Creative Problem Solving"],
    educationLevel: "Bachelor's Degree"
  },
  {
    title: "Blockchain Developer",
    description: "Builds decentralized applications and secure systems using blockchain technology.",
    category: "Software & Technology",
    growthRate: 30,
    skills: ["Blockchain Protocols", "Smart Contracts", "Cryptography", "Security", "Programming"],
    educationLevel: "Bachelor's Degree"
  },
  
  // Engineering
  {
    title: "Robotics Engineer",
    description: "Designs, builds, and maintains robotic systems for industrial and personal use.",
    category: "Engineering",
    growthRate: 19,
    skills: ["Mechanical Design", "Electronics", "Programming", "Problem Solving", "Creativity"],
    educationLevel: "Bachelor's Degree"
  },
  {
    title: "Aerospace Engineer",
    description: "Designs aircraft, spacecraft, and related systems and equipment.",
    category: "Engineering",
    growthRate: 8,
    skills: ["Aerodynamics", "Materials Science", "CAD Software", "Mathematical Modeling", "Testing"],
    educationLevel: "Bachelor's Degree"
  },
  {
    title: "Biomedical Engineer",
    description: "Develops medical systems and devices that improve patient care.",
    category: "Engineering",
    growthRate: 5,
    skills: ["Medical Knowledge", "Electronics", "Materials Science", "Design", "Problem Solving"],
    educationLevel: "Bachelor's Degree"
  },
  {
    title: "Smart Materials Engineer",
    description: "Works on materials that change properties in response to external stimuli.",
    category: "Engineering",
    growthRate: 15,
    skills: ["Materials Science", "Chemistry", "Product Development", "Testing", "Analysis"],
    educationLevel: "Master's Degree"
  },
  
  // Healthcare
  {
    title: "AI-Assisted Surgeon",
    description: "Uses robotic systems and AI tools to perform or support complex surgical procedures.",
    category: "Healthcare",
    growthRate: 14,
    skills: ["Surgical Skills", "Technology Integration", "Precision", "Decision Making", "Patient Care"],
    educationLevel: "Medical Degree"
  },
  {
    title: "Digital Health Data Scientist",
    description: "Analyzes medical data to improve healthcare outcomes and operations.",
    category: "Healthcare",
    growthRate: 28,
    skills: ["Data Analysis", "Healthcare Knowledge", "Programming", "Statistics", "Communication"],
    educationLevel: "Master's Degree"
  },
  {
    title: "Smart Prosthetics Researcher",
    description: "Develops AI-driven prosthetic limbs that respond to user intent.",
    category: "Healthcare",
    growthRate: 23,
    skills: ["Biomechanics", "Electronics", "Human Anatomy", "Programming", "Empathy"],
    educationLevel: "Ph.D."
  },
  {
    title: "Precision Medicine Specialist",
    description: "Designs treatments tailored to individual genetic profiles.",
    category: "Healthcare",
    growthRate: 21,
    skills: ["Genetics", "Pharmacology", "Data Analysis", "Research", "Patient Care"],
    educationLevel: "Medical Degree"
  },
  
  // Business & Finance
  {
    title: "Financial Analyst",
    description: "Evaluates investment opportunities and provides financial guidance.",
    category: "Business & Finance",
    growthRate: 6,
    skills: ["Financial Modeling", "Market Analysis", "Risk Assessment", "Communication", "Attention to Detail"],
    educationLevel: "Bachelor's Degree"
  },
  {
    title: "Business Intelligence Analyst",
    description: "Analyzes business data to support decision-making and strategy.",
    category: "Business & Finance",
    growthRate: 11,
    skills: ["Data Analysis", "Visualization", "SQL", "Industry Knowledge", "Communication"],
    educationLevel: "Bachelor's Degree"
  },
  {
    title: "Cryptocurrency Analyst",
    description: "Evaluates digital currencies and blockchain technologies for investment potential.",
    category: "Business & Finance",
    growthRate: 32,
    skills: ["Blockchain Understanding", "Market Analysis", "Risk Assessment", "Programming", "Financial Knowledge"],
    educationLevel: "Bachelor's Degree"
  },
  {
    title: "FinTech Developer",
    description: "Creates technological solutions for financial services and banking.",
    category: "Business & Finance",
    growthRate: 26,
    skills: ["Programming", "Financial Systems", "Security", "API Integration", "User Experience"],
    educationLevel: "Bachelor's Degree"
  },
  
  // Creative & Design
  {
    title: "UX/UI Designer",
    description: "Designs user-friendly interfaces and experiences for digital products.",
    category: "Creative & Design",
    growthRate: 13,
    skills: ["User Research", "Visual Design", "Prototyping", "User Testing", "Communication"],
    educationLevel: "Bachelor's Degree"
  },
  {
    title: "Digital Content Creator",
    description: "Develops and produces content for digital platforms.",
    category: "Creative & Design",
    growthRate: 16,
    skills: ["Content Creation", "Social Media", "Marketing", "Photography/Video", "Communication"],
    educationLevel: "Bachelor's Degree"
  },
  {
    title: "VR Experience Designer",
    description: "Creates immersive virtual reality environments and interactions.",
    category: "Creative & Design",
    growthRate: 27,
    skills: ["3D Modeling", "Animation", "Programming", "Spatial Design", "User Experience"],
    educationLevel: "Bachelor's Degree"
  },
  {
    title: "AI Art Specialist",
    description: "Creates or curates artwork generated by artificial intelligence systems.",
    category: "Creative & Design",
    growthRate: 24,
    skills: ["AI Tools", "Artistic Sensibility", "Programming", "Creativity", "Curation"],
    educationLevel: "Bachelor's Degree"
  },
  
  // Science & Research
  {
    title: "Data Scientist",
    description: "Extracts insights from complex data using statistical analysis and machine learning.",
    category: "Science & Research",
    growthRate: 31,
    skills: ["Statistics", "Programming", "Machine Learning", "Data Visualization", "Problem Solving"],
    educationLevel: "Master's Degree"
  },
  {
    title: "Climate Change Researcher",
    description: "Analyzes global warming trends and develops strategies to mitigate them.",
    category: "Science & Research",
    growthRate: 9,
    skills: ["Environmental Science", "Data Analysis", "Research Methods", "Communication", "Critical Thinking"],
    educationLevel: "Ph.D."
  },
  {
    title: "Quantum Computing Scientist",
    description: "Develops quantum algorithms and software for next-generation computing systems.",
    category: "Science & Research",
    growthRate: 20,
    skills: ["Quantum Physics", "Mathematics", "Programming", "Problem Solving", "Research"],
    educationLevel: "Ph.D."
  },
  {
    title: "AI Ethics & Policy Expert",
    description: "Creates ethical frameworks and policy guidelines for responsible AI development.",
    category: "Science & Research",
    growthRate: 18,
    skills: ["Ethics", "Policy Analysis", "AI Understanding", "Communication", "Critical Thinking"],
    educationLevel: "Master's Degree"
  },
  
  // Emerging Fields
  {
    title: "Metaverse Developer",
    description: "Builds virtual environments and experiences in immersive 3D digital worlds.",
    category: "Emerging Fields",
    growthRate: 35,
    skills: ["3D Development", "Programming", "User Experience", "Networking", "Creative Design"],
    educationLevel: "Bachelor's Degree"
  },
  {
    title: "Brain-Computer Interface Developer",
    description: "Creates systems allowing direct communication between brains and computers.",
    category: "Emerging Fields",
    growthRate: 15,
    skills: ["Neuroscience", "Programming", "Electrical Engineering", "Ethics", "Prototyping"],
    educationLevel: "Ph.D."
  },
  {
    title: "Space Tourism Guide",
    description: "Trains and accompanies tourists on commercial space travel experiences.",
    category: "Emerging Fields",
    growthRate: 14,
    skills: ["Aerospace Knowledge", "Safety Procedures", "Customer Service", "Communication", "Stress Management"],
    educationLevel: "Bachelor's Degree"
  },
  {
    title: "Virtual Avatar Designer",
    description: "Builds realistic digital representations of people for games, meetings, or the metaverse.",
    category: "Emerging Fields",
    growthRate: 22,
    skills: ["3D Modeling", "Animation", "Character Design", "Rigging", "Facial Capture"],
    educationLevel: "Bachelor's Degree"
  }
];

// Function to find careers based on user preferences and profile
export function findMatchingCareers(
  userProfile: {
    ikigaiProfile: string;
    skills: string[];
    interests: string[];
    educationLevel: string;
    ageRange: string;
    futureGoals: string[];
  },
  count: number = 5
): Career[] {
  // Simple algorithm for demonstration purposes
  // In a real application, this would use more sophisticated methods
  
  // Convert everything to lowercase for easier matching
  const skills = userProfile.skills.map(s => s.toLowerCase());
  const interests = userProfile.interests.map(i => i.toLowerCase());
  const futureGoals = userProfile.futureGoals.map(g => g.toLowerCase());
  
  // Score each career
  const scoredCareers = careerData.map(career => {
    let score = 0;
    
    // Match based on ikigai profile
    const profileMatchMap: Record<string, string[]> = {
      "visionary": ["Emerging Fields", "Business & Finance", "Creative & Design"],
      "craftsperson": ["Engineering", "Creative & Design", "Software & Technology"],
      "connector": ["Business & Finance", "Healthcare", "Creative & Design"],
      "analyzer": ["Science & Research", "Software & Technology", "Business & Finance"],
      "nurturer": ["Healthcare", "Science & Research"],
      "creator": ["Creative & Design", "Software & Technology", "Emerging Fields"],
      "builder": ["Engineering", "Software & Technology", "Emerging Fields"]
    };
    
    // Score based on profile match
    if (profileMatchMap[userProfile.ikigaiProfile]?.includes(career.category)) {
      score += 30;
    }
    
    // Score based on skills match
    const careerSkillsLower = career.skills.map(s => s.toLowerCase());
    skills.forEach(skill => {
      if (careerSkillsLower.some(s => s.includes(skill) || skill.includes(s))) {
        score += 15;
      }
    });
    
    // Score based on interests
    interests.forEach(interest => {
      // Check if interest appears in description or title
      if (
        career.description.toLowerCase().includes(interest) || 
        career.title.toLowerCase().includes(interest) ||
        career.category.toLowerCase().includes(interest)
      ) {
        score += 20;
      }
    });
    
    // Score based on growth rate (higher growth = higher score)
    score += Math.min(career.growthRate * 0.7, 15);
    
    // Score based on education match
    const educationLevels = ["High School", "Associate's Degree", "Bachelor's Degree", "Master's Degree", "Ph.D.", "Medical Degree"];
    const userEducationIndex = educationLevels.indexOf(userProfile.educationLevel);
    const careerEducationIndex = educationLevels.indexOf(career.educationLevel);
    
    if (userEducationIndex >= careerEducationIndex) {
      score += 10;
    }
    
    // Score based on future goals
    futureGoals.forEach(goal => {
      if (
        career.description.toLowerCase().includes(goal) || 
        career.title.toLowerCase().includes(goal)
      ) {
        score += 20;
      }
    });
    
    return { career, score };
  });
  
  // Sort by score (highest first) and return top matches
  return scoredCareers
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(item => ({
      ...item.career,
      matchScore: Math.min(Math.round(item.score), 100) // Normalize score to max 100
    })) as Career[];
}

// Function to recommend skills based on careers
export function recommendSkills(matchedCareers: Career[]): { skill: string, relevance: number }[] {
  // Extract all skills from matched careers
  const allSkills = matchedCareers.flatMap(career => career.skills);
  
  // Count occurrences of each skill
  const skillCount: Record<string, number> = {};
  allSkills.forEach(skill => {
    skillCount[skill] = (skillCount[skill] || 0) + 1;
  });
  
  // Convert to array and sort by count
  const skillRelevance = Object.entries(skillCount)
    .map(([skill, count]) => ({
      skill,
      relevance: Math.round((count / matchedCareers.length) * 100)
    }))
    .sort((a, b) => b.relevance - a.relevance);
  
  return skillRelevance;
}

// Function to generate development paths for skills
export function getSkillDevelopmentPath(skill: string): string {
  const developmentPaths = [
    "Online courses, hands-on projects, certifications in relevant technologies",
    "Targeted courses, practical experience, and mentorship from industry professionals",
    "Specialized training programs, internships, and continuous practice",
    "Academic education, research projects, and industry collaborations",
    "Bootcamps, self-directed learning, and participation in relevant communities",
    "Professional certification, workshops, and practical application"
  ];
  
  // For demonstration, we're returning a random path
  // In a real application, this would be more targeted
  return developmentPaths[Math.floor(Math.random() * developmentPaths.length)];
}

// Function to generate career-specific insights
export function generateCareerInsights(
  ikigaiProfile: string, 
  matchedCareers: Career[]
): string[] {
  const profileInsights: Record<string, string[]> = {
    "visionary": [
      "Your innovative mindset makes you well-suited for pioneering new technologies and business models.",
      "Consider exploring industries that value creative problem-solving and strategic thinking.",
      "Your ability to see future possibilities gives you an edge in rapidly evolving fields."
    ],
    "craftsperson": [
      "Your practical craftsperson tendencies make you particularly well-suited for roles that require creative problem-solving and innovation.",
      "Consider exploring industries that combine your passion for learning new concepts or researching interesting topics with your natural strengths in physical coordination, spatial awareness, or manual dexterity.",
      "Your attention to detail and technical precision would be valuable in specialized technical roles."
    ],
    "connector": [
      "Your natural people skills and empathy make you excellent at roles requiring relationship building.",
      "Consider careers that allow you to use your communication talents to bridge different perspectives.",
      "Your ability to create inclusive environments would be valuable in community-focused roles."
    ],
    "analyzer": [
      "Your analytical mindset is perfect for roles requiring deep investigation and systematic problem-solving.",
      "Consider careers that challenge you to identify patterns and derive insights from complex information.",
      "Your methodical approach would be particularly valuable in data-driven fields."
    ],
    "nurturer": [
      "Your supportive nature makes you ideal for roles focused on helping others grow and develop.",
      "Consider careers that allow you to create safe, supportive environments for people in need.",
      "Your natural empathy would be highly valued in healthcare and educational settings."
    ],
    "creator": [
      "Your creative vision allows you to excel in roles requiring original thinking and expression.",
      "Consider careers that give you freedom to translate your unique perspective into meaningful work.",
      "Your aesthetic sensibility would be particularly valuable in design and content creation."
    ],
    "builder": [
      "Your organizational talents make you excellent at creating systems and structures.",
      "Consider careers that allow you to transform abstract ideas into functional realities.",
      "Your ability to create order from chaos would be valuable in operational and management roles."
    ]
  };
  
  // Get insights based on profile
  const baseInsights = profileInsights[ikigaiProfile] || [
    "Your unique combination of skills and interests positions you well for specialized roles.",
    "Consider exploring industries that value your particular strengths and work preferences.",
    "Your personal attributes would be valuable in roles requiring your specific talents."
  ];
  
  // Add career-specific insight
  const categories = matchedCareers.map(c => c.category);
  const mostCommonCategory = categories.sort((a,b) => 
    categories.filter(v => v === a).length - categories.filter(v => v === b).length
  ).pop();
  
  const categoryInsight = `The ${mostCommonCategory} field appears to be a strong match for your profile, with multiple potential career paths aligned to your strengths.`;
  
  return [...baseInsights, categoryInsight];
}