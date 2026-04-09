import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RootLayout } from './pages/RootLayout'
import { RoomsPage } from './pages/RoomsPage'
import { GamePage } from './pages/GamePage'

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            { index: true, element: <Navigate to="/rooms" replace /> },
            { path: '/rooms', element: <RoomsPage /> },
            { path: '/game/:roomId', element: <GamePage /> },
        ],
    },
])
