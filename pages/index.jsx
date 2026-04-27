import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

export default function Landing() {
  const router = useRouter()

  const handleStart = () => {
    router.push('/app')
  }

  return (
    <>
      <Head>
        <title>Champion Fitness – Premium Fitness App</title>
        <meta name="description" content="Mobile-First Fitness App für iPhone 12 Mini. Trainiere, tracke Fortschritt, erreiche Ziele." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-brand-900 via-brand-900 to-black flex items-center justify-center p-4">
        {/* Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-sm text-center space-y-8">
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="flex justify-center"
          >
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-700 flex items-center justify-center">
              <Zap size={40} className="text-white" fill="white" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-display font-bold text-white mb-2">
              Champion
            </h1>
            <p className="text-white/60 text-lg">Fitness App</p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/70 text-base leading-relaxed"
          >
            Deine persönliche Premium Fitness App. Trainiere, tracke Fortschritt und erreiche deine Ziele – wie eine echte iPhone App.
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 gap-3 text-sm"
          >
            <div className="rounded-lg bg-white/5 border border-white/10 p-3">
              <p className="font-bold text-brand-600 mb-1">💪 Training</p>
              <p className="text-white/60 text-xs">Tägliche Übungen</p>
            </div>
            <div className="rounded-lg bg-white/5 border border-white/10 p-3">
              <p className="font-bold text-brand-600 mb-1">🍽️ Ernährung</p>
              <p className="text-white/60 text-xs">Makro Tracker</p>
            </div>
            <div className="rounded-lg bg-white/5 border border-white/10 p-3">
              <p className="font-bold text-brand-success mb-1">📊 Fortschritt</p>
              <p className="text-white/60 text-xs">Charts & Stats</p>
            </div>
            <div className="rounded-lg bg-white/5 border border-white/10 p-3">
              <p className="font-bold text-brand-success mb-1">🎯 Ziele</p>
              <p className="text-white/60 text-xs">Tracking & XP</p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            onClick={handleStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-700 text-white font-bold text-lg transition-all hover:shadow-lg hover:shadow-brand-600/50"
          >
            App Starten
          </motion.button>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-white/40 text-xs"
          >
            Optimiert für iPhone 12 Mini • PWA
          </motion.p>
        </div>
      </div>
    </>
  )
}
