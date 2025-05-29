import React, {useContext, useEffect, useState } from 'react'
import { createContext } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextProps {
    theme:Theme,
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeProvider : React.FC<{ children: React.ReactNode }> = ({children}) => {

    const [theme, setTheme] = useState<Theme>('light')

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') as Theme | null
        if (storedTheme){
            setTheme(storedTheme)
            document.documentElement.classList.toggle('dark', storedTheme === 'dark')
        } else {
            const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            setTheme(preferDark ? 'dark' : 'light')
            document.documentElement.classList.toggle('darl', preferDark)
        }
    })

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        document.documentElement.classList.toggle('dark', newTheme === 'dark')
    }
    return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
        {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) throw new Error('useTheme harus dipakai di dalam ThemeProvider')
        return context
}