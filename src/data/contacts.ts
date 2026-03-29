import { faker } from '@faker-js/faker/locale/de'

export interface Contact {
  id: number
  name: string
  birthdate: string
  company: string
}

export type ContactCategory = 'OLD' | 'YOUNG' | 'OTHER'

// Generate 10,000 contacts (like another demo with DataFaker)
let contacts: Contact[] = []

export const generateContacts = (count = 10_000): Contact[] => {
  faker.seed(42) // reproducible data
  contacts = Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: faker.person.fullName(),
    birthdate: faker.date.birthdate({ min: 1950, max: 2005, mode: 'year' }).toISOString().split('T')[0],
    company: faker.company.name(),
  }))
  return contacts
}

export const getContacts = (): Contact[] => {
  if (contacts.length === 0) generateContacts()
  return contacts
}

// Paginated access for infinite scroll
export const getContactsPage = (page: number, pageSize = 50): { data: Contact[]; hasMore: boolean } => {
  const all = getContacts()
  const start = page * pageSize
  const data = all.slice(start, start + pageSize)
  return { data, hasMore: start + pageSize < all.length }
}

// Sorting
export const getContactsSorted = (sortField: keyof Contact, sortDir: 'asc' | 'desc', page: number, pageSize = 50): { data: Contact[]; hasMore: boolean; total: number } => {
  const all = [...getContacts()].sort((a, b) => {
    const va = a[sortField]
    const vb = b[sortField]
    const cmp = typeof va === 'number' ? va - (vb as number) : String(va).localeCompare(String(vb))
    return sortDir === 'asc' ? cmp : -cmp
  })
  const start = page * pageSize
  return { data: all.slice(start, start + pageSize), hasMore: start + pageSize < all.length, total: all.length }
}

export const saveContact = (contact: Contact): Contact => {
  const all = getContacts()
  const idx = all.findIndex((c) => c.id === contact.id)
  if (idx >= 0) {
    all[idx] = contact
  } else {
    contact.id = Math.max(...all.map((c) => c.id)) + 1
    all.push(contact)
  }
  return contact
}

export const categorizeContact = (contact: Contact): ContactCategory => {
  const year = new Date(contact.birthdate).getFullYear()
  if (year <= 1970) return 'OLD'
  if (year > 1990) return 'YOUNG'
  return 'OTHER'
}
