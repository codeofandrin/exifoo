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
