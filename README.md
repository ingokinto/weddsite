# 💒 Johanna & Lukas - Festival-Hochzeit 2026

Eine psychedelische Landing Page für die Festival-Hochzeit von Johanna und Lukas vom 26.-28. Juni 2026.

## ✨ Features

- **Countdown Timer** - Live-Countdown zum Festival-Start
- **Bewegende Fraktale** - Animierte psychedelische Hintergründe
- **Responsive Design** - Optimiert für alle Geräte
- **Smooth Scrolling** - Flüssige Navigation zwischen Sektionen
- **Interactive Elements** - Hover-Effekte und Animationen
- **Mobile Navigation** - Hamburger-Menü für mobile Geräte
- **Floating Particles** - Animierte Partikel-Effekte
- **Music Visualizer** - Simulierter Musik-Player
- **Scroll Progress** - Fortschrittsbalken beim Scrollen

## 🎨 Design

- **Psychedelische Farbpalette**: Neon-Pink (#ff6b6b), Türkis (#4ecdc4), Blau (#45b7d1)
- **Fraktale Animationen**: Sich bewegende Gradient-Hintergründe
- **Glassmorphism**: Moderne Glaseffekte mit Backdrop-Filter
- **Typography**: Orbitron für Überschriften, Exo 2 für Text
- **Gradient-Text**: Animierte Farbverläufe im Titel

## 📱 Sektionen

1. **Hero Section** - Festival-Titel mit Countdown
2. **Programm** - Detaillierter Zeitplan für alle 3 Tage
3. **Anreise** - Informationen zu Auto, ÖPNV und Shuttle
4. **Verpflegung** - Vegan/Vegetarische Optionen und Getränke
5. **Tickets** - Verschiedene Ticket-Kategorien mit Preisen
6. **Kontakt** - Kontaktformular und Informationen

## 🚀 Installation & Setup

### Option 1: Einfacher lokaler Server (Empfohlen)

**Wichtig**: Die Website muss über einen lokalen Server laufen, um CORS-Fehler zu vermeiden!

#### Mit Python (einfachste Option):
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Mit Node.js:
```bash
# Installiere http-server global
npm install -g http-server

# Starte den Server
http-server -p 8000
```

#### Mit PHP:
```bash
php -S localhost:8000
```

#### Mit Live Server (VS Code Extension):
1. Installiere die "Live Server" Extension in VS Code
2. Rechtsklick auf `index.html`
3. Wähle "Open with Live Server"

### Option 2: Schnellstart-Script

Führe das Setup-Script aus:
```bash
chmod +x setup.sh
./setup.sh
```

### Nach dem Server-Start:
1. Öffne deinen Browser
2. Gehe zu: `http://localhost:8000`
3. Die Website sollte jetzt ohne CORS-Fehler funktionieren

### Option 3: Direkte Datei (Nicht empfohlen)
⚠️ **Warnung**: Das direkte Öffnen von `index.html` kann CORS-Fehler verursachen!

## 🛠️ Technologien

- **HTML5** - Semantische Struktur
- **CSS3** - Moderne Styling mit Flexbox und Grid
- **JavaScript (ES6+)** - Interaktive Funktionen
- **Google Fonts** - Orbitron und Exo 2

## 🎵 Musik-Player Features

### 🎧 Fester MP3-Track
- **Festival Soundtrack** - Automatisch geladener Psytrance-Track
- **Loop-Modus** - Endlose Wiederholung
- **Auto-Play** - Startet automatisch beim Laden der Website
- **Audio-Visualizer** - Echtzeit-Frequenzanalyse
- **Volume Control** - Lautstärke-Regelung
- **Progress Bar** - Klickbare Zeitleiste
- **Play/Pause/Restart** - Vollständige Kontrolle
- **Musik-Indikator** - Visueller Hinweis, dass Musik läuft

### 📁 MP3-Datei hinzufügen:
1. Benenne deine MP3-Datei um zu: `festival-track.mp3`
2. Lege sie in den Projektordner (gleiches Verzeichnis wie `index.html`)
3. Die Musik startet automatisch im Hintergrund beim Laden der Website
4. Der kleine ▶ Button zeigt an, dass Musik läuft
5. Klicke auf den 🎵 Button (unten rechts) um den Player zu öffnen
6. Siehe `MP3-SETUP.md` für detaillierte Anweisungen

### 🎨 Visualizer
- **16-Band Frequenzanalyse** in Echtzeit (optimiert für Performance)
- **Psychedelische Farben** passend zum Design
- **Responsive Animationen** zur Musik

## 🔧 Troubleshooting

### CORS-Fehler beheben:
```
Access to internal resource at 'file://...' from origin 'null' has been blocked by CORS policy
```

**Lösung**: Verwende einen lokalen Server (siehe Installation oben)

### Musik funktioniert nicht:
1. Stelle sicher, dass `festival-track.mp3` im Projektordner liegt
2. Überprüfe die Browser-Konsole auf Fehler
3. Erlaube Audio-Autoplay in deinem Browser

### Performance-Probleme:
- Siehe `PERFORMANCE-OPTIMIZATION.md` für Details
- Die Website ist für schwache Geräte optimiert

## 🎯 Browser-Support

- Chrome (empfohlen) - Vollständige MP3-Unterstützung
- Firefox - Vollständige MP3-Unterstützung
- Safari - MP3-Unterstützung (eingeschränkt)
- Edge - Vollständige MP3-Unterstützung

## 📋 To-Do

- [ ] Backend-Integration für Ticket-Kauf
- [ ] Echte Musik-Player-Integration
- [ ] Mehrsprachige Unterstützung
- [ ] PWA-Features
- [ ] Analytics-Integration

## 💒 Hochzeits-Informationen

**Datum**: 26. - 28. Juni 2026  
**Ort**: Mystic Forest Wedding Venue, 12345 Festival Valley  
**Event**: Festival-Hochzeit mit Psytrance-Party  

## 📞 Kontakt

- Email: johanna.lukas@festival-hochzeit.de
- Instagram: @johanna_lukas_festival
- Telefon: +49 123 456789
- WhatsApp: +49 123 456789

## 📄 Lizenz

© 2026 Johanna & Lukas Festival-Hochzeit. Alle Rechte vorbehalten.

---

**Entwickelt mit ❤️ von Johanna & Lukas** 