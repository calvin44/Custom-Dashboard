type TableData = DataRow[]

interface DataRow {
  Ovality: string
  PD: string
  Rod: number
  SizeL: number
  Weight: number
}

interface ApiResponse {
  BrandName: string
  TableData: TableData
}
