import { useState, useEffect } from "react"

import Button from "../common/Button"
import { EMail } from "../../utils/constants"
import * as api from "../../lib/api"
import { APIErrorType, AppStatusType, LicenseType } from "../../utils/enums"
import { useAppStore } from "../../store/useAppStore"
import SVGSpinner from "../../assets/icons/Spinner.svg?react"
import SVGX from "../../assets/icons/X.svg?react"

async function validateFreeTrial(
  setIsError: Function,
  setStatus: Function,
  setLicenseType: Function,
  setFreeTrialRemaining: Function,
  setIsReadyForValidateLicense: Function
) {
  await api
    .validateFreeTrial()
    .then(({ isError: isValidateError, errorData: validateErrorData, successData }) => {
      if (isValidateError) {
        if (validateErrorData === null) {
          // unexpected
          setIsError(true)
        } else {
          const validateErrorType = validateErrorData.code as APIErrorType
          if (
            [APIErrorType.free_trial_expired, APIErrorType.free_trial_not_found].includes(validateErrorType)
          ) {
            // no free trial -> let's validate license
            setIsReadyForValidateLicense(true)
          } else {
            // unexpected
            setIsError(true)
          }
        }
      } else {
        setIsError(false)
        setStatus(AppStatusType.main)
        setLicenseType(LicenseType.demo)
        setFreeTrialRemaining(successData.files_remaining)
      }
    })
}

async function validateLicense(
  setIsError: Function,
  setStatus: Function,
  setLicenseType: Function,
  setLicenseKeyShort: Function
) {
  await api
    .validateLicense()
    .then(({ isError: isValidateError, errorData: validateErrorData, successData }) => {
      if (isValidateError) {
        if (validateErrorData === null) {
          // unexpected
          setIsError(true)
        } else {
          const validateErrorType = validateErrorData.code as APIErrorType
          if ([APIErrorType.license_not_found, APIErrorType.license_invalid].includes(validateErrorType)) {
            setStatus(AppStatusType.get_started)
          } else {
            // unexpected
            setIsError(true)
          }
        }
      } else {
        setIsError(false)
        setStatus(AppStatusType.main)
        setLicenseType(LicenseType.full)
        setLicenseKeyShort(successData.key_short)
      }
    })
}

interface ErrorPropsType {
  retry: Function
}

function Error({ retry }: ErrorPropsType) {
  function handleContactSupport() {
    window.open(`mailto:${EMail.help}`, "_blank")
  }

  function handleTryAgain() {
    retry()
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <p className="text-neutral-500">Validating license failed.</p>
        <SVGX className="ml-3 h-6 w-6 text-red-600" />
      </div>
      <p className="mt-4 text-center text-xs text-neutral-400">
        Please check your network connection and try again. If the issue persists, please contact support.
      </p>
      <div className="mt-14 flex items-center justify-between">
        <Button className="w-36" size="sm-xs" color="accent" onClick={handleContactSupport}>
          Contact Support
        </Button>
        <Button className="ml-5 w-36" size="sm-xs" color="primary" onClick={handleTryAgain}>
          Try again
        </Button>
      </div>
    </div>
  )
}

function Loading() {
  return (
    <>
      <p className="text-neutral-500">Validating license...</p>
      <SVGSpinner className="ml-3 h-4.5 w-4.5 animate-spin fill-neutral-500 text-neutral-300" />
    </>
  )
}

export default function ConnectStatus() {
  const [isError, setIsError] = useState(false)
  const { setStatus, setLicenseType, setLicenseKeyShort, setFreeTrialRemaining } = useAppStore()
  const [isReadyForValidateLicense, setIsReadyForValidateLicense] = useState(false)

  // on mount
  useEffect(() => {
    setTimeout(async () => {
      // validate free trial only
      // if no free trial and no error -> ready for validating license
      await validateFreeTrial(
        setIsError,
        setStatus,
        setLicenseType,
        setFreeTrialRemaining,
        setIsReadyForValidateLicense
      )
    }, 6000)
  }, [])

  // only validate license if ready
  // this is only the case when following conditions are all met:
  //    - no error occurred while validating free trial
  //    - free trial didn't changed app status already (e.g. to main or get-started)
  useEffect(() => {
    async function inner() {
      if (isReadyForValidateLicense) {
        await validateLicense(setIsError, setStatus, setLicenseType, setLicenseKeyShort)
      }
    }
    inner()
  }, [isReadyForValidateLicense])

  function retry() {
    setIsError(false)
    setTimeout(async () => {
      await validateFreeTrial(
        setIsError,
        setStatus,
        setLicenseType,
        setFreeTrialRemaining,
        setIsReadyForValidateLicense
      )
    }, 500)
  }

  let stateElem = <Loading />
  if (isError) {
    stateElem = <Error retry={retry} />
  }

  return (
    <div className="h-1/2 justify-end">
      <div className="mt-10 flex justify-center">
        <div className="flex max-w-sm items-center motion-translate-x-in-[-5%] motion-blur-in-[10px] motion-opacity-in-0 motion-duration-200 motion-delay-[5500ms]">
          {stateElem}
        </div>
      </div>
    </div>
  )
}
