import type { CustomFlowbiteTheme, ButtonProps as FlowbiteButtonPropsType } from "flowbite-react"
import { Button as FlowbiteButton } from "flowbite-react"
import SVGSpinner from "../../assets/icons/Spinner.svg?react"

const theme: CustomFlowbiteTheme["button"] = {
  color: {
    primary:
      "bg-primary-500 text-white hover:bg-primary-600 font-medium transition-colors duration-200 disabled:hover:bg-primary-500",
    accent:
      "bg-white hover:bg-accent-50 border border-accent-500 text-neutral-600 font-medium transition-colors duration-200"
  },
  disabled: "cursor-not-allowed"
}

interface ButtonPropsType extends FlowbiteButtonPropsType {
  isLoading?: boolean
}

export default function Button({ isLoading = false, ...props }: ButtonPropsType) {
  return (
    <FlowbiteButton theme={theme} {...props}>
      <div className="flex items-center">
        {isLoading && <SVGSpinner className="h-4 w-4 animate-spin fill-white text-primary-600" />}
        <div className={`${isLoading && "ml-2"}`}>{props.children}</div>
      </div>
    </FlowbiteButton>
  )
}
