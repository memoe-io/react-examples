import { useState } from 'react'
import type { Contact } from '../data/contacts'
import './EditContactDialog.css'

interface Props {
  contact: Contact
  onSave: (contact: Contact) => void
  onClose: () => void
}

/**
 * Modal dialog with contact form.
 *
 * React: Plain state + validation logic. For complex forms, use react-hook-form.
 */
export const EditContactDialog = ({ contact, onSave, onClose }: Props) => {
  const [form, setForm] = useState({ ...contact })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = (): boolean => {
    const e: Record<string, string> = {}
    if (!form.name || form.name.length < 5 || form.name.length > 100) {
      e.name = 'Name muss zwischen 5 und 100 Zeichen lang sein'
    }
    if (!form.birthdate) {
      e.birthdate = 'Geburtsdatum ist erforderlich'
    }
    if (!form.company) {
      e.company = 'Firma ist erforderlich'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSave(form)
    }
  }

  const handleChange = (field: keyof Contact, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    // Clear error on change
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  return (
    <div className='dialog-overlay' onClick={onClose}>
      <div className='dialog' onClick={(e) => e.stopPropagation()}>
        <div className='dialog-header'>
          <h2>Kontakt bearbeiten</h2>
          <button className='dialog-close' onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className='contact-form'>
          <div className='form-field'>
            <label htmlFor='name'>Name</label>
            <input id='name' type='text' value={form.name} onChange={(e) => handleChange('name', e.target.value)} className={errors.name ? 'error' : ''} />
            {errors.name && <span className='field-error'>{errors.name}</span>}
          </div>

          <div className='form-field'>
            <label htmlFor='birthdate'>Geburtsdatum</label>
            <input id='birthdate' type='date' value={form.birthdate} onChange={(e) => handleChange('birthdate', e.target.value)} className={errors.birthdate ? 'error' : ''} />
            {errors.birthdate && <span className='field-error'>{errors.birthdate}</span>}
          </div>

          <div className='form-field'>
            <label htmlFor='company'>Firma</label>
            <input id='company' type='text' value={form.company} onChange={(e) => handleChange('company', e.target.value)} className={errors.company ? 'error' : ''} />
            {errors.company && <span className='field-error'>{errors.company}</span>}
          </div>

          <div className='dialog-footer'>
            <button type='button' className='btn' onClick={onClose}>
              Abbrechen
            </button>
            <button type='submit' className='btn btn-primary'>
              Speichern
            </button>
          </div>
        </form>

        <div className='hint' style={{ margin: '0 20px 16px' }}>
          <strong>React:</strong> Manuelle State-Verwaltung + validate(). Für größere Forms: <code>react-hook-form</code> + <code>zod</code>.
        </div>
      </div>
    </div>
  )
}
