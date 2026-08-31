/**
 * Copyright (c) codeofandrin
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useFeedbackStore } from "../../../store/main/useFeedbackStore"
import SVGMessages from "../../../assets/icons/Messages.svg?react"

export function FeedbackBanner() {
  const { openPopup } = useFeedbackStore()

  return (
    <div className="-mx-6 mb-3 flex items-center border-y border-amber-300 bg-amber-100 px-6 py-3">
      <SVGMessages className="mr-2 h-4 w-4 shrink-0 stroke-2 text-amber-600" />
      <span className="text-xs text-amber-800">
        Help me improve exifoo by sharing your feedback.
        <button
          onClick={openPopup}
          className="ml-3 font-medium text-amber-700 underline decoration-transparent transition-colors duration-200 hover:decoration-inherit">
          Open survey
        </button>
      </span>
    </div>
  )
}
