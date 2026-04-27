import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Home, Zap, Apple, TrendingUp, User } from 'lucide-react'

export default function Navigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'training', icon: Zap, label: 'Training' },
    { id: 'nutrition', icon: Apple, label: 'Ernährung' },
    { id: 'progress', icon: TrendingUp, label: 'Fortschritt' },
    { id: 'profile', icon: User, label: 'Profil' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto h-20 bg-brand-900/80 backdrop-blur-xl border-t border-white/10 flex items-center justify-around px-2">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id
        
        return (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-1 py-3 px-3 relative"
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-brand-700/20 rounded-lg"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <Icon
              size={24}
              className={`relative z-10 transition-colors ${
                isActive ? 'text-brand-600' : 'text-white/40'
              }`}
            />
            <span
              className={`text-xs font-medium transition-colors ${
                isActive ? 'text-brand-600' : 'text-white/40'
              }`}
            >
              {tab.label}
            </span>
          </motion.button>
        )
      })}
    </nav>
  )
}
