# 🎵 MP3-Setup für Johanna & Lukas Festival-Hochzeit

## 📁 MP3-Datei hinzufügen

Um den Musik-Player mit deiner eigenen Hochzeits-Playlist zu verwenden:

### 1. MP3-Datei vorbereiten
- Benenne deine MP3-Datei um zu: **`festival-track.mp3`**
- Stelle sicher, dass es sich um eine gültige MP3-Datei handelt

### 2. Datei platzieren
- Lege die `festival-track.mp3` in den Projektordner (`/home/ingo/Code/weddsite/`)
- Die Datei sollte im gleichen Verzeichnis wie `index.html` liegen

### 3. Verzeichnisstruktur
```
weddsite/
├── index.html
├── styles.css
├── script.js
├── audio-player.js
├── festival-track.mp3  ← Hier platzieren
└── README.md
```

### 4. Funktionen
- **Automatischer Loop**: Der Track wird endlos wiederholt
- **Auto-Play**: Startet automatisch beim Laden der Website
- **Visualizer**: Echtzeit-Frequenzanalyse zur Musik
- **Volume Control**: Lautstärke-Regelung
- **Progress Bar**: Klickbare Zeitleiste
- **Musik-Indikator**: Zeigt an, dass Musik läuft (kleiner ▶ Button)

### 5. Alternative Dateinamen
Falls du einen anderen Dateinamen verwenden möchtest, ändere in `audio-player.js`:
```javascript
const trackPath = './dein-dateiname.mp3';
```

### 6. Testen
1. Starte den Server: `python3 -m http.server 8000`
2. Öffne `http://localhost:8000`
3. Die Musik startet automatisch im Hintergrund (falls MP3-Datei vorhanden)
4. Der kleine ▶ Button zeigt an, dass Musik läuft
5. Klicke auf den 🎵 Button (unten rechts) um den Player zu öffnen

### 7. Fehlerbehebung
Falls der Track nicht lädt:
- Überprüfe den Dateinamen (muss exakt `festival-track.mp3` sein)
- Stelle sicher, dass die Datei im richtigen Verzeichnis liegt
- Überprüfe die Browser-Konsole auf Fehlermeldungen
- Teste die MP3-Datei in einem anderen Player

### 8. Empfohlene MP3-Eigenschaften
- **Format**: MP3
- **Bitrate**: 128-320 kbps
- **Länge**: 3-10 Minuten (für Loop-Effekt)
- **Genre**: Psytrance, Goa, Progressive Trance, Festival-Musik

---

**Hinweis**: Der Player funktioniert nur mit lokalen MP3-Dateien. Online-Streaming ist nicht unterstützt. 