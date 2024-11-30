import ProviderComposer from "./providers/ProviderComposer"
import AboutModalProvider from "./providers/AboutModalProvider"
import Header from "./components/Header"
import AboutModal from "./components/AboutModal"
import RenameForm from "./components/RenameForm"
import Footer from "./components/Footer"

export default function App() {
  return (
    <ProviderComposer components={[AboutModalProvider]}>
      <>
        <AboutModal />
        <Header />
        <div className="mb-auto mt-5 flex justify-center">
          <RenameForm />
        </div>
        <Footer />
      </>
    </ProviderComposer>
  )
}
