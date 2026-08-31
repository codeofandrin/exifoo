/**
 * Copyright (c) codeofandrin
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState } from "react"
import { Modal } from "flowbite-react"

import Button from "../../common/Button"
import * as api from "../../../lib/api"
import { FeedbackState, useFeedbackStore } from "../../../store/main/useFeedbackStore"
import SVGMessages from "../../../assets/icons/Messages.svg?react"
import SVGCheck from "../../../assets/icons/Check.svg?react"
import SVGAlertCircle from "../../../assets/icons/AlertCircle.svg?react"

const modalTheme = {
  root: {
    sizes: {
      lg: "max-w-[700px]"
    }
  }
}

const USAGE_FREQUENCY_OPTIONS = [
  { value: "daily", label: "Daily" },
  { value: "several_times_week", label: "Several times a week" },
  { value: "once_week", label: "About once a week" },
  { value: "few_times_month", label: "A few times a month" },
  { value: "less_often", label: "Less often" }
]

const PRO_FEATURES_OPTIONS = [
  { value: "bulk_rename_folders", label: "Bulk renaming of entire folders" },
  { value: "save_rename_options", label: "Support for saving the current rename options" },
  { value: "watch_folder", label: "Watch folder (automatically renames new files)" },
  {
    value: "folder_organisation",
    label: 'Automated folder organisation (e.g. "Photos/2026/August") based on EXIF date'
  },
  {
    value: "finder_quick_action",
    label: "Finder Quick Action extension (rename directly in finder with right-click)"
  },
  { value: "timezone_adjustment", label: "Support for time zone adjustment" },
  { value: "gps_location", label: "Option to add GPS location to the file name" },
  {
    value: "camera_info",
    label: "Option to add camera information (brand, model, lens, etc.) to the file name"
  },
  { value: "more_file_formats", label: "More file formats (enter below)" },
  { value: "other", label: "Other" }
]

const FAIR_PRICE_OPTIONS = [
  { value: "5_one_time", label: "$5 (one-time)" },
  { value: "10_one_time", label: "$10 (one-time)" },
  { value: "15_one_time", label: "$15 (one-time)" },
  { value: "20_one_time", label: "$20 (one-time)" },
  { value: "30_one_time", label: "$30 (one-time)" },
  { value: "no_pay", label: "I wouldn't pay for a Pro version" }
]

const inputCls =
  "block w-full rounded-lg border border-accent-500 bg-white p-2 text-xs text-neutral-600 transition-colors duration-200 placeholder:text-neutral-400 focus:border-accent-500 focus:bg-accent-50 focus:ring-0"

interface Option {
  value: string
  label: string
}

function QuestionLabel({
  children,
  as: Tag = "p",
  isRequired = true
}: {
  children: React.ReactNode
  as?: "label" | "p"
  isRequired?: boolean
}) {
  return (
    <Tag className="mb-1.5 block font-medium text-neutral-700">
      {children}
      {isRequired && <span className="ml-1 text-red-500">*</span>}
    </Tag>
  )
}

interface TextareaQuestionProps {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
  isRequired?: boolean
}
function TextareaQuestion({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  isRequired = true
}: TextareaQuestionProps) {
  return (
    <div>
      <QuestionLabel as="label" isRequired={isRequired}>
        {label}
      </QuestionLabel>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`${inputCls} resize-none`}
      />
    </div>
  )
}

interface RadioQuestionProps {
  label: string
  name: string
  options: Option[]
  value: string
  onChange: (v: string) => void
  otherValue?: string
  onOtherChange?: (v: string) => void
}
function RadioQuestion({
  label,
  name,
  options,
  value,
  onChange,
  otherValue,
  onOtherChange
}: RadioQuestionProps) {
  return (
    <div>
      <QuestionLabel>{label}</QuestionLabel>
      <div className="space-y-1.5">
        {options.map((opt) => (
          <label key={opt.value} className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="h-3.5 w-3.5 cursor-pointer border-neutral-300 accent-primary-500"
            />
            <span className="text-xs text-neutral-600">{opt.label}</span>
          </label>
        ))}
        {value === "other" && onOtherChange !== undefined && (
          <input
            type="text"
            value={otherValue}
            onChange={(e) => onOtherChange(e.target.value)}
            placeholder="Please specify..."
            className={`mt-1 ${inputCls}`}
          />
        )}
      </div>
    </div>
  )
}

interface CheckboxQuestionProps {
  label: string
  options: Option[]
  values: string[]
  onToggle: (v: string) => void
}
function CheckboxQuestion({ label, options, values, onToggle }: CheckboxQuestionProps) {
  return (
    <div>
      <QuestionLabel>{label}</QuestionLabel>
      <div className="space-y-1.5">
        {options.map((opt) => (
          <label key={opt.value} className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              value={opt.value}
              checked={values.includes(opt.value)}
              onChange={() => onToggle(opt.value)}
              className="h-3.5 w-3.5 cursor-pointer rounded border-neutral-300 accent-primary-500"
            />
            <span className="text-xs text-neutral-600">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

interface FeedbackModalPropsType {
  isOpen: boolean
}

export default function FeedbackModal({ isOpen }: FeedbackModalPropsType) {
  const { closePopup, setDoNotShow, markSubmitted, feedbackState } = useFeedbackStore()

  const [usageFrequency, setUsageFrequency] = useState("")
  const [missingOrInconvenient, setMissingOrInconvenient] = useState<string | null>(null)
  const [proFeatures, setProFeatures] = useState<string[]>([])
  const [proFeaturesMoreFormats, setProFeaturesMoreFormats] = useState("")
  const [proFeaturesOther, setProFeaturesOther] = useState("")
  const [fairPrice, setFairPrice] = useState("")
  const [doNotShowAgain, setDoNotShowAgain] = useState(feedbackState === FeedbackState.doNotShow)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const canSubmit =
    usageFrequency !== "" &&
    missingOrInconvenient?.trim() !== "" &&
    proFeatures.length > 0 &&
    fairPrice !== ""

  function handleProFeatureToggle(value: string) {
    setProFeatures((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))
  }

  function handleClose() {
    if (doNotShowAgain) {
      setDoNotShow()
    }
    closePopup()
  }

  async function handleSubmit() {
    setIsSubmitting(true)
    setSubmitError(null)
    const result = await api.submitFeedback({
      usage_frequency: usageFrequency,
      missing_or_inconvenient: missingOrInconvenient ? missingOrInconvenient.trim() : null,
      pro_features: proFeatures,
      pro_features_more_formats: proFeatures.includes("more_file_formats")
        ? proFeaturesMoreFormats.trim()
        : null,
      pro_features_other: proFeatures.includes("other") ? proFeaturesOther.trim() : null,
      fair_price: fairPrice
    })
    setIsSubmitting(false)

    if (result.isError) {
      setSubmitError(result.errorData?.detail?.msg ?? "Something went wrong. Please try again.")
      return
    }

    setIsSubmitted(true)
    setTimeout(() => markSubmitted(), 3000)
  }

  return (
    <Modal
      show={isOpen}
      onClose={handleClose}
      theme={modalTheme}
      size="lg"
      className="z-[99] backdrop-blur-xs">
      <Modal.Header className="items-center">
        <div className="flex items-center">
          <SVGMessages className="mr-2 h-4.5 w-4.5 text-accent-500" />
          <span className="text-base font-semibold text-neutral-800">
            Your feedback on exifoo (4 questions)
          </span>
        </div>
      </Modal.Header>

      <Modal.Body className="max-h-[60vh] overflow-y-auto">
        {isSubmitted ? (
          <div className="flex flex-col items-center py-6">
            <div className="rounded-full bg-green-100/75 p-2">
              <div className="rounded-full bg-green-200/75 p-2">
                <SVGCheck className="w-7 text-green-500" />
              </div>
            </div>
            <h2 className="mt-4 text-base font-semibold text-neutral-800">Thank you!</h2>
            <p className="mt-1 text-center text-sm text-neutral-500">
              Your feedback helps shape the future of exifoo.
            </p>
          </div>
        ) : (
          <div className="space-y-8 text-sm text-neutral-700">
            <p className="text-xs text-neutral-500">
              Thanks for using exifoo! I'm currently exploring new features and potentially a Pro version.
              This short survey helps me understand how you use exifoo and what would make it more useful to
              you. It should not take more than 2 minutes.
            </p>
            <RadioQuestion
              label="How often do you use exifoo?"
              name="usage_frequency"
              options={USAGE_FREQUENCY_OPTIONS}
              value={usageFrequency}
              onChange={setUsageFrequency}
            />
            <div>
              <CheckboxQuestion
                label="Which of these Pro features would be most useful to you?"
                options={PRO_FEATURES_OPTIONS}
                values={proFeatures}
                onToggle={handleProFeatureToggle}
              />
              {proFeatures.includes("more_file_formats") && (
                <input
                  type="text"
                  value={proFeaturesMoreFormats}
                  onChange={(e) => setProFeaturesMoreFormats(e.target.value)}
                  placeholder="Which file formats?"
                  className={`mt-2 ${inputCls}`}
                />
              )}
              {proFeatures.includes("other") && (
                <input
                  type="text"
                  value={proFeaturesOther}
                  onChange={(e) => setProFeaturesOther(e.target.value)}
                  placeholder="Please specify..."
                  className={`mt-2 ${inputCls}`}
                />
              )}
            </div>
            <RadioQuestion
              label="What would you consider a fair price for exifoo Pro?"
              name="fair_price"
              options={FAIR_PRICE_OPTIONS}
              value={fairPrice}
              onChange={setFairPrice}
            />
            <TextareaQuestion
              label="A missing feature, a bug, or anything else? (optional)"
              value={missingOrInconvenient || ""}
              onChange={setMissingOrInconvenient}
              isRequired={false}
            />
          </div>
        )}
      </Modal.Body>

      {!isSubmitted && (
        <Modal.Footer>
          <div className="flex w-full flex-col gap-2">
            {submitError && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
                <SVGAlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}
            <div
              className={`flex ${feedbackState === FeedbackState.doNotShow ? "justify-end" : "justify-between"}`}>
              {feedbackState !== FeedbackState.doNotShow && (
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={doNotShowAgain}
                    onChange={(e) => setDoNotShowAgain(e.target.checked)}
                    className="h-3.5 w-3.5 cursor-pointer rounded border-neutral-300 accent-primary-500"
                  />
                  <span className="text-xs text-neutral-500">Do not show again</span>
                </label>
              )}
              <div className="flex gap-2">
                <Button size="sm" color="silent" onClick={handleClose}>
                  {feedbackState === FeedbackState.doNotShow ? "Close" : "Later"}
                </Button>
                <Button
                  size="sm"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  isLoading={isSubmitting}>
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </Modal.Footer>
      )}
    </Modal>
  )
}
