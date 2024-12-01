import { useRef, useState, useEffect } from "react"
import { FileInput, Label } from "flowbite-react"

import { EmptyDropZone, FilesListDropZone } from "./DropZone"
import { ImageFilesInputType } from "../utils/types"
import Button from "./Button"
import SVGUpload from "../assets/icons/Upload.svg?react"

export default function RenameForm() {
  const [fileInput, setFileInput] = useState<ImageFilesInputType>({
    ref: useRef<HTMLInputElement>(null),
    imageFiles: null,
    renamedAmount: 0
  })
  const [isLastFileRemoved, setIsLastFileRemoved] = useState<boolean>(false)

  useEffect(() => {
    if (isLastFileRemoved) {
      setTimeout(() => {
        setIsLastFileRemoved(false)
      }, 0)
    }
  }, [isLastFileRemoved])

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
    const imageFiles = fileInput.ref.current?.files as FileList
    if (imageFiles.length > 0) {
      setFileInput({ ...fileInput, imageFiles })
    } else {
      setFileInput({ ...fileInput, imageFiles: null })
    }
  }

  const isFileInputEmpty = !Boolean(fileInput.imageFiles)

  return (
    <div>
      {/* Heading */}
      <div>
        <h1 className="text-xl font-semibold text-neutral-800">Rename Photos</h1>
        <p className="mt-1 text-sm text-neutral-700">You can add photos in png, jpeg, and jpg format</p>
      </div>
      {/* Form */}
      <div className="mt-8 w-[35rem]">
        {/* File Drop Zone */}
        <div className="flex w-full items-center justify-center">
          <Label
            id="dropzone-label"
            htmlFor="dropzone-file"
            className={`flex h-64 w-full ${isFileInputEmpty && "cursor-pointer"} flex-col items-center ${isFileInputEmpty && "justify-center"} rounded-t-lg border-1 border-dashed border-primary-600 transition-colors duration-200 ${isFileInputEmpty && "hover:bg-accent-50"}`}>
            {fileInput.imageFiles ? (
              <FilesListDropZone
                fileInput={fileInput}
                setFileInput={setFileInput}
                setIsLastFileRemoved={setIsLastFileRemoved}
              />
            ) : (
              <EmptyDropZone />
            )}
            <FileInput
              ref={fileInput.ref}
              onChange={handleFilesChange}
              id="dropzone-file"
              className="hidden"
              accept="image/png, image/jpeg"
              disabled={!isFileInputEmpty || isLastFileRemoved}
              multiple
            />
          </Label>
        </div>
        <div className="flex justify-center rounded-b-lg bg-neutral-100 pt-3">
          <div className="flex flex-col items-center">
            {/* Browse button */}
            <Button className="w-48" color="accent" size="sm" onClick={handleBrowse}>
              <div className="flex items-center">
                <SVGUpload className="mr-2 w-4" />
                <p className="text-sm">Browse</p>
              </div>
            </Button>
            <p className="my-2 text-xs text-neutral-400">Or drop files in the drop zone above.</p>
          </div>
        </div>
        {/* Rename button */}
        <Button className="mt-5 w-full font-semibold" color="primary">
          Rename
        </Button>
      </div>
      {/* Example Output */}
      <div className="flex flex-col items-center">
        <h1 className="mt-4 text-xs font-medium text-neutral-700">Example Output</h1>
        {/* TODO: Add dynamic example output */}
        <p className="mt-1 text-xs text-neutral-600">241005_131538_myPhoto.png</p>
      </div>
    </div>
  )
}
