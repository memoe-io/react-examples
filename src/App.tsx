import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Sidebar } from './components/Sidebar'
import { ContactsView } from './views/ContactsView'
import { DashboardView } from './views/DashboardView'
import { FormDemoView } from './views/FormDemoView'
import { HomeView } from './views/HomeView'
import { LibrariesView } from './views/LibrariesView'
import { StyledContactsView } from './views/StyledContactsView'

const App = () => {
  return (
    <>
      <Sidebar />
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<HomeView />} />
          <Route path='/contacts' element={<ContactsView />} />
          <Route path='/styled' element={<StyledContactsView />} />
          <Route path='/forms' element={<FormDemoView />} />
          <Route path='/libraries' element={<LibrariesView />} />
          <Route path='/dashboard' element={<DashboardView />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </main>
    </>
  )
}

export default App
