import * as React from 'react'
import { Dashboard, SettingsApplications } from '@mui/icons-material'
import { TabContext, TabList } from '@mui/lab'
import { Box, Tab } from '@mui/material'

interface NavbarProps {
  setFeature: React.Dispatch<React.SetStateAction<Feature>>
  feature: Feature
}

export const Navbar: React.FC<NavbarProps> = ({ setFeature, feature }) => {
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={feature}>
        <TabList
          onChange={(_, newValue) => setFeature(newValue)}
          aria-label="Feature Tabs"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Dashboard" value="Dashboard" icon={<Dashboard />} iconPosition="start" />
          <Tab label="Config" value="Config" icon={<SettingsApplications />} iconPosition="start" />
        </TabList>
      </TabContext>
    </Box>
  )
}
