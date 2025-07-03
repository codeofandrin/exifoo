/**
 * Copyright (c) codeofandrin 
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { CustomFlowbiteTheme, ButtonProps as FlowbiteButtonPropsType } from "flowbite-react"
import { Button as FlowbiteButton } from "flowbite-react"
import SVGSpinner from "../../assets/icons/Spinner.svg?react"

const theme: CustomFlowbiteTheme["button"] = {
  color: {
    primary:
      "bg-primary-500 text-white hover:bg-primary-600 font-medium transition-colors duration-200 disabled:text-primary-200 disabled:hover:bg-primary-500",
    accent:
      "bg-white hover:bg-accent-50 border border-accent-500 text-neutral-600 font-medium transition-colors duration-200 disabled:text-neutral-400 disabled:hover:bg-white",
    silent:
      "bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-600 font-normal transition-colors duration-200 disabled:text-neutral-400 disabled:hover:bg-white",
    critical:
      "bg-red-600 hover:bg-red-700 border border-red-800 text-white font-medium transition-colors duration-200 disabled:hover:bg-red-600 disabled:text-red-200"
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
  let spinColors = ""
  if (props.color === "primary") {
    spinColors = "fill-white text-primary-600"
  } else if (["accent", "silent"].includes(props.color as string)) {
    spinColors = "fill-neutral-400 text-neutral-300"
  } else if (props.color === "critical") {
    spinColors = "fill-white text-red-700"
  }

  return (
    <FlowbiteButton theme={theme} {...props}>
      <div className="flex items-center">
        {isLoading && <SVGSpinner className={`h-4 w-4 animate-spin ${spinColors}`} />}
        <div className={`${isLoading && "ml-2"}`}>{props.children}</div>
      </div>
    </FlowbiteButton>
  )
}
