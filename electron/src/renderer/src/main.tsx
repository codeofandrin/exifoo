/**
 * Copyright (c) codeofandrin 
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/// <reference types="vite-plugin-svgr/client" />

import React from "react"
import ReactDOM from "react-dom/client"
import { ErrorBoundary } from "react-error-boundary"
import * as Sentry from "@sentry/electron/renderer"

import App from "./App"
import GlobalError, { logError } from "./components/GlobalError"
import "./styles/main.css"

Sentry.init({
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: 1.0,

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/session-replay/configuration/#general-integration-configuration
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0
})

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
