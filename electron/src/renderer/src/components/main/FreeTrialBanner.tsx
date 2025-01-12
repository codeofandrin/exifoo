import ExternalLink from "../common/ExternalLink"
import { WebsiteLinks } from "../../utils/constants"
import { useActivateLicenseStore } from "../../store/main/useActivateLicenseStore"
import SVGAlertTriangle from "../../assets/icons/AlertTriangle.svg?react"

export function FreeTrialBanner() {
  const bulletPoint = <span className="mx-1">•</span>
  const { setIsOpen: setIsActivateLicenseOpen } = useActivateLicenseStore()

  function handleActivate() {
    setIsActivateLicenseOpen(true)
  }

  return (
    <div className="absolute bottom-0 right-0 mb-5 mr-5 flex items-center rounded-lg bg-neutral-700 px-3 py-2 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.5)_0px_3px_7px_-3px]">
      <SVGAlertTriangle className="w-5 text-yellow-400" />
      <div className="ml-2 flex items-center text-xs text-neutral-300">
        <p className="font-semibold">No license</p>
        {bulletPoint}
        <button
          className="underline decoration-transparent transition-colors duration-200 hover:decoration-inherit"
          onClick={handleActivate}>
          Activate
        </button>
        {bulletPoint}
        <ExternalLink href={WebsiteLinks.checkout} color="silent" displayIcon>
          Buy
        </ExternalLink>
      </div>
    </div>
  )
}
