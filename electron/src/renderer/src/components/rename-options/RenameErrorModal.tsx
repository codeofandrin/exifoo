import { Modal } from "flowbite-react"

import Button from "../common/Button"
import ExternalLink from "../common/ExternalLink"
import useRenameErrorModalContext from "../../contexts/RenameErrorModalContext"
import useRenameStatusContext from "../../contexts/RenameStatusContext"
import { EMail } from "../../utils/constants"
import { ErrorType } from "../../utils/enums"
import { getParentFolderStr, getFileName } from "../../utils/helpers"
import SVGX from "../../assets/icons/X.svg?react"
import SVGHelpCircle from "../../assets/icons/HelpCircle.svg?react"

function getErrorMsg(errorType: ErrorType): string {
  let statusMsg = ""
  switch (errorType) {
    case ErrorType.invalidFileType:
      statusMsg = `Invalid file type.`
      break

    case ErrorType.noExifData:
      statusMsg = `No exif data found.`
      break

    case ErrorType.unexpected:
    default:
      statusMsg = "Something went wrong unexpected. Please try again."
      break
  }

  return statusMsg
}

const modalTheme = {
  root: {
    sizes: {
      md: "max-w-[450px] max-h-[360px]"
    },
    show: {
      on: "flex bg-gray-900 bg-opacity-40"
    }
  }
}

export default function RenameErrorModal() {
  const { isOpen, closeModal } = useRenameErrorModalContext()
  const { status, resetStatus } = useRenameStatusContext()

  let errorMsg = ""
  let truncatedFilePath = ""
  if (isOpen) {
    const errorType = status?.error?.type as ErrorType
    const errorItem = status?.error?.item as string
    const parentFolder = getParentFolderStr(errorItem)
    const fileName = getFileName(errorItem)
    errorMsg = getErrorMsg(errorType)
    truncatedFilePath = `${parentFolder}/${fileName}`
  }

  function handleClose() {
    closeModal()
    resetStatus()
  }

  return (
    <Modal show={isOpen} onClose={handleClose} theme={modalTheme} size="md">
      <Modal.Body>
        {/* Icon */}
        <div className="w-fit">
          <div className="rounded-full bg-red-100/50 p-2">
            <div className="rounded-full bg-red-200/50 p-2">
              <SVGX className="w-6 text-red-500" />
            </div>
          </div>
        </div>
        {/* Title */}
        <div className="mt-3">
          <h1 className="neutral-800 text-lg font-semibold">Something went wrong.</h1>
        </div>
        {/* Description */}
        <div className="mt-2 text-sm text-neutral-500">
          <p>
            Renaming{" "}
            <code className="bg-neutral-100 p-0.5 text-code text-neutral-600">{truncatedFilePath}</code>{" "}
            failed.
          </p>
          <p>{errorMsg}</p>
        </div>
      </Modal.Body>
      <Modal.Footer className="max-w-[450px] justify-between">
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
