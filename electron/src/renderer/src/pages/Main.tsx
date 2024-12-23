import Header from "../components/main/Header"
import RenameForm from "../components/main/rename-photos/RenameForm"
import Options from "../components/main/rename-options/RenameOptions"
import Footer from "../components/main/Footer"
import { FreeTrialBanner } from "../components/main/FreeTrialBanner"
import ActivateLicense from "../components/main/ActivateLicense"
import ProviderComposer from "../providers/main/ProviderComposer"
import DateOptionsProvider from "../providers/main/DateOptionsProvider"
import TimeOptionsProvider from "../providers/main/TimeOptionsProvider"
import CustomTextProvider from "../providers/main/CustomTextProvider"
import { registerUpdaterEvents } from "../lib/update-events"
import { useActivateLicenseStore } from "../store/main/useActivateLicenseStore"
import { useAppStore } from "../store/useAppStore"
import { LicenseType } from "../utils/enums"

registerUpdaterEvents()

export default function Main() {
  const { isOpen: isActivateLicenseOpen, setIsOpen: setIsActivateLicenseOpen } = useActivateLicenseStore()
  const { license_type } = useAppStore()

  const isDemo = license_type === LicenseType.demo

  return (
    <>
      {isActivateLicenseOpen ? (
        <ActivateLicense handleCloseActivateLicense={() => setIsActivateLicenseOpen(false)} />
      ) : (
        <ProviderComposer components={[DateOptionsProvider, TimeOptionsProvider, CustomTextProvider]}>
          <div className="flex h-screen flex-col px-6">
            <Header />
            <div className="mb-auto mt-5 flex justify-center">
              <RenameForm />
              <Options />
            </div>
            <Footer />
            {isDemo && <FreeTrialBanner />}
          </div>
        </ProviderComposer>
      )}
    </>
  )
}
