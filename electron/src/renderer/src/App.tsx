import Header from "./components/Header"
import Modals from "./components/Modals"
import RenameForm from "./components/rename-photos/RenameForm"
import Options from "./components/rename-options/RenameOptions"
import Footer from "./components/Footer"
import ProviderComposer from "./providers/ProviderComposer"
import AboutModalProvider from "./providers/AboutModalProvider"
import DateOptionsProvider from "./providers/DateOptionsProvider"
import TimeOptionsProvider from "./providers/TimeOptionsProvider"
import CustomTextProvider from "./providers/CustomTextProvider"
import RenameErrorModalProvider from "./providers/RenameErrorModalProvider"
import RenameStatusProvider from "./providers/RenameStatusProvider"

export default function App() {
  return (
    <ProviderComposer
      components={[
        AboutModalProvider,
        DateOptionsProvider,
        TimeOptionsProvider,
        CustomTextProvider,
        RenameErrorModalProvider,
        RenameStatusProvider
      ]}>
      <>
        <Modals />
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
