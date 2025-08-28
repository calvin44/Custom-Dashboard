import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  Box,
  Typography
} from '@mui/material'
import { useCallback } from 'react'

interface DataTableProps {
  tableData: TableData
  configData?: ConfigRow
}

export const DataTable: React.FC<DataTableProps> = ({ tableData, configData }) => {
  const theme = useTheme()
  const isEmpty = !tableData || tableData.length === 0

  const cellColorByConfig = useCallback(
    (value: number) => {
      if (!configData) return theme.palette.text.primary

      const { Min, Max } = configData
      if (value < Min) return theme.palette.primary.main
      if (value > Max) return theme.palette.error.main
      return theme.palette.text.primary
    },
    [configData, theme]
  )

  return (
    <TableContainer sx={{ marginTop: 2 }}>
      <Table stickyHeader sx={{ border: `1px solid ${theme.palette.divider}` }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">Rod</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Weight</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">PD</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">SizeL</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Ovality</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isEmpty ? (
            <TableRow>
              <TableCell colSpan={5}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 200,
                    color: theme.palette.text.secondary
                  }}
                >
                  <Typography>No data</Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            tableData.map((row) => (
              <TableRow key={row.Rod}>
                <TableCell>
                  <Typography variant="h6">{row.Rod}</Typography>
                </TableCell>
                <TableCell sx={{ color: cellColorByConfig(row.Weight) }}>
                  <Typography variant="h6">{row.Weight}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">{row.PD}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">{row.SizeL}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">{row.Ovality}</Typography>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
