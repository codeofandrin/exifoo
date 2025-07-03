/**
 * Copyright (c) codeofandrin 
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState } from "react"
import { Modal } from "flowbite-react"

import Button from "../../common/Button"
import ExternalLink from "../../common/ExternalLink"
import { deactivateLicense } from "../../../lib/api"
import { useAppStore } from "../../../store/useAppStore"
import { EMail } from "../../../utils/constants"
import SVGAlertCircle from "../../../assets/icons/AlertCircle.svg?react"
import SVGHelpCircle from "../../../assets/icons/HelpCircle.svg?react"
import SVGX from "../../../assets/icons/X.svg?react"

const modalTheme = {
  root: {
    sizes: {
      md: "max-w-[500px] max-h-[360px]"
    },
    show: {
      on: "flex bg-gray-900 bg-opacity-40"
    }
  }
}

interface DeactivateLicenseModalPropsType {
  isOpen: boolean
  setIsDeactivateModalOpen: Function
}

export default function DeactivateLicenseModal({
  isOpen,
  setIsDeactivateModalOpen
}: DeactivateLicenseModalPropsType) {
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { reset: resetAppStore } = useAppStore()

  let title
  let desc
  let btnText
  if (isError) {
    title = "Something went wrong"
    desc = `An unexpected error occurred while deactivating your license.
            Please make sure you have a network connection and try again. 
            If the issue persists, please contact support.`
    btnText = "Try again"
  } else {
    title = "Deactivate license"
    desc = (
      <>
        <p>Are you sure you want to deactivate your license?</p>
        <p>
          Deactivating will revoke access to the full version and release your license. You can reactivate it
          at any time on this or any other device.
        </p>
      </>
    )
    btnText = "Deactviate"
  }

  function handleCancel() {
    setIsDeactivateModalOpen(false)
    setIsError(false)
  }

  async function handleDeactivate() {
    setIsLoading(true)
    await deactivateLicense().then(({ isError: isDeactivateError }) => {
      setIsLoading(false)

      if (isDeactivateError) {
        // any error is unexpected
        setIsError(true)
      } else {
        resetAppStore()
      }
    })
  }

  return (
    <Modal show={isOpen} theme={modalTheme} size="md" className="z-[99] backdrop-blur-xs">
      <Modal.Body>
        {/* Icon */}
        <div className="w-fit">
          <div className="rounded-full bg-red-100/50 p-2">
            <div className="rounded-full bg-red-200/50 p-2">
              {isError ? (
                <SVGX className="w-6 text-red-600" />
              ) : (
                <SVGAlertCircle className="w-6 text-red-600" />
              )}
            </div>
          </div>
        </div>
        {/* Title */}
        <div className="mt-3">
          <h1 className="neutral-800 text-lg font-semibold">{title}</h1>
        </div>
        {/* Description */}
        <div className="mt-2 text-sm text-neutral-500">{desc}</div>
      </Modal.Body>
      <Modal.Footer className={`${isError ? "justify-between" : "justify-end"}`}>
        {isError && (
          <div className="mt-auto items-end">
            <ExternalLink href={`mailto:${EMail.help}`} color="silent">
              <SVGHelpCircle className="w-4 stroke-2 text-neutral-500 transition-colors duration-200 hover:text-neutral-700" />
            </ExternalLink>
          </div>
        )}
        <div className="flex">
          <Button className="w-28" color="silent" size="sm" onClick={handleCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            className="ml-2 w-40"
            color="critical"
            size="sm"
            onClick={handleDeactivate}
            isLoading={isLoading}
            disabled={isLoading}>
            {isLoading ? "Deactivating..." : btnText}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
