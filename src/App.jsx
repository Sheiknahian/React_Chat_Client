import './App.css'
import BottomNav from './Components/BottomNav'
import TopNav from './Components/TopNav'
import Users from './Components/Users'

function App() {
  return (
    <div className='bg-white min-h-screen'>
      <div>
        <TopNav></TopNav>
      </div>

      <div>
        <Users></Users>
      </div>
    </div>
  )
}

export default App
