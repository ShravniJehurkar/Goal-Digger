export interface Question {
  id: number;
  category: 'passion' | 'mission' | 'profession' | 'vocation' | 'personality';
  question: string;
  subtext?: string;
  options: string[];
}

export const questions: Question[] = [
  {
    id: 1,
    category: "passion",
    question: "What activities make you lose track of time?",
    subtext: "Think about when you've been so engrossed in something that hours passed without you noticing.",
    options: [
      "Creating or building things",
      "Solving complex problems",
      "Helping and connecting with others",
      "Organizing and planning",
      "Researching and analyzing information"
    ]
  },
  {
    id: 2,
    category: "passion",
    question: "Which topics do you find yourself constantly researching or learning about?",
    subtext: "Consider what subjects naturally draw your curiosity even when there's no external motivation.",
    options: [
      "Artistic techniques, design principles, or creative expression",
      "Technology, science, or mathematical concepts",
      "Psychology, social issues, or interpersonal dynamics",
      "How things work, DIY projects, or practical skills",
      "History, philosophy, or theoretical concepts"
    ]
  },
  {
    id: 3,
    category: "passion",
    question: "What would you do even if you weren't paid for it?",
    subtext: "Consider activities that bring you joy regardless of financial reward.",
    options: [
      "Teaching or mentoring others",
      "Creating art or content",
      "Solving challenging problems",
      "Organizing events or systems",
      "Exploring new places or ideas"
    ]
  },
  {
    id: 4,
    category: "mission",
    question: "What issues in society do you feel most drawn to address?",
    subtext: "Think about problems in the world that personally resonate with you.",
    options: [
      "Education and knowledge access",
      "Health and wellbeing",
      "Environmental sustainability",
      "Technology and innovation",
      "Social inequality and community wellbeing"
    ]
  },
  {
    id: 5,
    category: "mission",
    question: "How would you prefer to make a positive impact in the world?",
    subtext: "Consider your preferred approach to creating meaningful change.",
    options: [
      "By creating solutions to important problems",
      "By supporting and helping individuals directly",
      "By influencing systems and policies",
      "By inspiring and educating others",
      "By building communities and connections"
    ]
  },
  {
    id: 6,
    category: "mission",
    question: "What kind of legacy would you like to leave?",
    subtext: "Think about how you'd like to be remembered for your contributions.",
    options: [
      "Improving people's quality of life",
      "Advancing knowledge or technology",
      "Building lasting institutions",
      "Inspiring others through creativity",
      "Protecting natural resources or cultural heritage"
    ]
  },
  {
    id: 7,
    category: "profession",
    question: "What skills have others consistently praised you for?",
    subtext: "Consider feedback you've received about your natural talents.",
    options: [
      "Communication and interpersonal skills",
      "Analytical and problem-solving abilities",
      "Creative and artistic talents",
      "Organization and planning capabilities",
      "Leadership and decision-making abilities"
    ]
  },
  {
    id: 8,
    category: "profession",
    question: "What tasks do you find yourself naturally good at with minimal effort?",
    subtext: "Think about activities where you achieve good results without struggle.",
    options: [
      "Understanding complex information quickly",
      "Making things visually appealing",
      "Leading or motivating groups",
      "Finding efficient processes and systems",
      "Physical coordination, spatial awareness, or manual dexterity"
    ]
  },
  {
    id: 9,
    category: "profession",
    question: "What skills have you developed the most over your lifetime?",
    subtext: "Consider abilities you've consciously worked to improve.",
    options: [
      "Technical and digital skills",
      "Creative expression and design",
      "Interpersonal and communication abilities",
      "Strategy and planning capabilities",
      "Practical problem-solving and adaptation"
    ]
  },
  {
    id: 10,
    category: "vocation",
    question: "What skills or expertise do you have that people would pay for?",
    subtext: "Consider your marketable abilities in today's economy.",
    options: [
      "Technical or digital skills",
      "Creative or design talents",
      "Management or organization abilities",
      "Communication or teaching capabilities",
      "Specialized knowledge in a specific field"
    ]
  },
  {
    id: 11,
    category: "vocation",
    question: "Which industry do you believe offers the best financial opportunities aligned with your interests?",
    subtext: "Think about where your passions might intersect with economic value.",
    options: [
      "Technology and digital",
      "Healthcare and wellness",
      "Business and finance",
      "Creative and media industries",
      "Education and knowledge services"
    ]
  },
  {
    id: 12,
    category: "vocation",
    question: "What type of work environment would you thrive in financially and personally?",
    subtext: "Consider settings where you could both succeed and feel fulfilled.",
    options: [
      "Corporate with clear advancement paths",
      "Entrepreneurial with growth potential",
      "Non-profit with meaningful impact",
      "Creative with recognition opportunities",
      "Academic or research-oriented"
    ]
  },
  {
    id: 13,
    category: "personality",
    question: "How do you prefer to approach new challenges?",
    subtext: "Consider your natural response when facing unfamiliar problems.",
    options: [
      "Research thoroughly and plan a structured approach",
      "Dive in and learn through hands-on experience",
      "Discuss with others to gain diverse perspectives",
      "Break it down into smaller, manageable parts",
      "Look for creative, unconventional solutions"
    ]
  },
  {
    id: 14,
    category: "personality",
    question: "In a team setting, what role do you naturally take on?",
    subtext: "Think about how you typically contribute to group efforts.",
    options: [
      "Leader who guides direction and decisions",
      "Innovator who generates new ideas",
      "Mediator who ensures everyone is heard",
      "Implementer who gets things done efficiently",
      "Analyst who evaluates options critically"
    ]
  }
];

export interface IkigaiProfile {
  id: string;
  title: string;
  description: string;
  strengths: string[];
  careers: string[];
}

export const ikigaiProfiles: Record<string, IkigaiProfile> = {
  "visionary": {
    id: "visionary",
    title: "Visionary Innovator",
    description: "You possess a rare ability to see possibilities where others see problems. With your forward-thinking mindset and creative approach to challenges, you're naturally drawn to pioneering new paths rather than following established ones.",
    strengths: ["Big-picture thinking", "Creative problem-solving", "Future-oriented perspective"],
    careers: ["Entrepreneur", "Product Innovator", "Strategic Consultant"]
  },
  "craftsperson": {
    id: "craftsperson",
    title: "Practical Craftsperson",
    description: "You're hands-on, detail-oriented, and prefer work with tangible results. You have natural dexterity and spatial awareness that makes you effective at building and creating.",
    strengths: ["Attention to detail", "Technical precision", "Creating high-quality work"],
    careers: ["Skilled Tradesperson", "Technical Specialist", "Quality Assurance Professional"]
  },
  "connector": {
    id: "connector",
    title: "Community Connector",
    description: "You excel at bringing people together and building meaningful relationships. Your natural empathy and social intelligence allow you to understand diverse perspectives and find common ground.",
    strengths: ["Building relationships", "Effective communication", "Creating inclusive environments"],
    careers: ["Community Organizer", "HR Development", "Relationship Manager"]
  },
  "analyzer": {
    id: "analyzer",
    title: "Strategic Analyzer",
    description: "You have an exceptional ability to process complex information and identify patterns others miss. Your logical and methodical approach helps solve intricate problems with precision.",
    strengths: ["Critical thinking", "Data interpretation", "Systematic problem-solving"],
    careers: ["Data Scientist", "Strategic Planner", "Research Specialist"]
  },
  "nurturer": {
    id: "nurturer",
    title: "Compassionate Nurturer",
    description: "You have a deep drive to support others' growth and wellbeing. Your patience and genuine care for people makes you a trusted advisor and source of comfort.",
    strengths: ["Empathy and understanding", "Supportive guidance", "Creating safe environments"],
    careers: ["Counselor", "Healthcare Professional", "Community Support Specialist"]
  },
  "creator": {
    id: "creator",
    title: "Artistic Creator",
    description: "You see the world through a distinctive lens and have the skills to express that vision. Your creative insights translate into meaningful works that resonate with others.",
    strengths: ["Original thinking", "Aesthetic sensibility", "Emotional expression"],
    careers: ["Designer", "Content Creator", "Brand Developer"]
  },
  "builder": {
    id: "builder",
    title: "Systems Builder",
    description: "You excel at creating order from chaos and building sustainable systems. Your organizational talents help transform abstract ideas into functional realities.",
    strengths: ["Process optimization", "Structure creation", "Long-term planning"],
    careers: ["Project Manager", "Operations Specialist", "Systems Architect"]
  }
};

export const careerAnalysisQuestions = [
  {
    id: "interests",
    question: "Your Interests and Hobbies",
    subtext: "What activities do you enjoy doing in your free time?",
    placeholder: "E.g. coding, design, business strategy, science experiments, writing, fitness, traveling..."
  },
  {
    id: "education",
    question: "Your Educational Background",
    subtext: "What is your highest level of education and field of study?",
    placeholder: "E.g. Bachelor's in Computer Science, self-taught in graphic design, industry certifications..."
  },
  {
    id: "experience",
    question: "Your Work Experience",
    subtext: "What types of roles have you had in the past?",
    placeholder: "E.g. 2 years in retail, internship in marketing, volunteer teaching experience..."
  },
  {
    id: "goals",
    question: "Your Career Goals",
    subtext: "Where do you see yourself professionally in 5 years?",
    placeholder: "E.g. managing a team, starting my own business, becoming an expert in my field..."
  }
];
