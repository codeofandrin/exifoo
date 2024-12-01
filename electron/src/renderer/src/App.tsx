import Header from "./components/Header"
import AboutModal from "./components/AboutModal"
import RenameForm from "./components/RenameForm"
import Options from "./components/Options"
import Footer from "./components/Footer"
import ProviderComposer from "./providers/ProviderComposer"
import AboutModalProvider from "./providers/AboutModalProvider"
import DateFormatsProvider from "./providers/DateFormatsProvider"
import TimeFormatsProvider from "./providers/TimeFormatsProvider"
import SeparatorProvider from "./providers/SeparatorProvider"
import CustomTextProvider from "./providers/CustomTextProvider"

export default function App() {
  return (
    <ProviderComposer
      components={[
        AboutModalProvider,
        DateFormatsProvider,
        TimeFormatsProvider,
        SeparatorProvider,
        CustomTextProvider
      ]}>
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
