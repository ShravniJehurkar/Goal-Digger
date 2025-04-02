import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { careerData } from '../data/careerData';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers, userType } = location.state || {};
  const [userProfile, setUserProfile] = useState(null);
  const [uniqueInterests, setUniqueInterests] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('userProfile'));
    setUserProfile(profile);

    if (!answers || !userType) {
      navigate('/');
    }
  }, [navigate, answers, userType]);

  const analyzeText = (text) => {
    // Convert text to lowercase for better matching
    const lowerText = text.toLowerCase();
    
    // Define career-related keywords and their associated fields
    const keywords = {
      technology: [
        'computer', 'coding', 'programming', 'software', 'digital', 'tech', 'app', 'website',
        'internet', 'mobile', 'data', 'code', 'developer', 'programmer', 'computer science',
        'artificial intelligence', 'ai', 'machine learning', 'web', 'cybersecurity'
      ],
      science: [
        'science', 'research', 'experiment', 'lab', 'chemistry', 'physics', 'biology',
        'scientist', 'scientific', 'laboratory', 'microscope', 'test tube', 'molecule',
        'atom', 'space', 'universe', 'planet', 'star', 'galaxy', 'environmental'
      ],
      arts: [
        'art', 'design', 'creative', 'drawing', 'painting', 'music', 'dance', 'theater',
        'artist', 'creative', 'designer', 'photography', 'film', 'video', 'animation',
        'graphic', 'illustration', 'sculpture', 'craft', 'handmade', 'visual'
      ],
      business: [
        'business', 'management', 'marketing', 'sales', 'finance', 'money', 'entrepreneur',
        'company', 'office', 'corporate', 'startup', 'investment', 'stock', 'market',
        'advertising', 'brand', 'product', 'service', 'customer', 'client'
      ],
      healthcare: [
        'doctor', 'nurse', 'health', 'medical', 'hospital', 'patient', 'care',
        'medicine', 'clinic', 'treatment', 'disease', 'surgery', 'therapy',
        'wellness', 'fitness', 'nutrition', 'diet', 'exercise', 'mental health'
      ],
      education: [
        'teaching', 'teacher', 'school', 'education', 'learning', 'student',
        'classroom', 'study', 'academic', 'university', 'college', 'professor',
        'tutor', 'mentor', 'coach', 'training', 'course', 'lesson', 'knowledge'
      ],
      engineering: [
        'engineer', 'building', 'construction', 'mechanical', 'electrical', 'civil',
        'architecture', 'design', 'structure', 'bridge', 'road', 'machine',
        'robot', 'automation', 'system', 'project', 'technical', 'innovation'
      ],
      social: [
        'help', 'people', 'community', 'social', 'welfare', 'charity', 'support',
        'volunteer', 'nonprofit', 'humanitarian', 'aid', 'assistance', 'care',
        'service', 'outreach', 'program', 'initiative', 'development', 'change'
      ],
      sports: [
        'sports', 'athlete', 'fitness', 'coach', 'game', 'play', 'team',
        'exercise', 'training', 'competition', 'tournament', 'championship',
        'player', 'coach', 'gym', 'workout', 'physical', 'athletic', 'performance'
      ],
      law: [
        'law', 'legal', 'lawyer', 'court', 'justice', 'rights', 'police',
        'attorney', 'judge', 'case', 'trial', 'criminal', 'civil', 'constitution',
        'regulation', 'policy', 'government', 'public', 'advocate', 'defense'
      ],
      media: [
        'media', 'journalism', 'news', 'reporter', 'writer', 'content', 'story',
        'article', 'blog', 'magazine', 'newspaper', 'broadcast', 'radio', 'tv',
        'social media', 'communication', 'public relations', 'press', 'interview'
      ],
      agriculture: [
        'farm', 'agriculture', 'crop', 'plant', 'garden', 'food', 'farmer',
        'agricultural', 'rural', 'land', 'soil', 'harvest', 'sustainable',
        'organic', 'green', 'environment', 'conservation', 'forestry', 'horticulture'
      ]
    };

    // Find matching fields based on keywords
    const matches = Object.entries(keywords).filter(([field, words]) =>
      words.some(word => lowerText.includes(word))
    );

    // Add context-based analysis
    const contextWords = {
      technology: ['computer', 'digital', 'online', 'internet'],
      science: ['research', 'study', 'experiment'],
      arts: ['creative', 'design', 'artistic'],
      business: ['business', 'company', 'market'],
      healthcare: ['health', 'medical', 'patient'],
      education: ['teaching', 'learning', 'education'],
      engineering: ['build', 'design', 'technical'],
      social: ['help', 'people', 'community'],
      sports: ['sports', 'fitness', 'athletic'],
      law: ['law', 'legal', 'justice'],
      media: ['media', 'news', 'communication'],
      agriculture: ['farm', 'agriculture', 'food']
    };

    // Check for context words
    const contextMatches = Object.entries(contextWords).filter(([field, words]) =>
      words.some(word => lowerText.includes(word))
    );

    // Combine both keyword and context matches
    const allMatches = [...new Set([...matches.map(([field]) => field), ...contextMatches.map(([field]) => field)])];

    return allMatches;
  };

  const generateCareerRecommendations = (interests) => {
    const recommendations = new Set();
    interests.forEach(field => {
      if (careerData[field]) {
        careerData[field].forEach(career => recommendations.add(career));
      }
    });
    return Array.from(recommendations);
  };

  useEffect(() => {
    if (answers) {
      const interests = answers.map(answer => analyzeText(answer)).flat();
      const unique = [...new Set(interests)];
      setUniqueInterests(unique);
      setRecommendations(generateCareerRecommendations(unique));
    }
  }, [answers]);

  const generateIkigaiResults = () => {
    if (!answers) return null;

    return (
      <div className="space-y-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Your Interests</h3>
          <div className="flex flex-wrap gap-2">
            {uniqueInterests.map((interest, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Recommended Career Paths</h3>
          <div className="grid grid-cols-1 gap-6">
            {recommendations.map((career, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">{career.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{career.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Required Skills:</h5>
                    <p className="text-gray-600 dark:text-gray-400">{career.skills}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Education:</h5>
                    <p className="text-gray-600 dark:text-gray-400">{career.education}</p>
                  </div>
                </div>
                <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-4">
                  Based on your interests in {uniqueInterests.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const generateFunResults = () => {
    // ... similar to generateIkigaiResults but with age-appropriate content ...
  };

  if (!userProfile || !answers || !userType) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Your Career Guidance Results
      </h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          Welcome back, {userProfile.name}! 👋
        </h2>
        <p className="text-gray-600">
          Here are your personalized results based on your responses.
        </p>
      </div>

      {userType === 'ikigai' ? generateIkigaiResults() : generateFunResults()}

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

export default Results; 