import { useState } from 'react'
import { AuthProvider } from './context/provider/AuthProvider'
import { useAuth } from './hooks/useAuth'
import { useRooms } from './hooks/useRooms'
import { GameTable } from './pages/singles/game/GameTable'
import { Navigation } from './pages/singles/login/Navigation'
import { RoomBrowse } from './pages/RoomBrowse'
import { RoomStatus } from './types/RoomDto'
import type { RoomPlayerDto } from './types/RoomPlayerDto'

function AppContent() {
  const { pseudo } = useAuth()
  const { rooms, error: roomsError, loading: roomsLoading, refresh, joinGroup, leaveGroup } = useRooms()
  const [activeGame, setActiveGame] = useState<RoomPlayerDto | null>(null)
  const [currentView, setCurrentView] = useState<'rooms' | 'game'>('rooms')

  const myPlayingRooms = rooms.filter(
    rp => rp.room.status === RoomStatus.Playing && rp.players.some(p => p.pseudo === pseudo)
  )

  function handleEnterGame(rp: RoomPlayerDto) {
    setActiveGame(rp)
    setCurrentView('game')
  }

  return (
    <>
      <Navigation
        myPlayingRooms={myPlayingRooms}
        onEnterGame={handleEnterGame}
      />
      {currentView === 'game' && activeGame ? (
        <GameTable
          roomPlayer={activeGame}
          currentPseudo={pseudo}
          onExit={() => setCurrentView('rooms')}
        />
      ) : (
        <div className="container">
          <RoomBrowse
            rooms={rooms}
            roomsError={roomsError}
            roomsLoading={roomsLoading}
            onRefresh={refresh}
            onEnterGame={handleEnterGame}
            joinGroup={joinGroup}
            leaveGroup={leaveGroup}
          />
        </div>
      )}
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
