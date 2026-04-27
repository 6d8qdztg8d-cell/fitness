# 💪 Champion Fitness – Premium Mobile Fitness App

Eine moderne, hochwertige Fitness Web App optimiert für iPhone 12 Mini. Mit glassmorphic Design, smooth Animationen und perfekter Mobile UX.

## ✨ Features

### 🏋️ Training
- 3 tägliche Übungen: Situps, Liegestütze, Plank
- Tap-Interaktionen: 1x tippen = Details, 2x tippen = Erledigt
- Visuelle Feedback mit Animationen
- Wöchentliche automatische Steigerung

### 📊 Dashboard
- Tagesfortschritt Live-Tracking
- Streak System mit Feuer-Animation
- Kalorien & Protein Übersicht
- Motivierende Statistiken

### 🍽️ Ernährung Tracker
- AI-gestützter KI-Tracker
- 5 Mahlzeitenkategorien (Frühstück, Mittagessen, etc.)
- Automatische Makro-Berechnung
- Tägliche Zusammenfassung

### 📈 Fortschritt
- Wöchentliche Statistiken Charts
- Goal Tracking
- XP & Level System
- Wochenberichte

### 👤 Profil
- User Level & XP Status
- Achievements & Badges
- BMI & Gewicht Tracking
- Settings & Benachrichtigungen

## 🚀 Installation & Start

### Voraussetzungen
- Node.js 18+
- npm oder yarn

### Setup

```bash
# Repository clonen
cd /Users/altinramadani/Fittness_

# Dependencies installieren
npm install

# Development Server starten
npm run dev
```

Die App läuft auf `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

## 🎨 Design

**Ästhetik:** Premium Fitness App mit Glassmorphism
- **Farben:** Schwarz (#0a0a0a), Rot (#FF2D2D), Grün (#00C851)
- **Typografie:** Sora (Display), Inter (Body)
- **Animationen:** Framer Motion mit smooth Transitions
- **Mobile:** iPhone 12 Mini optimiert (390x844px)

## 📱 PWA Features

- **Offline Support:** Service Worker Caching
- **Add to Home Screen:** Apple & Android
- **Installierbar:** Wie eine native App
- **Push Notifications:** Coming soon
- **App Shortcuts:** Training & Ernährung

## 🛠️ Tech Stack

- **Frontend:** React 18 + Next.js 14
- **Styling:** Tailwind CSS 3
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **PWA:** Service Worker & Web App Manifest

## 📂 Projektstruktur

```
Fittness_/
├── components/
│   ├── Navigation.jsx
│   ├── Dashboard.jsx
│   ├── ExerciseCard.jsx
│   ├── TrainingTab.jsx
│   ├── NutritionTab.jsx
│   ├── ProgressTab.jsx
│   └── ProfileTab.jsx
├── pages/
│   ├── _app.jsx
│   ├── _document.js
│   └── app.jsx
├── styles/
│   └── globals.css
├── public/
│   ├── manifest.json
│   ├── sw.js
│   └── [icons]
├── package.json
├── tailwind.config.js
├── next.config.js
└── jsconfig.json
```

## 🔧 Konfiguration

### Tailwind Theme
Bearbeite `tailwind.config.js` für Custom Colors & Fonts

### PWA Icons
Füge Icons hinzu in `/public`:
- `icon-192.png` (192x192)
- `icon-512.png` (512x512)
- `apple-touch-icon.png` (180x180)

## 📋 Roadmap

- [ ] Backend Integration (Supabase/Firebase)
- [ ] User Authentication
- [ ] Cloud Sync
- [ ] Push Notifications
- [ ] Social Features
- [ ] AI Coach
- [ ] Advanced Analytics

## 🎯 Mobile Optimization

- ✅ iPhone Notch Support
- ✅ Safe Area Insets
- ✅ Touch Optimized
- ✅ Viewport Meta
- ✅ App Standalone Mode
- ✅ Custom Scrollbar

## 📝 Lizenz

Privat Projekt

---

**Erstellt mit ❤️ für deine Fitness Journey**

Champion Fitness v1.0 • 2024-2025
