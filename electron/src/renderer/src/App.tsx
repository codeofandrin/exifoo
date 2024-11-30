import ProviderComposer from "./providers/ProviderComposer"
import Header from "./components/Header"

export default function App() {
  return (
    <ProviderComposer components={[]}>
      <>
        <Header />
      </>
    </ProviderComposer>
  )
}
