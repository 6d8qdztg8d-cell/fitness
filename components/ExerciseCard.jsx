import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Check, Minus, Plus } from 'lucide-react'

export default function ExerciseCard({ exercise, onComplete, isCompleted, onRepsChange }) {
  const lastTap = useRef(0)

  const handleTap = () => {
    if (isCompleted) return
    const now = Date.now()
    if (now - lastTap.current < 400) {
      onComplete()
    }
    lastTap.current = now
  }

  const handleRep = (e, delta) => {
    e.stopPropagation()
    onRepsChange(delta)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onClick={handleTap}
      className="relative cursor-pointer"
    >
      <div
        className={`relative h-36 rounded-2xl overflow-hidden transition-all duration-300 ${
          isCompleted
            ? 'bg-brand-success border-2 border-brand-success'
            : 'bg-white/5 border border-white/10 hover:border-white/20'
        }`}
      >
        {!isCompleted && (
          <motion.div
            animate={{ x: ['0%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
          />
        )}

        <div className="absolute inset-0 flex items-center justify-between px-5 z-10">
          {isCompleted ? (
            <div className="flex items-center gap-3 w-full justify-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 150 }}>
                <Check size={36} className="text-white" strokeWidth={3} />
              </motion.div>
              <p className="text-white font-bold text-xl">Erledigt!</p>
            </div>
          ) : (
            <>
              <div className="flex-1">
                <p className="text-white font-bold text-lg">{exercise.name}</p>
                <p className="text-white/50 text-xs mt-0.5">2x tippen zum Abhaken</p>
              </div>

              <div className="flex items-center gap-3">
                <motion.button
                  onClickCapture={(e) => handleRep(e, -1)}
                  whileTap={{ scale: 0.85 }}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white"
                >
                  <Minus size={16} />
                </motion.button>

                <div className="text-center min-w-[48px]">
                  <span className="text-white font-display font-bold text-2xl">{exercise.reps}</span>
                  {exercise.unit && <span className="text-white/60 text-xs block">{exercise.unit}</span>}
                </div>

                <motion.button
                  onClickCapture={(e) => handleRep(e, 1)}
                  whileTap={{ scale: 0.85 }}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white"
                >
                  <Plus size={16} />
                </motion.button>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}
