/**
 * Copyright (c) codeofandrin
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Main from "./pages/Main"
import GetStarted from "./pages/GetStarted"
import Start from "./pages/Start"
import { useAppStore } from "./store/useAppStore"
import { AppStatusType } from "./utils/enums"

export default function App() {
  const { status } = useAppStore()

  if (status === AppStatusType.start) {
    return <Start />
  }
  if (status === AppStatusType.getStarted) {
    return <GetStarted />
  }
  if (status === AppStatusType.main) {
    return <Main />
  }
  return <div></div>
}
