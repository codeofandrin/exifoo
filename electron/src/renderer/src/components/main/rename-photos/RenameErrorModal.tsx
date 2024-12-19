import { Modal } from "flowbite-react"

import Button from "../../common/Button"
import ExternalLink from "../../common/ExternalLink"
import { EMail } from "../../../utils/constants"
import { APIErrorType } from "../../../utils/enums"
import { RenameStatusType } from "../../../utils/types"
import { getParentFolderStr, getFileName } from "../../../utils/helpers"
import SVGX from "../../../assets/icons/X.svg?react"
import SVGHelpCircle from "../../../assets/icons/HelpCircle.svg?react"

function getErrorMsg(errorType: APIErrorType): string {
  let statusMsg = ""
  switch (errorType) {
    case APIErrorType.invalidFileType:
      statusMsg = `Invalid file type.`
      break

    case APIErrorType.noExifData:
      statusMsg = `No exif data found.`
      break

    case APIErrorType.no_access:
    case APIErrorType.invalid_option:
    case APIErrorType.unexpected:
    default:
      statusMsg = "Something went wrong unexpected. Please try again."
      break
  }

  return statusMsg
}

const modalTheme = {
  root: {
    sizes: {
      md: "max-w-[470px] max-h-[360px]"
    },
    show: {
      on: "flex bg-gray-900 bg-opacity-40"
    }
  }
}

interface RenameErrorModalPropsType {
  isOpen: boolean
  close: Function
  status: RenameStatusType
}

export default function RenameErrorModal({ isOpen, close, status }: RenameErrorModalPropsType) {
  let errorMsg = ""
  let truncatedFilePath = ""
  if (isOpen) {
    const errorType = status.error?.type as APIErrorType
    const errorItem = status.error?.item as string
    const parentFolder = getParentFolderStr(errorItem)
    const fileName = getFileName(errorItem)
    errorMsg = getErrorMsg(errorType)
    truncatedFilePath = `${parentFolder}/${fileName}`
  }

  function handleClose() {
    close()
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
          {errorMsg.includes("unexpected") ? (
            <p>Renaming photos failed.</p>
          ) : (
            <p>
              Renaming{" "}
              <code className="bg-neutral-100 p-0.5 text-code text-neutral-600">{truncatedFilePath}</code>{" "}
              failed.
            </p>
          )}
          <p>{errorMsg}</p>
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
