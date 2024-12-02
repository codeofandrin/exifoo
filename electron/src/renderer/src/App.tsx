import Header from "./components/Header"
import AboutModal from "./components/AboutModal"
import RenameForm from "./components/RenameForm"
import Options from "./components/Options"
import Footer from "./components/Footer"
import ProviderComposer from "./providers/ProviderComposer"
import AboutModalProvider from "./providers/AboutModalProvider"
import DateOptionsProvider from "./providers/DateOptionsProvider"
import TimeOptionsProvider from "./providers/TimeOptionsProvider"
import CustomTextProvider from "./providers/CustomTextProvider"

export default function App() {
  return (
    <ProviderComposer
      components={[AboutModalProvider, DateOptionsProvider, TimeOptionsProvider, CustomTextProvider]}>
      <>
        <AboutModal />
        <Header />
        <div className="mb-auto mt-5 flex justify-center">
          <RenameForm />
          <Options />
        </div>
        <Footer />
      </>
    </ProviderComposer>
  )
}
