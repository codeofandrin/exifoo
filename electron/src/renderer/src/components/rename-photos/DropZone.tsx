import { ImageFilesInputType } from "../../utils/types"
import { getTruncatedText, countInArray } from "../../utils/helpers"
import SVGImage from "../../assets/icons/Image.svg?react"
import SVGXCircle from "../../assets/icons/XCircle.svg?react"
import SVGCheck from "../../assets/icons/Check.svg?react"

export function EmptyDropZone() {
  return (
    <div className="flex flex-col items-center pb-6 pt-5">
      <SVGImage className="w-10 text-primary-600" />
      <p className="font-md mb-2 mt-2 text-sm text-neutral-700">Drop file or browse</p>
      <p className="text-xs font-normal text-neutral-500">Format: PNG, JPEG, JPG</p>
    </div>
  )
}

interface SuccessMsgDropZonePropsType {
  renamedFiles: number
}

export function SuccessMsgDropZone({ renamedFiles }: SuccessMsgDropZonePropsType) {
  return (
    <div className="flex flex-col items-center pb-6 pt-5">
      <div className="rounded-full bg-green-100/75 p-2">
        <div className="rounded-full bg-green-200/75 p-2">
          <SVGCheck className="w-7 text-green-500" />
        </div>
      </div>
      <p className="font-md mb-2 mt-2 text-sm text-neutral-700">
        Successfully renamed {renamedFiles} photos.
      </p>
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

function getParentFolder(filePath) {
  const parentFolder = filePath.substring(0, filePath.lastIndexOf("/"))
  const lastFolder = parentFolder.substring(parentFolder.lastIndexOf("/") + 1)
  return `.../${lastFolder}`
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
}

export function FilesListDropZone({
  fileInput,
  setFileInput,
  setIsLastFileRemoved
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
                {getTruncatedText(getParentFolder(filePath), 25)}
              </p>
            )}
          </div>
        </div>
        <div>
          <button
            className="group rounded-lg bg-white/50 p-1.5 transition-colors duration-150 hover:bg-red-500"
            onClick={() => handleRemove(i)}>
            <SVGXCircle className="w-5 text-red-500 transition-colors duration-150 group-hover:text-white" />
          </button>
        </div>
      </div>
    )
    fileElements.push(elem)
  }

  return <div className="flex w-full flex-col overflow-y-scroll p-4">{fileElements}</div>
}
