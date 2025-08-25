// Load electron type
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../preload/index.d.ts" />

import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove'
import CropSquareIcon from '@mui/icons-material/CropSquare'
import CloseIcon from '@mui/icons-material/Close'

export const TitleBar: React.FC = () => {
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
        variant="dense"
        sx={{
          padding: '0 !important',
          minHeight: '30px !important',
          margin: 0
        }}
      >
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, userSelect: 'none', lineHeight: '30px', py: 1, px: 2 }}
        >
          My Dashboard
        </Typography>

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
