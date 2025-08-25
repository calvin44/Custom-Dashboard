import type { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
  }
}

// This export ensures TS treats this file as a module
export type { ElectronAPI }
