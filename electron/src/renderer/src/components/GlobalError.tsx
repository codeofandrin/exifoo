import * as Sentry from "@sentry/electron/renderer"

import Button from "./common/Button"
import { EMail } from "../utils/constants"
import ImgErrorIllus from "../assets/images/error_illus.png"

export function logError(error: Error, info: React.ErrorInfo) {
  window.electronAPI.logError(error, info)
  Sentry.captureException(error)
}

export default function GlobalError() {
  function handleRestartApp() {
    window.electronAPI.restart()
  }

  function handleContactSupport() {
    window.open(`mailto:${EMail.help}`, "_blank")
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex h-full flex-col items-center">
        <div className="h-1/2 justify-start">
          <div className="flex h-full flex-col justify-end pb-14">
            <img src={ImgErrorIllus} className="w-80" />
          </div>
        </div>
        <h1 className="text-3xl font-semibold text-neutral-700">Whoops, something went wrong!</h1>
        <div className="h-1/2 justify-end">
          <div className="flex flex-col items-center">
            <div className="mt-10 text-center text-neutral-500">
              <p>Please restart the app.</p>
              <p>If the problem persists, please contact support.</p>
            </div>
            <div className="mt-10 flex">
              <Button className="w-40" color="accent" size="sm" onClick={handleContactSupport}>
                Contact Support
              </Button>
              <Button className="ml-5 w-40" size="sm" color="primary" onClick={handleRestartApp}>
                Restart App
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
