type TableData = DataRow[]

interface DataRow {
  Ovality: string
  PD: string
  Rod: number
  SizeL: number
  Weight: number
}

interface DataTable {
  BrandName: string
  TableData: TableData
}

interface ConfigRow {
  BrandName: string
  Median: string
  Mean: string
  STD: string
  Min: number
  Max: number
}

type Feature = 'Dashboard' | 'Config'
type ConfigTable = ConfigRow[]
