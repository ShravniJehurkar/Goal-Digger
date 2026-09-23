import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { createSakuraLeaves } from '@/lib/utils';

interface SakuraBackgroundProps {
  count?: number;
}

// Define the sakura petal SVG
const SakuraPetal = ({ style }: { style: React.CSSProperties }) => (
  <motion.svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    style={style}
  >
    <path
      d="M12 2c2 4 5 7 9 9-4 2-7 5-9 9-2-4-5-7-9-9 4-2 7-5 9-9z"
      fill="#FBCFE8"
      opacity="0.8"
    />
  </motion.svg>
);

export default function SakuraBackground({ count = 50 }: SakuraBackgroundProps) {
  const [sakuraLeaves, setSakuraLeaves] = useState<Array<{
    id: number;
    left: string;
    size: number;
    delay: number;
    duration: number;
    rotation: number;
  }>>([]);

  useEffect(() => {
    setSakuraLeaves(createSakuraLeaves(count));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {sakuraLeaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          initial={{ top: "-5%", left: leaf.left, rotate: 0 }}
          animate={{ 
            top: "105%", 
            rotate: leaf.rotation,
            x: [0, 15, -15, 10, -10, 5, -5, 0],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "linear",
            x: {
              duration: leaf.duration / 2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
          }}
          style={{ position: "absolute" }}
        >
          <SakuraPetal 
            style={{ 
              width: `${leaf.size}px`, 
              height: `${leaf.size}px` 
            }} 
          />
        </motion.div>
      ))}
    </div>
  );
}