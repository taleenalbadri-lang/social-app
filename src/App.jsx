import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Notfound from './pages/NotFound'
import { ToastContainer } from 'react-toastify'
import { HeroUIProvider } from "@heroui/react";
import ProtectedRoute from './pages/ProtectedRoute'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import PostDetails from './pages/PostDetails'
import { Offline } from 'react-detect-offline'


export default function App() {
  const routes = createBrowserRouter([
    {
      path: '/', element: <Layout></Layout>, children: [
        { index: true, element: <Login></Login> },
        { path: '/register', element: <Register></Register> },
        { path: '/home', element: <ProtectedRoute><Home></Home></ProtectedRoute> },
        { path: '/profile', element: <ProtectedRoute><Profile></Profile></ProtectedRoute> },
        { path: '/postdetails/:id', element: <ProtectedRoute><PostDetails></PostDetails></ProtectedRoute> },
        { path: '*', element: <Notfound></Notfound> }
      ]
    },
  ])

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 1000 * 60 * 60,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      }
    }
  })

  return (
    <>
      <Offline>Oops! check your internet connection</Offline>

      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />


        <HeroUIProvider>
          <RouterProvider router={routes} />
        </HeroUIProvider>

        <ToastContainer position="top-center" autoClose={3000}></ToastContainer>

      </QueryClientProvider>
    </>
  )
}
