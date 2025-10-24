import React, { createContext, useCallback, useContext, useMemo, useState } from "react"
import { View } from "react-native"
import LoaderOverlay from "./LoaderOverlay"
import LottieStatus from "./LottieStatus"

type StatusType = "success" | "error"

interface StatusContextValue {
  showLoader: (message?: string) => void
  hideLoader: () => void
  showStatus: (type: StatusType, message?: string) => void
}

const StatusContext = createContext<StatusContextValue | undefined>(undefined)

export function StatusProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<{ visible: boolean; message?: string }>({ visible: false })
  const [status, setStatus] = useState<{ visible: boolean; type: StatusType; message?: string }>({ visible: false, type: "success" })

  const showLoader = useCallback((message?: string) => setLoading({ visible: true, message }), [])
  const hideLoader = useCallback(() => setLoading({ visible: false }), [])
  const showStatus = useCallback((type: StatusType, message?: string) => setStatus({ visible: true, type, message }), [])

  const value = useMemo(() => ({ showLoader, hideLoader, showStatus }), [showLoader, hideLoader, showStatus])

  return (
    <StatusContext.Provider value={value}>
      <View style={{ flex: 1 }}>
        {children}
        <LoaderOverlay visible={loading.visible} message={loading.message} />
        <LottieStatus
          visible={status.visible}
          type={status.type}
          message={status.message}
          onDone={() => setStatus((s) => ({ ...s, visible: false }))}
        />
      </View>
    </StatusContext.Provider>
  )
}

export function useStatus() {
  const ctx = useContext(StatusContext)
  if (!ctx) throw new Error("useStatus must be used within StatusProvider")
  return ctx
}


