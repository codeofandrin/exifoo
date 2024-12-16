import { UpdateStatusContainer } from "../../hooks/main/useUpdateStatus"

export default function UpdateStatusProvider({ children }) {
  return <UpdateStatusContainer.Provider>{children}</UpdateStatusContainer.Provider>
}
