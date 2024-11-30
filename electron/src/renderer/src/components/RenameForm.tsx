import { useRef } from "react"

import FileDropZone from "./FileDropZone"
import Button from "./Button"
import SVGUpload from "../assets/icons/Upload.svg?react"

export default function RenameForm() {
  const fileInputRef = useRef<HTMLInputElement>()

  function handleBrowse() {
    const fileInput = fileInputRef.current
    if (fileInput) {
      fileInput.click()
    }
  }

  return (
    <div>
      {/* Heading */}
      <div>
        <h1 className="text-xl font-semibold text-neutral-800">Rename Photos</h1>
        <p className="mt-1 text-sm text-neutral-700">You can add photos in png, jpeg, and jpg format</p>
      </div>
      {/* Form */}
      <div className="w-[35rem] mt-8">
        <FileDropZone innerRef={fileInputRef} />
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
