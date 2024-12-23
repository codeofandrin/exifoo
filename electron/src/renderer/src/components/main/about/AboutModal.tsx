import { useState } from "react"
import { Modal } from "flowbite-react"

import { getAppVersion, getReleaseLink } from "../../../utils/app-info"
import ExternalLink from "../../common/ExternalLink"
import Button from "../../common/Button"
import DeactivateLicenseModal from "./DeactivateLicenseModal"
import { WebsiteLinks } from "../../../utils/constants"
import { UpdateStatusType, LicenseType } from "../../../utils/enums"
import { useUpdateStore } from "../../../store/main/useUpdateStore"
import { useAppStore } from "../../../store/useAppStore"
import { useActivateLicenseStore } from "../../../store/main/useActivateLicenseStore"
import { getRelativeTime } from "../../../utils/helpers"
import ImgAppLogoSmall from "../../../assets/images/exifoo_logo_small.png"
import SVGCheck from "../../../assets/icons/Check.svg?react"
import SVGX from "../../../assets/icons/X.svg?react"
import SVGSpinner from "../../../assets/icons/Spinner.svg?react"
import SVGDownload from "../../../assets/icons/Download.svg?react"

const modalTheme = {
  root: {
    sizes: {
      md: "max-w-[450px]"
    }
  }
}

const bodyBtnWidth = "w-44"

function getUpdateErrorMsg(err: Error | null) {
  let errorMsg = ""
  if (err?.message.includes("ERR_INTERNET_DISCONNECTED")) {
    errorMsg = "No internet connection"
  } else {
    errorMsg = `${err?.name}: ${err?.message}`
  }

  return errorMsg
}

interface StatusTextPropsType {
  status: UpdateStatusType
  lastChecked: number | null
  downloadPercentage: number
  error: Error | null
}

function StatusText({ status, lastChecked, downloadPercentage, error }: StatusTextPropsType) {
  switch (status) {
    case UpdateStatusType.checking:
      return (
        <div className="flex items-center justify-center">
          <p className="font-medium">Checking for update...</p>
          <SVGSpinner className="ml-2 w-4 animate-spin fill-neutral-500 text-neutral-300" />
        </div>
      )

    case UpdateStatusType.notAvailable:
      const checkedText = lastChecked === null ? "" : `Last checked ${getRelativeTime(lastChecked)}`

      return (
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <p className="font-medium">Latest version installed</p>
            <SVGCheck className="ml-2 w-4 stroke-[3px] text-green-500" />
          </div>
          <p className="mt-1">{checkedText}</p>
        </div>
      )

    case UpdateStatusType.downloading:
      return (
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <p className="font-medium">Downloading update...</p>
            <SVGSpinner className="ml-2 w-4 animate-spin fill-neutral-500 text-neutral-300" />
          </div>
          <p className="mt-1">{Math.round(downloadPercentage)}%</p>
        </div>
      )

    case UpdateStatusType.ready:
      return (
        <div className="flex items-center justify-center">
          <p className="font-medium">Update ready to install</p>
          <SVGDownload className="ml-2 w-4 stroke-2 text-primary-600" />
        </div>
      )

    case UpdateStatusType.error:
    default:
      return (
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <p className="font-medium">Checking for update failed</p>
            <SVGX className="ml-1 w-4 stroke-[3] text-red-600" />
          </div>
          <code className="mt-1 max-w-full truncate text-wrap bg-neutral-200 px-0.5 text-xxxs">
            {getUpdateErrorMsg(error)}
          </code>
        </div>
      )
  }
}

function UpdateStatus() {
  const { status, error, lastCheck, progress } = useUpdateStore()

  const btnDisabled = [UpdateStatusType.checking, UpdateStatusType.downloading].includes(status)
  let btnText = "Checking for Updates"
  let btnOnClick = handleCheckForUpdates
  if (status === UpdateStatusType.ready) {
    btnText = "Install and Restart"
    btnOnClick = handleQuitAndInstall
  }

  function handleCheckForUpdates() {
    window.electronAPI.checkForUpdates()
  }

  function handleQuitAndInstall() {
    window.electronAPI.quitAndInstallUpdate()
  }

  return (
    <div className="mt-6 text-center text-xs text-neutral-700">
      <StatusText status={status} lastChecked={lastCheck} downloadPercentage={progress} error={error} />
      <div className="mt-3 flex justify-center">
        <Button
          color="accent"
          size="xs"
          className={`${bodyBtnWidth}`}
          onClick={btnOnClick}
          disabled={btnDisabled}>
          {btnText}
        </Button>
      </div>
    </div>
  )
}

interface LicenseInfoPropsType {
  setIsDeactivateModalOpen: Function
  setIsActivateLicenseOpen: Function
}

function LicenseInfo({ setIsDeactivateModalOpen, setIsActivateLicenseOpen }: LicenseInfoPropsType) {
  const { license_type, license_key_short } = useAppStore()

  let content
  if (license_type === LicenseType.full) {
    function handleDeactivateLicense() {
      setIsDeactivateModalOpen(true)
    }

    content = (
      <>
        <p className="font-medium">Full version</p>
        <p className="mt-1">
          License key: <span className="text-neutral-500">{license_key_short}</span>
        </p>
        <div className="mt-3 flex justify-center pb-6">
          <Button color="critical" size="xs" className={`${bodyBtnWidth}`} onClick={handleDeactivateLicense}>
            Deactivate
          </Button>
        </div>
      </>
    )
  } else {
    function handleActivateLicense() {
      setIsActivateLicenseOpen(true)
    }

    content = (
      <div>
        <p className="font-medium">You're currently using the demo version.</p>
        <div className="mt-3 flex justify-center">
          <Button color="accent" size="xs" className={`${bodyBtnWidth}`} onClick={handleActivateLicense}>
            Activate license
          </Button>
        </div>
        <p className="mt-1 pb-1 text-xxs text-neutral-500">
          No license yet? Get one{" "}
          <ExternalLink href={WebsiteLinks.license} color="underline">
            here
          </ExternalLink>
          .
        </p>
      </div>
    )
  }

  return <div className="mt-6 text-center text-xs text-neutral-700">{content}</div>
}

interface AboutModalPropsType {
  isOpen: boolean
  close: Function
}

export default function AboutModal({ isOpen, close }: AboutModalPropsType) {
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false)
  const { isOpen: isActivateLicenseOpen, setIsOpen: setIsActivateLicenseOpen } = useActivateLicenseStore()

  const appVersion = getAppVersion()

  function handleClose() {
    close()
  }

  return (
    <>
      <DeactivateLicenseModal
        isOpen={isDeactivateModalOpen}
        setIsDeactivateModalOpen={setIsDeactivateModalOpen}
      />
      <Modal
        className="z-[98] backdrop-blur-xs"
        show={isOpen}
        dismissible={!isDeactivateModalOpen && !isActivateLicenseOpen}
        onClose={handleClose}
        theme={modalTheme}
        size="md">
        <Modal.Body className="px-16 pb-0">
          <div className="flex justify-center">
            <img src={ImgAppLogoSmall} alt="logo" className="w-16" />
          </div>
          <div className="mt-6 text-center">
            <h1 className="text-lg font-semibold text-neutral-800">
              About <span className="font-logo text-xl font-bold text-logo">exifoo</span>
            </h1>
            <p className="mt-1 text-xxs text-neutral-500">Version {appVersion}</p>
            <div className="flex flex-col items-center">
              <ExternalLink href={getReleaseLink(`v${appVersion}`)} className="text-xxs" displayIcon>
                Release Notes
              </ExternalLink>
              <ExternalLink href={WebsiteLinks.terms} className="text-xxs" displayIcon>
                Terms and Conditions
              </ExternalLink>
            </div>
          </div>
          {/* Update Status */}
          <UpdateStatus />
          {/* License information */}
          <LicenseInfo
            setIsDeactivateModalOpen={setIsDeactivateModalOpen}
            setIsActivateLicenseOpen={setIsActivateLicenseOpen}
          />
        </Modal.Body>
        <Modal.Footer className="max-w-[400px] justify-end">
          <Button className="w-32" onClick={handleClose} color="primary" size="sm">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
