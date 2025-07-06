/**
 * Copyright (c) codeofandrin
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Modal } from "flowbite-react"

import Button from "../../common/Button"
import ExternalLink from "../../common/ExternalLink"
import { EMail } from "../../../utils/constants"
import { FileRenameResultType } from "../../../utils/types"
import { APIErrorType } from "../../../utils/enums"
import { getFileName, getParentFolderStr, countInArray, getTruncatedText } from "../../../utils/helpers"
import SVGHelpCircle from "../../../assets/icons/HelpCircle.svg?react"
import SVGImage from "../../../assets/icons/Image.svg?react"
import SVGAlertTriangle from "../../../assets/icons/AlertTriangle.svg?react"
import SVGArrowsUpDown from "../../../assets/icons/ArrowsUpDown.svg?react"

function getFileErrorMsg(errorType: APIErrorType): string | React.ReactElement {
  let statusMsg: string | React.ReactElement = ""
  switch (errorType) {
    case APIErrorType.invalidFileType:
      statusMsg = "Invalid file type"
      break

    case APIErrorType.noExifData:
      statusMsg = "No exif data found"
      break

    case APIErrorType.notFound:
      statusMsg = "File not found"
      break

    case APIErrorType.alreadyExists:
      statusMsg = "File already exists"
      break

    case APIErrorType.noPermission:
      statusMsg = "No permission"
      break

    case APIErrorType.badChar:
      const codeClasses = "bg-neutral-200 px-0.5 text-code text-red-600"
      const slash = <code className={codeClasses}>/</code>
      const colon = <code className={codeClasses}>:</code>

      statusMsg = (
        <span>
          Bad character ({slash}, {colon})
        </span>
      )
      break
  }

  return statusMsg
}

function getFileNames(renameResult: FileRenameResultType[]) {
  let fileNames: string[] = []
  for (let i = 0; i < renameResult.length; i++) {
    const fileResult = renameResult[i]
    if (fileResult.isSuccess) {
      continue
    }
    fileNames.push(getFileName(fileResult.path))
  }

  return fileNames
}

const modalTheme = {
  root: {
    sizes: {
      md: "max-w-[750px] max-h-[500px]"
    },
    show: {
      on: "flex bg-gray-900 bg-opacity-40"
    }
  }
}

interface RenameErrorFileListModalPropsType {
  isOpen: boolean
  close: Function
  renameResult: FileRenameResultType[]
}

export default function RenameErrorFileListModal({
  isOpen,
  close,
  renameResult
}: RenameErrorFileListModalPropsType) {
  let fileElements: React.ReactElement[] = []
  for (let i = 0; i < renameResult.length; i++) {
    const fileResult = renameResult[i]
    if (fileResult.isSuccess) {
      continue
    }

    const filePath = fileResult.path
    const fileName = getFileName(filePath)
    const errorMsg = getFileErrorMsg(fileResult.errorType as APIErrorType)

    const isNameDuplicate = countInArray(getFileNames(renameResult), fileName) > 1 ? true : false
    const fileNameMaxLen = isNameDuplicate ? 33 : 40

    const elem = (
      <div
        key={i}
        className={`flex items-center justify-between rounded-lg bg-primary-50 px-3 py-2 transition-colors duration-300 hover:bg-primary-100/70 ${i > 0 && "mt-2"}`}>
        <div className="flex items-center">
          <SVGImage className="w-5 text-primary-600" />
          <div className="flex items-end">
            <p className="ml-2 text-sm font-medium">{getTruncatedText(fileName, fileNameMaxLen)}</p>
            {isNameDuplicate && (
              <p className="ml-2 text-xxs font-normal leading-3">
                {getTruncatedText(getParentFolderStr(filePath), 25)}
              </p>
            )}
          </div>
        </div>
        <div className="ml-5 flex items-center text-xs font-bold text-red-500">
          <p>{errorMsg}</p>
          <SVGAlertTriangle className="ml-2 w-4 text-red-500" />
        </div>
      </div>
    )

    fileElements.push(elem)
  }

  const failedAmount = fileElements.length
  const showScrollIcon = failedAmount >= 7

  function handleClose() {
    close()
  }

  return (
    <Modal show={isOpen} onClose={handleClose} theme={modalTheme} size="md" dismissible>
      <Modal.Body>
        <div>
          {/* Title */}
          <h1 className="neutral-800 mt-3 text-lg font-semibold">Failed photos</h1>
          {/* Description */}
          <p className="mt-2 text-sm text-neutral-500">
            See a list of the failed photos below and why they failed.
          </p>
          {/* File List */}
          <div className="mt-3">
            <div className="flex items-center justify-end text-red-500">
              <p className="text-xs font-medium">
                {failedAmount} {failedAmount === 1 ? "photo" : "photos"} failed
              </p>
              {showScrollIcon && <SVGArrowsUpDown className="ml-2 w-4 stroke-2 text-neutral-400" />}
            </div>
            <div className="mt-1 max-h-72 overflow-y-scroll rounded-lg border border-dashed border-primary-600 p-4">
              {fileElements}
            </div>
          </div>
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
