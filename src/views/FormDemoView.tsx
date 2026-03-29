import { useState } from 'react'
import type { Contact } from '../data/contacts'
import './FormDemoView.css'

/**
 * Form demo showing both approaches:
 * 1. Plain React state (like the edit dialog)
 * 2. Code example of how react-hook-form would look
 */
export const FormDemoView = () => {
  // Plain React form state
  const [form, setForm] = useState({ name: '', birthdate: '', company: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState<Contact | null>(null)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name || form.name.length < 5) e.name = 'Mindestens 5 Zeichen'
    if (form.name.length > 100) e.name = 'Maximal 100 Zeichen'
    if (!form.birthdate) e.birthdate = 'Pflichtfeld'
    if (!form.company) e.company = 'Pflichtfeld'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      setSubmitted({ id: Date.now(), ...form })
      setForm({ name: '', birthdate: '', company: '' })
      setErrors({})
    }
  }

  return (
    <div className='form-demo-view'>
      <h1>Formulare in React</h1>

      <div className='hint'>
        <strong>React:</strong> Mehrere Ansätze — von plain <code>useState</code> bis zu Libraries wie <code>react-hook-form</code>.
      </div>

      <div className='form-columns'>
        {/* Approach 1: Plain React */}
        <div className='form-section'>
          <h2>Ansatz 1: Plain React (useState)</h2>
          <p className='section-desc'>Funktioniert gut für einfache Formulare. State + Validation manuell.</p>

          <form onSubmit={handleSubmit} className='demo-form'>
            <div className='form-field'>
              <label htmlFor='plain-name'>Name *</label>
              <input id='plain-name' value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder='Min. 5 Zeichen' className={errors.name ? 'error' : ''} />
              {errors.name && <span className='field-error'>{errors.name}</span>}
            </div>

            <div className='form-field'>
              <label htmlFor='plain-date'>Geburtsdatum *</label>
              <input id='plain-date' type='date' value={form.birthdate} onChange={(e) => setForm((f) => ({ ...f, birthdate: e.target.value }))} className={errors.birthdate ? 'error' : ''} />
              {errors.birthdate && <span className='field-error'>{errors.birthdate}</span>}
            </div>

            <div className='form-field'>
              <label htmlFor='plain-company'>Firma *</label>
              <input id='plain-company' value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} className={errors.company ? 'error' : ''} />
              {errors.company && <span className='field-error'>{errors.company}</span>}
            </div>

            <button type='submit' className='btn btn-primary'>
              Speichern
            </button>
          </form>

          {submitted && (
            <div className='success-msg'>
              Gespeichert: {submitted.name} ({submitted.company})
            </div>
          )}
        </div>

        {/* Approach 2: Code comparison */}
        <div className='form-section'>
          <h2>Ansatz 2: react-hook-form + zod</h2>
          <p className='section-desc'>Für komplexere Formulare. Weniger Re-Renders, Schema-basierte Validation.</p>

          <div className='code-comparison'>
            <h3>z.B. Vaadin (Java)</h3>
            <pre className='code-block'>{`// Vaadin Binder
Binder<Contact> binder = new Binder<>(Contact.class);

TextField name = new TextField("Name");
binder.forField(name)
  .withValidator(new StringLengthValidator(
    "5-100 Zeichen", 5, 100))
  .bind(Contact::getName, Contact::setName);

DatePicker birthdate = new DatePicker("Geburtsdatum");
binder.forField(birthdate)
  .asRequired("Pflichtfeld")
  .bind(Contact::getBirthdate, Contact::setBirthdate);

// Validation passiert automatisch beim Binding`}</pre>

            <h3>React (react-hook-form + zod)</h3>
            <pre className='code-block'>{`// Schema mit zod
const schema = z.object({
  name: z.string().min(5).max(100),
  birthdate: z.string().min(1, "Pflichtfeld"),
  company: z.string().min(1, "Pflichtfeld"),
});

// Form mit react-hook-form
const ContactForm = () => {
  const { register, handleSubmit, formState: { errors } }
    = useForm({ resolver: zodResolver(schema) });

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <input {...register("name")} />
      {errors.name && <span>{errors.name.message}</span>}

      <input type="date" {...register("birthdate")} />
      <input {...register("company")} />

      <button type="submit">Speichern</button>
    </form>
  );
}`}</pre>
          </div>

          <div className='library-comparison'>
            <h3>Library-Vergleich</h3>
            <table className='info-table'>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Vaadin Binder</th>
                  <th>react-hook-form</th>
                  <th>formik</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Data Binding</td>
                  <td>Automatisch (getter/setter)</td>
                  <td>
                    <code>register()</code>
                  </td>
                  <td>
                    <code>&lt;Field&gt;</code> Component
                  </td>
                </tr>
                <tr>
                  <td>Validation</td>
                  <td>Bean Validation / Custom</td>
                  <td>zod / yup / custom</td>
                  <td>yup / custom</td>
                </tr>
                <tr>
                  <td>Performance</td>
                  <td>Server-side, kein Thema</td>
                  <td>Uncontrolled = wenig Renders</td>
                  <td>Controlled = mehr Renders</td>
                </tr>
                <tr>
                  <td>Lernkurve</td>
                  <td>Niedrig (Java-Devs)</td>
                  <td>Mittel</td>
                  <td>Niedrig</td>
                </tr>
                <tr>
                  <td>Bundle Size</td>
                  <td>n/a (Server)</td>
                  <td>~9 KB</td>
                  <td>~13 KB</td>
                </tr>
                <tr>
                  <td>TypeScript</td>
                  <td>Java Generics</td>
                  <td>Exzellent</td>
                  <td>Gut</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
