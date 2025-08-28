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

interface TopDataProps {
  configRow?: ConfigRow
}

export const TopData: React.FC<TopDataProps> = ({ configRow }) => {
  const theme = useTheme()
  return (
    <TableContainer>
      <Table sx={{ width: '50%', border: `1px solid ${theme.palette.divider}`, mt: 1 }}>
        <TableBody>
          <TableRow>
            <CustomTableCell sx={{ borderRight: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h5">中心值</Typography>
            </CustomTableCell>
            <TableCell>
              <Typography variant="h6">{configRow?.Median || 'None'}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <CustomTableCell sx={{ borderRight: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h5">平均值</Typography>
            </CustomTableCell>
            <TableCell>
              <Typography variant="h6">{configRow?.Mean || 'None'}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <CustomTableCell sx={{ borderRight: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h5">標準差</Typography>
            </CustomTableCell>
            <TableCell>
              <Typography variant="h6">{configRow?.STD || 'None'}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <CustomTableCell sx={{ borderRight: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h5">Min</Typography>
            </CustomTableCell>
            <TableCell>
              <Typography variant="h6">{configRow?.Min || 'None'}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <CustomTableCell sx={{ borderRight: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h5">Max</Typography>
            </CustomTableCell>
            <TableCell>
              <Typography variant="h6">{configRow?.Max || 'None'}</Typography>
            </TableCell>
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
