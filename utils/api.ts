// utils/api.ts
import { API_BASE_URL } from "../config"
import { AuthUtils } from "./authUtils"

const json = (res: Response) => res.json()

const withAuth = async () => ({
	...(await AuthUtils.getAuthHeader()),
	"Content-Type": "application/json",
})

// Expenses
export const getExpenses = async () => {
	const headers = await withAuth()
	const res = await fetch(`${API_BASE_URL}/expenses`, { headers })
	if (!res.ok) {
		const error = await res.json().catch(() => ({ message: "Failed to load expenses" }))
		throw new Error(error.message || "Failed to load expenses")
	}
	return json(res)
}

export const filterExpenses = async (params: { from?: string; to?: string; category?: string; status?: string; user?: string }) => {
	const headers = await withAuth()
	const qs = Object.entries(params).filter(([,v]) => v).map(([k,v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`).join("&")
	const res = await fetch(`${API_BASE_URL}/expenses${qs ? `?${qs}` : ""}`, { headers })
	if (!res.ok) {
		const error = await res.json().catch(() => ({ message: "Failed to load filtered expenses" }))
		throw new Error(error.message || "Failed to load filtered expenses")
	}
	return json(res)
}

export const createExpense = async (payload: any) => {
	const headers = await withAuth()
	const res = await fetch(`${API_BASE_URL}/expenses`, {
		method: "POST",
		headers,
		body: JSON.stringify(payload),
	})
	if (!res.ok) {
		const error = await res.json().catch(() => ({ message: "Failed to create expense" }))
		throw new Error(error.message || "Failed to create expense")
	}
	return json(res)
}

export const deleteExpense = async (id: string) => {
	const headers = await withAuth()
	const res = await fetch(`${API_BASE_URL}/expenses/${id}`, {
		method: "DELETE",
		headers,
	})
	if (!res.ok) {
		const error = await res.json().catch(() => ({ message: "Failed to delete expense" }))
		throw new Error(error.message || "Failed to delete expense")
	}
	return json(res)
}

export const updateExpense = async (id: string, payload: any) => {
	const headers = await withAuth()
	const res = await fetch(`${API_BASE_URL}/expenses/${id}`, {
		method: "PUT",
		headers,
		body: JSON.stringify(payload),
	})
	if (!res.ok) {
		const error = await res.json().catch(() => ({ message: "Failed to update expense" }))
		throw new Error(error.message || "Failed to update expense")
	}
	return json(res)
}

export const getBudget = async (month?: string) => {
	const headers = await withAuth()
	const qs = month ? `?month=${encodeURIComponent(month)}` : ""
	const res = await fetch(`${API_BASE_URL}/budget${qs}`, { headers })
	if (!res.ok) {
		const error = await res.json().catch(() => ({ message: "Failed to get budget" }))
		throw new Error(error.message || "Failed to get budget")
	}
	return json(res)
}

export const setBudgetLimit = async (limit: number, month?: string, validFrom?: Date, validTo?: Date) => {
	const headers = await withAuth()
	const body: any = { limit }
	if (month) body.month = month
	if (validFrom) body.validFrom = validFrom.toISOString()
	if (validTo) body.validTo = validTo.toISOString()
	const res = await fetch(`${API_BASE_URL}/budget/limit`, {
		method: "POST",
		headers,
		body: JSON.stringify(body),
	})
	if (!res.ok) {
		const error = await res.json().catch(() => ({ message: "Failed to set budget" }))
		throw new Error(error.message || "Failed to set budget")
	}
	return json(res)
}

export const addBudgetFunds = async (amount: number, category?: string, month?: string, validFrom?: Date, validTo?: Date) => {
	const headers = await withAuth()
	const body: any = { amount }
	if (category) body.category = category
	if (month) body.month = month
	if (validFrom) body.validFrom = validFrom.toISOString()
	if (validTo) body.validTo = validTo.toISOString()
	const res = await fetch(`${API_BASE_URL}/budget/funds`, {
		method: "POST",
		headers,
		body: JSON.stringify(body),
	})
	if (!res.ok) {
		const error = await res.json().catch(() => ({ message: "Failed to add funds" }))
		throw new Error(error.message || "Failed to add funds")
	}
	return json(res)
}

export const setCategoryAllocations = async (categories: Record<string, number>, validFrom?: Date, validTo?: Date, month?: string) => {
	const headers = await withAuth()
	const body: any = { categories }
	if (month) body.month = month
	if (validFrom) body.validFrom = validFrom.toISOString()
	if (validTo) body.validTo = validTo.toISOString()
	const res = await fetch(`${API_BASE_URL}/budget/categories`, {
		method: "POST",
		headers,
		body: JSON.stringify(body),
	})
	if (!res.ok) {
		const error = await res.json().catch(() => ({ message: "Failed to set category allocations" }))
		throw new Error(error.message || "Failed to set category allocations")
	}
	return json(res)
}

// Shareholders
export const getShareholders = async () => {
	const headers = await withAuth()
	const res = await fetch(`${API_BASE_URL}/shareholders`, { headers })
	if (!res.ok) {
		const error = await res.json().catch(() => ({ message: "Failed to load shareholders" }))
		throw new Error(error.message || "Failed to load shareholders")
	}
	return json(res)
}

export const sendShareholderOtp = async (email: string) => {
	const headers = await withAuth()
	const res = await fetch(`${API_BASE_URL}/shareholders/otp/send`, {
		method: "POST",
		headers,
		body: JSON.stringify({ email }),
	})
	if (!res.ok) {
		const error = await res.json().catch(() => ({ message: "Failed to send OTP" }))
		throw new Error(error.message || "Failed to send OTP")
	}
	return json(res)
}

export const verifyShareholderOtp = async (email: string, otp: string) => {
	const headers = await withAuth()
	const res = await fetch(`${API_BASE_URL}/shareholders/otp/verify`, {
		method: "POST",
		headers,
		body: JSON.stringify({ email, otp }),
	})
	if (!res.ok) {
		const error = await res.json().catch(() => ({ message: "Invalid OTP" }))
		throw new Error(error.message || "Invalid OTP")
	}
	return json(res)
}

export const createShareholder = async (payload: { 
	firstName: string; 
	lastName: string; 
	email: string; 
	phone?: string;
	address?: string;
	sharePercentage?: number; 
	investment?: number; 
	profit?: number; 
	returns?: number; 
	otherMoney?: number; 
	joinDate?: string; 
	password: string;
}) => {
	const headers = await withAuth()
	const res = await fetch(`${API_BASE_URL}/shareholders`, {
		method: "POST",
		headers,
		body: JSON.stringify(payload),
	})
	if (!res.ok) {
		const error = await res.json().catch(() => ({ message: "Failed to create shareholder" }))
		throw new Error(error.message || "Failed to create shareholder")
	}
	return json(res)
}

export const deleteShareholder = async (id: string) => {
	const headers = await withAuth()
	const res = await fetch(`${API_BASE_URL}/shareholders/${id}`, {
		method: "DELETE",
		headers,
	})
	if (!res.ok) {
		const error = await res.json().catch(() => ({ message: "Failed to delete shareholder" }))
		throw new Error(error.message || "Failed to delete shareholder")
	}
	return json(res)
}

export const updateShareholder = async (id: string, payload: { 
	firstName?: string;
	lastName?: string;
	email?: string; 
	phone?: string;
	address?: string;
	sharePercentage?: number; 
	investment?: number; 
	profit?: number; 
	returns?: number; 
	otherMoney?: number; 
	joinDate?: string;
}) => {
	const headers = await withAuth()
	const res = await fetch(`${API_BASE_URL}/shareholders/${id}`, {
		method: "PUT",
		headers,
		body: JSON.stringify(payload),
	})
	if (!res.ok) {
		const error = await res.json().catch(() => ({ message: "Failed to update shareholder" }))
		throw new Error(error.message || "Failed to update shareholder")
	}
	return json(res)
}

// Company currency
export const getCompanyCurrency = async () => {
	const headers = await withAuth()
	const res = await fetch(`${API_BASE_URL}/company/currency`, { headers })
	if (!res.ok) {
		const error = await res.json().catch(() => ({ message: "Failed to get currency" }))
		throw new Error(error.message || "Failed to get currency")
	}
	return json(res)
}

export const setCompanyCurrency = async (code: string, symbol: string) => {
	const headers = await withAuth()
	const res = await fetch(`${API_BASE_URL}/company/currency`, {
		method: "POST",
		headers,
		body: JSON.stringify({ code, symbol }),
	})
	if (!res.ok) {
		const error = await res.json().catch(() => ({ message: "Failed to set currency" }))
		throw new Error(error.message || "Failed to set currency")
	}
	return json(res)
}

export const setAdminInvestment = async (amount: number) => {
	const headers = await withAuth()
	const res = await fetch(`${API_BASE_URL}/company/admin-investment`, {
		method: "POST",
		headers,
		body: JSON.stringify({ amount }),
	})
	if (!res.ok) {
		const error = await res.json().catch(() => ({ message: "Failed to set admin investment" }))
		throw new Error(error.message || "Failed to set admin investment")
	}
	return json(res)
}

// API client for investment requests
export const api = {
	get: async (url: string, options: any = {}) => {
		const headers = await withAuth()
		const res = await fetch(`${API_BASE_URL}${url}`, {
			...options,
			headers: { ...headers, ...options.headers },
		})
		if (!res.ok) {
			const error = await res.json().catch(() => ({ message: "Request failed" }))
			throw new Error(error.message || "Request failed")
		}
		return json(res)
	},
	post: async (url: string, data: any, options: any = {}) => {
		const headers = await withAuth()
		const res = await fetch(`${API_BASE_URL}${url}`, {
			method: "POST",
			headers: { ...headers, ...options.headers },
			body: JSON.stringify(data),
			...options,
		})
		if (!res.ok) {
			const error = await res.json().catch(() => ({ message: "Request failed" }))
			throw new Error(error.message || "Request failed")
		}
		return json(res)
	},
	put: async (url: string, data: any, options: any = {}) => {
		const headers = await withAuth()
		const res = await fetch(`${API_BASE_URL}${url}`, {
			method: "PUT",
			headers: { ...headers, ...options.headers },
			body: JSON.stringify(data),
			...options,
		})
		if (!res.ok) {
			const error = await res.json().catch(() => ({ message: "Request failed" }))
			throw new Error(error.message || "Request failed")
		}
		return json(res)
	},
	delete: async (url: string, options: any = {}) => {
		const headers = await withAuth()
		const res = await fetch(`${API_BASE_URL}${url}`, {
			method: "DELETE",
			headers: { ...headers, ...options.headers },
			...options,
		})
		if (!res.ok) {
			const error = await res.json().catch(() => ({ message: "Request failed" }))
			throw new Error(error.message || "Request failed")
		}
		return json(res)
	},
}