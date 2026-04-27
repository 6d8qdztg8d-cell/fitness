# Fitness App – Quick Start Guide

## 🚀 Schnelleinstieg

### 1. Dependencies installieren
```bash
cd /Users/altinramadani/Fittness_
npm install
```

### 2. Development Server starten
```bash
npm run dev
```

Öffne Browser: **http://localhost:3000**

### 3. iPhone 12 Mini Viewport
Im Chrome DevTools:
- Toggle Device Toolbar (Cmd+Shift+M)
- Wähle "iPhone 12 mini"
- Viewport: 390x844px

## 📱 Features zur Benutzung

### Training Tab
1. Klicke auf eine Übung
2. Einmal tippen → Zeigt Wiederholungen
3. Zweimal tippen → Markiert als erledigt (grüner Haken)

### Ernährung Tab
1. Wähle Mahlzeitenkategorie
2. Gib Lebensmittel ein (z.B. "haferflocken", "huhn")
3. Vorschläge klicken
4. Makros werden automatisch berechnet

### Dashboard
- Zeigt Streak, Training-Fortschritt, Kalorien & Protein

### Fortschritt
- Wöchentliche Charts
- Ziele tracken
- XP & Level

### Profil
- Benutzerinformationen
- Achievements/Badges
- Settings

## 🎨 Design System

| Element | Farbe | Hex |
|---------|-------|-----|
| Background | Schwarz | #0a0a0a |
| Primary | Rot | #FF2D2D |
| Success | Grün | #00C851 |
| Glass | Weiß 5% | rgba(255,255,255,0.05) |

## ⚡ Performance

- Lazy Loading optimiert
- Image Optimization
- CSS-in-JS minimiert
- Service Worker für Caching

## 🔧 Troubleshooting

**Port 3000 belegt?**
```bash
npm run dev -- -p 3001
```

**Dependencies Issue?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Cache Problem?**
```bash
npm run build
npm start
```

## 📦 Production Deployment

```bash
npm run build
npm start
```

Oder zu Vercel:
```bash
npm install -g vercel
vercel
```

## 💡 Tipps

1. **Dark Mode ist bereits aktiv** – schwarzer Background ist Absicht
2. **Glassmorphism Effects** – beste Sichtbarkeit mit dem roten Overlay
3. **Smooth Scrolling** – alle Transaktionen sind optimiert
4. **Touch Gestures** – Doppeltipp funktioniert am besten

---

Viel Spaß beim Training! 💪🔥
