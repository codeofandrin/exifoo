import { EMail } from "../utils/constants"
import ExternalLink from "./ExternalLink"
import SVGMessages from "../assets/icons/Messages.svg?react"
import SVGHelpCircle from "../assets/icons/HelpCircle.svg?react"

export default function Footer() {
  return (
    <footer className="my-6 text-neutral-500">
      {/* Feedback */}
      <ExternalLink href={`mailto:${EMail.feedback}`} color="silent">
        <div className="flex items-center">
          <SVGMessages className="w-4 stroke-2" />
          <p className="ml-2 text-xxs">Feedback</p>
        </div>
      </ExternalLink>
      {/* Help */}
      <ExternalLink href={`mailto:${EMail.help}`} color="silent">
        <div className="mt-1 flex items-center">
          <SVGHelpCircle className="w-4 stroke-2" />
          <p className="ml-2 text-xxs">Help</p>
        </div>
      </ExternalLink>
    </footer>
  )
}
