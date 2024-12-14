import StartBackground from "../components/StartBackground"
import Logo from "../components/start/Logo"
import Slogan from "../components/start/Slogan"
import ConnectStatus from "../components/start/ConnectStatus"

export default function Start() {
  return (
    <div className="h-screen">
      <div className="relative h-full w-full overflow-x-hidden">
        <StartBackground />
        <div className="flex h-full flex-col">
          <Logo />
          <Slogan />
          <ConnectStatus />
        </div>
      </div>
    </div>
  )
}
