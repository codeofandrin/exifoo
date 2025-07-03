/**
 * Copyright (c) codeofandrin 
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import SVGExternalLink from "../../assets/icons/ExternalLink.svg?react"

interface ExternalLinkPropsType {
  children?: any
  href: string
  className?: string
  title?: string
  displayIcon?: boolean
  color?: string
}

export default function ExternalLink({
  children,
  href,
  className,
  title,
  displayIcon = false,
  color = "primary"
}: ExternalLinkPropsType) {
  let styleClasses
  switch (color) {
    case "primary":
      styleClasses = "text-primary-500 hover:text-primary-700 underline"
      break
    case "silent":
      styleClasses = "underline decoration-transparent hover:decoration-inherit"
      break
    case "underline":
      styleClasses = "underline"
      break
  }

  return (
    <a
      href={href}
      target="_blank"
      className={`${className} ${styleClasses} transition-colors duration-200`}
      title={title}>
      {displayIcon ? (
        <div className="flex items-center">
          {children}
          <SVGExternalLink className="ml-1 w-3" />
        </div>
      ) : (
        <>{children}</>
      )}
    </a>
  )
}
