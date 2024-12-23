import InfoTooltip from "../../common/InfoTooltip"

interface OptionsHeaderPropsType {
  children: string
}

export function OptionsHeader({ children }: OptionsHeaderPropsType) {
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

export function Option({ children, title, first = false, className = "", infoText = null }: OptionPropsType) {
  return (
    <div className={`${className} flex flex-col ${!first && "ml-5"}`}>
      <div className="flex items-center">
        <OptionTitle>{title}</OptionTitle>
        {infoText !== null && (
          <div className="ml-1">
            <InfoTooltip text={infoText} />
          </div>
        )}
      </div>
      <div className="mt-1">{children}</div>
    </div>
  )
}

interface OptionSectionPropsType {
  children: React.ReactElement | React.ReactElement[]
}

export function OptionSection({ children }: OptionSectionPropsType) {
  return <div className="mt-3 flex justify-between">{children}</div>
}

interface OptionsContainerPropsType {
  children: React.ReactElement | React.ReactElement[]
  first?: boolean
}

export function OptionsContainer({ children, first = false }: OptionsContainerPropsType) {
  return <div className={`flex flex-col ${!first && "mt-[1.625rem]"}`}>{children}</div>
}
