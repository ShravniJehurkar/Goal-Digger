import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Questionnaire = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    passion: [],
    skills: [],
    mission: [],
    profession: []
  });

  const questions = {
    passion: [
      "What activities make you lose track of time?",
      "What topics do you love reading or learning about?",
      "What would you do for free if you had all the time in the world?",
      "What makes you feel most alive and energized?"
    ],
    skills: [
      "What are your natural talents or abilities?",
      "What skills have others complimented you on?",
      "What tasks do you find easy that others struggle with?",
      "What technical or soft skills have you developed over time?"
    ],
    mission: [
      "What problems in the world do you feel most passionate about solving?",
      "What causes or movements do you feel strongly about?",
      "How would you like to make a difference in the world?",
      "What social or environmental issues concern you the most?"
    ],
    profession: [
      "What careers have you considered in the past?",
      "What industries or fields interest you?",
      "What salary range would you be comfortable with?",
      "What work environment do you prefer?"
    ]
  };

  const handleAnswer = (answer) => {
    const category = Object.keys(questions)[currentStep];
    setAnswers(prev => ({
      ...prev,
      [category]: [...prev[category], answer]
    }));

    if (currentStep < Object.keys(questions).length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Navigate to results page with answers
      navigate('/results', { state: { answers } });
    }
  };

  const currentCategory = Object.keys(questions)[currentStep];
  const progress = ((currentStep + 1) / Object.keys(questions).length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-indigo-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Step {currentStep + 1} of {Object.keys(questions).length}
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">
          {currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)} Questions
        </h2>
        
        <div className="space-y-6">
          {questions[currentCategory].map((question, index) => (
            <div key={index} className="space-y-4">
              <p className="text-lg text-gray-700">{question}</p>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows="3"
                placeholder="Type your answer here..."
                onChange={(e) => handleAnswer(e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="px-4 py-2 text-gray-600 hover:text-indigo-600"
            >
              Previous
            </button>
          )}
          <button
            onClick={() => navigate('/results', { state: { answers } })}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {currentStep === Object.keys(questions).length - 1 ? 'View Results' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire; 