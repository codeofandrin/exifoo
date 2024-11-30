import { FileInput, Label } from "flowbite-react"

import SVGImage from "../assets/icons/Image.svg?react"

export default function FileDropZone({ innerRef }) {
  return (
    <div className="flex w-full items-center justify-center">
      <Label
        htmlFor="dropzone-file"
        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-t-lg border-1 border-dashed border-primary-600 transition-colors duration-200 hover:bg-accent-50">
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <SVGImage className="w-10 text-primary-600" />
          <p className="font-md mb-2 mt-2 text-sm text-neutral-700">Drop file or browse</p>
          <p className="text-xs font-normal text-neutral-500">Format: PNG, JPEG, JPG</p>
        </div>
        <FileInput ref={innerRef} id="dropzone-file" className="hidden" accept="image/png, image/jpeg" />
      </Label>
    </div>
  )
}
