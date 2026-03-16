import { AuthProvider } from './context/provider/AuthProvider'
import { Navigation } from './pages/singles/login/Navigation'

function App() {

  return (
    <>
      <AuthProvider>
        <Navigation/>
      </AuthProvider>
      <div className="container">

      </div>
    </>
  )
}

export default App
