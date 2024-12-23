import { Modal } from "flowbite-react"

import Button from "./common/Button"
import SVGCheck from "../assets/icons/Check.svg?react"
import ImgLicenseIllus from "../assets/images//license_illus.png"

const modalTheme = {
  root: {
    sizes: {
      md: "max-w-[550px] max-h-[360px]"
    }
  }
}

interface LicenseSuccessModalPropsType {
  isOpen: boolean
  close: Function
}

export default function LicenseSuccessModal({ isOpen, close }: LicenseSuccessModalPropsType) {
  function handleClose() {
    close()
  }

  return (
    <Modal
      show={isOpen}
      onClose={handleClose}
      theme={modalTheme}
      size="md"
      className="z-[99] backdrop-blur-xs">
      <Modal.Body className="">
        {/* Icon */}
        <div className="w-fit">
          <div className="rounded-full bg-green-100/75 p-2">
            <div className="rounded-full bg-green-200/75 p-2">
              <SVGCheck className="w-7 text-green-500" />
            </div>
          </div>
        </div>
        <div className="flex items-end">
          <div>
            {/* Title */}
            <h1 className="neutral-800 mt-3 text-lg font-semibold">License activated</h1>
            {/* Description */}
            <div className="mt-2 text-sm text-neutral-500">
              <p>Your license has been activated successfully.</p>
              <p>
                Enjoy <span className="font-logo text-base font-bold text-logo">exifoo</span> with unlimited
                access!
              </p>
            </div>
          </div>
          <div className="ml-2">
            <img src={ImgLicenseIllus} className="w-32 max-w-32" />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-end">
        <Button className="w-32" onClick={handleClose} color="primary" size="sm">
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
