import type { CustomFlowbiteTheme, ButtonProps } from "flowbite-react"
import { Button as FlowBiteButton } from "flowbite-react"

const theme: CustomFlowbiteTheme["button"] = {
  color: {
    primary: "bg-primary-500 text-white hover:bg-primary-600 font-medium transition-colors duration-200",
    accent:
      "bg-white hover:bg-accent-50 border border-accent-500 text-neutral-600 font-medium transition-colors duration-200"
  }
}

export default function Button({ ...props }: ButtonProps) {
  return (
    <FlowBiteButton theme={theme} {...props}>
      {props.children}
    </FlowBiteButton>
  )
}
