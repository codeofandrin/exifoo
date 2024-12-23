import { Modal } from "flowbite-react"

import Button from "../../common/Button"
import ExternalLink from "../../common/ExternalLink"
import { EMail } from "../../../utils/constants"
import { APIErrorType } from "../../../utils/enums"
import { RenameStatusType } from "../../../utils/types"
import { getParentFolderStr, getFileName } from "../../../utils/helpers"
import SVGX from "../../../assets/icons/X.svg?react"
import SVGHelpCircle from "../../../assets/icons/HelpCircle.svg?react"
import SVGInfo from "../../../assets/icons/Info.svg?react"
import ImgFreeTrialIllus from "../../../assets/images/get-started/free_trial_illus.png"

function getItemErrorMsg(errorType: APIErrorType): string {
  let statusMsg = ""
  switch (errorType) {
    case APIErrorType.invalidFileType:
      statusMsg = "Invalid file type."
      break

    case APIErrorType.noExifData:
      statusMsg = "No exif data found."
      break
  }

  return statusMsg
}

const modalTheme = {
  root: {
    sizes: {
      sm: "max-w-[470px] max-h-[360px]",
      md: "max-w-[550px] max-h-[360px]"
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
  let errorTitle = "Something went wrong"
  let errorMsg
  let showHelpCircle = true
  let img: string | null = null
  let btnText = "Close"
  let icon = (
    <div className="rounded-full bg-red-100/50 p-2">
      <div className="rounded-full bg-red-200/50 p-2">
        <SVGX className="w-6 text-red-500" />
      </div>
    </div>
  )

  if (isOpen) {
    const errorType = status.error?.type as APIErrorType
    const errorItem = status.error?.item as string
    const isItemError = [APIErrorType.invalidFileType, APIErrorType.noExifData].includes(errorType)
    if (isItemError) {
      const parentFolder = getParentFolderStr(errorItem)
      const fileName = getFileName(errorItem)
      errorMsg = (
        <>
          <p>
            Renaming{" "}
            <code className="bg-neutral-100 p-0.5 text-code text-neutral-600">
              {parentFolder}/${fileName}
            </code>{" "}
            failed.
          </p>
          <p>{getItemErrorMsg(errorType)}</p>
        </>
      )
    } else {
      if (APIErrorType.free_trial_expired) {
        errorTitle = "Free Trial expiring"
        errorMsg = (
          <>
            <p>
              It looks like you just used up your free trial. Please consider purchasing and activating a
              license.
            </p>
            <p className="mt-2">
              Clicking the button will take you back to the start, where you can activate your license.
            </p>
          </>
        )
        showHelpCircle = false
        img = ImgFreeTrialIllus
        btnText = "Got it"
        icon = (
          <div className="rounded-full bg-yellow-100/50 p-2">
            <div className="rounded-full bg-yellow-200/50 p-2">
              <SVGInfo className="w-6 text-yellow-500" />
            </div>
          </div>
        )
      } else {
        errorMsg = (
          <>
            <p>Renaming photos failed.</p>
            <p>Something went wrong unexpectedly. Please try again.</p>
          </>
        )
      }
    }
  }

  function handleClose() {
    close()
  }

  return (
    <Modal show={isOpen} onClose={handleClose} theme={modalTheme} size={img === null ? "sm" : "md"}>
      <Modal.Body>
        {/* Icon */}
        <div className="w-fit">{icon}</div>
        <div className="flex items-end">
          <div>
            {/* Title */}
            <h1 className="neutral-800 mt-3 text-lg font-semibold">{errorTitle}</h1>
            {/* Description */}
            <div className="mt-2 text-sm text-neutral-500">{errorMsg}</div>
          </div>
          {img !== null && (
            <div className="ml-2">
              <img src={img} className="w-32 max-w-32" />
            </div>
          )}
        </div>
      </Modal.Body>
      {showHelpCircle ? (
        <Modal.Footer className="justify-between">
          <div className="mt-auto items-end">
            <ExternalLink href={`mailto:${EMail.help}`} color="silent">
              <SVGHelpCircle className="w-4 stroke-2 text-neutral-500 transition-colors duration-200 hover:text-neutral-700" />
            </ExternalLink>
          </div>
          <Button className="w-32" onClick={handleClose} color="accent" size="sm">
            {btnText}
          </Button>
        </Modal.Footer>
      ) : (
        <Modal.Footer className="justify-end">
          <Button className="w-32" onClick={handleClose} color="accent" size="sm">
            {btnText}
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  )
}
