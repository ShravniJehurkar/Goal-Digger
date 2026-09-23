import { motion } from 'framer-motion';
import { Career } from '@/lib/career-data';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Award, Book } from 'lucide-react';

interface CareerCardProps {
  career: Career & { matchScore?: number };
  delay?: number;
  color?: 'yellow' | 'blue' | 'green' | 'purple' | 'red';
}

export default function CareerCard({ career, delay = 0, color = 'blue' }: CareerCardProps) {
  // Define color schemes
  const colorSchemes = {
    yellow: {
      accent: 'from-yellow-400 to-amber-500',
      light: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      progressBg: 'bg-yellow-100',
      progressFill: 'bg-yellow-500'
    },
    blue: {
      accent: 'from-blue-400 to-cyan-500',
      light: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      progressBg: 'bg-blue-100',
      progressFill: 'bg-blue-500'
    },
    green: {
      accent: 'from-green-400 to-emerald-500',
      light: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      progressBg: 'bg-green-100',
      progressFill: 'bg-green-500'
    },
    purple: {
      accent: 'from-purple-400 to-indigo-500',
      light: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-800',
      progressBg: 'bg-purple-100',
      progressFill: 'bg-purple-500'
    },
    red: {
      accent: 'from-red-400 to-rose-500',
      light: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      progressBg: 'bg-red-100',
      progressFill: 'bg-red-500'
    }
  };
  
  const scheme = colorSchemes[color];
  
  return (
    <motion.div 
      className={`${scheme.light} border ${scheme.border} rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: delay,
        ease: 'easeOut'
      }}
    >
      <div className={`h-2 bg-gradient-to-r ${scheme.accent}`}></div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-xl text-gray-800">{career.title}</h3>
          {career.matchScore && (
            <div className="bg-gray-100 text-gray-700 text-sm font-semibold rounded-full px-3 py-1">
              {career.matchScore}% Match
            </div>
          )}
        </div>
        
        <p className="text-gray-600 mb-6">{career.description}</p>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full ${scheme.light} flex items-center justify-center mr-3`}>
              <TrendingUp className={`h-4 w-4 ${scheme.text}`} />
            </div>
            <div className="flex-grow">
              <p className="text-sm text-gray-500 mb-1">Industry Growth</p>
              <div className="flex items-center">
                <Progress 
                  className={`h-2 flex-grow ${scheme.progressBg}`} 
                  value={career.growthRate}
                  indicatorClassName={scheme.progressFill}
                />
                <span className="ml-2 text-sm font-medium">{career.growthRate}%</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full ${scheme.light} flex items-center justify-center mr-3`}>
              <Award className={`h-4 w-4 ${scheme.text}`} />
            </div>
            <div className="flex-grow">
              <p className="text-sm text-gray-500 mb-1">Key Skills Required</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {career.skills.slice(0, 3).map((skill, index) => (
                  <span 
                    key={index} 
                    className={`inline-block text-xs px-2 py-1 rounded-full ${scheme.light} ${scheme.text}`}
                  >
                    {skill}
                  </span>
                ))}
                {career.skills.length > 3 && (
                  <span className="text-xs text-gray-500 px-1">{`+${career.skills.length - 3} more`}</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full ${scheme.light} flex items-center justify-center mr-3`}>
              <Book className={`h-4 w-4 ${scheme.text}`} />
            </div>
            <div className="flex-grow">
              <p className="text-sm text-gray-500 mb-1">Education Required</p>
              <p className="text-sm font-medium">{career.educationLevel}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}