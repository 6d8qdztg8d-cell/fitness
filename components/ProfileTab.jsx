import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Settings, Moon, Bell, LogOut, Trophy, Check, X, Target, Zap } from 'lucide-react'

const DEFAULT_PROFILE = { name: 'Champion', weight: 82.5, height: 180, age: 21, activityLevel: 1.55, baseTDEE: 2868, weeklyGainGoal: 0 }

const ACTIVITY_LEVELS = [
  { label: 'Kaum Bewegung', desc: 'Bürojob, kein Sport', factor: 1.2 },
  { label: 'Leicht aktiv', desc: '1–3x/Woche Sport', factor: 1.375 },
  { label: 'Mäßig aktiv', desc: '3–5x/Woche Sport', factor: 1.55 },
  { label: 'Sehr aktiv', desc: '6–7x/Woche Sport', factor: 1.725 },
  { label: 'Extrem aktiv', desc: '2x täglich Training', factor: 1.9 },
]

function calcBMR(weight, height, age) {
  return Math.round((10 * weight) + (6.25 * height) - (5 * age) + 5)
}

function calcTDEE(weight, height, age, factor) {
  return Math.round(calcBMR(weight, height, age) * factor)
}

function bmi(w, h) {
  const m = h / 100
  return (w / (m * m)).toFixed(1)
}

function Toggle({ on, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors ${on ? 'bg-brand-600' : 'bg-white/20'}`}
    >
      <motion.div
        animate={{ x: on ? 24 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-1 w-4 h-4 bg-white rounded-full"
      />
    </div>
  )
}

function EditableField({ label, value, unit, onChange, color = 'text-brand-600', step = 1 }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(String(value))

  const commit = () => {
    const n = parseFloat(draft)
    if (!isNaN(n) && n >= 0) onChange(n)
    setEditing(false)
  }

  return (
    <div
      className="rounded-xl bg-white/5 border border-white/10 p-3 text-center cursor-pointer"
      onClick={() => { if (!editing) { setDraft(String(value)); setEditing(true) } }}
    >
      {editing ? (
        <div className="flex items-center justify-center gap-1" onClick={e => e.stopPropagation()}>
          <input
            autoFocus
            type="number"
            step={step}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') setEditing(false) }}
            onBlur={commit}
            className={`w-16 bg-transparent ${color} font-bold text-lg text-center border-b border-current focus:outline-none`}
          />
          <button onClick={commit} className="text-brand-success"><Check size={14} /></button>
        </div>
      ) : (
        <p className={`${color} font-bold text-xl`}>{value}</p>
      )}
      <p className="text-white/60 text-xs mt-0.5">{unit && <span className="mr-1">{unit}</span>}{label}</p>
    </div>
  )
}

const ACHIEVEMENTS = [
  { icon: '🔥', label: 'Streak Master', desc: '7 Tage hintereinander' },
  { icon: '💪', label: 'Muscle Gain', desc: 'Liegestütze 20+' },
  { icon: '🎯', label: 'Goal Setter', desc: 'Erste Ziel gesetzt' },
  { icon: '⚡', label: 'Speed Demon', desc: '100 Übungen erledigt' },
]

export default function ProfileTab({ onProfileChange }) {
  const [profile, setProfile] = useState(DEFAULT_PROFILE)
  const [darkMode, setDarkMode] = useState(true)
  const [notifications, setNotifications] = useState(true)

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('profile_data') || '{}')
      if (stored.name) setProfile(p => ({ ...p, ...stored }))
      if (stored.darkMode !== undefined) setDarkMode(stored.darkMode)
      if (stored.notifications !== undefined) setNotifications(stored.notifications)
    } catch {}
  }, [])

  const updateProfile = (key, val) => {
    const base = { ...profile, [key]: val }
    // Recalculate TDEE whenever weight, height, age or activity changes
    if (['weight', 'height', 'age', 'activityLevel'].includes(key)) {
      base.baseTDEE = calcTDEE(
        Number(base.weight), Number(base.height),
        Number(base.age), Number(base.activityLevel)
      )
    }
    setProfile(base)
    try { localStorage.setItem('profile_data', JSON.stringify(base)) } catch {}
    if (onProfileChange) onProfileChange(base)
  }

  const currentBmi = bmi(profile.weight, profile.height)
  const bmr = calcBMR(Number(profile.weight), Number(profile.height), Number(profile.age))
  const tdee = Number(profile.baseTDEE) || calcTDEE(profile.weight, profile.height, profile.age, profile.activityLevel)
  const dailySurplus = Math.round((profile.weeklyGainGoal * 7700) / 7)
  const dailyKcalGoal = tdee + dailySurplus

  return (
    <div className="space-y-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-white/10 bg-gradient-to-br from-brand-600/20 to-transparent p-6 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-600 to-brand-700 mx-auto mb-3 flex items-center justify-center">
          <span className="text-2xl font-display font-bold text-white">
            {profile.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <h2 className="text-white text-2xl font-display font-bold">{profile.name}</h2>
        <p className="text-white/60 text-sm mt-1">Level 12 • 3,450 XP</p>
        <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '65%' }}
            transition={{ delay: 0.3, duration: 1 }}
            className="h-full bg-gradient-to-r from-brand-600 to-brand-700"
          />
        </div>
        <p className="text-white/50 text-xs mt-2">2,925 / 4,500 XP zum nächsten Level</p>
      </motion.div>

      {/* Body Stats */}
      <div className="grid grid-cols-4 gap-2">
        <EditableField label="Gewicht" unit="kg" value={profile.weight} step={0.5}
          onChange={v => updateProfile('weight', v)} />
        <EditableField label="Größe" unit="cm" value={profile.height} color="text-brand-success"
          onChange={v => updateProfile('height', v)} />
        <EditableField label="Alter" unit="J" value={profile.age}
          onChange={v => updateProfile('age', v)} />
        <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
          <p className={`font-bold text-xl ${currentBmi < 18.5 || currentBmi > 25 ? 'text-brand-600' : 'text-brand-success'}`}>
            {currentBmi}
          </p>
          <p className="text-white/60 text-xs mt-0.5">BMI</p>
        </div>
      </div>

      {/* Ziel: Zunehmen */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl border border-brand-600/30 bg-brand-600/10 p-4 space-y-3"
      >
        <div className="flex items-center gap-2">
          <Target size={18} className="text-brand-600" />
          <h3 className="text-white font-medium">Ziel: Masse aufbauen</h3>
        </div>

        {/* Aktivitätslevel */}
        <div className="space-y-1">
          <p className="text-white/50 text-xs px-1">Aktivitätslevel</p>
          {ACTIVITY_LEVELS.map(lvl => (
            <button
              key={lvl.factor}
              onClick={() => updateProfile('activityLevel', lvl.factor)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all ${
                Number(profile.activityLevel) === lvl.factor
                  ? 'bg-brand-600/30 border border-brand-600/60'
                  : 'bg-black/20 border border-white/10'
              }`}
            >
              <div>
                <p className="text-white text-xs font-medium">{lvl.label}</p>
                <p className="text-white/40 text-xs">{lvl.desc}</p>
              </div>
              <span className="text-brand-600 text-xs font-bold">×{lvl.factor}</span>
            </button>
          ))}
        </div>

        {/* Gewünschte Zunahme */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-white/50 text-xs mb-1 px-1">Ziel: Zunehmen pro Woche</p>
            <EditableField
              label="kg/Woche"
              value={profile.weeklyGainGoal}
              step={0.1}
              onChange={v => updateProfile('weeklyGainGoal', Math.min(v, 1.5))}
            />
          </div>
        </div>

        {/* Berechnung */}
        <div className="rounded-xl bg-black/30 p-3 space-y-1 text-xs text-white/70">
          <div className="flex justify-between">
            <span>Grundumsatz (BMR)</span>
            <span className="text-white">{bmr} kcal</span>
          </div>
          <div className="flex justify-between">
            <span>× Aktivitätsfaktor ({profile.activityLevel})</span>
            <span className="text-white">{tdee} kcal</span>
          </div>
          {dailySurplus > 0 && (
            <div className="flex justify-between">
              <span>{profile.weeklyGainGoal} kg/Wo Überschuss</span>
              <span className="text-orange-400">+{dailySurplus} kcal</span>
            </div>
          )}
          <div className="border-t border-white/10 pt-1 flex justify-between font-bold">
            <span className="text-white">Tägliches Ziel</span>
            <span className="text-brand-600 text-sm">{dailyKcalGoal} kcal</span>
          </div>
        </div>

        <p className="text-white/40 text-xs">
          Empfehlung: 0.2–0.5 kg/Woche für sauberen Muskelaufbau
        </p>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border border-white/10 bg-white/5 p-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <Trophy size={18} className="text-brand-600" />
          <h3 className="text-white font-medium">Achievements</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {ACHIEVEMENTS.map((a, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 + idx * 0.05 }}
              className="rounded-lg bg-white/5 border border-white/10 p-3 text-center"
            >
              <p className="text-2xl mb-1">{a.icon}</p>
              <p className="text-white text-xs font-bold">{a.label}</p>
              <p className="text-white/50 text-xs">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border border-white/10 bg-white/5 divide-y divide-white/10"
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Moon size={18} className="text-brand-600" />
            <span className="text-white font-medium">Dark Mode</span>
          </div>
          <Toggle on={darkMode} onToggle={() => setDarkMode(v => !v)} />
        </div>

        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Bell size={18} className="text-brand-600" />
            <span className="text-white font-medium">Benachrichtigungen</span>
          </div>
          <Toggle on={notifications} onToggle={() => setNotifications(v => !v)} />
        </div>

        <button
          onClick={() => {
            if (confirm('Alle Daten zurücksetzen?')) {
              localStorage.clear()
              window.location.reload()
            }
          }}
          className="w-full flex items-center gap-3 p-4 hover:bg-brand-600/10 transition-colors text-brand-600 text-left rounded-b-2xl"
        >
          <LogOut size={18} />
          <span className="font-medium">Daten zurücksetzen</span>
        </button>
      </motion.div>

      <div className="text-center pb-2">
        <p className="text-white/40 text-xs">Fitness App v1.0</p>
        <p className="text-white/30 text-xs mt-1">Deine Journey. Dein Fortschritt.</p>
      </div>
    </div>
  )
}
