import { useState } from "react"
import type { CustomFlowbiteTheme } from "flowbite-react"
import { Card as FlowbiteCard } from "flowbite-react"

import Button from "../common/Button"
import TextInput from "../common/TextInput"
import ErrorModal from "./ErrorModal"
import { ErrorModalType } from "../../utils/types"
import { activateLicense } from "../../lib/api"
import { APIErrorType, AppStatusType, LicenseType } from "../../utils/enums"
import { useAppStore } from "../../store/useAppStore"
import ImgActivateLicenseIllus from "../../assets/images/get-started/activate_license_illus.png"

const theme: CustomFlowbiteTheme["card"] = {
  root: {
    base: "flex rounded-xl border-[2.5px] border-neutral-300 bg-white shadow-lg hover:shadow-none transition-shadow duration-300",
    children: "flex flex-col h-[25rem] justify-start items-center px-14 pt-6",
    horizontal: {
      off: "flex-col",
      on: "flex-col md:max-w-xl md:flex-row"
    },
    href: "hover:bg-gray-100 dark:hover:bg-gray-700"
  }
}

export default function ActivateCard() {
  const [licenseKey, setLicenseKey] = useState("")
  const [error, setError] = useState<ErrorModalType | null>(null)
  const { setStatus, setLicenseType, setLicenseKeyShort } = useAppStore()
  const [isLoading, setIsLoading] = useState(false)

  const isError = error !== null
  const btnDisabled = isLoading || !licenseKey

  async function handleActivateLicense() {
    setIsLoading(true)

    const setUnexpectedError = () =>
      setError({
        title: "Something went wrong",
        desc: "An unexpected error occurred while activating your license, please try again. If the issue persists, please contact support."
      })

    await activateLicense(licenseKey).then(
      ({ isError: isActivateError, errorData: activateErrorData, successData }) => {
        setIsLoading(false)

        if (isActivateError) {
          if (activateErrorData === null) {
            // unexpected
            setUnexpectedError()
          } else {
            const activateErrorType = activateErrorData.code as APIErrorType
            if (activateErrorType === APIErrorType.license_used) {
              setError({
                title: "License already in use",
                desc: "It looks like this license is already active on another device. Please deactivate it on the other device or contact support if you think this is a mistake."
              })
            } else if (activateErrorType === APIErrorType.license_invalid) {
              setError({
                title: "License key invalid",
                desc: "This license key is not valid, please try again. If you think this is a mistake, please contact support."
              })
            } else {
              // unexpected
              setUnexpectedError()
            }
          }
        } else {
          setStatus(AppStatusType.main)
          setLicenseType(LicenseType.full)
          setLicenseKeyShort(successData.key_short)
        }
      }
    )
  }

  return (
    <>
      <ErrorModal
        isOpen={isError}
        close={() => setError(null)}
        title={error?.title as string}
        desc={error?.desc as string}
        img={ImgActivateLicenseIllus}
      />
      <div className="mt-14 flex items-center justify-center">
        <FlowbiteCard theme={theme}>
          <img src={ImgActivateLicenseIllus} className="h-32" />
          <h1 className="mt-2 text-xl font-semibold text-neutral-700">Activate your license</h1>
          <p className="mt-2 max-w-96 text-center text-xs text-neutral-700">
            Once your license is successfully activated, you can enjoy unlimited access to{" "}
            <span className="font-logo text-sm font-bold text-logo">exifoo</span>.{" "}
          </p>
          <div className="mt-9 w-full">
            <div className="flex flex-col">
              <h3 className="text-xs font-medium text-neutral-500">License key</h3>
              <div className="mt-1">
                <TextInput placeholder="ABCDE99F-AB0CD1EF-A0123BC5-A0B1C2D3" setValue={setLicenseKey} />
              </div>
            </div>
            <div className="mt-5">
              <Button
                className="w-full font-semibold"
                size="sm-xs"
                color="primary"
                onClick={handleActivateLicense}
                isLoading={isLoading}
                disabled={btnDisabled}>
                Activate license
              </Button>
            </div>
          </div>
        </FlowbiteCard>
      </div>
    </>
  )
}
