import ProviderComposer from "./providers/ProviderComposer"
import AboutModalProvider from "./providers/AboutModalProvider"
import Header from "./components/Header"
import AboutModal from "./components/AboutModal"
import RenameForm from "./components/RenameForm"

export default function App() {
  return (
    <ProviderComposer components={[AboutModalProvider]}>
      <>
        <AboutModal />
        <Header />
        <div className="mt-5 flex justify-center">
          <RenameForm />
        </div>
      </>
    </ProviderComposer>
  )
}
