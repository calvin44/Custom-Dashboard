import React, { useMemo, useState, useCallback } from 'react'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import App from './App'

const Root: React.FC = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const toggleMode = useCallback(() => setMode((prev) => (prev === 'light' ? 'dark' : 'light')), [])

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App mode={mode} toggleMode={toggleMode} />
    </ThemeProvider>
  )
}

export default Root
