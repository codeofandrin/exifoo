import ProviderComposer from "./providers/ProviderComposer"
import YearOptionProvider from "./providers/YearOptionProvider"
import TimeOptionProvider from "./providers/TimeOptionProvider"
import CustomTextProvider from "./providers/CustomTextProvider"
import Header from "./components/Header"

export default function App() {
  return (
    <ProviderComposer components={[YearOptionProvider, TimeOptionProvider, CustomTextProvider]}>
      <>
        <Header />
      </>
    </ProviderComposer>
  )
}
