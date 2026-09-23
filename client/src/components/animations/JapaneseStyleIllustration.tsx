import { motion } from 'framer-motion';

interface JapaneseStyleIllustrationProps {
  type: 'mountain' | 'sakura' | 'wave' | 'torii' | 'koi';
  width?: number;
  height?: number;
  className?: string;
}

export default function JapaneseStyleIllustration({ 
  type, 
  width = 300, 
  height = 200,
  className = ""
}: JapaneseStyleIllustrationProps) {
  const containerStyle = {
    width: `${width}px`,
    height: `${height}px`,
    position: 'relative' as const,
    overflow: 'hidden' as const
  };

  // Animation variants
  const floatAnimation = {
    initial: { y: 0 },
    animate: { 
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut'
      }
    }
  };

  const blossomAnimation = {
    initial: { opacity: 0, scale: 0 },
    animate: (i: number) => ({
      opacity: [0, 1, 1, 0],
      scale: [0, 1, 1, 0],
      transition: {
        duration: 4,
        delay: i * 0.3,
        repeat: Infinity,
        repeatDelay: 3
      }
    })
  };

  const waveAnimation = {
    initial: { pathLength: 0, pathOffset: 0 },
    animate: {
      pathLength: 1,
      pathOffset: [0, 1],
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" },
        pathOffset: { 
          repeat: Infinity,
          duration: 5,
          ease: "linear"
        }
      }
    }
  };

  // Render different illustrations based on type
  const renderIllustration = () => {
    switch (type) {
      case 'mountain':
        return (
          <div style={containerStyle} className={className}>
            <svg width="100%" height="100%" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Sky background */}
              <rect width="300" height="200" fill="#E8F4FC" />
              
              {/* Sun */}
              <motion.circle 
                cx="240" 
                cy="40" 
                r="25" 
                fill="#FF6B35"
                initial={{ opacity: 0.7 }}
                animate={{ 
                  opacity: [0.7, 1, 0.7],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              />
              
              {/* Far mountain */}
              <motion.path 
                d="M0 120L60 70L120 110L180 60L240 100L300 80L300 200L0 200L0 120Z" 
                fill="#8BB8D7"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              />
              
              {/* Near mountain */}
              <motion.path 
                d="M0 140L50 90L100 120L150 80L200 130L250 100L300 130L300 200L0 200L0 140Z" 
                fill="#2E6B8E"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              />
              
              {/* Snow cap */}
              <motion.path 
                d="M150 80L160 90L170 85L180 95L190 90L200 100L190 110L180 105L170 115L160 110L150 80Z" 
                fill="white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
              />
              
              {/* Clouds */}
              <motion.g
                {...floatAnimation}
              >
                <ellipse cx="60" cy="50" rx="25" ry="15" fill="white" opacity="0.8" />
                <ellipse cx="90" cy="45" rx="20" ry="12" fill="white" opacity="0.8" />
                <ellipse cx="30" cy="55" rx="15" ry="10" fill="white" opacity="0.8" />
              </motion.g>
            </svg>
          </div>
        );
      
      case 'sakura':
        // Generate blossom positions
        const blossoms = Array.from({ length: 20 }, (_, i) => ({
          id: i,
          x: Math.random() * 280 + 10,
          y: Math.random() * 180 + 10,
          size: Math.random() * 5 + 5
        }));
        
        return (
          <div style={containerStyle} className={className}>
            <svg width="100%" height="100%" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Sky background */}
              <rect width="300" height="200" fill="#F8F4FF" />
              
              {/* Tree branch */}
              <motion.path 
                d="M50 150C80 130 100 80 150 60C200 40 250 60 280 30" 
                stroke="#8E5F4E"
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              
              {/* Blossoms */}
              {blossoms.map(blossom => (
                <motion.g key={blossom.id} custom={blossom.id} variants={blossomAnimation} initial="initial" animate="animate">
                  <circle cx={blossom.x} cy={blossom.y} r={blossom.size} fill="#FFD6E0" />
                  <circle cx={blossom.x} cy={blossom.y} r={blossom.size/2} fill="#FFBCD1" />
                </motion.g>
              ))}
            </svg>
          </div>
        );
      
      case 'wave':
        return (
          <div style={containerStyle} className={className}>
            <svg width="100%" height="100%" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Background */}
              <rect width="300" height="200" fill="#EFF8FF" />
              
              {/* Waves */}
              <motion.path
                d="M0 120C25 100 50 140 75 120C100 100 125 140 150 120C175 100 200 140 225 120C250 100 275 140 300 120L300 200L0 200L0 120Z"
                fill="#40A6D1"
                variants={waveAnimation}
                initial="initial"
                animate="animate"
              />
              
              <motion.path
                d="M0 140C25 120 50 160 75 140C100 120 125 160 150 140C175 120 200 160 225 140C250 120 275 160 300 140L300 200L0 200L0 140Z"
                fill="#2E6B8E"
                variants={waveAnimation}
                initial="initial"
                animate="animate"
                transition={{
                  pathOffset: { 
                    repeat: Infinity,
                    duration: 7,
                    ease: "linear"
                  }
                }}
              />
              
              <motion.path
                d="M0 160C25 140 50 180 75 160C100 140 125 180 150 160C175 140 200 180 225 160C250 140 275 180 300 160L300 200L0 200L0 160Z"
                fill="#173F5F"
                variants={waveAnimation}
                initial="initial"
                animate="animate"
                transition={{
                  pathOffset: { 
                    repeat: Infinity,
                    duration: 9,
                    ease: "linear"
                  }
                }}
              />
            </svg>
          </div>
        );
      
      case 'torii':
        return (
          <div style={containerStyle} className={className}>
            <svg width="100%" height="100%" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Sky background */}
              <rect width="300" height="200" fill="#FFE8D6" />
              
              {/* Sun */}
              <motion.circle 
                cx="150" 
                cy="50" 
                r="30" 
                fill="#FF9C5B"
                initial={{ opacity: 0.8 }}
                animate={{ 
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              />
              
              {/* Torii gate */}
              <motion.g
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
              >
                {/* Left pillar */}
                <rect x="80" y="80" width="15" height="100" fill="#D03B29" />
                
                {/* Right pillar */}
                <rect x="205" y="80" width="15" height="100" fill="#D03B29" />
                
                {/* Top crossbeams */}
                <path d="M70 80H230V95H70V80Z" fill="#D03B29" />
                <path d="M60 70H240V80H60V70Z" fill="#D03B29" />
                
                {/* Curved elements */}
                <path d="M60 70C60 65 65 60 70 60H230C235 60 240 65 240 70H60Z" fill="#D03B29" />
              </motion.g>
              
              {/* Water */}
              <motion.path
                d="M0 180C25 175 50 185 75 180C100 175 125 185 150 180C175 175 200 185 225 180C250 175 275 185 300 180L300 200L0 200L0 180Z"
                fill="#40A6D1"
                variants={waveAnimation}
                initial="initial"
                animate="animate"
              />
            </svg>
          </div>
        );
      
      case 'koi':
        return (
          <div style={containerStyle} className={className}>
            <svg width="100%" height="100%" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Pond background */}
              <rect width="300" height="200" fill="#E0F7FA" />
              
              {/* Lily pads */}
              <ellipse cx="50" cy="40" rx="30" ry="20" fill="#2E7D32" opacity="0.7" />
              <ellipse cx="230" cy="70" rx="25" ry="15" fill="#2E7D32" opacity="0.7" />
              <ellipse cx="80" cy="150" rx="20" ry="12" fill="#2E7D32" opacity="0.7" />
              
              {/* Koi fish */}
              <motion.g
                initial={{ x: -50 }}
                animate={{ 
                  x: 350,
                  y: [0, 20, -10, 0],
                  rotateY: 0
                }}
                transition={{ 
                  x: { duration: 10, repeat: Infinity, repeatType: 'loop' },
                  y: { duration: 5, repeat: Infinity, repeatType: 'mirror' }
                }}
              >
                {/* Fish body */}
                <path d="M0,100 C20,80 40,70 60,80 C80,90 90,110 60,120 C30,130 -10,110 0,100 Z" fill="#FF5252" />
                
                {/* Fish tail */}
                <path d="M-10,100 C-30,80 -40,110 -10,100 Z" fill="#FF5252" />
                
                {/* Fish patterns */}
                <path d="M20,90 C30,85 40,85 50,90 C40,95 30,95 20,90 Z" fill="white" />
                
                {/* Fish eye */}
                <circle cx="55" cy="90" r="5" fill="black" />
              </motion.g>
              
              {/* Second koi fish */}
              <motion.g
                initial={{ x: 350 }}
                animate={{ 
                  x: -50,
                  y: [0, -15, 10, 0],
                  rotateY: 180
                }}
                style={{ originX: 0.5 }}
                transition={{ 
                  x: { duration: 12, repeat: Infinity, repeatType: 'loop' },
                  y: { duration: 6, repeat: Infinity, repeatType: 'mirror' }
                }}
              >
                {/* Fish body */}
                <path d="M0,180 C20,160 40,150 60,160 C80,170 90,190 60,200 C30,210 -10,190 0,180 Z" fill="white" />
                
                {/* Fish tail */}
                <path d="M-10,180 C-30,160 -40,190 -10,180 Z" fill="white" />
                
                {/* Fish patterns */}
                <path d="M20,170 C30,165 40,165 50,170 C40,175 30,175 20,170 Z" fill="#FF5252" />
                <path d="M30,190 C40,185 50,185 60,190 C50,195 40,195 30,190 Z" fill="#FF5252" />
                
                {/* Fish eye */}
                <circle cx="55" cy="170" r="5" fill="black" />
              </motion.g>
              
              {/* Water ripples */}
              {[1, 2, 3].map(i => (
                <motion.circle
                  key={i}
                  cx={150}
                  cy={100}
                  r={10}
                  stroke="#80DEEA"
                  strokeWidth="2"
                  fill="transparent"
                  initial={{ r: 5, opacity: 0.8 }}
                  animate={{ 
                    r: 50, 
                    opacity: 0 
                  }}
                  transition={{ 
                    duration: 4,
                    delay: i * 2,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                />
              ))}
            </svg>
          </div>
        );

      default:
        return <div>Illustration not found</div>;
    }
  };

  return renderIllustration();
}