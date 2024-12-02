import { useEffect } from "react"

import Dropdown from "./Dropdown"
import ToggleSwitch from "./ToggleSwitch"
import TextInput from "./TextInput"
import useDateOptionsContext from "../contexts/DateOptionsContext"
import useTimeOptionsContext from "../contexts/TimeOptionsContext"
import useCustomTextContext from "../contexts/CustomTextContext"

interface OptionsHeaderPropsType {
  children: string
}

function OptionsHeader({ children }: OptionsHeaderPropsType) {
  return <h2 className="text-sm font-medium text-neutral-700">{children}</h2>
}

interface OptionTitlePropsType {
  children: string
}

function OptionTitle({ children }: OptionTitlePropsType) {
  return <h3 className="text-xs font-medium text-neutral-500">{children}</h3>
}

interface OptionPropsType {
  children: React.ReactElement
  title: string
  first?: boolean
  className?: string
}

function Option({ children, title, first = false, className = "" }: OptionPropsType) {
  return (
    <div className={`${className} flex flex-col ${!first && "ml-5"}`}>
      <OptionTitle>{title}</OptionTitle>
      <div className="mt-1">{children}</div>
    </div>
  )
}

interface OptionSectionPropsType {
  children: React.ReactElement | React.ReactElement[]
}

function OptionSection({ children }: OptionSectionPropsType) {
  return <div className="mt-3 flex justify-between">{children}</div>
}

interface OptionContainerPropsType {
  children: React.ReactElement | React.ReactElement[]
  first?: boolean
}

function OptionContainer({ children, first = false }: OptionContainerPropsType) {
  return <div className={`flex flex-col ${!first && "mt-7"}`}>{children}</div>
}

function DateOptions() {
  const { setYearFormat, setMonthFormat, setDayFormat, setDateSeparator } = useDateOptionsContext()

  return (
    <OptionContainer first>
      <OptionsHeader>Date Options</OptionsHeader>
      <OptionSection>
        {/* Year Format */}
        <Option title="Year Format" first>
          <Dropdown
            id={"year-format"}
            options={[
              { id: "YYYY", value: "YYYY" },
              { id: "YY", value: "YY" }
            ]}
            setValue={setYearFormat}
          />
        </Option>
        {/* Month Format */}
        <Option title="Month Format">
          <Dropdown
            id={"month-format"}
            options={[
              { id: "MM", value: "MM" },
              { id: "M", value: "M" }
            ]}
            setValue={setMonthFormat}
          />
        </Option>
        {/* Day Format */}
        <Option title="Day Format">
          <Dropdown
            id={"day-format"}
            options={[
              { id: "DD", value: "DD" },
              { id: "D", value: "D" }
            ]}
            setValue={setDayFormat}
          />
        </Option>
      </OptionSection>
      <OptionSection>
        {/* Separator */}
        <Option title="Separator" className="w-full" first>
          <Dropdown
            id={"date-separator"}
            options={[
              { id: "", value: "None" },
              { id: "-", value: "Dash (-)" },
              { id: ".", value: "Period (.)" },
              { id: ",", value: "Comma (,)" }
            ]}
            setValue={setDateSeparator}
          />
        </Option>
      </OptionSection>
    </OptionContainer>
  )
}

function TimeOptions() {
  // prettier-ignore
  const {
    isAddTime,
    setIsAddTime,
    setHoursFormat,
    setMinutesFormat,
    setSecondsFormat,
    setTimeSeparator
  } = useTimeOptionsContext()

  return (
    <OptionContainer>
      <OptionsHeader>Time Options</OptionsHeader>
      {/* Time options toggle */}
      <div className="mt-3">
        <ToggleSwitch size="xs" setChecked={setIsAddTime}>
          <span className="ms-3 text-xs font-normal text-neutral-600">Add Time</span>
        </ToggleSwitch>
      </div>
      <>
        {isAddTime && (
          <>
            <OptionSection>
              <Option title="Hours Format" first>
                <Dropdown
                  id={"hours-format"}
                  options={[
                    { id: "HH", value: "HH" },
                    { id: "H", value: "H" }
                  ]}
                  setValue={setHoursFormat}
                />
              </Option>
              {/* Minutes Format */}
              <Option title="Min. Format">
                <Dropdown
                  id={"minutes-format"}
                  options={[
                    { id: "MM", value: "MM" },
                    { id: "M", value: "M" }
                  ]}
                  setValue={setMinutesFormat}
                />
              </Option>
              {/* Seconds Format */}
              <Option title="Sec. Format">
                <Dropdown
                  id={"seconds-format"}
                  options={[
                    { id: "SS", value: "SS" },
                    { id: "S", value: "S" }
                  ]}
                  setValue={setSecondsFormat}
                />
              </Option>
            </OptionSection>
            <OptionSection>
              {/* Separator */}
              <Option title="Separator" className="w-full" first>
                <Dropdown
                  id={"time-separator"}
                  options={[
                    { id: "", value: "None" },
                    { id: ":", value: "Colon (:)" },
                    { id: ".", value: "Period (.)" },
                    { id: ",", value: "Comma (,)" }
                  ]}
                  setValue={setTimeSeparator}
                />
              </Option>
            </OptionSection>
          </>
        )}
      </>
    </OptionContainer>
  )
}

export function isValidCustomText(value: string): boolean {
  const macOSFileNameRegex = /^[^/]{0,30}$/
  return macOSFileNameRegex.test(value)
}

function OtherOptions() {
  // prettier-ignore
  const {
    isAddCustomText,
    setIsAddCustomText,
    customText,
    setCustomText,
    isValid,
    setIsValid
  } = useCustomTextContext()

  useEffect(() => {
    setIsValid(isValidCustomText(customText))
  }, [customText])

  return (
    <OptionContainer>
      <OptionsHeader>Other Options</OptionsHeader>
      {/* Custom text toggle */}
      <div className="mt-3">
        <ToggleSwitch size="xs" setChecked={setIsAddCustomText}>
          <span className="ms-3 text-xs font-normal text-neutral-600">Add custom text</span>
        </ToggleSwitch>
      </div>
      <>
        {isAddCustomText && (
          <OptionSection>
            {/* Custom Text */}
            <Option title="Custom Text" first>
              <div>
                <TextInput
                  placeholder="Enter Text"
                  setValue={setCustomText}
                  isValid={isValid}
                  maxLength={30}
                />
                <div className="mt-1">
                  <p className={`text-xs text-red-500 ${isValid && "invisible"}`}>Invalid text input</p>
                </div>
              </div>
            </Option>
          </OptionSection>
        )}
      </>
    </OptionContainer>
  )
}

export default function Options() {
  return (
    <div className="ml-20 flex flex-col">
      <DateOptions />
      <TimeOptions />
      <OtherOptions />
    </div>
  )
}
