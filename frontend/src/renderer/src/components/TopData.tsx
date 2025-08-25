import {
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useTheme
} from '@mui/material'

export const TopData: React.FC = () => {
  const theme = useTheme()
  return (
    <TableContainer>
      <Table sx={{ width: '50%', border: `1px solid ${theme.palette.divider}`, mt: 1 }}>
        <TableBody>
          <TableRow>
            <CustomTableCell sx={{ borderRight: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h5">中心值</Typography>
            </CustomTableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <CustomTableCell sx={{ borderRight: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h5">平均值</Typography>
            </CustomTableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <CustomTableCell sx={{ borderRight: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h5">標準差</Typography>
            </CustomTableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.divider}`,
  width: '30%'
}))
