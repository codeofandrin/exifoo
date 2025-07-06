/**
 * Copyright (c) codeofandrin
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState } from "react"
import type { CustomFlowbiteTheme } from "flowbite-react"
import { Card as FlowbiteCard } from "flowbite-react"

import Button from "../common/Button"
import ExternalLink from "../common/ExternalLink"
import ActivateErrorModal from "../ActivateErrorModal"
import FreeTrialSuccessModal from "./FreeTrialSuccessModal"
import { WebsiteLinks } from "../../utils/constants"
import { ErrorModalType } from "../../utils/types"
import { activateFreeTrial } from "../../lib/api"
import { useAppStore } from "../../store/useAppStore"
import { LicenseType, AppStatusType, APIErrorType } from "../../utils/enums"
import SVGCheck from "../../assets/icons/Check.svg?react"
import SVGX from "../../assets/icons/X.svg?react"
import ImgFreeTrialIllus from "../../assets/images//free_trial_illus.png"
import ImgLicenseIllus from "../../assets/images//license_illus.png"

const theme: CustomFlowbiteTheme["card"] = {
  root: {
    base: "flex rounded-xl border-[2.5px] border-neutral-300 bg-white shadow-lg hover:shadow-none transition-shadow duration-300",
    children: "flex flex-col h-[25rem] w-80 justify-start items-center px-6 pt-6",
    horizontal: {
      off: "flex-col",
      on: "flex-col md:max-w-xl md:flex-row"
    },
    href: "hover:bg-gray-100 dark:hover:bg-gray-700"
  }
}

interface LicenseCardPropsType {
  title: string
  desc: string
  features: { text: string; active: boolean }[]
  btnColor: string
  btnText: { content: string; weight: string }
  btnOnClick: React.MouseEventHandler<HTMLButtonElement>
  img: string
  footer?: any
  className?: string
  isLoading?: boolean
}

function LicenseCard({
  title,
  desc,
  features,
  btnColor,
  btnText,
  btnOnClick,
  img,
  footer = "",
  className = "",
  isLoading = false
}: LicenseCardPropsType) {
  const isFooter = footer != ""

  return (
    <FlowbiteCard theme={theme} className={`${className}`}>
      <img src={img} className="h-32" />
      <h1 className="mt-3 text-xl font-semibold text-neutral-700">{title}</h1>
      <p className="mt-2 max-w-60 text-center text-xs text-neutral-700">{desc}</p>
      {/* Features */}
      <div className="mt-4 justify-end">
        {features.map(({ text, active }, i) => {
          const circleBgColor = active ? "bg-primary-500" : "bg-neutral-300"
          const textColor = active ? "text-neutral-500" : "text-neutral-300"

          return (
            <div key={i} className="mt-3 flex items-center">
              <div className={`${circleBgColor} rounded-full p-1`}>
                {active ? (
                  <SVGCheck className="h-3 w-3 stroke-[3] text-white" />
                ) : (
                  <SVGX className="h-3 w-3 stroke-[3] text-white" />
                )}
              </div>
              <p className={`${textColor} ml-3 text-xs`}>{text}</p>
            </div>
          )
        })}
      </div>
      <div className="mt-9 w-full">
        <Button
          className={`${btnText.weight} w-full rounded-full`}
          size="sm-xs"
          color={btnColor}
          onClick={btnOnClick}
          disabled={isLoading}
          isLoading={isLoading}>
          {btnText.content}
        </Button>
      </div>
      {isFooter && (
        <div className="mt-2">
          <p className="text-xxs text-neutral-400">{footer}</p>
        </div>
      )}
    </FlowbiteCard>
  )
}

interface LicenseCardsPropsType {
  setIsActivatePrompt: Function
}

export default function LicenseCards({ setIsActivatePrompt }: LicenseCardsPropsType) {
  const [error, setError] = useState<ErrorModalType | null>(null)
  const [isFreeTrialLoading, setIsFreeTrialLoading] = useState(false)
  const { setStatus, setLicenseType, setFreeTrialRemaining } = useAppStore()
  const [isFreeTrialSuccess, setIsFreeTrialSuccess] = useState(false)

  const isError = error !== null

  async function handleFreeTrial() {
    setIsFreeTrialLoading(true)

    const setUnexpectedError = () =>
      setError({
        title: "Something went wrong",
        desc: `An unexpected error occurred while activating your free trial.
              Please make sure you have a network connection and try again. 
              If the issue persists, please contact support.`
      })

    await activateFreeTrial().then(
      ({ isError: isActivateError, errorData: activateErrorData, successData }) => {
        setIsFreeTrialLoading(false)

        if (isActivateError) {
          if (activateErrorData === null) {
            // unexpected
            setUnexpectedError()
          } else {
            const activateErrorType = activateErrorData.code as APIErrorType
            if (activateErrorType === APIErrorType.freeTrialExpired) {
              setError({
                title: "Free Trial expired",
                desc: "It looks like you've already used your free trial. Please consider purchasing and activating a license."
              })
            } else {
              // unexpected
              setUnexpectedError()
            }
          }
        } else {
          setLicenseType(LicenseType.demo)
          setFreeTrialRemaining(successData.files_remaining)
          // open success modal
          setIsFreeTrialSuccess(true)
        }
      }
    )
  }

  function handleActivateLicense() {
    setIsActivatePrompt(true)
  }

  function handleFreeTrialContinue() {
    setStatus(AppStatusType.main)
  }

  return (
    <>
      <ActivateErrorModal
        isOpen={isError}
        close={() => setError(null)}
        title={error?.title as string}
        desc={error?.desc as string}
        img={ImgFreeTrialIllus}
      />
      <FreeTrialSuccessModal isOpen={isFreeTrialSuccess} close={handleFreeTrialContinue} />
      <div className="mt-14 flex items-center justify-center">
        {/* Free Trial */}
        <LicenseCard
          title="Free Trial"
          desc="Try it out for free with the demo version."
          features={[
            { text: "All features included", active: true },
            { text: "Unlimited photos", active: false }
          ]}
          img={ImgFreeTrialIllus}
          btnColor="silent"
          btnText={{ content: "Start free trial", weight: "font-normal" }}
          btnOnClick={handleFreeTrial}
          isLoading={isFreeTrialLoading}
        />
        {/* License */}
        <LicenseCard
          className="ml-24"
          title="License"
          desc="Activate your license. Enjoy full access."
          features={[
            { text: "All features included", active: true },
            { text: "Unlimited photos", active: true }
          ]}
          img={ImgLicenseIllus}
          btnColor="primary"
          btnText={{ content: "Activate license", weight: "font-semibold" }}
          btnOnClick={handleActivateLicense}
          footer={
            <>
              No license yet? Get one{" "}
              <ExternalLink href={WebsiteLinks.checkout} color="underline">
                here for free
              </ExternalLink>
              .
            </>
          }
        />
      </div>
    </>
  )
}
