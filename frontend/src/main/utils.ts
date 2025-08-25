import fs from 'fs'
import os from 'os'
import { join, resolve } from 'path'
import { execSync } from 'child_process'

/**
 * Returns the absolute path to the backend executable.
 */
export function getBackendExecutablePath(): string {
  // __dirname points to frontend/dist or frontend/src depending on build
  const projectRoot: string = resolve(__dirname, '..', '..', '..')
  return join(projectRoot, 'backend', 'dist', 'backend_app.exe')
}

/**
 * Kills all processes using the specified port on Windows.
 * @param port - TCP port to free
 */
export function killPortIfOccupied(port: number): void {
  try {
    const stdout: string = execSync(`netstat -ano | findstr :${port}`).toString()
    const lines: string[] = stdout.trim().split('\n')

    for (const line of lines) {
      const parts: string[] = line.trim().split(/\s+/)
      const pid: string = parts[parts.length - 1]
      if (pid && pid !== '0') {
        console.log(`[Backend] Killing PID ${pid} using port ${port}`)
        execSync(`taskkill /PID ${pid} /F`)
      }
    }
  } catch {
    console.log(`[Backend] No process found on port ${port}`)
  }
}

/**
 * Returns the runtime directory path for storing app data and logs.
 * Ensures that the directory exists.
 */
export function getRuntimeDirectory(): string {
  const localAppData: string = process.env.LOCALAPPDATA || join(os.homedir(), 'AppData', 'Local')
  const runtimeDir: string = join(localAppData, 'MyDashboard')
  fs.mkdirSync(runtimeDir, { recursive: true })
  return runtimeDir
}
