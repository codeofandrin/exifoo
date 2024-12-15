import type { CustomFlowbiteTheme, ButtonProps as FlowbiteButtonPropsType } from "flowbite-react"
import { Button as FlowbiteButton } from "flowbite-react"
import SVGSpinner from "../../assets/icons/Spinner.svg?react"

const theme: CustomFlowbiteTheme["button"] = {
  color: {
    primary:
      "bg-primary-500 text-white hover:bg-primary-600 font-medium transition-colors duration-200 disabled:hover:bg-primary-500",
    accent:
      "bg-white hover:bg-accent-50 border border-accent-500 text-neutral-600 font-medium transition-colors duration-200 disabled:hover:bg-white",
    silent:
      "bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-600 font-normal transition-colors duration-200"
  },
  disabled: "cursor-not-allowed",
  size: {
    xs: "px-2 py-1 text-xs",
    "sm-xs": "px-2 py-2 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
    xl: "px-6 py-3 text-base"
  }
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
