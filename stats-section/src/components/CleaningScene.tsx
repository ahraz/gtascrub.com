'use client'

import { motion } from 'framer-motion'

export function CleaningScene() {
  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full max-w-[500px]"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        {/* Floor */}
        <motion.line
          x1="40" y1="320" x2="360" y2="320"
          stroke="#d4d6d2"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />

        {/* Sparkles */}
        {[
          { x: 280, y: 80, delay: 0.5 },
          { x: 320, y: 140, delay: 0.8 },
          { x: 180, y: 60, delay: 1.1 },
          { x: 340, y: 200, delay: 0.6 },
          { x: 250, y: 120, delay: 1.3 },
        ].map((s, i) => (
          <motion.g key={i} opacity={0}>
            <motion.path
              d="M0,-8 L2,-2 L8,0 L2,2 L0,8 L-2,2 L-8,0 L-2,-2 Z"
              fill="#9fe870"
              x={s.x}
              y={s.y}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
              transition={{
                duration: 2,
                delay: s.delay,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: 'easeInOut',
              }}
            />
          </motion.g>
        ))}

        {/* Mop handle - angled */}
        <motion.line
          x1="120" y1="180" x2="200" y2="310"
          stroke="#a0a09e"
          strokeWidth="5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />

        {/* Mop head */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <rect x="185" y="305" width="30" height="18" rx="4" fill="#9fe870" />
          {/* Mop strings */}
          {[0, 1, 2, 3, 4].map((j) => (
            <motion.line
              key={j}
              x1={188 + j * 6}
              y1={323}
              x2={188 + j * 6}
              y2={340 + Math.sin(j * 1.5) * 4}
              stroke="#9fe870"
              strokeWidth="2.5"
              strokeLinecap="round"
              animate={{
                y2: [340 + Math.sin(j * 1.5) * 4, 340 + Math.sin(j * 1.5 + 1) * 8, 340 + Math.sin(j * 1.5) * 4],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: j * 0.1,
              }}
            />
          ))}
        </motion.g>

        {/* Mopping motion arc (sweep trail) */}
        <motion.path
          d="M200,310 Q260,280 290,300"
          stroke="#9fe870"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity={0.3}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 0], opacity: [0, 0.4, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        {/* Janitor body */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Head */}
          <circle cx="105" cy="150" r="22" fill="#e8ebe6" stroke="#d4d6d2" strokeWidth="2" />
          {/* Body */}
          <rect x="88" y="172" width="34" height="45" rx="6" fill="#2ead4b" />
          {/* Arms */}
          <motion.line
            x1="88" y1="185" x2="120" y2="180"
            stroke="#e8ebe6"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Legs */}
          <rect x="92" y="217" width="10" height="55" rx="4" fill="#454745" />
          <rect x="108" y="217" width="10" height="55" rx="4" fill="#454745" />
          {/* Cap */}
          <path d="M83,142 Q105,122 127,142" fill="#0e0f0c" stroke="#0e0f0c" strokeWidth="2" />
          <rect x="83" y="138" width="44" height="6" rx="3" fill="#0e0f0c" />
        </motion.g>

        {/* Bucket */}
        <motion.g
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <rect x="60" y="260" width="45" height="50" rx="6" fill="#e8ebe6" stroke="#d4d6d2" strokeWidth="2" />
          <path d="M65,260 Q82,250 100,260" stroke="#d4d6d2" strokeWidth="2" fill="none" />
          {/* Water */}
          <rect x="67" y="275" width="31" height="28" rx="4" fill="#38c8ff" opacity={0.4} />
          {/* Handle */}
          <path d="M72,260 Q82,240 93,260" stroke="#a0a09e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </motion.g>

        {/* Clean shine effect */}
        <motion.rect
          x="40" y="325" width="320" height="6"
          rx="3"
          fill="#9fe870"
          opacity={0}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: [0, 0.15, 0] }}
          transition={{
            duration: 2.5,
            delay: 1.5,
            repeat: Infinity,
            repeatDelay: 2,
            ease: 'easeInOut',
          }}
          style={{ originX: '50%' }}
        />
      </svg>
    </div>
  )
}
