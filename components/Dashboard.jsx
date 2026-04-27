import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Flame, Zap, Droplets, TrendingUp, Fire } from 'lucide-react'

function BurnedInput({ value, onChange }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(String(value))

  const commit = () => {
    const n = Math.max(0, parseInt(draft) || 0)
    onChange(n)
    setEditing(false)
  }

  return (
    <motion.div
      className="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-4 cursor-pointer"
      onClick={() => { if (!editing) { setDraft(String(value)); setEditing(true) } }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Flame size={16} className="text-orange-400" />
        <span className="text-white/70 text-xs font-medium">Heute verbrannt</span>
        <span className="text-white/40 text-xs ml-auto">aus Health App</span>
      </div>
      {editing ? (
        <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
          <input
            autoFocus
            type="number"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') setEditing(false) }}
            onBlur={commit}
            className="w-24 bg-transparent text-orange-400 font-bold text-2xl border-b border-orange-400 focus:outline-none"
          />
          <span className="text-white/60 text-sm">kcal</span>
        </div>
      ) : (
        <p className="text-orange-400 font-display font-bold text-2xl">
          {value > 0 ? `+${value}` : '0'} <span className="text-sm font-normal text-white/60">kcal</span>
        </p>
      )}
      {value > 0 && (
        <p className="text-white/50 text-xs mt-1">werden deinem Tagesziel hinzugerechnet</p>
      )}
      {value === 0 && (
        <p className="text-white/40 text-xs mt-1">Tippen zum Eintragen</p>
      )}
    </motion.div>
  )
}

export default function Dashboard({ completedExercises, caloriesConsumed, caloriesGoal, proteinConsumed, proteinGoal, burnedCalories, onBurnedChange }) {
  const exerciseProgress = (completedExercises / 3) * 100
  const calorieProgress = (caloriesConsumed / caloriesGoal) * 100
  const proteinProgress = (proteinConsumed / proteinGoal) * 100

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  }
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
      <motion.div variants={item} className="pt-2">
        <p className="text-white/70 text-sm font-medium">Guten Morgen,</p>
        <h1 className="text-white text-3xl font-display font-bold">Champion</h1>
      </motion.div>

      {/* Training Progress */}
      <motion.div variants={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-brand-600" />
            <span className="text-white font-medium text-sm">Training heute</span>
          </div>
          <span className="text-white/60 text-xs">{completedExercises}/3</span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${exerciseProgress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-brand-600 to-brand-700"
          />
        </div>
      </motion.div>

      {/* Burned Calories */}
      <motion.div variants={item}>
        <BurnedInput value={burnedCalories} onChange={onBurnedChange} />
      </motion.div>

      {/* Kalorien & Protein */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div variants={item} className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center gap-2 mb-2">
            <Droplets size={16} className="text-brand-600" />
            <span className="text-white/70 text-xs font-medium">Kalorien</span>
          </div>
          <p className="text-white font-display font-bold text-lg">
            {caloriesConsumed}<span className="text-white/40 text-xs">/{caloriesGoal}</span>
          </p>
          <p className="text-white/60 text-xs mt-0.5">kcal</p>
          <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
            <motion.div
              animate={{ width: `${Math.min(calorieProgress, 100)}%` }}
              className="h-full bg-brand-600"
            />
          </div>
        </motion.div>

        <motion.div variants={item} className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-brand-success" />
            <span className="text-white/70 text-xs font-medium">Protein</span>
          </div>
          <p className="text-white font-display font-bold text-lg">
            {proteinConsumed}g<span className="text-white/40 text-xs">/{proteinGoal}g</span>
          </p>
          <p className="text-white/60 text-xs mt-0.5">{Math.round(proteinProgress)}%</p>
          <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
            <motion.div
              animate={{ width: `${Math.min(proteinProgress, 100)}%` }}
              className="h-full bg-brand-success"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
