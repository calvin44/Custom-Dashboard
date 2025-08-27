import { useState } from 'react'
import { Box } from '@mui/material'
import { Config, Dashboard, Navbar, TitleBar } from '@renderer/components'

interface AppProps {
  mode: 'light' | 'dark'
  toggleMode: () => void
}

const App: React.FC<AppProps> = () => {
  const [feature, setFeature] = useState<Feature>('Config')

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        m: 0,
        overflow: 'auto'
      }}
    >
      <TitleBar feature={feature} />
      <Navbar feature={feature} setFeature={setFeature} />
      {feature === 'Dashboard' && <Dashboard />}
      {feature === 'Config' && <Config />}
    </Box>
  )
}

export default App
