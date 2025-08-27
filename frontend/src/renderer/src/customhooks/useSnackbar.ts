import { useState } from 'react'
import { AlertColor } from '@mui/material'

interface SnackbarState {
  open: boolean
  message: string
  severity: AlertColor
}

export const useSnackbar = (): SnackbarState & {
  showSnackbar: (msg: string, sev?: AlertColor) => void
  handleClose: () => void
} => {
  const [state, setState] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'info'
  })

  const showSnackbar = (msg: string, sev?: AlertColor): void => {
    // Close first, then reopen to reset
    setState((prev) => ({ ...prev, open: false }))
    setTimeout(() => {
      setState({
        open: true,
        message: msg,
        severity: sev || 'info'
      })
    }, 0)
  }

  const handleClose = (): void => setState((prev) => ({ ...prev, open: false }))

  return { ...state, showSnackbar, handleClose }
}
