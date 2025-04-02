const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About GOAL DIGGER</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Your AI-powered career guidance platform using the Ikigai method
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">What is Ikigai?</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Ikigai is a Japanese concept that means "a reason for being." It's the intersection of what you love, what you're good at, what the world needs, and what you can be paid for. This method helps you find your perfect career path by identifying the sweet spot between these four elements.
        </p>

        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Our Mission</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          At GOAL DIGGER, we're committed to helping individuals discover their true career potential. We combine the wisdom of the Ikigai method with modern technology to provide personalized career guidance that leads to meaningful and fulfilling work.
        </p>

        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">1. Answer Questions</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Complete our interactive questionnaire designed around the Ikigai framework.
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">2. Get Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Receive a detailed analysis of your responses and potential career paths.
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">3. Find Your Path</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Discover career recommendations that align with your Ikigai.
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">4. Take Action</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get actionable steps to pursue your recommended career paths.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 