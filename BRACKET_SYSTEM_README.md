# 🏆 Bracket Management System

Een volledig customizable tournament bracket management systeem gebouwd met Next.js, TypeScript en Tailwind CSS, geïnspireerd door esports styling met neon accenten.

## ✨ Features

### 🎮 Core Functionaliteit
- **Single Elimination Brackets**: Ondersteunt 4, 8, 16 en 32 teams
- **Real-time Score Updates**: Manuele score invoer met automatische winnaar bepaling
- **Live Bracket Visualization**: Visuele bracket met verbindingslijnen tussen rondes
- **Automatic Advancement**: Winnaars gaan automatisch door naar volgende ronde

### ⚙️ Customization Opties
- **Aantal Teams**: Dropdown selectie (4, 8, 16, 32 teams)
- **Team Management**: 
  - Editable teamnamen via inputvelden
  - Automatische team generatie
  - Add/remove teams functionaliteit
- **Kleuren Schema**: 
  - Primaire en secundaire kleuren (color picker + hex input)
  - Real-time preview in bracket
- **Thema Toggle**: Licht/donker modus
- **Tournament Titel**: Aanpasbare titel boven bracket

### 📱 Responsive Design
- **Desktop**: Sidebar links, bracket rechts
- **Mobile**: Inklapbare sidebar met overlay
- **Touch-friendly**: Optimized voor touch devices

### 💾 Data Persistence
- **LocalStorage**: Alle instellingen worden automatisch opgeslagen
- **Session Recovery**: Instellingen blijven behouden na page refresh

### 📊 Extra Features
- **Live Scoreboard**: Widget met dummy data (wins/losses/points)
- **Export Functionaliteit**: 
  - JSON export (volledig werkend)
  - PNG export (placeholder - vereist html2canvas)
  - PDF export (placeholder - vereist jsPDF)
- **Reset Bracket**: Herstart toernooi met nieuwe instellingen

## 🎨 Styling & Design

### Esports Theme
- **Donkere achtergrond** met gradient effecten
- **Neon accenten** met glow effecten
- **Hover animaties** en lift effects
- **Custom scrollbars** voor dark theme
- **Focus states** met neon glow

### Color System
- Primaire kleur: Team 1 styling
- Secundaire kleur: Team 2 styling
- Automatische opacity aanpassingen voor dark/light theme
- Gradient backgrounds voor esports look

## 🏗️ Component Structuur

```
components/
├── types.ts              # TypeScript interfaces
├── bracketLogic.ts       # Bracket algoritme en state management
├── BracketLayout.tsx     # Main layout component
├── Sidebar.tsx          # Configuration panel
├── Bracket.tsx          # Tournament visualization
├── Match.tsx            # Individual match component
├── Scoreboard.tsx       # Live scoreboard widget
└── ExportButton.tsx     # Export functionality
```

## 🚀 Gebruik

1. **Start de applicatie**:
   ```bash
   npm run dev
   ```

2. **Configureer het toernooi**:
   - Pas aantal teams aan (4, 8, 16, 32)
   - Bewerk teamnamen
   - Kies kleuren schema
   - Toggle tussen licht/donker thema

3. **Speel wedstrijden**:
   - Voer scores in voor elke wedstrijd
   - Winnaars gaan automatisch door
   - Volg progressie door het bracket

4. **Export resultaten**:
   - Download bracket als JSON
   - PNG/PDF export (vereist extra libraries)

## 🛠️ Technische Details

### State Management
- React hooks (useState, useEffect)
- LocalStorage voor persistence
- Real-time updates tussen components

### Bracket Logic
- Automatische match generatie
- Winner advancement algoritme
- Round progression tracking
- Tournament completion detection

### Responsive Design
- Tailwind CSS voor styling
- Mobile-first approach
- Flexible grid layouts
- Touch-optimized interactions

## 🔮 Toekomstige Uitbreidingen

- **Double Elimination** brackets
- **Round Robin** formaten
- **Team seeding** functionaliteit
- **Match scheduling** met tijden
- **Live streaming** integratie
- **User accounts** en saved tournaments
- **Real-time collaboration** tussen gebruikers

## 📦 Dependencies

- Next.js 15.5.4 (App Router)
- React 19.1.0
- TypeScript 5
- Tailwind CSS 4
- Geist fonts

## 🎯 Gebruikte Libraries

Alle functionaliteit is gebouwd met native React en browser APIs. Voor PNG/PDF export zouden extra libraries nodig zijn:
- `html2canvas` voor PNG export
- `jsPDF` voor PDF export

---

**Gemaakt met ❤️ voor esports tournaments en gaming communities!**
