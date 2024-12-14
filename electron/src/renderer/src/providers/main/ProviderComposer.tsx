interface ProviderComposerPropsType {
  components: Array<(unknown: any) => React.ReactElement<any, any>>
  children: React.ReactElement
}

export default function ProviderComposer(props: ProviderComposerPropsType) {
  const { components = [], children } = props

  return (
    <>
      {components.reduceRight((acc, Comp) => {
        return <Comp>{acc}</Comp>
      }, children)}
    </>
  )
}
