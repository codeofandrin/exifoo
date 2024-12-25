import { useCustomTextStore } from "../../../store/main/useCustomTextStore"
import { useDateOptionsStore } from "../../../store/main/useDateOptionsStore"
import { useTimeOptionsStore } from "../../../store/main/useTimeOptionsStore"
import {
  getYearStr,
  getMonthStr,
  getDayStr,
  getHoursStr,
  getMinutesStr,
  getSecondsStr
} from "../../../utils/helpers"

export default function ExampleOutput() {
  const { yearFormat, monthFormat, dayFormat, dateSeparator } = useDateOptionsStore()
  const { isAddTime, hoursFormat, minutesFormat, secondsFormat, timeSeparator } = useTimeOptionsStore()
  const { isAddCustomText, customText } = useCustomTextStore()

  const DUMMY_YEAR = 2024
  const DUMMY_MONTH = 2
  const DUMMY_DAY = 8
  const dayStr = getDayStr(DUMMY_DAY, dayFormat === "DD")
  const monthStr = getMonthStr(DUMMY_MONTH, monthFormat === "MM")
  const yearStr = getYearStr(DUMMY_YEAR, yearFormat === "YY")

  let dateTimeStr = [yearStr, monthStr, dayStr].join(dateSeparator)
  if (isAddTime) {
    const DUMMY_HOURS = 6
    const DUMMY_MINUTES = 4
    const DUMMY_SECONDS = 9
    const hoursStr = getHoursStr(DUMMY_HOURS, hoursFormat === "HH")
    const minutesStr = getMinutesStr(DUMMY_MINUTES, minutesFormat === "MM")
    const secondsStr = getSecondsStr(DUMMY_SECONDS, secondsFormat === "SS")

    dateTimeStr += "_"
    dateTimeStr += [hoursStr, minutesStr, secondsStr].join(timeSeparator)
  }

  let fileNameStr = ""
  if (isAddCustomText && customText) {
    fileNameStr = `${dateTimeStr}_${customText}_myPhoto.png`
  } else {
    fileNameStr = `${dateTimeStr}_myPhoto.png`
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-4 text-xs font-medium text-neutral-700">Example Output</h1>
      <p className="mt-1 text-xs text-neutral-600">{fileNameStr}</p>
    </div>
  )
}
