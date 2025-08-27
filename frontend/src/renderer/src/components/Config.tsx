import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  useTheme,
  CircularProgress,
  Badge,
  IconButton,
  SxProps
} from '@mui/material'
import { Add, Delete, Save } from '@mui/icons-material'
import { api } from '@renderer/api/client'
import { useSnackbar } from '@renderer/customhooks'
import { Alert } from './Alert'

export const Config: React.FC = () => {
  const [configData, setConfigData] = useState<ConfigTable>([])
  const [changesAvailable, setChangesAvailable] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [problematicRows, setProblematicRows] = useState<number[]>([])

  const errorMessage = `Rows ${problematicRows.map((i) => i + 1).join(', ')} contain invalid values. Please review.`
  const { showSnackbar, ...snackbarProps } = useSnackbar()

  useEffect(() => {
    const problemIndex = configData
      .map((row, index) => (row.BrandName === '' ? index : -1))
      .filter((index) => index !== -1)
    setProblematicRows(problemIndex)
  }, [configData])

  // Hardcoded headers
  const headers: (keyof ConfigRow)[] = ['BrandName', 'Median', 'Mean', 'STD', 'Min', 'Max']

  const fetchConfig = async (): Promise<void> => {
    try {
      const apiResponse = await api.getConfig()
      setConfigData(apiResponse)
    } catch (err) {
      console.error('Failed to fetch config', err)
    }
  }

  const updateConfig = async (): Promise<void> => {
    try {
      setUpdating(true)
      await api.updateConfig(configData)
    } catch (err) {
      console.error('Failed to update config', err)
    } finally {
      setUpdating(false)
    }
  }

  const sendUpdate = async (): Promise<void> => {
    if (problematicRows.length > 0) {
      showSnackbar(errorMessage, 'error')
      return
    }
    setChangesAvailable(false)
    await updateConfig()
    await fetchConfig()
  }

  const handleDeleteRow = (rowIndex: number): void => {
    setConfigData((prev) => prev.filter((_, index) => index !== rowIndex))
    setChangesAvailable(true)
  }

  const handleAddRow: () => void = () => {
    setConfigData((prev) => [
      ...prev,
      { BrandName: '', Median: '', Mean: '', STD: '', Min: 0, Max: 0 }
    ])
    setChangesAvailable(true)
  }

  useEffect(() => {
    fetchConfig()
  }, [])

  return (
    <Box padding={2} display="flex" flexDirection="column" gap={2} flexGrow={1} overflow="auto">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Configuration</Typography>
        <Badge color="secondary" badgeContent="!" overlap="circular" invisible={!changesAvailable}>
          <Button
            disabled={!changesAvailable}
            startIcon={updating ? <CircularProgress size={24} /> : <Save />}
            variant="contained"
            color="primary"
            sx={{ m: 2 }}
            onClick={sendUpdate}
          >
            Update
          </Button>
        </Badge>
      </Box>
      <TableContainer>
        <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header} sx={TableCellSx()}>
                  <Typography variant="h6">{header}</Typography>
                </TableCell>
              ))}
              <TableCell sx={TableCellSx()}>
                <Typography variant="h6">Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {configData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {headers.map((field) => (
                  <EditableCell
                    key={field}
                    rowIndex={rowIndex}
                    field={field}
                    value={row[field]}
                    setConfigData={setConfigData}
                    setChangesAvailable={setChangesAvailable}
                  />
                ))}
                <TableCell sx={{ textAlign: 'center' }}>
                  <IconButton color="primary" onClick={() => handleDeleteRow(rowIndex)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button sx={{ width: 300 }} variant="contained" startIcon={<Add />} onClick={handleAddRow}>
        Add Row
      </Button>
      <Alert autoHideDuration={2000} {...snackbarProps} />
    </Box>
  )
}

interface EditableCellProps {
  setConfigData: React.Dispatch<React.SetStateAction<ConfigTable>>
  setChangesAvailable: React.Dispatch<React.SetStateAction<boolean>>
  rowIndex: number
  field: keyof ConfigRow
  value: string | number
}

const EditableCell: React.FC<EditableCellProps> = ({
  setConfigData,
  rowIndex,
  field,
  value,
  setChangesAvailable
}) => {
  const [editing, setEditing] = useState(false)
  const [localValue, setLocalValue] = useState(value ?? '')

  // Sync localValue whenever the parent value changes
  useEffect(() => {
    setLocalValue(value ?? '')
  }, [value])

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    setEditing(false)
    if (localValue === value) return

    setConfigData((prev) => {
      const updated = [...prev]
      updated[rowIndex] = { ...updated[rowIndex], [field]: localValue }
      return updated
    })

    setChangesAvailable(true)
  }

  return (
    <TableCell
      onClick={() => !editing && setEditing(true)}
      sx={{ cursor: 'pointer', textAlign: 'center' }}
    >
      {editing ? (
        <TextField
          value={localValue}
          size="small"
          fullWidth
          autoFocus
          variant="outlined"
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === 'Enter') (e.target as HTMLInputElement).blur()
          }}
        />
      ) : (
        <Typography>{localValue}</Typography>
      )}
    </TableCell>
  )
}

const TableCellSx: () => SxProps = () => {
  const theme = useTheme()
  return {
    bgcolor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    textAlign: 'center'
  }
}
