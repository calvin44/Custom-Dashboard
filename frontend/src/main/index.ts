import fs from 'fs'
import fetch from 'node-fetch'
import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { spawn, ChildProcessWithoutNullStreams } from 'child_process'
import { getBackendExecutablePath, getRuntimeDirectory, killPortIfOccupied } from './utils'

// Reference to the backend process
let backendProcess: ChildProcessWithoutNullStreams | null = null

/**
 * Start the backend executable.
 * - Kill any process occupying port 8000
 * - Spawn the backend process
 * - Capture its stdout/stderr and write to a log file
 * - Wait until backend is ready to serve requests
 */
async function startBackend(): Promise<void> {
  // Ensure port is free
  killPortIfOccupied(8000)

  // Prepare runtime directory and log file path
  const runtimeDir = getRuntimeDirectory()
  const backendPath = getBackendExecutablePath()
  const logFile = join(runtimeDir, 'backend.log')

  console.log(`[Backend] Starting backend process: ${backendPath}`)
  console.log(`[Backend] log file: ${logFile}`)

  // Spawn backend process
  backendProcess = spawn(backendPath, [], { stdio: 'pipe' })

  // Capture stdout and log it
  backendProcess.stdout.on('data', (chunk) => {
    const msg = chunk.toString()
    console.log(`[Backend] ${msg}`)
    fs.appendFileSync(logFile, msg)
  })

  // Capture stderr and log errors
  backendProcess.stderr.on('data', (chunk) => {
    const msg = chunk.toString()
    console.error(`[Backend ERROR] ${msg}`)
    fs.appendFileSync(logFile, msg)
  })

  // Handle backend exit
  backendProcess.on('exit', (code) => {
    console.log(`Backend exited with code ${code}`)
    app.quit() // Quit Electron if backend stops
  })

  // Wait for backend to start serving
  await waitForBackend()
}

/**
 * Poll the backend URL until it responds or timeout.
 */
async function waitForBackend(): Promise<void> {
  const url = 'http://127.0.0.1:8000'
  const maxRetries = 20
  const interval = 500

  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(url)
      if (res.ok) {
        console.log('Backend is ready!')
        return
      }
    } catch {
      // ignore errors while backend is not yet ready
    }
    await new Promise((resolve) => setTimeout(resolve, interval))
  }

  throw new Error('Backend did not start in time')
}

/**
 * Create the main Electron window
 * - Sets window size, frame, icon, preload script
 * - Handles opening external links in default browser
 * - Asks user for confirmation before closing
 */
function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    show: false, // don't show until ready
    autoHideMenuBar: true,
    frame: false,
    icon: join(app.getAppPath(), 'resources/robotiive-logo.png'),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.maximize()

  // Show the window when it’s ready
  mainWindow.on('ready-to-show', () => mainWindow.show())

  // Confirm close
  mainWindow.on('close', (e) => {
    const choice = dialog.showMessageBoxSync(mainWindow!, {
      type: 'question',
      buttons: ['Yes', 'No'],
      title: 'Confirm',
      message: 'Are you sure you want to quit?'
    })
    if (choice === 1) {
      e.preventDefault() // cancel close
    }
  })

  // Handle links to open externally
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // Load URL in dev mode or local file in production
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// Run when Electron is ready
app.whenReady().then(async () => {
  // Set user model ID for Windows notifications
  electronApp.setAppUserModelId('com.electron')

  // Enable dev shortcuts or disable reload in production
  app.on('browser-window-created', (_, window) => optimizer.watchWindowShortcuts(window))

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  // IPC handlers for custom titlebar buttons
  ipcMain.on('window-minimize', (event) => BrowserWindow.fromWebContents(event.sender)?.minimize())
  ipcMain.on('window-maximize', (event) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    window?.isMaximized() ? window.unmaximize() : window?.maximize()
  })
  ipcMain.on('window-close', (event) => BrowserWindow.fromWebContents(event.sender)?.close())

  // Start backend first, then show frontend window
  await startBackend()
  createWindow()

  // On macOS, re-create a window if none are open
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Handle quitting
app.on('window-all-closed', () => {
  // Kill backend when all windows closed
  backendProcess?.kill()
  if (process.platform !== 'darwin') app.quit()
})
