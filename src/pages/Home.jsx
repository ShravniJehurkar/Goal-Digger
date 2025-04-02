import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('userProfile'));
    setUserProfile(profile);
  }, []);

  const handleStartQuestionnaire = () => {
    if (!userProfile) {
      navigate('/profile');
    } else {
      if (userProfile.grade >= 11) {
        navigate('/ikigai-questionnaire');
      } else if (userProfile.grade >= 6) {
        navigate('/fun-questionnaire');
      } else {
        alert('Sorry, this questionnaire is designed for students in 6th grade and above.');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to GOAL DIGGER 🎯
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Discover your career path through personalized guidance
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">
            For Students in 6th-10th Grade
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Take our fun and interactive questionnaire to explore your interests and discover potential career paths that match your personality and aspirations.
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center text-gray-700 dark:text-gray-200">
              <span className="text-green-500 mr-2">✓</span>
              Interactive questions about your interests
            </li>
            <li className="flex items-center text-gray-700 dark:text-gray-200">
              <span className="text-green-500 mr-2">✓</span>
              Personality-based career suggestions
            </li>
            <li className="flex items-center text-gray-700 dark:text-gray-200">
              <span className="text-green-500 mr-2">✓</span>
              Fun and engaging experience
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">
            For Students in 11th Grade and Above
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Experience our comprehensive Ikigai-based questionnaire to find your perfect career path by exploring your passions, skills, mission, and profession.
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center text-gray-700 dark:text-gray-200">
              <span className="text-green-500 mr-2">✓</span>
              Deep self-reflection exercises
            </li>
            <li className="flex items-center text-gray-700 dark:text-gray-200">
              <span className="text-green-500 mr-2">✓</span>
              Detailed career analysis
            </li>
            <li className="flex items-center text-gray-700 dark:text-gray-200">
              <span className="text-green-500 mr-2">✓</span>
              Personalized recommendations
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleStartQuestionnaire}
          className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-lg font-semibold"
        >
          {userProfile ? 'Continue Your Journey' : 'Start Your Journey'}
        </button>
      </div>
    </div>
  );
};

export default Home; 