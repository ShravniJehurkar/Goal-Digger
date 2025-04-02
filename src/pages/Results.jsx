import { useLocation } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const answers = location.state?.answers || {};

  const analyzeAnswers = (answers) => {
    // This is a simple analysis - in a real app, you'd want more sophisticated analysis
    const recommendations = {
      careers: [
        "Software Developer",
        "UX Designer",
        "Data Analyst",
        "Project Manager",
        "Content Creator"
      ],
      strengths: [
        "Problem Solving",
        "Communication",
        "Creativity",
        "Leadership"
      ],
      areas: [
        "Technology",
        "Design",
        "Business",
        "Education"
      ]
    };

    return recommendations;
  };

  const recommendations = analyzeAnswers(answers);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Career Path Analysis</h1>
        <p className="text-xl text-gray-600">
          Based on your responses, here's what we've discovered about your career potential
        </p>
      </div>

      {/* Ikigai Diagram */}
      <div className="grid grid-cols-2 gap-4 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-indigo-600">What You Love</h3>
          <ul className="space-y-2">
            {answers.passion?.map((item, index) => (
              <li key={index} className="text-gray-700">• {item}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-indigo-600">What You're Good At</h3>
          <ul className="space-y-2">
            {answers.skills?.map((item, index) => (
              <li key={index} className="text-gray-700">• {item}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-indigo-600">What the World Needs</h3>
          <ul className="space-y-2">
            {answers.mission?.map((item, index) => (
              <li key={index} className="text-gray-700">• {item}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-indigo-600">What You Can Be Paid For</h3>
          <ul className="space-y-2">
            {answers.profession?.map((item, index) => (
              <li key={index} className="text-gray-700">• {item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Recommended Career Paths</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {recommendations.careers.map((career, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">{career}</h3>
              <p className="text-gray-600 text-sm">
                Based on your interests and skills, this career path could be a great fit for you.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="mt-12 bg-indigo-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
        <div className="space-y-4">
          <p className="text-gray-700">
            1. Research the recommended career paths in detail
          </p>
          <p className="text-gray-700">
            2. Connect with professionals in your areas of interest
          </p>
          <p className="text-gray-700">
            3. Consider taking courses or certifications in your chosen field
          </p>
          <p className="text-gray-700">
            4. Create a career development plan with specific goals
          </p>
        </div>
      </div>
    </div>
  );
};

export default Results; 