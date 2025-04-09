import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { careerData } from '../data/careerData';

const Results = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('userProfile'));
    const questionnaireAnswers = JSON.parse(localStorage.getItem('questionnaireAnswers'));
    const type = localStorage.getItem('userType');

    console.log('Profile:', profile);
    console.log('Answers:', questionnaireAnswers);
    console.log('Type:', type);

    if (!profile || !questionnaireAnswers || !type) {
      console.log('Missing data:', { profile, questionnaireAnswers, type });
      navigate('/');
      return;
    }

    setUserProfile(profile);
    setAnswers(questionnaireAnswers);
    setUserType(type);
  }, [navigate]);

  const analyzeText = (text) => {
    console.log('Analyzing text:', text);
    const keywords = {
      technology: ['technology', 'computer', 'software', 'programming', 'digital', 'coding', 'data', 'web', 'app', 'system'],
      science: ['science', 'research', 'laboratory', 'experiment', 'analysis', 'chemistry', 'physics', 'biology', 'scientific'],
      arts: ['art', 'design', 'creative', 'drawing', 'painting', 'music', 'dance', 'theater', 'photography', 'visual'],
      business: ['business', 'management', 'marketing', 'finance', 'entrepreneur', 'startup', 'company', 'enterprise', 'commerce'],
      healthcare: ['health', 'medical', 'healthcare', 'doctor', 'nurse', 'hospital', 'clinic', 'wellness', 'fitness', 'therapy'],
      education: ['education', 'teaching', 'school', 'university', 'learning', 'academic', 'student', 'teacher', 'study'],
      engineering: ['engineering', 'construction', 'mechanical', 'electrical', 'civil', 'architect', 'building', 'infrastructure'],
      social: ['social', 'community', 'help', 'support', 'welfare', 'charity', 'nonprofit', 'volunteer', 'humanitarian'],
      sports: ['sports', 'athlete', 'fitness', 'coach', 'game', 'team', 'sport', 'exercise', 'training', 'competition'],
      law: ['law', 'legal', 'justice', 'court', 'attorney', 'lawyer', 'legislation', 'policy', 'regulation'],
      media: ['media', 'journalism', 'news', 'broadcast', 'communication', 'press', 'reporter', 'content', 'digital media'],
      agriculture: ['agriculture', 'farming', 'crop', 'farm', 'rural', 'food', 'sustainable', 'organic', 'agribusiness']
    };

    const matches = {};
    let totalMatches = 0;

    Object.entries(keywords).forEach(([field, words]) => {
      const count = words.filter(word => 
        text.toLowerCase().includes(word.toLowerCase())
      ).length;
      
      if (count > 0) {
        matches[field] = count;
        totalMatches += count;
      }
    });

    // Convert to percentages
    Object.keys(matches).forEach(field => {
      matches[field] = (matches[field] / totalMatches) * 100;
    });

    console.log('Matches:', matches);
    return matches;
  };

  const generateCareerRecommendations = (matches) => {
    console.log('Generating recommendations from matches:', matches);
    const recommendations = [];
    const sortedFields = Object.entries(matches)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);

    sortedFields.forEach(([field, percentage]) => {
      if (percentage > 0 && careerData[field]) {
        recommendations.push({
          field,
          percentage,
          careers: careerData[field]
        });
      }
    });

    console.log('Generated recommendations:', recommendations);
    return recommendations;
  };

  const generateFunResults = () => {
    if (!answers) {
      console.log('No answers available for fun results');
      return null;
    }

    // Combine all answers into a single text for analysis
    const combinedText = Object.values(answers)
      .flat()
      .join(' ');
    
    console.log('Combined text for fun results:', combinedText);
    return generateCareerRecommendations(analyzeText(combinedText));
  };

  if (!userProfile || !answers || !userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Loading...</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  const recommendations = userType === 'ikigai' 
    ? generateCareerRecommendations(analyzeText(Object.values(answers).flat().join(' ')))
    : generateFunResults();

  console.log('Final recommendations:', recommendations);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Your Career Recommendations
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Based on your {userType === 'ikigai' ? 'Ikigai' : 'Fun'} questionnaire responses
          </p>
        </div>

        {recommendations && recommendations.length > 0 ? (
          <div className="space-y-8">
            {recommendations.map((rec, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition-all hover:scale-105"
              >
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {rec.field.charAt(0).toUpperCase() + rec.field.slice(1)} Careers
                </h2>
                <div className="space-y-4">
                  {rec.careers.map((career, careerIndex) => (
                    <div 
                      key={careerIndex}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    >
                      <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                        {career.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        {career.description}
                      </p>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <p><span className="font-medium">Required Skills:</span> {career.skills}</p>
                        <p><span className="font-medium">Education Level:</span> {career.education}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We couldn't generate specific recommendations based on your responses. 
              Please try providing more detailed answers in the questionnaire.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results; 