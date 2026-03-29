import { useCallback, useState } from 'react'
import { ResponsiveGridLayout, useContainerWidth, type Layout } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import './DashboardView.css'

interface WidgetData {
  id: string
  title: string
  content: string
  color: string
}

const widgets: WidgetData[] = [
  { id: '1', title: 'Umsatz', content: '€ 1.234.567', color: '#e3f2fd' },
  { id: '2', title: 'Kunden', content: '3.842', color: '#f3e5f5' },
  { id: '3', title: 'Offene Tickets', content: '27', color: '#fff3e0' },
  { id: '4', title: 'Notizen', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.', color: '#e8f5e9' },
  { id: '5', title: 'Conversion Rate', content: '4.2%', color: '#fce4ec' },
  { id: '6', title: 'Letzte Aktivität', content: 'Kontakt #4821 bearbeitet', color: '#e0f2f1' },
  { id: '7', title: 'Performance', content: '98.7% Uptime', color: '#fff8e1' },
]

const defaultLayout: Layout[] = [
  { i: '1', x: 0, y: 0, w: 1, h: 1 },
  { i: '2', x: 1, y: 0, w: 1, h: 1 },
  { i: '3', x: 2, y: 0, w: 1, h: 1 },
  { i: '4', x: 0, y: 1, w: 1, h: 2 },
  { i: '5', x: 1, y: 1, w: 1, h: 1 },
  { i: '6', x: 2, y: 1, w: 1, h: 1 },
  { i: '7', x: 1, y: 2, w: 2, h: 1 },
]

const STORAGE_KEY = 'dashboard-layout'

const loadLayout = (): Layout[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {
    /* ignore */
  }
  return defaultLayout
}

export const DashboardView = () => {
  const [editable, setEditable] = useState(false)
  const [layouts, setLayouts] = useState<{ lg: Layout[] }>({ lg: loadLayout() })
  const { containerRef, width } = useContainerWidth()

  const handleLayoutChange = useCallback((_current: Layout[], allLayouts: Record<string, Layout[]>) => {
    if (allLayouts.lg) {
      setLayouts({ lg: allLayouts.lg })
    }
  }, [])

  const toggleEdit = () => {
    if (editable) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(layouts.lg))
    }
    setEditable(!editable)
  }

  const resetLayout = () => {
    setLayouts({ lg: defaultLayout })
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <div className='dashboard-view'>
      <div className='dashboard-header'>
        <h1>Dashboard</h1>
        <div className='dashboard-actions'>
          <button className={`btn ${editable ? 'btn-primary' : ''}`} onClick={toggleEdit}>
            {editable ? 'Apply' : 'Edit'}
          </button>
          {editable && (
            <button className='btn' onClick={resetLayout}>
              Reset
            </button>
          )}
        </div>
      </div>

      <div className='hint'>
        <strong>React:</strong> <code>react-grid-layout</code> — Drag &amp; Drop + Resize. Layout wird in <code>localStorage</code> gespeichert.
        {editable ? (
          <>
            <br />
            <strong>Edit-Modus aktiv:</strong> Widgets verschieben und an den Ecken in der Groesse aendern.
          </>
        ) : (
          <>
            <br />
            Klicke <strong>Edit</strong> um Widgets zu verschieben.
          </>
        )}
      </div>

      <div ref={containerRef} className='dashboard-grid-wrapper'>
        {width > 0 && (
          <ResponsiveGridLayout
            className='dashboard-grid'
            layouts={layouts}
            width={width}
            breakpoints={{ lg: 800, md: 500, sm: 0 }}
            cols={{ lg: 3, md: 2, sm: 1 }}
            rowHeight={140}
            isDraggable={editable}
            isResizable={editable}
            onLayoutChange={handleLayoutChange}
            draggableHandle='.widget-drag-handle'
          >
            {widgets.map((widget) => (
              <div key={widget.id} className={`dashboard-widget ${editable ? 'editable' : ''}`}>
                <div className='widget-header' style={{ background: widget.color }}>
                  <span className='widget-title'>{widget.title}</span>
                  {editable && <span className='widget-drag-handle'>&#x2630;</span>}
                </div>
                <div className='widget-body'>
                  <span className='widget-content'>{widget.content}</span>
                </div>
              </div>
            ))}
          </ResponsiveGridLayout>
        )}
      </div>
    </div>
  )
}
