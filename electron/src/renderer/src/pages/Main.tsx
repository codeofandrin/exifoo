import Header from "../components/main/Header"
import RenameForm from "../components/main/rename-photos/RenameForm"
import Options from "../components/main/rename-options/RenameOptions"
import Footer from "../components/main/Footer"
import ProviderComposer from "../providers/main/ProviderComposer"
import DateOptionsProvider from "../providers/main/DateOptionsProvider"
import TimeOptionsProvider from "../providers/main/TimeOptionsProvider"
import CustomTextProvider from "../providers/main/CustomTextProvider"
import { registerUpdaterEvents } from "../lib/update-events"

registerUpdaterEvents()

export default function Main() {
  return (
    <ProviderComposer components={[DateOptionsProvider, TimeOptionsProvider, CustomTextProvider]}>
      <div className="flex h-screen flex-col px-6">
        <Header />
        <div className="mb-auto mt-5 flex justify-center">
          <RenameForm />
          <Options />
        </div>
        <Footer />
      </div>
    </ProviderComposer>
  )
}
