import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Check, ArrowLeft, ArrowRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { questions } from '@/lib/questions';
import Navbar from '@/components/Navbar';

export default function Questionnaire() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState<Record<number, number>>({});
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  // Get all categories in the right order for steps
  const categories = ["passion", "mission", "vocation", "profession", "personality"];
  const questionCategories = questions.map(q => q.category);
  const currentCategory = currentQuestion.category;
  
  // Calculate which step we're on for each category
  const categorySteps: Record<string, { total: number, current: number }> = {};
  categories.forEach(category => {
    const categoryQuestions = questions.filter(q => q.category === category);
    const answered = categoryQuestions.filter(q => userResponses[q.id] !== undefined).length;
    categorySteps[category] = {
      total: categoryQuestions.length,
      current: answered
    };
  });
  
  // Check which categories are complete
  const getCategoryStatus = (category: string) => {
    if (category === currentCategory) return "active";
    const categoryQuestions = questions.filter(q => q.category === category);
    const categoryQuestionsIds = categoryQuestions.map(q => q.id);
    const answeredAll = categoryQuestionsIds.every(id => userResponses[id] !== undefined);
    if (answeredAll) return "completed";
    const answeredAny = categoryQuestionsIds.some(id => userResponses[id] !== undefined);
    if (answeredAny) return "in-progress";
    return "inactive";
  };
  
  useEffect(() => {
    // Check if current question is already answered
    if (userResponses[currentQuestion.id] !== undefined) {
      setIsAnswerSelected(true);
    } else {
      setIsAnswerSelected(false);
    }
  }, [currentQuestionIndex, userResponses, currentQuestion.id]);

  const handleOptionSelect = (optionIndex: string) => {
    setUserResponses(prev => ({
      ...prev,
      [currentQuestion.id]: parseInt(optionIndex)
    }));
    setIsAnswerSelected(true);
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };
  
  const handleSubmit = async () => {
    // Check if all questions are answered
    if (Object.keys(userResponses).length < questions.length) {
      // Find unanswered questions
      const unanswered = questions.filter(q => userResponses[q.id] === undefined);
      
      // Get unique categories without using Set
      const unansweredCategories: string[] = [];
      unanswered.forEach(q => {
        if (!unansweredCategories.includes(q.category)) {
          unansweredCategories.push(q.category);
        }
      });
      
      toast({
        title: "Please answer all questions",
        description: `You still have unanswered questions in these categories: ${unansweredCategories.join(", ")}.`,
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Converting responses to expected format
      const responses: Record<string, number> = {};
      Object.entries(userResponses).forEach(([key, value]) => {
        responses[key] = value;
      });
      
      // You would submit to your backend here
      const res = await apiRequest('POST', '/api/ikigai-profile', { responses });
      const data = await res.json();
      
      // Store results in sessionStorage for the results page
      sessionStorage.setItem('ikigaiResults', JSON.stringify(data));
      // Also store user responses for potential ML processing
      sessionStorage.setItem('userResponses', JSON.stringify(responses));
      
      // Redirect to results page
      setLocation('/results');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your answers. Please try again.",
        variant: "destructive"
      });
      console.error("Error submitting responses:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get a user-friendly category name
  const getCategoryName = (category: string) => {
    const names: Record<string, string> = {
      passion: "Passion",
      mission: "Mission",
      vocation: "Vocation", 
      profession: "Profession",
      personality: "Personality"
    };
    return names[category] || category;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <section className="flex-grow py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Section Title */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Answer these questions thoughtfully to discover where your ikigai lies.
              </h2>
            </div>
            
            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex justify-between items-center">
                {categories.map((category, index) => {
                  const status = getCategoryStatus(category);
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div className={`ikigai-step ${
                        status === "active" ? "active" :
                        status === "completed" ? "completed" : "inactive"
                      }`}>
                        {status === "completed" ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <span className="text-sm mt-2 text-gray-600">
                        {getCategoryName(category)}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="h-1 bg-gray-200 mt-6 rounded-full">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            
            {/* Question Container */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white shadow-md rounded-xl p-8 mb-8"
              >
                <div className="mb-8">
                  <div className="mb-6">
                    <h3 className="font-bold text-xl md:text-2xl text-gray-800 mb-2">
                      {currentQuestion.question}
                    </h3>
                    {currentQuestion.subtext && (
                      <p className="text-gray-600 mb-6">{currentQuestion.subtext}</p>
                    )}
                  </div>
                  
                  <Select
                    value={userResponses[currentQuestion.id]?.toString()}
                    onValueChange={handleOptionSelect}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {currentQuestion.options.map((option, index) => (
                          <SelectItem key={index} value={index.toString()}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-2 rounded-full font-medium"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!isAnswerSelected || isSubmitting}
                className="rounded-full px-7 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white hover:from-violet-700 hover:to-fuchsia-600 shadow-md hover:shadow-lg transition-all duration-300"
              >
                {currentQuestionIndex === questions.length - 1 ? (
                  isSubmitting ? 'Processing...' : 'See Results'
                ) : (
                  <>Next <ArrowRight className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
