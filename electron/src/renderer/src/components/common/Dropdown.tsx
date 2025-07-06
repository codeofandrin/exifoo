/**
 * Copyright (c) codeofandrin
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface DropdownPropsType {
  id: string
  options: { id: string; value: string }[]
  setValue: Function
}

export default function Dropdown({ id, options, setValue }: DropdownPropsType) {
  function handleSelect(e) {
    setValue(e.target.value)
  }

  return (
    <select
      id={id}
      className="block w-full rounded-lg border border-accent-500 bg-white px-2.5 py-2 text-xs font-medium text-neutral-600 transition-colors duration-200 hover:cursor-pointer hover:bg-accent-50 focus:border-accent-500"
      defaultValue={options[0].value}
      onChange={handleSelect}>
      {options.map(({ id, value }, i) => {
        return (
          <option value={id} key={i}>
            {value}
          </option>
        )
      })}
    </select>
  )
}
