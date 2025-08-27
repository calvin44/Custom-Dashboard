const BaseUrl = 'http://localhost:8000'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BaseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json'
      // add auth token here if needed
    },
    ...options
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`API request failed: ${res.status} ${res.statusText} - ${text}`)
  }

  return res.json()
}

export const api = {
  getDataTable: () => request<DataTable>('/get-data-table'),
  getConfig: () => request<ConfigTable>('/get-config'),
  updateConfig: (data: ConfigTable) =>
    request<void>('/overwrite-config', {
      method: 'POST',
      body: JSON.stringify(data)
    })
}
