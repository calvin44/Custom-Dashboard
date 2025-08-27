import { Close } from '@mui/icons-material'
import {
  IconButton,
  Snackbar,
  SnackbarProps,
  Alert as MuiAlert,
  AlertProps as MuiAlertProps,
  Slide
} from '@mui/material'

interface AlertProps extends SnackbarProps {
  handleClose: () => void
  severity?: MuiAlertProps['severity']
  message?: React.ReactNode
}

export const Alert: React.FC<AlertProps> = ({
  handleClose,
  severity = 'info',
  message,
  ...snackbarProps
}) => {
  return (
    <Snackbar
      {...snackbarProps}
      onClose={handleClose}
      message={undefined}
      slots={{ transition: (props) => <Slide {...props} direction="up" /> }}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
          <Close fontSize="small" />
        </IconButton>
      }
    >
      <MuiAlert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
        {message}
      </MuiAlert>
    </Snackbar>
  )
}
