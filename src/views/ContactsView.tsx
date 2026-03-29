import { useCallback, useEffect, useRef, useState } from 'react'
import { EditContactDialog } from '../components/EditContactDialog'
import { type Contact, getContactsSorted, saveContact } from '../data/contacts'
import './ContactsView.css'

const PAGE_SIZE = 50

type SortField = keyof Contact
type SortDir = 'asc' | 'desc'

export const ContactsView = () => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState(0)
  const [sortField, setSortField] = useState<SortField>('id')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [loading, setLoading] = useState(false)
  const [editContact, setEditContact] = useState<Contact | null>(null)

  const observerRef = useRef<HTMLDivElement>(null)

  // Load data (simulates API call with setTimeout)
  const loadPage = useCallback(
    (pageNum: number, reset = false) => {
      setLoading(true)
      // Simulate network delay to show loading state
      setTimeout(
        () => {
          const result = getContactsSorted(sortField, sortDir, pageNum, PAGE_SIZE)
          setContacts((prev) => (reset ? result.data : [...prev, ...result.data]))
          setHasMore(result.hasMore)
          setTotal(result.total)
          setPage(pageNum)
          setLoading(false)
        },
        reset ? 0 : 300,
      )
    },
    [sortField, sortDir],
  )

  // Reset on sort change
  useEffect(() => {
    loadPage(0, true)
  }, [loadPage])

  // Infinite scroll with IntersectionObserver
  useEffect(() => {
    const el = observerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadPage(page + 1)
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasMore, loading, page, loadPage])

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
    // Reload current data
    loadPage(0, true)
    setEditContact(null)
  }

  const sortIndicator = (field: SortField) => {
    if (sortField !== field) return ' ↕'
    return sortDir === 'asc' ? ' ↑' : ' ↓'
  }

  return (
    <div className='contacts-view'>
      <div className='view-header'>
        <h1>Kontakte - Infinite Scroll</h1>
        <span className='record-count'>
          {contacts.length} / {total} geladen
        </span>
      </div>

      <div className='hint'>
        <strong>React:</strong> IntersectionObserver + manuelles Page-Loading. Ca. 30 Zeilen Code für den Scroll-Mechanismus.
      </div>

      <div className='table-container scroll-container'>
        <table className='data-table'>
          <thead>
            <tr>
              <th className='sortable' onClick={() => handleSort('id')}>
                ID{sortIndicator('id')}
              </th>
              <th className='sortable' onClick={() => handleSort('name')}>
                Name{sortIndicator('name')}
              </th>
              <th>Geburtsdatum</th>
              <th className='sortable' onClick={() => handleSort('company')}>
                Firma{sortIndicator('company')}
              </th>
              <th>Aktion</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={`${c.id}-${sortField}-${sortDir}`}>
                <td className='id-cell'>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.birthdate}</td>
                <td>{c.company}</td>
                <td>
                  <button className='btn btn-sm' onClick={() => setEditContact(c)}>
                    Bearbeiten
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* element for IntersectionObserver */}
        <div ref={observerRef} className='scroll-sentinel'>
          {loading && <div className='loading-spinner'>Lade weitere Kontakte...</div>}
          {!hasMore && <div className='end-marker'>Alle {total} Kontakte geladen</div>}
        </div>
      </div>

      {editContact && <EditContactDialog contact={editContact} onSave={handleSave} onClose={() => setEditContact(null)} />}
    </div>
  )
}
