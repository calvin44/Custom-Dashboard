import { Box, Divider, Skeleton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { TopData } from './TopData'
import { DataTable } from './DataTable'
import { api } from '@renderer/api/client'

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = () => {
  const [brandName, setBrandName] = useState<string>('')
  const [tableData, setTableData] = useState<TableData>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const apiResponse = await api.getDataTable()

        const newBrandName = apiResponse.BrandName || ''
        const newTableData = apiResponse.TableData || []

        const brandChanged = newBrandName !== brandName
        const tableChanged = JSON.stringify(newTableData) !== JSON.stringify(tableData)

        if (!brandChanged && !tableChanged) return // early return if nothing changed

        setLoading(true)

        if (brandChanged) setBrandName(newBrandName)
        if (tableChanged) setTableData(newTableData)
      } catch (error) {
        console.error('Failed to fetch data table:', error)
      } finally {
        setLoading(false)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [brandName, tableData])

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2 // spacing between elements
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="stretch"
        width="100%"
      >
        {/* Title part for brand name rendering */}
        {loading ? (
          <Skeleton variant="text" width={200} height={100} sx={{ mx: 'auto', display: 'block' }} />
        ) : (
          <Typography variant="h2" textAlign="center">
            {brandName ? brandName : 'No Data'}
          </Typography>
        )}
        <Divider sx={{ width: '100%' }} />

        {/* Top data part for constants */}
        <TopData />

        {/* Data table part for displaying data */}
        <DataTable tableData={tableData} />
      </Box>
    </Box>
  )
}
