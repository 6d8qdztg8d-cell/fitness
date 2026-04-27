# Fitness App – Codex Projekt README

## Projektziel

Erstelle eine moderne **Mobile-First Fitness Web App**, die sich auf dem Smartphone wie eine echte native App anfühlt.

Die App soll motivierend, hochwertig, schnell, übersichtlich und kompakt sein.

Ziel:

- tägliche Übungen anzeigen
- Fortschritt tracken
- Ernährung / Kalorien / Protein berechnen
- Motivation steigern
- modern aussehen
- perfekte Mobile UX

---

# Hauptfunktionen

## 1. Trainingsbereich

### Übungen:

- Situps
- Liegestütze
- Planks

### Darstellung:

Jede Übung als Card.

Jede Card enthält:

- Bild der Übung
- Name
- Wiederholungen / Zeit
- Status

### Standardzustand:

- Bild sichtbar
- roter transparenter Overlay Layer
- wirkt wie noch offen

### Interaktionen:

#### Einmal tippen:

Zeigt:

- Wiederholungen
- oder Sekunden

Beispiel:

- Situps: 35
- Liegestütze: 20
- Plank: 60 Sekunden

#### Zweimal tippen:

Übung erledigt:

- roter Layer verschwindet
- Bild voll sichtbar
- grüne Umrandung
- Haken Symbol
- Animation

Status = erledigt

---

## 2. Wöchentliche Steigerung

Jede Woche erhöhen sich Wiederholungen automatisch.

Benutzer kann selbst einstellen:

- Situps +5
- Liegestütze +3
- Plank +10 Sekunden

Zeige:

- aktuelle Woche
- letzte Woche
- Fortschritt %

---

## 3. Kalorien & Protein Tracker

API integrieren (OpenAI / Gemini / andere).

Benutzer schreibt:

50g Haferflocken  
300ml Milch  
1 Banane  
30g Whey

Dann erkennt System:

- kcal
- Protein
- Kohlenhydrate
- Fett

### Ausgabe Tabelle:

| Lebensmittel | Menge | kcal | Protein |
|-------------|------|------|--------|
| Haferflocken | 50g | 190 | 6g |

### Summe:

- Gesamtkalorien
- Gesamtprotein
- Gesamtcarbs
- Gesamtfett

---

## Mehrere Mahlzeiten pro Tag

Speicherbar:

- Frühstück
- Mittagessen
- Abendessen
- Shake
- Snack

Danach Tagesübersicht:

- Kalorien heute
- Protein heute

---

## 4. Dashboard

Startseite mit:

- Tagesfortschritt
- offene Übungen
- erledigte Übungen
- Kalorien heute
- Protein Ziel %
- Motivation

---

## 5. Fortschritt

Charts für:

- Gewicht
- Protein
- Trainingstage
- Wiederholungen

---

## 6. Streak System

Zeige:

- Tage hintereinander trainiert
- Feuer Symbol
- Rekord

---

## 7. Ziele

Benutzer setzt Ziele:

- Zielgewicht
- Muskelaufbau
- Fettverlust
- Sixpack
- Protein Ziel
- Trainingstage

---

## 8. Erinnerungen

Push Notifications:

- Training machen
- Wasser trinken
- Protein essen

---

## 9. Gamification

- XP Punkte
- Level
- Badges
- Wochenziele

---

# Design

## Stil:

- modern
- clean
- premium
- Fitness Look
- Mobile App Feeling

## Farben:

- Schwarz
- Weiß
- Rot
- Grün
- Glassmorphism

## UX:

- große Buttons
- kompakt
- viel Fläche nutzen
- smooth Animationen

---

# Navigation

Bottom Navigation:

1. Home  
2. Training  
3. Ernährung  
4. Fortschritt  
5. Profil

---

# Technik

## Frontend:

- React / Next.js
- Tailwind CSS
- PWA

## Backend:

- Supabase / Firebase

## Daten:

- Benutzerkonto
- Training
- Mahlzeiten
- Fortschritt

---

# Extra Features

- Dark Mode
- Offline Modus
- Daten Export
- Wochenreport
- Monatsreport
- AI Coach
- BMI Rechner
- Wasser Tracker
- Schlaf Tracker
- Gewicht Tracker

---

# Wichtig

Die App muss sich wie eine echte iPhone / Android App anfühlen.

Nicht wie normale Webseite.

Sehr smooth.  
Sehr hochwertig.  
Sehr motivierend.

---

# Ziel des Users

Disziplinierter werden.  
Stärker werden.  
Fitter werden.  
Optisch besser werden.  
Jeden Tag Fortschritt sehen.

---

# Auftrag

Erstelle die komplette App professionell mit sauberem Code, schöner Struktur und perfekter Mobile Optimierung.