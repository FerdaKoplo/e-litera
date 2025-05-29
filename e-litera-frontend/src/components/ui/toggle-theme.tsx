import { useTheme } from '@/context/ThemeContext'
import { Moon, Sun } from 'lucide-react'
import React from 'react'

const ThemeToggle : React.FC = () => {
  
    const {theme, toggleTheme} = useTheme()
  
    return (
        <button onClick={toggleTheme}>
            {theme === 'dark' ? <Sun /> : <Moon />}
        </button>
    )
}

export default ThemeToggle