/**
 * Copyright (c) codeofandrin
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { EMail } from "../../utils/constants"
import ExternalLink from "../common/ExternalLink"
import SVGMessages from "../../assets/icons/Messages.svg?react"
import SVGHelpCircle from "../../assets/icons/HelpCircle.svg?react"

export default function Footer() {
  return (
    <footer className="mb-6 mt-auto text-neutral-500">
      {/* Feedback */}
      <div className="w-fit">
        <ExternalLink href={`mailto:${EMail.feedback}`} color="silent">
          <div className="flex items-center">
            <SVGMessages className="w-4 stroke-2" />
            <p className="ml-2 w-fit text-xxs">Feedback</p>
          </div>
        </ExternalLink>
      </div>
      {/* Help */}
      <div className="w-fit">
        <ExternalLink href={`mailto:${EMail.help}`} color="silent">
          <div className="mt-1 flex items-center">
            <SVGHelpCircle className="w-4 stroke-2" />
            <p className="ml-2 text-xxs">Help</p>
          </div>
        </ExternalLink>
      </div>
    </footer>
  )
}
