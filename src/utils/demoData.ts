// src/utils/demoData.ts
export const DEMO_DATA = {
  company: {
    name: "TechNova Solutions",
    industry: "Technology",
    employees: 47,
    founded: 2018,
    revenue: 2456780,
    growth: 12.5
  },
  financials: {
    revenue: {
      current: 2456780,
      previous: 2183450,
      trend: "up"
    },
    expenses: {
      current: 452300,
      previous: 467800,
      trend: "down"
    },
    profit: {
      current: 845920,
      previous: 712340,
      trend: "up"
    },
    cashFlow: {
      current: 324560,
      previous: 287650,
      trend: "up"
    }
  },
  expenses: [
    { id: 1, category: "Salaries", amount: 245000, percentage: 54, trend: "up", color: "#86C232" },
    { id: 2, category: "Operations", amount: 87300, percentage: 19, trend: "stable", color: "#3A7CA5" },
    { id: 3, category: "Marketing", amount: 45600, percentage: 10, trend: "up", color: "#F9C80E" },
    { id: 4, category: "R&D", amount: 38900, percentage: 9, trend: "up", color: "#8B5CF6" },
    { id: 5, category: "Other", amount: 35500, percentage: 8, trend: "down", color: "#6B7280" }
  ],
  recentTransactions: [
    { id: 1, type: "revenue", description: "Q3 Product Sales", amount: 125000, date: "2024-03-15", status: "completed" },
    { id: 2, type: "expense", description: "Team Offsite", amount: -15000, date: "2024-03-14", status: "completed" },
    { id: 3, type: "revenue", description: "Enterprise Contract", amount: 75000, date: "2024-03-12", status: "pending" },
    { id: 4, type: "expense", description: "Software Licenses", amount: -12000, date: "2024-03-10", status: "completed" },
    { id: 5, type: "revenue", description: "Consulting Services", amount: 45000, date: "2024-03-08", status: "completed" }
  ],
};