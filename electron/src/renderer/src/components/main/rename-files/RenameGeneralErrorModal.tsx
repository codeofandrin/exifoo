/**
 * Copyright (c) codeofandrin
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Modal } from "flowbite-react"

import Button from "../../common/Button"
import ExternalLink from "../../common/ExternalLink"
import { EMail } from "../../../utils/constants"
import { APIErrorType } from "../../../utils/enums"
import SVGX from "../../../assets/icons/X.svg?react"
import SVGHelpCircle from "../../../assets/icons/HelpCircle.svg?react"
import SVGInfo from "../../../assets/icons/Info.svg?react"
import ImgFreeTrialIllus from "../../../assets/images//free_trial_illus.png"

const modalTheme = {
  root: {
    sizes: {
      sm: "max-w-[470px] max-h-[360px]",
      md: "max-w-[550px] max-h-[360px]"
    },
    show: {
      on: "flex bg-gray-900 bg-opacity-40"
    }
  }
}

interface RenameGeneralErrorModalPropsType {
  isOpen: boolean
  close: Function
  errorType: APIErrorType
}

export default function RenameGeneralErrorModal({
  isOpen,
  close,
  errorType
}: RenameGeneralErrorModalPropsType) {
  let errorTitle = "Something went wrong"
  let errorMsg = (
    <>
      <p>Renaming files failed.</p>
      <p>Something went wrong unexpectedly. Please try again.</p>
    </>
  )
  let showHelpCircle = true
  let img: string | null = null
  let btnText = "Close"
  let icon = (
    <div className="rounded-full bg-red-100/50 p-2">
      <div className="rounded-full bg-red-200/50 p-2">
        <SVGX className="w-6 text-red-500" />
      </div>
    </div>
  )

  if (isOpen) {
    if (errorType === APIErrorType.freeTrialExpired) {
      errorTitle = "Free Trial used up"
      errorMsg = (
        <>
          <p>It looks like you just used up your free trial. Please consider activating a license.</p>
          <p className="mt-2">
            Clicking the button will take you back to the start, where you can activate your license.
          </p>
        </>
      )
      showHelpCircle = false
      img = ImgFreeTrialIllus
      btnText = "Got it"
      icon = (
        <div className="rounded-full bg-yellow-100/50 p-2">
          <div className="rounded-full bg-yellow-200/50 p-2">
            <SVGInfo className="w-6 text-yellow-500" />
          </div>
        </div>
      )
    }
  }

  function handleClose() {
    close()
  }

  return (
    <Modal show={isOpen} onClose={handleClose} theme={modalTheme} size={img === null ? "sm" : "md"}>
      <Modal.Body>
        {/* Icon */}
        <div className="w-fit">{icon}</div>
        <div className="flex items-end">
          <div>
            {/* Title */}
            <h1 className="neutral-800 mt-3 text-lg font-semibold">{errorTitle}</h1>
            {/* Description */}
            <div className="mt-2 text-sm text-neutral-500">{errorMsg}</div>
          </div>
          {img !== null && (
            <div className="ml-2">
              <img src={img} className="w-32 max-w-32" />
            </div>
          )}
        </div>
      </Modal.Body>
      {showHelpCircle ? (
        <Modal.Footer className="justify-between">
          <div className="mt-auto items-end">
            <ExternalLink href={`mailto:${EMail.help}`} color="silent">
              <SVGHelpCircle className="w-4 stroke-2 text-neutral-500 transition-colors duration-200 hover:text-neutral-700" />
            </ExternalLink>
          </div>
          <Button className="w-32" onClick={handleClose} color="accent" size="sm">
            {btnText}
          </Button>
        </Modal.Footer>
      ) : (
        <Modal.Footer className="justify-end">
          <Button className="w-32" onClick={handleClose} color="accent" size="sm">
            {btnText}
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  )
}
