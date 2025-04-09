import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FunQuestionnaire = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    interests: [],
    personality: [],
    activities: [],
    future: []
  });
  const [currentAnswers, setCurrentAnswers] = useState(['', '', '', '']);
  const [wordCounts, setWordCounts] = useState([0, 0, 0, 0]);

  const questions = {
    interests: [
      "What subjects do you enjoy the most in school?",
      "What hobbies do you like to do in your free time?",
      "What kind of books or movies do you like?",
      "What would you like to learn more about?"
    ],
    personality: [
      "How would you describe yourself?",
      "What kind of people do you like to spend time with?",
      "What makes you feel most comfortable?",
      "How do you handle new situations?"
    ],
    activities: [
      "What activities do you enjoy doing with others?",
      "What kind of games or sports do you like?",
      "What creative activities do you enjoy?",
      "What would you like to try someday?"
    ],
    future: [
      "What kind of job would you like to have when you grow up?",
      "What places would you like to visit?",
      "What skills would you like to learn?",
      "What would make you feel successful?"
    ]
  };

  useEffect(() => {
    // Check if user profile exists and grade is appropriate
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (!userProfile || userProfile.grade < 6 || userProfile.grade > 9) {
      navigate('/');
    }
  }, [navigate]);

  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const handleAnswerChange = (index, value) => {
    const wordCount = countWords(value);
    if (wordCount <= 50) {
      setCurrentAnswers(prev => {
        const newAnswers = [...prev];
        newAnswers[index] = value;
        return newAnswers;
      });
      setWordCounts(prev => {
        const newCounts = [...prev];
        newCounts[index] = wordCount;
        return newCounts;
      });
    }
  };

  const handleNext = () => {
    const category = Object.keys(questions)[currentStep];
    const updatedAnswers = {
      ...answers,
      [category]: currentAnswers
    };
    
    console.log('Saving answers:', updatedAnswers);
    setAnswers(updatedAnswers);

    if (currentStep < Object.keys(questions).length - 1) {
      setCurrentStep(prev => prev + 1);
      setCurrentAnswers(['', '', '', '']);
      setWordCounts([0, 0, 0, 0]);
    } else {
      // Save answers to localStorage before navigation
      localStorage.setItem('questionnaireAnswers', JSON.stringify(updatedAnswers));
      localStorage.setItem('userType', 'fun');
      console.log('Final answers saved:', updatedAnswers);
      navigate('/results');
    }
  };

  const currentCategory = Object.keys(questions)[currentStep];
  const progress = ((currentStep + 1) / Object.keys(questions).length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
          <div
            className="h-2 bg-indigo-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          Step {currentStep + 1} of {Object.keys(questions).length}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Let's Discover Your Interests! 🌟
        </h2>
        
        <div className="space-y-6">
          {questions[currentCategory].map((question, index) => (
            <div key={index} className="space-y-4">
              <p className="text-lg text-gray-700 dark:text-gray-200">{question}</p>
              <div className="relative">
                <textarea
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows="3"
                  placeholder="Type your answer here... (Maximum 50 words)"
                  placeholderClassName="text-gray-500 dark:text-gray-400"
                  value={currentAnswers[index]}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                />
                <div className="absolute bottom-2 right-2 text-sm text-gray-500 dark:text-gray-400">
                  {wordCounts[index]}/50 words
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Previous
            </button>
          )}
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {currentStep === Object.keys(questions).length - 1 ? 'See Your Results' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FunQuestionnaire; 