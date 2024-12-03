import { StatusType } from "../../utils/types"
import { FileInputStatusBasicType, ErrorType } from "../../utils/enums"

function getErrorMsg(errorType: ErrorType, item: string | null): string {
  let statusMsg = ""
  switch (errorType) {
    case ErrorType.unexpected:
      statusMsg = "Something went wrong unexpected. Please try again."
      break

    case ErrorType.invalidFileType:
      statusMsg = `Invalid file type for '${item}'.`
      break

    case ErrorType.noExifData:
      statusMsg = `No exif data found for '${item}'.`
      break

    default:
      break
  }

  return statusMsg
}

interface StatusPropsType {
  className?: string
  status: StatusType
  filesAmount: number
}

export default function Status({ className = "", status, filesAmount }: StatusPropsType) {
  let statusMsg = ""
  let statusColor = ""
  if (status.type === FileInputStatusBasicType.success) {
    statusMsg = `Successfully renamed ${filesAmount} files.`
    statusColor = "text-green-500"
  } else if (status.type === FileInputStatusBasicType.error) {
    statusColor = "text-red-500"
    if (status.error !== null) {
      statusMsg = getErrorMsg(status.error.type, status.error.item)
    }
  }

  return <p className={`${className} mt-2.5 text-xs sm:mt-2 sm:text-sm ${statusColor}`}>{statusMsg}</p>
}
