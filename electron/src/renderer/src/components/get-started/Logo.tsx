/**
 * Copyright (c) codeofandrin
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ImgAppLogoLarge from "../../assets/images/exifoo_logo_large.png"

export default function Logo() {
  return (
    <div className="flex justify-center">
      <img src={ImgAppLogoLarge} alt="exifoo_logo" className="w-36" />
    </div>
  )
}
