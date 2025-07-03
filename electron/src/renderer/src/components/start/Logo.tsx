/**
 * Copyright (c) codeofandrin 
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { motion } from "motion/react"

import ImgAppLogoLarge from "../../assets/images/exifoo_logo_large.png"

export default function Logo() {
  return (
    <div className="h-1/2 justify-start">
      <div className="mt-36 flex justify-center">
        <motion.img
          src={ImgAppLogoLarge}
          alt="exifoo_logo"
          className="w-52"
          animate={{
            opacity: [0.5, 1],
            filter: ["blur(8px)", "blur(0)"],
            width: [25, 400, 208],
            y: [160, 160, 0],
            transition: {
              duration: 4,
              opacity: {
                duration: 2
              },
              filter: {
                duration: 2
              },
              ease: ["easeOut", "easeInOut", "easeInOut"],
              times: [0, 0.9, 1]
            }
          }}
        />
      </div>
    </div>
  )
}
