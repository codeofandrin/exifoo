/**
 * Copyright (c) codeofandrin 
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState } from "react"
import type { CustomFlowbiteTheme } from "flowbite-react"
import { Card as FlowbiteCard } from "flowbite-react"

import Button from "./common/Button"
import TextInput from "./common/TextInput"
import ActivateErrorModal from "./ActivateErrorModal"
import LicenseSuccessModal from "./LicenseSuccessModal"
import { ErrorModalType } from "../utils/types"
import { activateLicense } from "../lib/api"
import { APIErrorType, AppStatusType, LicenseType } from "../utils/enums"
import { useAppStore } from "../store/useAppStore"
import { useActivateLicenseStore } from "../store/main/useActivateLicenseStore"
import SVGArrowLeft from "../assets/icons/ArrowLeft.svg?react"
import ImgActivateLicenseIllus from "../assets/images//activate_license_illus.png"

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

interface ActivateCardPropsType {
  goBackCallback: React.MouseEventHandler<HTMLButtonElement>
}

export default function ActivateCard({ goBackCallback }: ActivateCardPropsType) {
  const [licenseKey, setLicenseKey] = useState("")
  const [error, setError] = useState<ErrorModalType | null>(null)
  const { setStatus, setLicenseType, setLicenseKeyShort } = useAppStore()
  const [isLoading, setIsLoading] = useState(false)
  const { setIsOpen: setIsActivateLicenseMainOpen } = useActivateLicenseStore()
  const [isSuccess, setIsSuccess] = useState(false)

  const isError = error !== null
  const btnDisabled = isLoading || !licenseKey

  async function handleActivateLicense() {
    setIsLoading(true)

    const setUnexpectedError = () =>
      setError({
        title: "Something went wrong",
        desc: `An unexpected error occurred while activating your license.
              Please make sure you have a network connection and try again. 
              If the issue persists, please contact support.`
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
            if (activateErrorType === APIErrorType.licenseUsed) {
              setError({
                title: "License already in use",
                desc: "It looks like this license is already active on another device. Please deactivate it on the other device or contact support if you think this is a mistake."
              })
            } else if (activateErrorType === APIErrorType.licenseInvalid) {
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
          setLicenseType(LicenseType.full)
          setLicenseKeyShort(successData.key_short)
          // show success modal
          setIsSuccess(true)
        }
      }
    )
  }

  function handleContinue() {
    setStatus(AppStatusType.main)
    // close activate license if opened via main (about modal)
    setIsActivateLicenseMainOpen(false)
  }

  return (
    <>
      <ActivateErrorModal
        isOpen={isError}
        close={() => setError(null)}
        title={error?.title as string}
        desc={error?.desc as string}
        img={ImgActivateLicenseIllus}
      />
      <LicenseSuccessModal isOpen={isSuccess} close={handleContinue} />
      <div className="mt-14 flex items-center justify-center">
        <FlowbiteCard theme={theme} className="relative">
          <div className="absolute left-0 top-0 ml-2 mt-2">
            <button
              className="group flex items-center p-1 text-neutral-500 hover:text-primary-500"
              onClick={goBackCallback}>
              <SVGArrowLeft className="w-3 transition-all duration-200 group-hover:-translate-x-0.5" />
              <p className="ml-1 text-xxs transition-all duration-200">Go back</p>
            </button>
          </div>
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
