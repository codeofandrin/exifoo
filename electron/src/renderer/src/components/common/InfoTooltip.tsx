/**
 * Copyright (c) codeofandrin
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Tooltip as FlowbiteTooltip } from "flowbite-react"
import SVGInfo from "../../assets/icons/Info2.svg?react"

const toolTipTheme = {
  style: {
    dark: "bg-neutral-800 text-white"
  },
  arrow: {
    style: {
      dark: "bg-neutral-800"
    }
  }
}

interface InfoTooltipPropsType {
  text: string
}

export default function InfoTooltip({ text }: InfoTooltipPropsType) {
  return (
    <FlowbiteTooltip className="max-w-lg text-xs delay-300" content={text} style="dark" theme={toolTipTheme}>
      <SVGInfo className="h-3.5 min-w-3.5 text-neutral-500 transition-colors duration-200 hover:text-accent-500" />
    </FlowbiteTooltip>
  )
}
