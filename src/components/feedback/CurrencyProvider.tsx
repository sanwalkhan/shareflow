import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { getCompanyCurrency, setCompanyCurrency } from "../../../utils/api"

type Currency = { code: string; symbol: string }

interface CurrencyContextValue {
  currency: Currency
  setCurrency: (code: string, symbol: string) => Promise<void>
  format: (amount: number) => string
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>({ code: "USD", symbol: "$" })

  useEffect(() => {
    (async () => {
      try {
        const res = await getCompanyCurrency()
        const data = res.data || res
        if (data?.code && data?.symbol) setCurrencyState({ code: data.code, symbol: data.symbol })
      } catch {}
    })()
  }, [])

  const setCurrency = useCallback(async (code: string, symbol: string) => {
    await setCompanyCurrency(code, symbol)
    setCurrencyState({ code, symbol })
  }, [])

  const format = useCallback((amount: number) => {
    const num = Number(amount) || 0
    return `${currency.symbol}${num.toLocaleString()}`
  }, [currency])

  const value = useMemo(() => ({ currency, setCurrency, format }), [currency, setCurrency, format])

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider")
  return ctx
}


