import './HomeView.css'

export const HomeView = () => {
  return (
    <div className='home-view'>
      <h1>React Demo App</h1>
      <p className='home-intro'>
        Vergleich: <strong>React</strong> vs. <strong>z.B. Vaadin</strong>
      </p>

      <div className='comparison-grid'>
        <div className='compare-card react'>
          <h3>React (TypeScript)</h3>
          <ul>
            <li>Eigene Tabelle oder Libraries (TanStack Table, AG Grid)</li>
            <li>
              <code>react-hook-form</code> / <code>formik</code> für Formulare
            </li>
            <li>
              <code>react-router-dom</code> für Navigation
            </li>
            <li>Dashboard: CSS Grid + DnD-Library</li>
            <li>Alles clientseitig, API-Calls für Daten</li>
            <li>10.000 Rows? Infinite Scroll / Virtualisierung</li>
          </ul>
        </div>
        <div className='compare-card'>
          <h3>z.B. Vaadin (Java)</h3>
          <ul>
            <li>
              <code>Grid&lt;Contact&gt;</code> — Daten direkt aus Java-Objekten
            </li>
            <li>
              <code>Binder</code> + <code>FormLayout</code> für Formulare
            </li>
            <li>
              <code>AppLayout</code> + <code>SideNav</code> für Navigation
            </li>
            <li>
              <code>Dashboard</code> mit Drag & Drop
            </li>
            <li>Kein JavaScript nötig, alles serverseitig</li>
            <li>10.000 Rows? Lazy Loading eingebaut</li>
          </ul>
        </div>
      </div>

      <div className='dashboard'>
        <h2>Dashboard</h2>
        <div className='dashboard-grid'>
          <div className='widget'>
            <h4>Kontakte</h4>
            <span className='widget-value'>10.000</span>
          </div>
          <div className='widget'>
            <h4>Firmen</h4>
            <span className='widget-value'>~3.200</span>
          </div>
          <div className='widget'>
            <h4>Kategorien</h4>
            <span className='widget-value'>3</span>
          </div>
          <div className='widget span-2'>
            <h4>Hinweis</h4>
            <p>
              In der Vaadin-Demo z.B. ist das Dashboard ein eingebautes Widget mit Drag & Drop. In React würde man z.B. <code>react-grid-layout</code> oder <code>dnd-kit</code> nehmen. Für ein einfaches Layout reicht CSS Grid.
            </p>
          </div>
          <div className='widget span-2 row-2'>
            <h4>Form-Libraries im React-Ökosystem</h4>
            <table className='info-table'>
              <thead>
                <tr>
                  <th>Library</th>
                  <th>Ansatz</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>react-hook-form</strong>
                  </td>
                  <td>Uncontrolled, performant, wenig Re-Renders</td>
                </tr>
                <tr>
                  <td>
                    <strong>formik</strong>
                  </td>
                  <td>Controlled, deklarativ, weit verbreitet</td>
                </tr>
                <tr>
                  <td>
                    <strong>Zod / Yup</strong>
                  </td>
                  <td>Schema-Validation (kombinierbar)</td>
                </tr>
                <tr>
                  <td>
                    <strong>TanStack Form</strong>
                  </td>
                  <td>Headless, framework-agnostic</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='widget'>
            <h4>Grid-Libraries</h4>
            <ul className='widget-list'>
              <li>
                <strong>TanStack Table</strong> — headless
              </li>
              <li>
                <strong>AG Grid</strong> — feature-rich
              </li>
              <li>
                <strong>MUI DataGrid</strong> — Material UI
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
