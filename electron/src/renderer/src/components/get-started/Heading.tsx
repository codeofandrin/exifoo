/**
 * Copyright (c) codeofandrin
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "../../styles/get-started/Heading.css"

interface HeadingPropsType {
  children: React.ReactElement
}

export default function Heading({ children }: HeadingPropsType) {
  return (
    <div className="mt-5 flex flex-col items-center">
      {/* Title */}
      <h1 className="text-center text-3.5xl font-semibold">
        <span id="get-started-title">Let's get started</span>
      </h1>
      {/* Description */}
      <div className="mt-4 text-sm text-neutral-600">{children}</div>
    </div>
  )
}
