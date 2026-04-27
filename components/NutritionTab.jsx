import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Sparkles, Loader } from 'lucide-react'

const MEALS = ['Frühstück', 'Mittagessen', 'Abendessen', 'Shake', 'Snack']

const FOOD_DATABASE_PLACEHOLDER = {
  'haferflocken': { kcal: 380, protein: 13, carbs: 66, fat: 6, portion: '100g' },
  'milch': { kcal: 61, protein: 3.2, carbs: 4.8, fat: 3.3, portion: '100ml' },
  'banane': { kcal: 89, protein: 1.1, carbs: 23, fat: 0.3, portion: '100g' },
  'whey': { kcal: 120, protein: 25, carbs: 2, fat: 1.5, portion: '30g' },
  'whey protein': { kcal: 120, protein: 25, carbs: 2, fat: 1.5, portion: '30g' },
  'huhn': { kcal: 165, protein: 31, carbs: 0, fat: 3.6, portion: '100g' },
  'hähnchen': { kcal: 165, protein: 31, carbs: 0, fat: 3.6, portion: '100g' },
  'hühnchen': { kcal: 165, protein: 31, carbs: 0, fat: 3.6, portion: '100g' },
  'chicken': { kcal: 165, protein: 31, carbs: 0, fat: 3.6, portion: '100g' },
  'reis': { kcal: 130, protein: 2.7, carbs: 28, fat: 0.3, portion: '100g' },
  'apfel': { kcal: 52, protein: 0.3, carbs: 14, fat: 0.2, portion: '100g' },
  'ei': { kcal: 155, protein: 13, carbs: 1.1, fat: 11, portion: '100g' },
  'eier': { kcal: 155, protein: 13, carbs: 1.1, fat: 11, portion: '100g' },
  'thunfisch': { kcal: 116, protein: 26, carbs: 0, fat: 1, portion: '100g' },
  'lachs': { kcal: 208, protein: 20, carbs: 0, fat: 13, portion: '100g' },
  'quark': { kcal: 73, protein: 12, carbs: 4, fat: 0.5, portion: '100g' },
  'joghurt': { kcal: 61, protein: 3.5, carbs: 4.7, fat: 3.3, portion: '100g' },
  'mandeln': { kcal: 576, protein: 21, carbs: 22, fat: 50, portion: '100g' },
  'brot': { kcal: 265, protein: 9, carbs: 49, fat: 3.2, portion: '100g' },
  'nudeln': { kcal: 131, protein: 5, carbs: 25, fat: 1.1, portion: '100g' },
  'kartoffeln': { kcal: 86, protein: 2, carbs: 20, fat: 0.1, portion: '100g' },
  'brokkoli': { kcal: 34, protein: 2.8, carbs: 7, fat: 0.4, portion: '100g' },
  'spinat': { kcal: 23, protein: 2.9, carbs: 3.6, fat: 0.4, portion: '100g' },
  'tomate': { kcal: 18, protein: 0.9, carbs: 3.9, fat: 0.2, portion: '100g' },
  'avocado': { kcal: 160, protein: 2, carbs: 9, fat: 15, portion: '100g' },
  'erdnussbutter': { kcal: 588, protein: 25, carbs: 20, fat: 50, portion: '100g' },
  'schokolade': { kcal: 546, protein: 5, carbs: 60, fat: 31, portion: '100g' },
  'orange': { kcal: 47, protein: 0.9, carbs: 12, fat: 0.1, portion: '100g' },
  'beeren': { kcal: 57, protein: 0.7, carbs: 14, fat: 0.3, portion: '100g' },
  'cottage cheese': { kcal: 98, protein: 11, carbs: 3.4, fat: 4.3, portion: '100g' },
  'rinderhack': { kcal: 254, protein: 17, carbs: 0, fat: 20, portion: '100g' },
  'truthahn': { kcal: 135, protein: 30, carbs: 0, fat: 1, portion: '100g' },
}

const EMPTY_MEALS = { Frühstück: [], Mittagessen: [], Abendessen: [], Shake: [], Snack: [] }
const TODAY = new Date().toDateString()

export default function NutritionTab({ onTotalsChange, caloriesGoal = 2500, proteinGoal = 165 }) {
  const [meals, setMeals] = useState(EMPTY_MEALS)
  const [selectedMeal, setSelectedMeal] = useState('Frühstück')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const isFirstRender = useRef(true)

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('nutrition_data') || '{}')
      if (stored.date === TODAY && stored.meals) setMeals(stored.meals)
    } catch {}
  }, [])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    try {
      localStorage.setItem('nutrition_data', JSON.stringify({ date: TODAY, meals }))
    } catch {}
    if (onTotalsChange) {
      let kcal = 0, protein = 0
      Object.values(meals).forEach(items =>
        items.forEach(food => {
          kcal += Number(food.kcal) || 0
          protein += Number(food.protein) || 0
        })
      )
      onTotalsChange(kcal, Math.round(protein))
    }
  }, [meals])

  const handleInput = (value) => {
    setInput(value)
    setError('')
  }

  const addFood = async (food) => {
    const trimmed = food.trim()
    if (!trimmed) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/nutrition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ food: trimmed }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || `Fehler ${res.status}`)
      setMeals(prev => ({
        ...prev,
        [selectedMeal]: [
          ...prev[selectedMeal],
          { name: trimmed, kcal: data.kcal, protein: data.protein, carbs: data.carbs, fat: data.fat, id: Date.now() }
        ]
      }))
      setInput('')
    } catch (err) {
      setError(err.message || 'KI nicht erreichbar')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim() && !loading) {
      addFood(input)
    }
  }

  const removeFood = (meal, id) => {
    setMeals(prev => ({
      ...prev,
      [meal]: prev[meal].filter(item => item.id !== id)
    }))
  }

  const getTotalMacros = (meal) => {
    return (meals[meal] || []).reduce(
      (acc, food) => ({
        kcal: acc.kcal + (Number(food.kcal) || 0),
        protein: acc.protein + (Number(food.protein) || 0),
        carbs: acc.carbs + (Number(food.carbs) || 0),
        fat: acc.fat + (Number(food.fat) || 0),
      }),
      { kcal: 0, protein: 0, carbs: 0, fat: 0 }
    )
  }

  const getDailyTotals = () => {
    let totals = { kcal: 0, protein: 0, carbs: 0, fat: 0 }
    Object.values(meals).forEach(mealItems => {
      mealItems.forEach(food => {
        totals.kcal += Number(food.kcal) || 0
        totals.protein += Number(food.protein) || 0
        totals.carbs += Number(food.carbs) || 0
        totals.fat += Number(food.fat) || 0
      })
    })
    return totals
  }

  const dailyTotals = getDailyTotals()
  const currentMealTotals = getTotalMacros(selectedMeal)

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-white text-2xl font-display font-bold mb-1">Ernährung</h2>
        <p className="text-white/60 text-sm">
          {dailyTotals.kcal} / {caloriesGoal} kcal | {Math.round(dailyTotals.protein)}g / {proteinGoal}g Protein
        </p>
      </div>

      {/* Daily Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-2xl backdrop-blur-md border border-white/10 bg-white/5 p-4 grid grid-cols-2 gap-2"
      >
        <div>
          <p className="text-white/60 text-xs mb-1">Kalorien</p>
          <p className="text-white font-bold text-lg">{dailyTotals.kcal}</p>
          <p className="text-white/50 text-xs">/ {caloriesGoal} kcal</p>
        </div>
        <div>
          <p className="text-white/60 text-xs mb-1">Protein</p>
          <p className="text-white font-bold text-lg">{Math.round(dailyTotals.protein)}g</p>
          <p className="text-white/50 text-xs">/ {proteinGoal}g</p>
        </div>
        <div>
          <p className="text-white/60 text-xs mb-1">Carbs</p>
          <p className="text-white font-bold text-lg">{Math.round(dailyTotals.carbs)}g</p>
        </div>
        <div>
          <p className="text-white/60 text-xs mb-1">Fett</p>
          <p className="text-white font-bold text-lg">{Math.round(dailyTotals.fat)}g</p>
        </div>
      </motion.div>

      {/* Meal Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {MEALS.map((meal) => (
          <motion.button
            key={meal}
            onClick={() => setSelectedMeal(meal)}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
              selectedMeal === meal
                ? 'bg-brand-600 text-white'
                : 'bg-white/10 text-white/60 border border-white/10'
            }`}
          >
            {meal}
          </motion.button>
        ))}
      </div>

      {/* Input Section */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => handleInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="z.B. 2 Eier, 200g Hähnchen..."
              disabled={loading}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-brand-600 transition-colors disabled:opacity-50"
            />
            {loading
              ? <Loader size={16} className="absolute right-3 top-3.5 text-brand-600 animate-spin" />
              : <Sparkles size={16} className="absolute right-3 top-3.5 text-brand-600/50" />
            }
          </div>
          <motion.button
            onClick={() => addFood(input)}
            whileTap={{ scale: 0.9 }}
            disabled={!input.trim() || loading}
            className="px-4 rounded-xl bg-brand-600 text-white font-bold text-lg disabled:opacity-30"
          >
            <Plus size={20} />
          </motion.button>
        </div>

        {error && (
          <p className="text-brand-600 text-xs px-1">{error}</p>
        )}
      </div>

      {/* Food Items in Meal */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {meals[selectedMeal].map((food, idx) => (
            <motion.div
              key={food.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 p-3 flex items-center justify-between"
            >
              <div>
                <p className="text-white font-medium text-sm capitalize">{food.name}</p>
                <p className="text-white/60 text-xs">{food.kcal} kcal | {food.protein}g P</p>
              </div>
              <motion.button
                onClick={() => removeFood(selectedMeal, food.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white/60 hover:text-brand-600 transition-colors"
              >
                <Trash2 size={16} />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>

        {meals[selectedMeal].length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-lg backdrop-blur-sm bg-brand-600/20 border border-brand-600/40 p-3 mt-3"
          >
            <div className="grid grid-cols-2 gap-2 text-xs text-white/80">
              <div>
                <p className="text-white/60">Kalorien</p>
                <p className="font-bold">{currentMealTotals.kcal}</p>
              </div>
              <div>
                <p className="text-white/60">Protein</p>
                <p className="font-bold">{Math.round(currentMealTotals.protein)}g</p>
              </div>
              <div>
                <p className="text-white/60">Carbs</p>
                <p className="font-bold">{Math.round(currentMealTotals.carbs)}g</p>
              </div>
              <div>
                <p className="text-white/60">Fett</p>
                <p className="font-bold">{Math.round(currentMealTotals.fat)}g</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
