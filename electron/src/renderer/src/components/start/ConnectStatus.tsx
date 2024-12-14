import Button from "../common/Button"
import { EMail } from "../../utils/constants"
import SVGSpinner from "../../assets/icons/Spinner.svg?react"
import SVGX from "../../assets/icons/X.svg?react"

function ButtonsGroup() {
  const isAfterLoading = false // TODO: remove dummy

  function handleContactSupport() {
    window.open(`mailto:${EMail.help}`, "_blank")
  }

  function handleTryAgain() {}

  return (
    <div className="mt-14 flex items-center justify-between">
      <Button className="w-36" size="sm-xs" color="accent" onClick={handleContactSupport}>
        Contact Support
      </Button>
      <Button
        className="ml-5 w-36"
        size="sm-xs"
        color="primary"
        disabled={isAfterLoading}
        onClick={handleTryAgain}>
        Try again
      </Button>
    </div>
  )
}

function LoadingAfter() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <p className="text-neutral-500">Connecting to license server...</p>
        <SVGSpinner className="ml-3 h-4.5 w-4.5 animate-spin fill-neutral-500 text-neutral-300" />
      </div>
      <p className="mt-4 text-center text-xs text-neutral-400">
        Please check your network connection and try again. If the issue persists, please contact support.
      </p>
      <ButtonsGroup />
    </div>
  )
}

function Error() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <p className="text-neutral-500">Connecting to license server failed.</p>
        <SVGX className="ml-3 h-6 w-6 text-red-600" />
      </div>
      <p className="mt-4 text-center text-xs text-neutral-400">
        Please check your network connection and try again. If the issue persists, please contact support.
      </p>
      <ButtonsGroup />
    </div>
  )
}

function Loading() {
  return (
    <>
      <p className="text-neutral-500">Connecting to license server...</p>
      <SVGSpinner className="ml-3 h-4.5 w-4.5 animate-spin fill-neutral-500 text-neutral-300" />
    </>
  )
}

export default function ConnectStatus() {
  const isAfterLoading = false // TODO: remove dummy
  const isError = false // TODO: remove dummy

  let stateElem = <Loading />
  if (isError) {
    stateElem = <Error />
  } else if (isAfterLoading) {
    stateElem = <LoadingAfter />
  }

  return (
    <div className="h-1/2 justify-end">
      <div className="mt-10 flex justify-center">
        <div className="flex max-w-sm items-center motion-translate-x-in-[-5%] motion-blur-in-[10px] motion-opacity-in-0 motion-duration-200 motion-delay-[5500ms]">
          {stateElem}
        </div>
      </div>
    </div>
  )
}
