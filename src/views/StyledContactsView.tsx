import { useCallback, useEffect, useRef, useState } from 'react'
import { categorizeContact, type Contact, getContactsPage } from '../data/contacts'
import './StyledContactsView.css'

const PAGE_SIZE = 50

/**
 * Conditional row/cell styling + Infinite Scroll in einem festen Container.
 *
 * React: className-Logik direkt in JSX + IntersectionObserver für Nachladen.
 */
export const StyledContactsView = () => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const observerRef = useRef<HTMLDivElement>(null)

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return
    setLoading(true)
    // Simulate async loading (in einer echten App: fetch())
    setTimeout(() => {
      const result = getContactsPage(page, PAGE_SIZE)
      setContacts((prev) => [...prev, ...result.data])
      setHasMore(result.hasMore)
      setPage((prev) => prev + 1)
      setLoading(false)
    }, 200)
  }, [page, loading, hasMore])

  // Initial load
  useEffect(() => {
    loadMore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // IntersectionObserver für infinite scroll
  useEffect(() => {
    const el = observerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore()
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [loadMore, hasMore, loading])

  const getRowClass = (contact: Contact) => {
    const cat = categorizeContact(contact)
    if (cat === 'YOUNG') return 'row-young'
    if (cat === 'OLD') return 'row-old'
    return ''
  }

  const getBirthdateCellClass = (contact: Contact) => {
    const year = new Date(contact.birthdate).getFullYear()
    return year >= 2000 ? 'cell-very-young' : ''
  }

  return (
    <div className='styled-view'>
      <h1>Styled Grid</h1>

      <div className='hint'>
        <strong>React:</strong> Einfach <code>className</code> pro Row/Cell setzen. Kein separater Mechanismus nötig — das ist nativer JSX.
        <br />
        Infinite Scroll via <code>IntersectionObserver</code> innerhalb eines festen Containers.
      </div>

      <div className='legend'>
        <span className='legend-item'>
          <span className='dot young'></span> Jung (geboren nach 1990)
        </span>
        <span className='legend-item'>
          <span className='dot old'></span> Alt (geboren vor 1970)
        </span>
        <span className='legend-item'>
          <span className='dot very-young'></span> Sehr jung (geboren ab 2000 — Zelle)
        </span>
      </div>

      <div className='scroll-container'>
        <table className='data-table styled-table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Geburtsdatum</th>
              <th>Firma</th>
              <th>Kategorie</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className={getRowClass(c)}>
                <td className='id-cell'>{c.id}</td>
                <td>{c.name}</td>
                <td className={getBirthdateCellClass(c)}>{c.birthdate}</td>
                <td>{c.company}</td>
                <td>
                  <span className={`category-badge ${categorizeContact(c).toLowerCase()}`}>{categorizeContact(c)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Element — wenn sichtbar, wird nachgeladen */}
        <div ref={observerRef} className='scroll-sentinel'>
          {loading && <span className='loading-text'>Lade weitere Kontakte...</span>}
          {!hasMore && <span className='loading-text'>Alle {contacts.length} Kontakte geladen</span>}
        </div>
      </div>

      <div className='scroll-info'>
        {contacts.length} Kontakte geladen {hasMore && '— scrolle nach unten für mehr'}
      </div>
    </div>
  )
}
