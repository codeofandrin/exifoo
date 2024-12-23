/// <reference types="vite-plugin-svgr/client" />

import React from "react"
import ReactDOM from "react-dom/client"
import { ErrorBoundary } from "react-error-boundary"

import App from "./App"
import GlobalError, { logError } from "./components/GlobalError"
import "./styles/main.css"

declare global {
  interface Window {
    electronAPI: {
      // Sender
      menuAbout: Function
      checkForUpdates: Function
      quitAndInstallUpdate: Function
      removeShowAboutListeners: Function
      logError: Function
      restart: Function
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
    <ErrorBoundary fallbackRender={GlobalError} onError={logError}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)
