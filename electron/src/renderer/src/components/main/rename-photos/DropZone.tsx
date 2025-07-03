/**
 * Copyright (c) codeofandrin 
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ImageFilesInputType, FileRenameResultType } from "../../../utils/types"
import { getTruncatedText, countInArray, getParentFolderStr } from "../../../utils/helpers"
import SVGImage from "../../../assets/icons/Image.svg?react"
import SVGX from "../../../assets/icons/X.svg?react"
import SVGCheck from "../../../assets/icons/Check.svg?react"
import SVGAlertTriangle from "../../../assets/icons/AlertTriangle.svg?react"

interface EmptyDropZonePropsType {
  isDisabled: boolean
}

export function EmptyDropZone({ isDisabled }: EmptyDropZonePropsType) {
  return (
    <div className={`${isDisabled && "cursor-not-allowed"} flex flex-col items-center pb-6 pt-5`}>
      <SVGImage className="w-10 text-primary-600" />
      <p className="font-md mb-2 mt-2 text-sm text-neutral-700">Drop file or browse</p>
      <p className="text-xs font-normal text-neutral-500">Format: PNG, JPEG, JPG</p>
    </div>
  )
}

interface PartialFailedDropZonePropsType {
  renameResult: FileRenameResultType[]
  setIsFailedListModalOpen: Function
}

export function PartialFailedDropZone({
  renameResult,
  setIsFailedListModalOpen
}: PartialFailedDropZonePropsType) {
  const statusAmount = renameResult.length
  let successAmount = 0
  for (let i = 0; i < statusAmount; i++) {
    if (renameResult[i].isSuccess) {
      successAmount += 1
    }
  }
  const failedAmount = statusAmount - successAmount

  function handleSeeFailedList() {
    setIsFailedListModalOpen(true)
  }

  return (
    <div className="flex flex-col items-center pb-6 pt-5">
      <div className="rounded-full bg-yellow-100/75 p-2">
        <div className="rounded-full bg-yellow-200/75 p-2">
          <SVGAlertTriangle className="w-7 text-yellow-500" />
        </div>
      </div>
      <div className="font-md mb-2 mt-2 text-sm text-neutral-700">
        <p>
          <span className="font-bold text-green-500">{successAmount}</span>{" "}
          {successAmount === 1 ? "photo" : "photos"} successfully renamed.
        </p>
        <div className="mt-1 flex">
          <p>
            <span className="font-bold text-red-600">{failedAmount}</span>{" "}
            {failedAmount === 1 ? "photo" : "photos"} failed.
          </p>
          <button className="ml-2 text-xs text-neutral-500 hover:underline" onClick={handleSeeFailedList}>
            See why
          </button>
        </div>
      </div>
    </div>
  )
}

interface SuccessOrFailedAllDropZonePropsType {
  amount: number
  failed: boolean
  setIsFailedListModalOpen: Function
}

export function SuccessOrFailedAllDropZone({
  amount,
  failed,
  setIsFailedListModalOpen
}: SuccessOrFailedAllDropZonePropsType) {
  let icon = (
    <div className="rounded-full bg-green-100/75 p-2">
      <div className="rounded-full bg-green-200/75 p-2">
        <SVGCheck className="w-7 text-green-500" />
      </div>
    </div>
  )
  let text = (
    <div className="font-md mb-2 mt-2 text-sm text-neutral-700">
      <p>
        Successfully renamed {amount} {amount === 1 ? "photo" : "photos"}.
      </p>
    </div>
  )

  if (failed) {
    function handleSeeFailedList() {
      setIsFailedListModalOpen(true)
    }

    icon = (
      <div className="rounded-full bg-red-100/75 p-2">
        <div className="rounded-full bg-red-200/75 p-2">
          <SVGX className="w-7 text-red-500" />
        </div>
      </div>
    )
    text = (
      <div className="font-md mb-2 mt-2 flex text-sm text-neutral-700">
        <p>All photos ({amount}) failed.</p>
        <button
          className="ml-2 text-xs text-neutral-500 underline decoration-transparent transition-colors duration-200 hover:text-neutral-600 hover:decoration-neutral-600"
          onClick={handleSeeFailedList}>
          See why
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center pb-6 pt-5">
      {icon}
      <div className="font-md mb-2 mt-2 text-sm text-neutral-700">{text}</div>
    </div>
  )
}

function removeFileFromFileList(fileInputElem: HTMLInputElement, files: FileList, index: number) {
  const dataTransfer = new DataTransfer()

  let items: File[] = []
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (index !== i) {
      dataTransfer.items.add(file)
      items.push(file)
    }
  }
  // update files on element
  fileInputElem.files = dataTransfer.files

  return items
}

function isFileNameDuplicate(files: FileList, file: File) {
  let fileNames: string[] = []
  for (let i = 0; i < files.length; i++) {
    fileNames.push(files[i].name)
  }

  return countInArray(fileNames, file.name) > 1 ? true : false
}

interface FilesListDropZonePropsType {
  fileInput: ImageFilesInputType
  setFileInput: Function
  setIsLastFileRemoved: Function
  isDisabled: boolean
}

export function FilesListDropZone({
  fileInput,
  setFileInput,
  setIsLastFileRemoved,
  isDisabled
}: FilesListDropZonePropsType) {
  function handleRemove(key: number) {
    const newImageList = removeFileFromFileList(
      fileInput.ref.current as HTMLInputElement,
      fileInput.imageFiles as FileList,
      key
    )
    const imageFiles = Boolean(newImageList.length) ? newImageList : null

    // to not trigger file drop zone
    if (imageFiles === null) {
      setIsLastFileRemoved(true)
    }

    // update files on state
    setFileInput({ ...fileInput, imageFiles })
  }

  const files = fileInput.imageFiles as FileList
  let fileElements: React.ReactElement[] = []
  for (let i = 0; i < files.length; i++) {
    const file = files[i] as File
    // @ts-ignore: 'path' exists here
    const filePath = file.path
    const isNameDuplicate = isFileNameDuplicate(files, file)
    const fileNameMaxLen = isNameDuplicate ? 38 : 45

    const elem = (
      <div
        key={i}
        className={`flex items-center justify-between rounded-lg bg-primary-50 px-3 py-1 transition-colors duration-300 hover:bg-primary-100/70 ${i > 0 && "mt-2"}`}>
        <div className="flex items-center">
          <SVGImage className="w-5 text-primary-600" />
          <div className="flex items-end">
            <p className="ml-2 text-sm font-medium">{getTruncatedText(file.name, fileNameMaxLen)}</p>
            {isNameDuplicate && (
              <p className="ml-2 text-xxs font-normal leading-3">
                {getTruncatedText(getParentFolderStr(filePath), 25)}
              </p>
            )}
          </div>
        </div>
        <div>
          <button
            className="group rounded-lg bg-white/50 p-1.5 transition-colors duration-150 hover:bg-red-500 disabled:cursor-not-allowed"
            onClick={() => handleRemove(i)}
            disabled={isDisabled}>
            <SVGX className="w-5 text-red-500 transition-colors duration-150 group-hover:text-white" />
          </button>
        </div>
      </div>
    )
    fileElements.push(elem)
  }

  return <div className="flex w-full flex-col overflow-y-scroll p-4">{fileElements}</div>
}
