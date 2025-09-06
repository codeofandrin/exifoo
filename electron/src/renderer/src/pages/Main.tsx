/**
 * Copyright (c) codeofandrin
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Header from "../components/main/Header"
import RenameForm from "../components/main/rename-files/RenameForm"
import Options from "../components/main/rename-options/RenameOptions"
import Footer from "../components/main/Footer"
import { FreeTrialBanner } from "../components/main/FreeTrialBanner"
import ActivateLicense from "../components/main/ActivateLicense"
import { registerUpdaterEvents } from "../lib/update-events"
import { useActivateLicenseStore } from "../store/main/useActivateLicenseStore"
import { useAppStore } from "../store/useAppStore"
import { LicenseType } from "../utils/enums"

registerUpdaterEvents()

export default function Main() {
  const { isOpen: isActivateLicenseOpen, setIsOpen: setIsActivateLicenseOpen } = useActivateLicenseStore()
  const { licenseType } = useAppStore()

  const isDemo = licenseType === LicenseType.demo

  return (
    <>
      {isActivateLicenseOpen ? (
        <ActivateLicense handleCloseActivateLicense={() => setIsActivateLicenseOpen(false)} />
      ) : (
        <div className="flex h-screen flex-col px-6">
          <Header />
          <div className="flex h-full items-center justify-center">
            <div className="flex items-start">
              <RenameForm />
              <Options />
            </div>
          </div>
          <Footer />
          {isDemo && <FreeTrialBanner />}
        </div>
      )}
    </>
  )
}
