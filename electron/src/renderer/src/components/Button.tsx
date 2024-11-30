import type { CustomFlowbiteTheme, ButtonProps } from "flowbite-react"
import { Button as FlowBiteButton } from "flowbite-react"

const theme: CustomFlowbiteTheme["button"] = {
  color: {
    primary: "bg-primary-500 text-white hover:bg-primary-600 font-medium",
    accent: "bg-white hover:bg-accent-50 border-1 border-accent-500 text-neutral-600 font-medium"
  }
}

export default function Button({ ...props }: ButtonProps) {
  return (
    <FlowBiteButton theme={theme} {...props}>
      {props.children}
    </FlowBiteButton>
  )
}
