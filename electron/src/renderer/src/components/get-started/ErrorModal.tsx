import { Modal } from "flowbite-react"

import ExternalLink from "../common/ExternalLink"
import Button from "../common/Button"
import { EMail } from "../../utils/constants"
import SVGX from "../../assets/icons/X.svg?react"
import SVGHelpCircle from "../../assets/icons/HelpCircle.svg?react"

const modalTheme = {
  root: {
    sizes: {
      md: "max-w-[550px] max-h-[360px]"
    }
  }
}

interface ErrorModalPropsType {
  isOpen: boolean
  close: Function
  title: string
  desc: string
  img?: string | null
}

export default function ErrorModal({ isOpen, close, title, desc, img = null }: ErrorModalPropsType) {
  function handleClose() {
    close()
  }

  return (
    <Modal
      show={isOpen}
      onClose={handleClose}
      theme={modalTheme}
      size="md"
      className="z-[999] backdrop-blur-xs">
      <Modal.Body>
        {/* Icon */}
        <div className="w-fit">
          <div className="rounded-full bg-red-100/50 p-2">
            <div className="rounded-full bg-red-200/50 p-2">
              <SVGX className="w-6 text-red-500" />
            </div>
          </div>
        </div>
        <div className="flex items-end">
          <div>
            {/* Title */}
            <h1 className="neutral-800 mt-3 text-lg font-semibold">{title}</h1>
            {/* Description */}
            <p className="mt-2 text-sm text-neutral-500">{desc}</p>
          </div>
          {img !== null && (
            <div className="ml-2">
              <img src={img} className="w-32 max-w-32" />
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-between">
        <div className="mt-auto items-end">
          <ExternalLink href={`mailto:${EMail.help}`} color="silent">
            <SVGHelpCircle className="w-4 stroke-2 text-neutral-500 transition-colors duration-200 hover:text-neutral-700" />
          </ExternalLink>
        </div>
        <Button className="w-32" onClick={handleClose} color="accent" size="sm">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
