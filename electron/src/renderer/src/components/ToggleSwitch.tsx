interface ToggleSwitchPropsType {
  children?: React.ReactElement | null
  size?: string
  handleToggle: React.ChangeEventHandler<HTMLInputElement>
}

export default function ToggleSwitch({
  children = null,
  size = "default",
  handleToggle
}: ToggleSwitchPropsType) {
  let inputClasses = ""
  switch (size) {
    case "lg":
      inputClasses =
        "relative w-14 h-7 bg-neutral-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-accent-500 transition-colors duration-100"
      break
    case "sm":
      inputClasses =
        "relative w-9 h-5 bg-neutral-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent-500 transition-colors duration-100"
      break
    case "xs":
      inputClasses =
        "relative w-8 h-[18px] bg-neutral-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[1.5px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-accent-500 transition-colors duration-100"
      break
    case "default":
    default:
      inputClasses =
        "relative w-11 h-6 bg-neutral-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-500 transition-colors duration-100"
      break
  }

  return (
    <label className="inline-flex cursor-pointer items-center">
      <input type="checkbox" value="" className="peer sr-only" onChange={handleToggle} />
      <div className={inputClasses}></div>
      {children}
    </label>
  )
}
