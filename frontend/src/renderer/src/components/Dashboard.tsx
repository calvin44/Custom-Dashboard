import { Box, Divider, Skeleton, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { TopData } from './TopData'
import { DataTable } from './DataTable'
import { api } from '@renderer/api/client'

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = () => {
  const [brandName, setBrandName] = useState<string>('')
  const [tableData, setTableData] = useState<TableData>([])
  const [configData, setConfigData] = useState<ConfigTable>([])
  const [loading, setLoading] = useState(false)

  const brandConfig = useMemo(
    () => configData.find((item) => item.BrandName === brandName),
    [configData, brandName]
  )

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const getTableDataResponse = await api.getDataTable()
        const getConfigResponse = await api.getConfig()

        const newBrandName = getTableDataResponse.BrandName || ''
        const newTableData = getTableDataResponse.TableData || []

        const brandChanged = newBrandName !== brandName
        const tableChanged = JSON.stringify(newTableData) !== JSON.stringify(tableData)
        const configDataChanged = JSON.stringify(getConfigResponse) !== JSON.stringify(configData)

        setLoading(true)

        if (brandChanged) setBrandName(newBrandName)
        if (tableChanged) setTableData(newTableData)
        if (configDataChanged) setConfigData(getConfigResponse)
      } catch (error) {
        console.error('Failed to fetch data table:', error)
      } finally {
        setLoading(false)
      }
    }

    // Initial fetch
    fetchData()

    // Polling every 5s
    const interval = setInterval(fetchData, 5000)

    return () => clearInterval(interval)
  }, [brandName, configData, tableData])

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
        <TopData configRow={brandConfig} />

        {/* Data table part for displaying data */}
        <DataTable tableData={tableData} configData={brandConfig} />
      </Box>
    </Box>
  )
}
