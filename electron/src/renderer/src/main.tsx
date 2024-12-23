/// <reference types="vite-plugin-svgr/client" />

import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App"
import "./styles/main.css"

declare global {
  interface Window {
    electronAPI: {
      // Sender
      menuAbout: Function
      checkForUpdates: Function
      quitAndInstallUpdate: Function
      removeShowAboutListeners: Function
      // Listener
      onShowAbout: Function
      onCheckingForUpdate: Function
      onUpdateNotAvailable: Function
      onUpdateAvailable: Function
      onUpdateDownloadProgress: Function
      onUpdateReady: Function
      onUpdateError: Function
    }
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
