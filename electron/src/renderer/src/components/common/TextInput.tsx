/**
 * Copyright (c) codeofandrin 
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface TextInputPropsType {
  placeholder?: string
  setValue: Function
  isValid?: boolean
  maxLength?: number
}

export default function TextInput({
  placeholder = "",
  setValue,
  isValid = true,
  maxLength
}: TextInputPropsType) {
  function handleTextChange(e) {
    const value = e.target.value
    setValue(value)
  }

  return (
    <div>
      <input
        type="text"
        maxLength={maxLength}
        placeholder={placeholder}
        className={`block w-full rounded-lg border ${isValid ? "border-accent-500 focus:border-accent-500 focus:bg-accent-50" : "border-red-500 focus:border-red-500 focus:bg-red-50"} bg-white p-2 text-xs text-neutral-600 transition-colors duration-200 placeholder:text-neutral-400 focus:ring-0`}
        onChange={handleTextChange}
      />
    </div>
  )
}
