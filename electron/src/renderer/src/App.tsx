import ProviderComposer from "./providers/ProviderComposer"
import YearOptionProvider from "./providers/YearOptionProvider"
import TimeOptionProvider from "./providers/TimeOptionProvider"
import CustomTextProvider from "./providers/CustomTextProvider"


export default function App() {
  return (
    <ProviderComposer components={[YearOptionProvider, TimeOptionProvider, CustomTextProvider]}>
      <>
      </>
    </ProviderComposer>
  )
}
