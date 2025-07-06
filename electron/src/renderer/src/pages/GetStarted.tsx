/**
 * Copyright (c) codeofandrin
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState } from "react"

import StartBackground from "../components/StartBackground"
import Logo from "../components/get-started/Logo"
import Heading from "../components/get-started/Heading"
import LicenseCards from "../components/get-started/LicenseCards"
import ExternalLink from "../components/common/ExternalLink"
import ActivateCard from "../components/ActivateCard"
import { WebsiteLinks } from "../utils/constants"

export default function GetStarted() {
  const [isActivatePrompt, setIsActivatePrompt] = useState(false)

  return (
    <div className="h-screen">
      <div className="relative h-full w-full overflow-x-hidden">
        <StartBackground />
        <div className="flex h-full items-center justify-center">
          <div className="flex flex-col">
            <Logo />
            <Heading>
              {isActivatePrompt ? (
                <p>
                  Enter your license key below. No license key yet? Get one{" "}
                  <ExternalLink href={WebsiteLinks.checkout} color="underline">
                    here for free
                  </ExternalLink>
                  .
                </p>
              ) : (
                <p>Choose between starting with a free trial or activating your license.</p>
              )}
            </Heading>
            {isActivatePrompt ? (
              <ActivateCard goBackCallback={() => setIsActivatePrompt(false)} />
            ) : (
              <LicenseCards setIsActivatePrompt={setIsActivatePrompt} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
