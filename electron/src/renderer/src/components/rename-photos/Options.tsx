import { useEffect } from "react"

import Dropdown from "../common/Dropdown"
import ToggleSwitch from "../common/ToggleSwitch"
import TextInput from "../common/TextInput"
import InfoTooltip from "../common/InfoTooltip"
import useDateOptionsContext from "../../contexts/DateOptionsContext"
import useTimeOptionsContext from "../../contexts/TimeOptionsContext"
import useCustomTextContext from "../../contexts/CustomTextContext"

const CUSTOM_TEXT_MAX_LEN = 30

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
  children: React.ReactElement | React.ReactElement[]
  title: string
  first?: boolean
  className?: string
  infoText?: string | null
}

function Option({ children, title, first = false, className = "", infoText = null }: OptionPropsType) {
  return (
    <div className={`${className} flex flex-col ${!first && "ml-5"}`}>
      <div className="flex items-center">
        <OptionTitle>{title}</OptionTitle>
        {infoText !== null && (
          <InfoTooltip
            text={`The text that is placed after date and time, before the actual filename. 
              Cannot contain slashes ('/') and is limited to ${CUSTOM_TEXT_MAX_LEN} characters.`}
          />
        )}
      </div>
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

interface OptionsContainerPropsType {
  children: React.ReactElement | React.ReactElement[]
  first?: boolean
}

function OptionsContainer({ children, first = false }: OptionsContainerPropsType) {
  return <div className={`flex flex-col ${!first && "mt-8"}`}>{children}</div>
}

function DateOptions() {
  const { setYearFormat, setMonthFormat, setDayFormat, setDateSeparator } = useDateOptionsContext()

  return (
    <OptionsContainer first>
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
              { id: "(M)M", value: "(M)M" }
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
              { id: "(D)D", value: "(D)D" }
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
    </OptionsContainer>
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
    setTimeSeparator,
    resetHoursFormat,
    resetMinutesFormat,
    resetSecondsFormat,
    resetTimeSeparator
  } = useTimeOptionsContext()

  function handleAddTimeToggle(e) {
    const isChecked = e.target.checked
    setIsAddTime(isChecked)

    if (isChecked) {
      resetHoursFormat()
      resetMinutesFormat()
      resetSecondsFormat()
      resetTimeSeparator()
    }
  }

  return (
    <OptionsContainer>
      <OptionsHeader>Time Options</OptionsHeader>
      {/* Time options toggle */}
      <div className="mt-3">
        <ToggleSwitch size="xs" handleToggle={handleAddTimeToggle}>
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
                    { id: "(H)H", value: "(H)H" }
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
                    { id: "(M)M", value: "(M)M" }
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
                    { id: "(S)S", value: "(S)S" }
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
                    { id: "-", value: "Dash (-)" },
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
    </OptionsContainer>
  )
}

export function isValidCustomText(value: string): boolean {
  const macOSFileNameRegex = new RegExp(String.raw`^[^/]{0,${CUSTOM_TEXT_MAX_LEN}}$`, "g")
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
    setIsValid,
    resetCustomText
  } = useCustomTextContext()

  useEffect(() => {
    setIsValid(isValidCustomText(customText))
  }, [customText])

  function handleAddCustomTextToggle(e) {
    const isChecked = e.target.checked
    setIsAddCustomText(isChecked)

    if (isChecked) {
      resetCustomText()
    }
  }

  return (
    <OptionsContainer>
      <OptionsHeader>Other Options</OptionsHeader>
      {/* Custom text toggle */}
      <div className="mt-3">
        <ToggleSwitch size="xs" handleToggle={handleAddCustomTextToggle}>
          <span className="ms-3 text-xs font-normal text-neutral-600">Add custom text</span>
        </ToggleSwitch>
      </div>
      <>
        {isAddCustomText && (
          <OptionSection>
            {/* Custom Text */}
            <Option
              title="Custom Text"
              first
              infoText={`The text that is placed after date and time, before the actual filename. Cannot contain slashes ('/') and is limited to ${CUSTOM_TEXT_MAX_LEN} char`}>
              <TextInput
                placeholder="Enter Text"
                setValue={setCustomText}
                isValid={isValid}
                maxLength={CUSTOM_TEXT_MAX_LEN}
              />
              <div className="mt-1">
                <p className={`text-xs text-red-500 ${isValid && "invisible"}`}>Invalid text input</p>
              </div>
            </Option>
          </OptionSection>
        )}
      </>
    </OptionsContainer>
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
