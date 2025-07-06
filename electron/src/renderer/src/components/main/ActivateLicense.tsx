/**
 * Copyright (c) codeofandrin
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ActivateCard from "../ActivateCard"
import ExternalLink from "../common/ExternalLink"
import StartBackground from "../StartBackground"
import { WebsiteLinks } from "../../utils/constants"
import ImgAppLogoLarge from "../../assets/images/exifoo_logo_large.png"

interface ActivateLicensePropsType {
  handleCloseActivateLicense: React.MouseEventHandler<HTMLButtonElement>
}

export default function ActivateLicense({ handleCloseActivateLicense }: ActivateLicensePropsType) {
  return (
    <div className="h-screen">
      <div className="relative h-full w-full overflow-x-hidden">
        <StartBackground />
        <div className="flex flex-col">
          <div className="mt-14 flex justify-center">
            <img src={ImgAppLogoLarge} alt="exifoo_logo" className="w-36" />
          </div>
          <div className="mt-5 flex flex-col items-center">
            {/* Title */}
            <h1 className="text-center text-3.5xl font-semibold">
              <span id="get-started-title">Activate your license</span>
            </h1>
            {/* Description */}
            <div className="mt-4 text-sm text-neutral-600">
              <p>
                Enter your license key below. No license key yet? Get one{" "}
                <ExternalLink href={WebsiteLinks.checkout} color="underline">
                  here for free
                </ExternalLink>
                .
              </p>
            </div>
          </div>
          <ActivateCard goBackCallback={handleCloseActivateLicense} />
        </div>
      </div>
    </div>
  )
}
