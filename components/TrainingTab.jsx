import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import ExerciseCard from './ExerciseCard'

const INITIAL_EXERCISES = [
  { id: 1, name: 'Situps', reps: 35, unit: null },
  { id: 2, name: 'Liegestütze', reps: 20, unit: null },
  { id: 3, name: 'Plank', reps: 60, unit: 'Sek' },
]

const TODAY = new Date().toDateString()

export default function TrainingTab({ onExerciseComplete, onCompletedChange }) {
  const [exercises, setExercises] = useState(INITIAL_EXERCISES)
  const [completed, setCompleted] = useState(new Set())
  const isFirstRender = useRef(true)

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('training_data') || '{}')
      if (stored.exercises) setExercises(stored.exercises)
      if (stored.date === TODAY && stored.completedIds) {
        setCompleted(new Set(stored.completedIds))
      }
    } catch {}
  }, [])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    try {
      localStorage.setItem('training_data', JSON.stringify({
        date: TODAY,
        completedIds: [...completed],
        exercises,
      }))
    } catch {}
    if (onCompletedChange) onCompletedChange(completed.size)
  }, [completed, exercises])

  const handleCompleteExercise = (id) => {
    if (completed.has(id)) return
    setCompleted(prev => new Set(prev).add(id))
    onExerciseComplete()
  }

  const handleRepsChange = (id, delta) => {
    setExercises(prev => prev.map(ex =>
      ex.id === id ? { ...ex, reps: Math.max(1, ex.reps + delta) } : ex
    ))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-2xl font-display font-bold">Training</h2>
          <p className="text-white/60 text-sm">Heute: {completed.size}/{exercises.length} erledigt</p>
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-brand-600/20 to-brand-700/20 flex items-center justify-center"
        >
          <span className="text-brand-600 font-bold">{completed.size}/{exercises.length}</span>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onComplete={() => handleCompleteExercise(exercise.id)}
            isCompleted={completed.has(exercise.id)}
            onRepsChange={(delta) => handleRepsChange(exercise.id, delta)}
          />
        ))}
      </div>

      {completed.size === exercises.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl backdrop-blur-md border border-brand-success/50 bg-brand-success/10 p-4 text-center"
        >
          <p className="text-brand-success font-bold text-lg">🎉 Großartig!</p>
          <p className="text-white/80 text-sm mt-1">Alle Übungen erledigt. Bis morgen!</p>
        </motion.div>
      )}
    </div>
  )
}
