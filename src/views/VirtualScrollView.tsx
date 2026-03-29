import { useVirtualizer } from '@tanstack/react-virtual'
import { useCallback, useEffect, useRef, useState } from 'react'
import { EditContactDialog } from '../components/EditContactDialog'
import { type Contact, getContactsSorted, saveContact } from '../data/contacts'
import './VirtualScrollView.css'

const ROW_HEIGHT = 41
const PAGE_SIZE = 100

type SortField = keyof Contact
type SortDir = 'asc' | 'desc'

const COL_WIDTHS = ['8%', '25%', '18%', '30%', '19%'] as const

export const VirtualScrollView = () => {
  const [sortField, setSortField] = useState<SortField>('id')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [editContact, setEditContact] = useState<Contact | null>(null)
  const [total, setTotal] = useState(0)

  const [loadedContacts, setLoadedContacts] = useState<Map<number, Contact>>(new Map())
  const loadingPages = useRef(new Set<number>())

  const parentRef = useRef<HTMLDivElement>(null)

  // Get total count on mount / sort change
  useEffect(() => {
    const result = getContactsSorted(sortField, sortDir, 0, 1)
    setTotal(result.total)
    setLoadedContacts(new Map())
    loadingPages.current.clear()
  }, [sortField, sortDir])

  const loadPage = useCallback(
    (pageNum: number) => {
      if (loadingPages.current.has(pageNum)) return
      loadingPages.current.add(pageNum)

      setTimeout(() => {
        const result = getContactsSorted(sortField, sortDir, pageNum, PAGE_SIZE)
        setLoadedContacts((prev) => {
          const next = new Map(prev)
          result.data.forEach((contact, i) => {
            next.set(pageNum * PAGE_SIZE + i, contact)
          })
          return next
        })
      }, Math.random() * 200)
    },
    [sortField, sortDir],
  )

  const virtualizer = useVirtualizer({
    count: total,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 20,
  })

  const virtualItems = virtualizer.getVirtualItems()
  useEffect(() => {
    if (virtualItems.length === 0) return
    const startPage = Math.floor(virtualItems[0].index / PAGE_SIZE)
    const endPage = Math.floor(virtualItems[virtualItems.length - 1].index / PAGE_SIZE)
    for (let p = startPage; p <= endPage; p++) {
      const pageStart = p * PAGE_SIZE
      if (!loadedContacts.has(pageStart)) {
        loadPage(p)
      }
    }
  }, [virtualItems, loadedContacts, loadPage])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  const handleSave = (contact: Contact) => {
    saveContact(contact)
    setLoadedContacts(new Map())
    loadingPages.current.clear()
    setEditContact(null)
  }

  const sortIndicator = (field: SortField) => {
    if (sortField !== field) return ' ↕'
    return sortDir === 'asc' ? ' ↑' : ' ↓'
  }

  return (
    <div className='contacts-view virtual-scroll-view'>
      <div className='view-header'>
        <h1>Kontakte - Virtual Scroll</h1>
        <span className='record-count'>
          {loadedContacts.size} / {total} geladen
        </span>
      </div>

      <div className='hint'>
        <strong>Virtual Scrolling:</strong> Der Scrollbalken zeigt sofort die volle Listenlänge ({total.toLocaleString('de-DE')} Einträge). Es werden aber nur die sichtbaren Zeilen gerendert (~{virtualItems.length} Stück). Wie in Vaadin -
        scrolle zum Ende und du bist sofort beim letzten Eintrag.
        <br />
        <code>@tanstack/react-virtual</code> berechnet die Gesamthöhe ({((total * ROW_HEIGHT) / 1000).toFixed(0)}k px) und positioniert nur die sichtbaren Rows per <code>transform</code>.
      </div>

      <div className='virtual-stats'>
        <span>Gesamthöhe: {(total * ROW_HEIGHT).toLocaleString('de-DE')} px</span>
        <span>Sichtbare Rows: {virtualItems.length}</span>
        <span>Geladene Rows: {loadedContacts.size}</span>
      </div>

      <div className='table-container virtual-table-container'>
        {/* Sticky header row */}
        <div className='vt-header'>
          <div className='vt-row'>
            <div className='vt-cell sortable' style={{ width: COL_WIDTHS[0] }} onClick={() => handleSort('id')}>
              ID{sortIndicator('id')}
            </div>
            <div className='vt-cell sortable' style={{ width: COL_WIDTHS[1] }} onClick={() => handleSort('name')}>
              Name{sortIndicator('name')}
            </div>
            <div className='vt-cell' style={{ width: COL_WIDTHS[2] }}>
              Geburtsdatum
            </div>
            <div className='vt-cell sortable' style={{ width: COL_WIDTHS[3] }} onClick={() => handleSort('company')}>
              Firma{sortIndicator('company')}
            </div>
            <div className='vt-cell' style={{ width: COL_WIDTHS[4] }}>
              Aktion
            </div>
          </div>
        </div>

        {/* Virtualized scroll body */}
        <div ref={parentRef} className='vt-body'>
          <div style={{ height: `${virtualizer.getTotalSize()}px`, position: 'relative' }}>
            {virtualItems.map((virtualRow) => {
              const contact = loadedContacts.get(virtualRow.index)
              return (
                <div
                  key={virtualRow.index}
                  className={`vt-row ${contact ? '' : 'loading-row'}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {contact ? (
                    <>
                      <div className='vt-cell id-cell' style={{ width: COL_WIDTHS[0] }}>
                        {contact.id}
                      </div>
                      <div className='vt-cell' style={{ width: COL_WIDTHS[1] }}>
                        {contact.name}
                      </div>
                      <div className='vt-cell' style={{ width: COL_WIDTHS[2] }}>
                        {contact.birthdate}
                      </div>
                      <div className='vt-cell' style={{ width: COL_WIDTHS[3] }}>
                        {contact.company}
                      </div>
                      <div className='vt-cell' style={{ width: COL_WIDTHS[4] }}>
                        <button className='btn btn-sm' onClick={() => setEditContact(contact)}>
                          Bearbeiten
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='vt-cell' style={{ width: COL_WIDTHS[0] }}>
                        <span className='placeholder' />
                      </div>
                      <div className='vt-cell' style={{ width: COL_WIDTHS[1] }}>
                        <span className='placeholder wide' />
                      </div>
                      <div className='vt-cell' style={{ width: COL_WIDTHS[2] }}>
                        <span className='placeholder' />
                      </div>
                      <div className='vt-cell' style={{ width: COL_WIDTHS[3] }}>
                        <span className='placeholder wide' />
                      </div>
                      <div className='vt-cell' style={{ width: COL_WIDTHS[4] }}>
                        <span className='placeholder narrow' />
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {editContact && <EditContactDialog contact={editContact} onSave={handleSave} onClose={() => setEditContact(null)} />}
    </div>
  )
}
