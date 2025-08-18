/**
 * Copyright (c) codeofandrin
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useRef, useState, useEffect } from "react"
import { FileInput, Label } from "flowbite-react"

import {
  EmptyDropZone,
  FilesListDropZone,
  SuccessOrFailedAllDropZone,
  PartialFailedDropZone
} from "./DropZone"
import { ImageFilesInputType, FileRenameResultType } from "../../../utils/types"
import Button from "../../common/Button"
import ExampleOutput from "./ExampleOutput"
import RenameGeneralErrorModal from "./RenameGeneralErrorModal"
import RenameErrorFileListModal from "./RenameErrorFileListModal"
import RenameHistoryModal from "./RenameHistoryModal"
import ExternalLink from "../../common/ExternalLink"
import { renameImages } from "../../../lib/api"
import { useAppStore } from "../../../store/useAppStore"
import { useCustomTextStore } from "../../../store/main/useCustomTextStore"
import { useDateOptionsStore } from "../../../store/main/useDateOptionsStore"
import { useTimeOptionsStore } from "../../../store/main/useTimeOptionsStore"
import { APIErrorType, LicenseType } from "../../../utils/enums"
import { WebsiteLinks } from "../../../utils/constants"
import SVGUpload from "../../../assets/icons/Upload.svg?react"
import SVGStar from "../../../assets/icons/Star.svg?react"
import SVGArrowClock from "../../../assets/icons/ArrowClock.svg?react"

export default function RenameForm() {
  // Hooks
  const [fileInput, setFileInput] = useState<ImageFilesInputType>({
    ref: useRef<HTMLInputElement>(null),
    imageFiles: null
  })
  const [renameResult, setRenameResult] = useState<{
    successAll: boolean
    failedAll: boolean
    result: FileRenameResultType[]
  }>({ successAll: false, failedAll: false, result: [] })
  const [isFailedListModalOpen, setIsFailedListModalOpen] = useState(false)
  const [isRenameHistoryModalOpen, setIsRenameHistoryModalOpen] = useState(false)
  const [generalError, setGeneralError] = useState<APIErrorType | null>(null)
  const [isLastFileRemoved, setIsLastFileRemoved] = useState<boolean>(false)
  const { yearFormat, monthFormat, dayFormat, dateSeparator } = useDateOptionsStore()
  const { isAddTime, hoursFormat, minutesFormat, secondsFormat, timeSeparator } = useTimeOptionsStore()
  const { isAddCustomText, customText, isValid: isCustomTextValid } = useCustomTextStore()
  const [isLoading, setIsLoading] = useState(false)
  const { licenseType, freeTrialRemaining, setFreeTrialRemaining, reset: resetAppStore } = useAppStore()

  useEffect(() => {
    if (isLastFileRemoved) {
      setTimeout(() => {
        setIsLastFileRemoved(false)
      }, 0)
    }
  }, [isLastFileRemoved])

  // Variables
  const FILE_TYPES = ["image/png", "image/jpeg", "image/heic", "image/heif"]
  const isFileInputEmpty = !Boolean(fileInput.imageFiles)
  const renameBtnDisabled = !fileInput.imageFiles || !isCustomTextValid || isLoading
  const renameText = isLoading ? "Renaming..." : "Rename"
  let remainingTextStyle = "text-inherhit"
  if (freeTrialRemaining <= 10) {
    remainingTextStyle = "text-red-500 font-bold"
  }
  let dropZone = <EmptyDropZone isDisabled={isLoading} />
  if (fileInput.imageFiles) {
    dropZone = (
      <FilesListDropZone
        fileInput={fileInput}
        setFileInput={setFileInput}
        setIsLastFileRemoved={setIsLastFileRemoved}
        isDisabled={isLoading}
      />
    )
  } else if (renameResult.result.length > 0) {
    if (renameResult.successAll || renameResult.failedAll) {
      dropZone = (
        <SuccessOrFailedAllDropZone
          amount={renameResult.result.length}
          failed={renameResult.failedAll}
          setIsFailedListModalOpen={setIsFailedListModalOpen}
        />
      )
    } else {
      dropZone = (
        <PartialFailedDropZone
          renameResult={renameResult.result}
          setIsFailedListModalOpen={setIsFailedListModalOpen}
        />
      )
    }
  }

  // General Functions
  function resetGeneralError() {
    setGeneralError(null)
  }

  function resetRenameResult() {
    setRenameResult({ successAll: false, failedAll: false, result: [] })
  }

  // Event handlers
  function handleGeneralErrorModalClose() {
    resetGeneralError()
    if (licenseType === LicenseType.demo && freeTrialRemaining <= 0) {
      resetAppStore()
    }
  }

  function handleBrowse() {
    const fileInputElem = fileInput.ref.current
    if (fileInputElem) {
      if (fileInputElem.disabled) {
        // if files already in file list, the input is disabled
        // therefore enable it temporary
        fileInputElem.disabled = false
        fileInputElem.click()
        fileInputElem.disabled = true
      } else {
        fileInputElem.click()
      }
    }
  }

  function handleFilesChange() {
    resetRenameResult()

    const fileInputElem = fileInput.ref.current as HTMLInputElement
    const newImageFiles = fileInputElem.files as FileList
    const storedImageFiles = fileInput.imageFiles

    let updatedImageFiles = newImageFiles
    if (storedImageFiles !== null) {
      // if files already stored we must create a new merged file list
      // to prevent replacing old with new file list
      const dataTransfer = new DataTransfer()

      let storedImageFilePaths: File[] = []
      for (let i = 0; i < storedImageFiles.length; i++) {
        const file = storedImageFiles[i]
        dataTransfer.items.add(file)
        // @ts-ignore: 'path' exists here
        storedImageFilePaths.push(file.path)
      }
      for (let i = 0; i < newImageFiles.length; i++) {
        const file = newImageFiles[i]
        // @ts-ignore: 'path' exists here
        if (!storedImageFilePaths.includes(file.path)) {
          dataTransfer.items.add(newImageFiles[i])
        }
      }

      updatedImageFiles = dataTransfer.files
    }

    if (updatedImageFiles.length > 0) {
      if (licenseType === LicenseType.demo && updatedImageFiles.length > freeTrialRemaining) {
        let slicedUpdatedImageFiles = new DataTransfer()
        for (let i = 0; i < freeTrialRemaining; i++) {
          slicedUpdatedImageFiles.items.add(updatedImageFiles[i])
        }

        setFileInput({ ...fileInput, imageFiles: slicedUpdatedImageFiles.files })
        // update files on element
        fileInputElem.files = slicedUpdatedImageFiles.files
      } else {
        setFileInput({ ...fileInput, imageFiles: updatedImageFiles })
        // update files on element
        fileInputElem.files = updatedImageFiles
      }
    } else {
      setFileInput({ ...fileInput, imageFiles: null })
    }
  }

  function handleFileDrop(e) {
    if (isLoading) {
      return
    }

    const fileInputElem = fileInput.ref.current as HTMLInputElement
    const fileList = e.dataTransfer.files
    const file: File = fileList[0]

    if (FILE_TYPES.includes(file.type)) {
      fileInputElem.files = fileList
      handleFilesChange()
    }

    e.preventDefault()
  }

  function handleFileDragOver(e) {
    if (isLoading) {
      return
    }
    e.preventDefault()
  }

  async function handleRenameRequest() {
    setIsLoading(true)

    let filePaths: string[] = []
    const imageFiles = fileInput.imageFiles
    if (imageFiles) {
      for (let i = 0; i < imageFiles.length; i++) {
        // @ts-ignore: 'path' exists here
        filePaths.push(imageFiles[i].path)
      }
    }

    const yearOptions = {
      year_format: yearFormat,
      month_format: monthFormat,
      day_format: dayFormat,
      separator: dateSeparator
    }
    let timeOptions: any | null = null
    if (isAddTime) {
      timeOptions = {
        hours_format: hoursFormat,
        minutes_format: minutesFormat,
        seconds_format: secondsFormat,
        separator: timeSeparator
      }
    }

    await renameImages(filePaths, yearOptions, timeOptions, isAddCustomText ? customText : "").then(
      ({ isError, errorData, successData }) => {
        setIsLoading(false)

        if (isError) {
          if (errorData === null) {
            // unexpected
            setGeneralError(APIErrorType.unexpected)
          } else {
            setGeneralError(errorData["code"])
          }
        } else {
          const renameResult = successData.result

          let resultAdjusted: FileRenameResultType[] = []
          let successAll = true
          let failedAll = true
          for (let i = 0; i < renameResult.length; i++) {
            const fileRenameStatus = renameResult[i]
            if (fileRenameStatus.is_success) {
              failedAll = false
            } else {
              successAll = false
            }

            const errorType = fileRenameStatus.error_type as APIErrorType
            resultAdjusted.push({
              path: fileRenameStatus.path,
              isSuccess: fileRenameStatus.is_success,
              errorType
            })
          }

          setRenameResult({ successAll, failedAll, result: resultAdjusted })
          if (successAll) {
            setTimeout(() => resetRenameResult(), 5000)
          }
        }

        setFileInput({
          ...fileInput,
          imageFiles: null
        })
        fileInput.ref.current && (fileInput.ref.current.value = "")

        if (licenseType === LicenseType.demo) {
          setFreeTrialRemaining(freeTrialRemaining - filePaths.length) // TODO: Replace this with data from backend API
        }
      }
    )
  }

  return (
    <>
      <RenameGeneralErrorModal
        isOpen={generalError !== null}
        close={handleGeneralErrorModalClose}
        errorType={generalError as APIErrorType}
      />
      <RenameErrorFileListModal
        isOpen={isFailedListModalOpen}
        close={() => setIsFailedListModalOpen(false)}
        renameResult={renameResult.result}
      />
      <RenameHistoryModal
        isOpen={isRenameHistoryModalOpen}
        close={() => setIsRenameHistoryModalOpen(false)}
      />
      <div>
        {/* Heading */}
        <div>
          <h1 className="text-xl font-semibold text-neutral-800">Rename Photos</h1>
          <p className="mt-1 text-sm text-neutral-700">You can add photos in common formats</p>
          {licenseType === LicenseType.demo && (
            <div className={`mt-[0.75rem] flex items-center text-xs font-medium text-neutral-400`}>
              <p>
                <span className={`${remainingTextStyle}`}>{freeTrialRemaining}</span>{" "}
                {freeTrialRemaining === 1 ? "file" : "files"} remaining
              </p>
              <p className="mx-1">•</p>
              <ExternalLink
                className="flex items-center font-medium text-amber-500 hover:text-amber-400"
                href={WebsiteLinks.checkout}
                color="silent">
                <p className="">Unlock unlimited files</p>
                <SVGStar className="ml-1 w-3" />
              </ExternalLink>
            </div>
          )}
          {licenseType === LicenseType.full && (
            <div
              className={`mt-[0.75rem] flex w-full items-center justify-end text-xs font-medium text-neutral-400`}>
              <button
                className="flex w-fit items-center hover:cursor-pointer hover:underline"
                onClick={() => setIsRenameHistoryModalOpen(true)}>
                <p className="">History</p>
                <SVGArrowClock className="ml-1 w-3.5" />
              </button>
            </div>
          )}
        </div>
        {/* Form */}
        <div className="mt-1 w-[35rem]">
          {/* File Drop Zone */}
          <div className="flex w-full items-center justify-center">
            <Label
              id="dropzone-label"
              htmlFor="dropzone-file"
              className={`flex h-64 w-full ${isFileInputEmpty && renameResult.result.length === 0 && "cursor-pointer"} ${isLoading && "cursor-not-allowed"} flex-col items-center ${isFileInputEmpty && "justify-center"} rounded-t-lg border border-dashed border-primary-600 transition-colors duration-200 ${isFileInputEmpty && renameResult.result.length === 0 && "hover:bg-accent-50"} ${isLoading && "hover:bg-white"}`}
              onDragOver={handleFileDragOver}
              onDrop={handleFileDrop}>
              {dropZone}
              <FileInput
                ref={fileInput.ref}
                onChange={handleFilesChange}
                id="dropzone-file"
                className="hidden"
                accept={FILE_TYPES.join(",")}
                disabled={
                  !isFileInputEmpty || isLastFileRemoved || isLoading || renameResult.result.length > 0
                }
                multiple
              />
            </Label>
          </div>
          <div className="flex justify-center rounded-b-lg bg-neutral-100 pt-3">
            <div className="flex flex-col items-center">
              {/* Browse button */}
              <Button className="w-48" color="accent" size="sm" onClick={handleBrowse} disabled={isLoading}>
                <div className="flex items-center">
                  <SVGUpload className="mr-2 w-4" />
                  <p className="text-sm">Browse</p>
                </div>
              </Button>
              <p className="my-2 text-xs text-neutral-400">Or drop files in the drop zone above.</p>
            </div>
          </div>
          {/* Rename button */}
          <Button
            className="mt-5 w-full font-semibold"
            color="primary"
            onClick={handleRenameRequest}
            disabled={renameBtnDisabled}
            isLoading={isLoading}>
            {renameText}
          </Button>
        </div>
        {/* Example Output */}
        <ExampleOutput />
      </div>
    </>
  )
}
