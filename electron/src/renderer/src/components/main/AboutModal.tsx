import { Modal } from "flowbite-react"

import { getAppVersion } from "../../utils/app-info"
import ExternalLink from "../common/ExternalLink"
import Button from "../common/Button"
import { WebsiteLinks } from "../../utils/constants"
import ImgAppLogoSmall from "../../assets/images/exifoo_logo_small.png"
import SVGCheck from "../../assets/icons/Check.svg?react"

const modalTheme = {
  root: {
    sizes: {
      md: "max-w-[400px] max-h-[360px]"
    }
  }
}

interface AboutModalPropsType {
  isOpen: boolean
  close: Function
}

export default function AboutModal({ isOpen, close }: AboutModalPropsType) {
  const appVersion = getAppVersion()

  function handleClose() {
    close()
  }

  return (
    <Modal
      className="z-[999] backdrop-blur-xs"
      dismissible
      show={isOpen}
      onClose={handleClose}
      theme={modalTheme}
      size="sm">
      <Modal.Body>
        <div className="flex justify-center">
          <img src={ImgAppLogoSmall} alt="logo" className="w-16" />
        </div>
        <div className="mt-6 text-center">
          <h1 className="text-lg font-semibold text-neutral-800">
            About <span className="font-logo text-xl font-bold text-logo">exifoo</span>
          </h1>
          <p className="mt-1 text-xxs text-neutral-500">Version {appVersion}</p>
          <div className="flex justify-center">
            <ExternalLink href={WebsiteLinks.terms} className="text-xxs" displayIcon>
              Terms and Conditions
            </ExternalLink>
          </div>
        </div>
        {/* Update Status */}
        <div className="mt-8 text-center text-xs text-neutral-700">
          {/* TODO: Add real status */}
          <div className="flex items-center justify-center">
            <p className="font-medium">Latest version installed</p>
            <SVGCheck className="ml-1 w-4 stroke-[3px] text-green-500"></SVGCheck>
          </div>
          <p className="mt-1">Last checked: just now</p>
          <div className="mt-4 flex justify-center">
            <Button color="accent" size="xs">
              Check for Updates
            </Button>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="max-w-[400px] justify-end">
        <Button className="w-32" onClick={handleClose} color="primary" size="sm">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
