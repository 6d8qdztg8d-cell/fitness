import React, { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Dashboard from '@/components/Dashboard'
import TrainingTab from '@/components/TrainingTab'
import NutritionTab from '@/components/NutritionTab'
import ProgressTab from '@/components/ProgressTab'
import ProfileTab from '@/components/ProfileTab'

const TODAY = new Date().toDateString()

function calcGoal(profile, burned) {
  const base = Number(profile.baseTDEE) || 2500
  const weekly = Number(profile.weeklyGainGoal) || 0
  const surplus = Math.round((weekly * 7700) / 7)
  return base + surplus + (Number(burned) || 0)
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [completedExercises, setCompletedExercises] = useState(0)
  const [caloriesConsumed, setCaloriesConsumed] = useState(0)
  const [proteinConsumed, setProteinConsumed] = useState(0)
  const [burnedCalories, setBurnedCalories] = useState(0)
  const [profile, setProfile] = useState({ baseTDEE: 2500, weeklyGainGoal: 0, weight: 82.5 })

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
    const meta = document.createElement('meta')
    meta.name = 'theme-color'
    meta.content = '#0a0a0a'
    document.head.appendChild(meta)

    try {
      const p = JSON.parse(localStorage.getItem('profile_data') || '{}')
      if (p.baseTDEE || p.weeklyGainGoal) setProfile(prev => ({ ...prev, ...p }))
    } catch {}

    try {
      const burned = JSON.parse(localStorage.getItem('burned_data') || '{}')
      if (burned.date === TODAY) setBurnedCalories(Number(burned.kcal) || 0)
    } catch {}

    try {
      const training = JSON.parse(localStorage.getItem('training_data') || '{}')
      if (training.date === TODAY && training.completedIds) {
        setCompletedExercises(training.completedIds.length)
      }
    } catch {}

    try {
      const nutrition = JSON.parse(localStorage.getItem('nutrition_data') || '{}')
      if (nutrition.date === TODAY && nutrition.meals) {
        let kcal = 0, protein = 0
        Object.values(nutrition.meals).forEach(items =>
          items.forEach(food => {
            kcal += Number(food.kcal) || 0
            protein += Number(food.protein) || 0
          })
        )
        setCaloriesConsumed(kcal)
        setProteinConsumed(Math.round(protein))
      }
    } catch {}
  }, [])

  const handleBurnedChange = (kcal) => {
    setBurnedCalories(kcal)
    try {
      localStorage.setItem('burned_data', JSON.stringify({ date: TODAY, kcal }))
    } catch {}
  }

  const handleProfileChange = (updated) => {
    setProfile(prev => ({ ...prev, ...updated }))
  }

  const caloriesGoal = calcGoal(profile, burnedCalories)
  const proteinGoal = Math.round((Number(profile.weight) || 82.5) * 2)

  return (
    <div className="min-h-screen bg-brand-900 text-white overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-600/5 rounded-full blur-3xl" />
      </div>

      <main className="relative max-w-sm mx-auto h-screen flex flex-col overflow-hidden">
        <div className="h-8 bg-brand-900" />
        <div className="flex-1 overflow-y-auto px-4 pb-24 pt-4 scroll-smooth">
          <div className={activeTab === 'home' ? 'block' : 'hidden'}>
            <Dashboard
              completedExercises={completedExercises}
              caloriesConsumed={caloriesConsumed}
              caloriesGoal={caloriesGoal}
              proteinConsumed={proteinConsumed}
              proteinGoal={proteinGoal}
              burnedCalories={burnedCalories}
              onBurnedChange={handleBurnedChange}
            />
          </div>
          <div className={activeTab === 'training' ? 'block' : 'hidden'}>
            <TrainingTab
              onExerciseComplete={() => setCompletedExercises(p => p + 1)}
              onCompletedChange={setCompletedExercises}
            />
          </div>
          <div className={activeTab === 'nutrition' ? 'block' : 'hidden'}>
            <NutritionTab
              caloriesGoal={caloriesGoal}
              proteinGoal={proteinGoal}
              onTotalsChange={(kcal, protein) => { setCaloriesConsumed(kcal); setProteinConsumed(protein) }}
            />
          </div>
          <div className={activeTab === 'progress' ? 'block' : 'hidden'}>
            <ProgressTab />
          </div>
          <div className={activeTab === 'profile' ? 'block' : 'hidden'}>
            <ProfileTab onProfileChange={handleProfileChange} />
          </div>
        </div>
      </main>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="max-w-sm mx-auto h-8 bg-brand-900" />

      <style jsx global>{`
        * { -webkit-user-select: none; -webkit-touch-callout: none; user-select: none; }
        input, textarea { -webkit-user-select: text; user-select: text; }
        body { margin: 0; padding: 0; background: #0a0a0a; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        ::-webkit-scrollbar-thumb { background: rgba(255,44,45,0.3); border-radius: 2px; }
        input::placeholder { color: rgba(255,255,255,0.4); }
        @supports (padding: max(0px)) {
          body {
            padding-left: max(12px, env(safe-area-inset-left));
            padding-right: max(12px, env(safe-area-inset-right));
            padding-top: max(12px, env(safe-area-inset-top));
            padding-bottom: max(12px, env(safe-area-inset-bottom));
          }
        }
      `}</style>
    </div>
  )
}
