// Load electron type
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../preload/index.d.ts" />

import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove'
import CropSquareIcon from '@mui/icons-material/CropSquare'
import CloseIcon from '@mui/icons-material/Close'

interface TitleBarProps {
  feature: Feature
}

export const TitleBar: React.FC<TitleBarProps> = ({ feature }) => {
  const { ipcRenderer } = window.electron

  return (
    <AppBar
      position="static"
      sx={{
        WebkitAppRegion: 'drag',
        boxShadow: 'none'
      }}
    >
      <Toolbar
        sx={{
          position: 'relative', // needed for absolute children
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 !important',
          minHeight: '30px !important'
        }}
      >
        {/* Left: App title */}
        <Typography variant="h6" sx={typographySx}>
          My Dashboard
        </Typography>

        {/* Center: Feature */}
        <Box>
          <Typography variant="h6" sx={typographySx}>
            {feature}
          </Typography>
        </Box>

        {/* Right: Window buttons */}
        <Box sx={{ display: 'flex' }}>
          <IconButton
            sx={buttonSx}
            aria-label="Minimize window"
            onClick={() => ipcRenderer.send('window-minimize')}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>

          <IconButton
            sx={buttonSx}
            aria-label="Maximize window"
            onClick={() => ipcRenderer.send('window-maximize')}
          >
            <CropSquareIcon fontSize="small" />
          </IconButton>

          <IconButton
            sx={buttonSx}
            aria-label="Close window"
            onClick={() => ipcRenderer.send('window-close')}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

// Common styles for minimize and maximize buttons
const buttonSx = {
  WebkitAppRegion: 'no-drag',
  color: 'white',
  padding: 1.5,
  borderRadius: 0,
  '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
  '&:active': { backgroundColor: 'rgba(255,255,255,0.4)' }
}

const typographySx = { userSelect: 'none', lineHeight: '30px', py: 1, px: 2 }
