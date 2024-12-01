import { ImageFilesInputType } from "../utils/types"
import { getTruncatedText } from "../utils/helpers"
import SVGImage from "../assets/icons/Image.svg?react"
import SVGXCircle from "../assets/icons/XCircle.svg?react"

export function EmptyDropZone() {
  return (
    <div className="flex flex-col items-center pb-6 pt-5">
      <SVGImage className="w-10 text-primary-600" />
      <p className="font-md mb-2 mt-2 text-sm text-neutral-700">Drop file or browse</p>
      <p className="text-xs font-normal text-neutral-500">Format: PNG, JPEG, JPG</p>
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

interface FilesListDropZonePropsType {
  fileInput: ImageFilesInputType
  setFileInput: Function
  setIsLastFileRemoved: Function
}

export function FilesListDropZone({
  fileInput,
  setFileInput,
  setIsLastFileRemoved
}: FilesListDropZonePropsType) {
  function handleRemove(event, key: number) {
    event.stopPropagation()
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
    const file = files[i]
    const elem = (
      <div
        key={i}
        className={`flex items-center justify-between rounded-lg bg-primary-50 px-3 py-1 ${i > 0 && "mt-2"}`}>
        <div className="flex items-center">
          <SVGImage className="w-5 text-primary-600" />
          <p className="ml-2 text-sm font-medium">{getTruncatedText(file.name, 45)}</p>
        </div>
        <div>
          <button className="rounded-lg bg-white/50 p-1.5" onClick={(event) => handleRemove(event, i)}>
            <SVGXCircle className="w-5 text-red-500" />
          </button>
        </div>
      </div>
    )
    fileElements.push(elem)
  }

  return <div className="flex w-full flex-col overflow-y-scroll p-4">{fileElements}</div>
}
