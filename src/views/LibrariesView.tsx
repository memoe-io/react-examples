import './LibrariesView.css'

interface Library {
  name: string
  description: string
  category: string
  npm: string
  stars: string
  note?: string
}

const libraries: Library[] = [
  // UI Components
  {
    name: 'shadcn/ui',
    description: 'Kopierbare UI-Components basierend auf Radix UI + Tailwind. Du "ownst" den Code.',
    category: 'UI Components',
    npm: 'npx shadcn@latest init',
    stars: '85k+',
    note: 'Aktuell beliebteste Wahl für neue Projekte',
  },
  {
    name: 'MUI (Material UI)',
    description: 'Umfangreichste React-Component-Library. Material Design. Viele fertige Components.',
    category: 'UI Components',
    npm: '@mui/material',
    stars: '95k+',
    note: 'Sehr etabliert, aber opinionated beim Design',
  },
  {
    name: 'Ant Design',
    description: 'Enterprise-UI-Library aus dem Alibaba-Ökosystem. Sehr tabellenreich, gute Form-Integration.',
    category: 'UI Components',
    npm: 'antd',
    stars: '93k+',
    note: 'Stark im Enterprise/Admin-Bereich',
  },
  {
    name: 'Radix UI',
    description: 'Headless (unstyled) UI-Primitives. Accessibility eingebaut. Basis von shadcn/ui.',
    category: 'UI Components',
    npm: '@radix-ui/react-*',
    stars: '16k+',
  },
  // Styling
  {
    name: 'Tailwind CSS',
    description: 'Utility-first CSS Framework. Klassen direkt im JSX statt separate CSS-Dateien.',
    category: 'Styling',
    npm: 'tailwindcss',
    stars: '85k+',
    note: 'De-facto Standard mit shadcn/ui',
  },
  {
    name: 'styled-components',
    description: 'CSS-in-JS. Styles als JavaScript Template Literals direkt bei der Component.',
    category: 'Styling',
    npm: 'styled-components',
    stars: '40k+',
    note: 'War lange Standard, wird von Tailwind abgelöst',
  },
  // Formulare
  {
    name: 'react-hook-form',
    description: 'Performante Form-Library. Uncontrolled Components = wenig Re-Renders. Kleine Bundle-Size.',
    category: 'Formulare',
    npm: 'react-hook-form',
    stars: '42k+',
    note: 'Klarer Gewinner in der React-Welt',
  },
  {
    name: 'Zod',
    description: 'TypeScript-first Schema-Validation. Definiert Datenstruktur + Regeln in einem.',
    category: 'Formulare',
    npm: 'zod',
    stars: '35k+',
    note: 'Kombiniert mit react-hook-form via @hookform/resolvers',
  },
  {
    name: 'Formik',
    description: 'Ältere Form-Library. Controlled Components. Deklaratives API.',
    category: 'Formulare',
    npm: 'formik',
    stars: '34k+',
    note: 'Wird von react-hook-form abgelöst, aber noch viel Legacy',
  },
  {
    name: 'Yup',
    description: 'Schema-Validation. Älter als Zod, weniger TypeScript-Integration.',
    category: 'Formulare',
    npm: 'yup',
    stars: '23k+',
    note: 'Oft noch in Kombination mit Formik',
  },
  // Tabellen / Grids
  {
    name: 'TanStack Table',
    description: 'Headless Table-Library. Sorting, Filtering, Pagination, Grouping, Virtualisierung.',
    category: 'Tabellen / Grids',
    npm: '@tanstack/react-table',
    stars: '26k+',
    note: 'Headless = du baust die UI selbst, volle Kontrolle',
  },
  {
    name: 'AG Grid',
    description: 'Feature-reichstes Grid am Markt. Excel-Export, Pivoting, Tree Data, Charts.',
    category: 'Tabellen / Grids',
    npm: 'ag-grid-react',
    stars: '13k+',
    note: 'Community Edition kostenlos, Enterprise kostenpflichtig',
  },
  {
    name: 'MUI DataGrid',
    description: 'Teil von MUI. Gutes Grid mit Sorting, Filtering, Editing.',
    category: 'Tabellen / Grids',
    npm: '@mui/x-data-grid',
    stars: '(Teil von MUI)',
    note: 'Nur sinnvoll wenn man MUI eh schon nutzt',
  },
  // Data Fetching
  {
    name: 'TanStack Query',
    description: 'Server-State-Management. Caching, Refetching, Loading States, Optimistic Updates.',
    category: 'Data Fetching',
    npm: '@tanstack/react-query',
    stars: '43k+',
    note: 'Gamechanger — ersetzt manuelles useEffect + fetch',
  },
  {
    name: 'SWR',
    description: 'Data Fetching von Vercel (Next.js). Ähnlich wie TanStack Query, aber simpler.',
    category: 'Data Fetching',
    npm: 'swr',
    stars: '31k+',
    note: 'Leichtgewichtiger als TanStack Query',
  },
  {
    name: 'Axios',
    description: 'HTTP Client. Interceptors, Request/Response Transformation, Cancel Tokens.',
    category: 'Data Fetching',
    npm: 'axios',
    stars: '106k+',
    note: 'Viele nutzen inzwischen einfach fetch()',
  },
  // State Management
  {
    name: 'React Bordmittel',
    description: 'useState, useReducer, useContext — reicht für die meisten Apps wenn man TanStack Query für Server-State nutzt.',
    category: 'State Management',
    npm: '(eingebaut)',
    stars: '—',
    note: 'Meistens reicht das + TanStack Query. Eigene Library erst bei komplexem Client-State.',
  },
  {
    name: 'Zustand',
    description: 'Minimaler State Manager. Wenig Boilerplate, intuitives API.',
    category: 'State Management',
    npm: 'zustand',
    stars: '50k+',
    note: 'Nur nötig wenn useContext nicht mehr reicht',
  },
  {
    name: 'Redux Toolkit',
    description: 'Offizieller Redux-Standard. Actions, Reducers, Slices. Mächtiger aber mehr Boilerplate.',
    category: 'State Management',
    npm: '@reduxjs/toolkit',
    stars: '25k+',
    note: 'Nur bei sehr komplexem Client-State nötig',
  },
  {
    name: 'Jotai',
    description: 'Atomarer State. Jeder State-Wert ist ein Atom. Sehr granular, wenig Re-Renders.',
    category: 'State Management',
    npm: 'jotai',
    stars: '19k+',
  },
  // Routing
  {
    name: 'React Router',
    description: 'Standard-Router für React. Nested Routes, Loaders, Actions.',
    category: 'Routing',
    npm: 'react-router-dom',
    stars: '54k+',
    note: 'De-facto Standard, wird in dieser Demo genutzt',
  },
  {
    name: 'TanStack Router',
    description: 'Type-safe Router. File-based Routing, Search Params als typisierte Objekte.',
    category: 'Routing',
    npm: '@tanstack/react-router',
    stars: '9k+',
    note: 'Neuer, aber sehr gute TypeScript-Integration',
  },
  // Testing
  {
    name: 'Vitest',
    description: 'Unit-Test-Framework. Vite-native, schnell, Jest-kompatibles API.',
    category: 'Testing',
    npm: 'vitest',
    stars: '14k+',
    note: 'Passt perfekt zu Vite-Projekten',
  },
  {
    name: 'React Testing Library',
    description: 'Component-Tests aus User-Perspektive. Testet Verhalten, nicht Implementierung.',
    category: 'Testing',
    npm: '@testing-library/react',
    stars: '19k+',
  },
  {
    name: 'Playwright',
    description: 'E2E-Tests im echten Browser. Multi-Browser, schnell, gute DX.',
    category: 'Testing',
    npm: '@playwright/test',
    stars: '70k+',
    note: 'Hat Cypress weitgehend abgelöst',
  },
  // Auth
  {
    name: 'Auth.js (NextAuth)',
    description: 'Auth-Library für React/Next.js. OAuth, Credentials, JWT, Session Management.',
    category: 'Auth & Security',
    npm: 'next-auth',
    stars: '25k+',
    note: 'Primär für Next.js, aber auch standalone nutzbar',
  },
  {
    name: 'Keycloak JS',
    description: 'Keycloak-Adapter für SPAs. Wenn euer Backend Keycloak nutzt.',
    category: 'Auth & Security',
    npm: 'keycloak-js',
    stars: '—',
    note: 'In der Java-Welt oft schon vorhanden',
  },
]

const categories = [...new Set(libraries.map((l) => l.category))]

export const LibrariesView = () => {
  return (
    <div className='libraries-view'>
      <h1>React Library-Landschaft</h1>

      {categories.map((cat) => (
        <div key={cat} className='lib-category'>
          <h2>{cat}</h2>
          <div className='lib-grid'>
            {libraries
              .filter((l) => l.category === cat)
              .map((lib) => (
                <div key={lib.name} className='lib-card'>
                  <div className='lib-header'>
                    <h3>{lib.name}</h3>
                    <span className='lib-stars'>{lib.stars}</span>
                  </div>
                  <p className='lib-desc'>{lib.description}</p>
                  <div className='lib-meta'>
                    <div className='lib-npm'>
                      <code>{lib.npm}</code>
                    </div>
                    {lib.note && <div className='lib-note'>{lib.note}</div>}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}

      <div className='recommendation-box'>
        <h2>möglicher Stack für Apps</h2>
        <div className='stack-recommendation'>
          <div className='stack-item must'>Vite + React + TypeScript</div>
          <div className='stack-item must'>react-router-dom</div>
          <div className='stack-item must'>TanStack Query</div>
          <div className='stack-item must'>react-hook-form + Zod</div>
          <div className='stack-item must'>shadcn/ui + Tailwind</div>
          <div className='stack-item must'>TanStack Table</div>
          <div className='stack-item should'>Zustand (nur bei Bedarf)</div>
          <div className='stack-item should'>Vitest + Playwright</div>
        </div>
        <div className='stack-legend'>
          <span>
            <span className='dot-should'></span> Je nach Bedarf
          </span>
        </div>
      </div>
    </div>
  )
}
