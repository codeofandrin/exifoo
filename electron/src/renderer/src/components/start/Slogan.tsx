/**
 * Copyright (c) codeofandrin
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "../../styles/start/Slogan.css"

export default function Slogan() {
  return (
    <div className="shrink-0">
      <h1 className="text-center text-4xl font-bold motion-scale-in-[1.1] motion-translate-y-in-[20%] motion-blur-in-[10px] motion-opacity-in-0 motion-duration-[0.4s]/translate motion-duration-[0.75s]/blur motion-delay-[3700ms]">
        <span id="slogan">Shoot more. Organize less.</span>
      </h1>
    </div>
  )
}
