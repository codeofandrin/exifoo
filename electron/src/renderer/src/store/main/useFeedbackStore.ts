/**
 * Copyright (c) codeofandrin
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { create } from "zustand"
import { persist } from "zustand/middleware"

export enum FeedbackState {
    default = "default",
    doNotShow = "do_not_show",
    submitted = "submitted"
}

interface FeedbackStoreStates {
    hasShownThisSession: boolean
    isPopupOpen: boolean
    feedbackState: FeedbackState
}

interface FeedbackStoreActions {
    markShownThisSession: () => void
    openPopup: () => void
    closePopup: () => void
    setDoNotShow: () => void
    markSubmitted: () => void
}

export const useFeedbackStore = create<FeedbackStoreStates & FeedbackStoreActions>()(
    persist(
        (set) => ({
            hasShownThisSession: false,
            isPopupOpen: false,
            feedbackState: FeedbackState.default,
            markShownThisSession: () => set({ hasShownThisSession: true }),
            openPopup: () => set({ isPopupOpen: true }),
            closePopup: () => set({ isPopupOpen: false }),
            setDoNotShow: () => set({ feedbackState: FeedbackState.doNotShow }),
            markSubmitted: () => set({ isPopupOpen: false, feedbackState: FeedbackState.submitted })
        }),
        {
            name: "exifoo-feedback",
            partialize: (state) => ({ feedbackState: state.feedbackState })
        }
    )
)
