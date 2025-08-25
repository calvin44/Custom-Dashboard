import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme
} from '@mui/material'

interface DataTableProps {
  tableData: TableData
}

export const DataTable: React.FC<DataTableProps> = ({ tableData }) => {
  const theme = useTheme()
  return (
    <TableContainer sx={{ marginTop: 2 }}>
      <Table stickyHeader sx={{ border: `1px solid ${theme.palette.divider}` }}>
        <TableHead>
          <TableRow>
            <TableCell>Rod</TableCell>
            <TableCell>PD</TableCell>
            <TableCell>SizeL</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Ovality</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.Rod}>
              <TableCell>{row.Rod}</TableCell>
              <TableCell>{row.PD}</TableCell>
              <TableCell>{row.SizeL}</TableCell>
              <TableCell>{row.Weight}</TableCell>
              <TableCell>{row.Ovality}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
