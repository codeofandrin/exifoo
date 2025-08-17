/**
 * Copyright (c) codeofandrin
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Modal } from "flowbite-react"
import { useEffect, useState } from "react"

import { EMail } from "../../../utils/constants"
import { getRenameHistory, revertRename } from "../../../lib/api"
import {
  getYearStr,
  getMonthStr,
  getDayStr,
  getHoursStr,
  getMinutesStr,
  getSecondsStr,
  getFileName,
  getParentFolderStr
} from "../../../utils/helpers"
import Button from "../../common/Button"
import ExternalLink from "../../common/ExternalLink"
import SVGHelpCircle from "../../../assets/icons/HelpCircle.svg?react"
import SVGFolder from "../../../assets/icons/Folder.svg?react"
import SVGFolderOpen from "../../../assets/icons/FolderOpen.svg?react"
import SVGImage from "../../../assets/icons/Image.svg?react"
import SVGArrowRight from "../../../assets/icons/ArrowRight.svg?react"
import SVGArrowRevert from "../../../assets/icons/ArrowRevert.svg?react"

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

interface RenameProcessElementPropsType {
  i: number
  renameProcess: Record<string, any>
  getAndSetRenames: Function
}

function RenameProcessElement({ i, renameProcess, getAndSetRenames }: RenameProcessElementPropsType) {
  const [isOpen, setIsOpen] = useState(false)

  const renameDate = new Date(renameProcess.date)
  const renameDayStr = getDayStr(renameDate.getDate())
  const renameMonthStr = getMonthStr(renameDate.getMonth())
  const renameYearStr = getYearStr(renameDate.getFullYear())
  const renameHourStr = getHoursStr(renameDate.getHours())
  const renameMinuteStr = getMinutesStr(renameDate.getMinutes())
  const renameSecondsStr = getSecondsStr(renameDate.getSeconds())

  const renameDateStr = `${renameDayStr}.${renameMonthStr}.${renameYearStr} ${renameHourStr}:${renameMinuteStr}:${renameSecondsStr}`
  const renameFiles = renameProcess.files
  const renameFilesAmount = renameFiles.length

  async function handleRevert(path: string, beforeFilename: string) {
    await revertRename(path, beforeFilename)
    await getAndSetRenames()
  }

  return (
    <div className={`rounded-lg bg-primary-50 ${i > 0 && "mt-2"}`}>
      <div
        className={`px-3 py-2 transition-colors duration-300 hover:cursor-pointer ${isOpen ? "rounded-t-lg" : "rounded-lg"} hover:bg-primary-200`}
        onClick={() => setIsOpen(!isOpen)}>
        <div key={i} className="flex items-center justify-between">
          <div className="flex items-center">
            {isOpen ? (
              <SVGFolderOpen className="w-5 text-primary-600" />
            ) : (
              <SVGFolder className="w-5 text-primary-600" />
            )}
            <div className="ml-2 font-medium">
              <p className="text-sm font-semibold">
                {renameFilesAmount} {renameFilesAmount === 1 ? "file" : "files"} renamed
              </p>
              <p className="text-xxs text-neutral-400">{renameDateStr}</p>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="pb-2 pl-7 pr-3">
          {renameFiles.map((renameFile) => {
            const beforeFilename = getFileName(renameFile.before)
            const beforeFileParentPath = getParentFolderStr(renameFile.before)
            const afterFilename = getFileName(renameFile.after)
            const afterFileParentPath = getParentFolderStr(renameFile.after)

            return (
              <div
                className={`mt-2 flex items-center rounded-lg bg-primary-100 px-2 py-2 transition-colors group-hover:bg-primary-300`}>
                <SVGImage className="w-5 text-primary-600" />
                <div className="ml-2 flex w-full items-center">
                  <div className="flex w-full justify-between text-sm font-medium">
                    <div>
                      <p>{beforeFilename}</p>
                      <p className="text-xxs text-neutral-400">{beforeFileParentPath}</p>
                    </div>
                    <SVGArrowRight className="mx-1 w-5" />
                    <div>
                      <p>{afterFilename}</p>
                      <p className="text-xxs text-neutral-400">{afterFileParentPath}</p>
                    </div>
                  </div>
                  <div className="ml-10">
                    <button
                      className="group rounded-lg bg-amber-500 p-1.5 transition-colors duration-200 hover:bg-amber-600 disabled:cursor-not-allowed"
                      onClick={() => handleRevert(renameFile.after, beforeFilename)}>
                      <SVGArrowRevert className="h-5 w-5 stroke-2 text-white transition-colors duration-150 group-hover:text-white" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

interface RenameHistoryModalPropsType {
  isOpen: boolean
  close: Function
}

export default function RenameHistoryModal({ isOpen, close }: RenameHistoryModalPropsType) {
  const [renames, setRenames] = useState([])

  // on mount
  useEffect(() => {
    async function inner() {
      await getAndSetRenames()
    }

    if (isOpen) {
      inner()
    }
  }, [isOpen])

  const renamesAmount = renames.length
  let renameProcesses: React.ReactElement[] = []
  for (let i = 0; i < renames.length; i++) {
    const renameProcess: Record<string, any> = renames[i]
    renameProcesses.push(
      <RenameProcessElement i={i} renameProcess={renameProcess} getAndSetRenames={getAndSetRenames} />
    )
  }

  async function getAndSetRenames() {
    const renameHistory = await getRenameHistory()
    setRenames(renameHistory.successData.rename_history)
  }

  function handleClose() {
    close()
  }

  return (
    <Modal show={isOpen} onClose={handleClose} theme={modalTheme} size="md" dismissible>
      <Modal.Body>
        <div>
          {/* Title */}
          <h1 className="neutral-800 mt-3 text-lg font-semibold">Rename History</h1>
          {/* Description */}
          <p className="mt-2 text-sm text-neutral-500">
            See a list of the last 10 successful rename processes below.
            <br />
            Click on the folder to see the renamed files.
          </p>
          {/* File List */}
          <div className="mt-3">
            <div className="flex items-center justify-end text-neutral-400">
              <p className="text-xs font-medium">
                {renamesAmount} rename {renamesAmount === 1 ? "process" : "processes"}
              </p>
            </div>
            <div className="mt-1 max-h-72 overflow-y-scroll rounded-lg border border-dashed border-primary-600 p-4">
              {renameProcesses}
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
