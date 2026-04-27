import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Calendar, Target } from 'lucide-react'

export default function ProgressTab() {
  const stats = [
    { label: 'Diese Woche', value: 18, unit: 'Übungen', trend: '+20%' },
    { label: 'Gesamtstreak', value: 7, unit: 'Tage', trend: 'aktiv' },
    { label: 'Gewicht', value: 82.5, unit: 'kg', trend: '-1.5kg' },
    { label: 'Durchschnitt', value: 2.8, unit: 'Trainings', trend: 'pro Woche' },
  ]

  const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8']
  const progressData = [12, 14, 18, 16, 20, 22, 24, 26]
  const maxValue = Math.max(...progressData)

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-white text-2xl font-display font-bold mb-1">Fortschritt</h2>
        <p className="text-white/60 text-sm">Dein Journey wird bezahlt</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="rounded-2xl backdrop-blur-md border border-white/10 bg-white/5 p-4"
          >
            <p className="text-white/60 text-xs font-medium mb-2">{stat.label}</p>
            <div className="flex items-baseline gap-1 mb-2">
              <p className="text-white font-display font-bold text-2xl">{stat.value}</p>
              <p className="text-white/60 text-sm">{stat.unit}</p>
            </div>
            <p className="text-brand-600 text-xs font-medium">{stat.trend}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl backdrop-blur-md border border-white/10 bg-white/5 p-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={18} className="text-brand-600" />
          <h3 className="text-white font-medium text-sm">Übungen pro Woche</h3>
        </div>

        <div className="flex items-end gap-2 h-40 justify-between">
          {progressData.map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ height: 0 }}
              animate={{ height: `${(value / maxValue) * 100}%` }}
              transition={{ delay: 0.3 + idx * 0.05, duration: 0.8, ease: 'easeOut' }}
              className="flex-1 bg-gradient-to-t from-brand-600 to-brand-700 rounded-t-lg relative group cursor-pointer hover:from-brand-500 hover:to-brand-600 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xs font-bold bg-brand-900/80 px-2 py-1 rounded">
                  {value}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-between mt-4 pt-4 border-t border-white/10">
          {weeks.map((week, idx) => (
            <span key={idx} className="text-white/40 text-xs font-medium">
              {week}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Goals Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl backdrop-blur-md border border-white/10 bg-white/5 p-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <Target size={18} className="text-brand-success" />
          <h3 className="text-white font-medium text-sm">Deine Ziele</h3>
        </div>

        <div className="space-y-3">
          {[
            { label: 'Muskelaufbau', progress: 75 },
            { label: 'Protein Ziel', progress: 88 },
            { label: 'Trainingstage', progress: 65 },
            { label: 'Gewichtsziel', progress: 42 },
          ].map((goal, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + idx * 0.05 }}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-white/80 text-sm font-medium">{goal.label}</span>
                <span className="text-brand-600 text-xs font-bold">{goal.progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${goal.progress}%` }}
                  transition={{ delay: 0.5 + idx * 0.1, duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-brand-600 to-brand-700"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Weekly Report */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl backdrop-blur-md border border-brand-600/30 bg-brand-600/10 p-4"
      >
        <p className="text-white/70 text-xs font-medium mb-2">Wochenbericht</p>
        <p className="text-white font-display font-bold text-lg mb-2">
          Großartiger Start! 🚀
        </p>
        <p className="text-white/60 text-sm">
          Du hast 18 Übungen erledigt und 1.5kg abgenommen. Keep it up!
        </p>
      </motion.div>
    </div>
  )
}
