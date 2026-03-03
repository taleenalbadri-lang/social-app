import { createRoot } from 'react-dom/client'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'
import App from './App.jsx'
import ThemeContextProvider from './context/ThemeContext.jsx'
import AuthContextProvider from './context/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
        <ThemeContextProvider>
            <App />
        </ThemeContextProvider>
    </AuthContextProvider>
)
