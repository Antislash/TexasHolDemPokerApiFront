import { AuthProvider } from './context/provider/AuthProvider'
import { Navigation } from './pages/singles/login/Navigation'
import { RoomBrowse } from './pages/RoomBrowse'

function App() {

  return (
    <>
      <AuthProvider>
        <Navigation/>
        <div className="container">
          <RoomBrowse/>
        </div>
      </AuthProvider>
    </>
  )
}

export default App
