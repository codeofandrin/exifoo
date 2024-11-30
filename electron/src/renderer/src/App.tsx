import ProviderComposer from "./providers/ProviderComposer"
import AboutModalProvider from "./providers/AboutModalProvider"
import Header from "./components/Header"
import AboutModal from "./components/AboutModal"

export default function App() {
  return (
    <ProviderComposer components={[AboutModalProvider]}>
      <>
        <AboutModal />
        <Header />
      </>
    </ProviderComposer>
  )
}
