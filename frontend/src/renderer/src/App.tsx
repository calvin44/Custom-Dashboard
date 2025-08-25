import { useEffect, useState } from 'react'
import { Box, Divider, Skeleton, Typography } from '@mui/material'
import { api } from './api/client'
import { DataTable, TitleBar, TopData } from '@renderer/components'

interface AppProps {
  mode: 'light' | 'dark'
  toggleMode: () => void
}

const App: React.FC<AppProps> = () => {
  const [brandName, setBrandName] = useState<string>('')
  const [tableData, setTableData] = useState<TableData>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (brandName) setLoading(false)
  }, [brandName])

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const apiResponse = await api.getDataTable()

        // Only update if data actually changed
        if (
          apiResponse.BrandName !== brandName ||
          JSON.stringify(apiResponse.TableData) !== JSON.stringify(tableData)
        ) {
          setBrandName(apiResponse.BrandName)
          setTableData(apiResponse.TableData)
        }
      } catch (error) {
        console.error('Failed to fetch data table:', error)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [brandName, tableData])

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        m: 0,
        overflow: 'auto'
      }}
    >
      <TitleBar />
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
            <Skeleton
              variant="text"
              width={200}
              height={100}
              sx={{ mx: 'auto', display: 'block' }}
            />
          ) : (
            <Typography variant="h2" textAlign="center">
              {brandName}
            </Typography>
          )}
          <Divider sx={{ width: '100%' }} />

          {/* Top data part for constants */}
          <TopData />

          {/* Data table part for displaying data */}
          <DataTable tableData={tableData} />
        </Box>
      </Box>
    </Box>
  )
}

export default App
