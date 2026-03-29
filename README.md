# React Demo App

Eine Demo-App mit praxisnahen Beispielen für typische UI-Patterns in React. Gebaut mit React 19, TypeScript und Vite.

## Starten

```bash
npm install
npm run dev
```

Die App läuft dann unter `http://localhost:5173`.

## Beispiele

| Route        | Beschreibung                                                                                               |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| `/`          | **Home** - Einführung und Feature-Übersicht                                                                |
| `/contacts`  | **Infinite Scroll** - Kontakt-Tabelle mit IntersectionObserver, Sortierung und Inline-Editing              |
| `/styled`    | **Styled Grid** - Bedingte Zeilen-/Zell-Formatierung nach Alterskategorien (jung/alt)                      |
| `/virtual`   | **Virtual Scroll** - Scrollbalken zeigt sofort alle 10.000 Einträge, nur sichtbare Zeilen werden gerendert |
| `/forms`     | **Formulare** - Vergleich Plain React vs. react-hook-form mit Validierung                                  |
| `/dashboard` | **Dashboard** - Drag-and-Drop Widget-Layout mit react-grid-layout                                          |
| `/libraries` | **Libraries** - Katalog empfohlener React-Bibliotheken nach Kategorie                                      |

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 8** (Dev-Server + Build)
- **React Router v7** (Client-Side Routing)
- **@tanstack/react-virtual** (Virtual Scrolling)
- **react-grid-layout** (Dashboard)
- **@faker-js/faker** (10.000 Mock-Kontakte)

## Build

```bash
npm run build
npm run preview
```
