'use client'

import { useState, useMemo } from 'react'
import { Plus, IndianRupee, TrendingUp, TrendingDown, Trash2, Calendar, Filter, X } from 'lucide-react'
import { Booking, Expense, saveExpense, deleteExpense } from '@/lib/adminData'
import ConfirmModal from './ConfirmModal'

interface AdminFinancialsTabProps {
  bookings: Booking[]
  expenses: Expense[]
  onRefresh: () => void
}

export default function AdminFinancialsTab({ bookings, expenses, onRefresh }: AdminFinancialsTabProps) {
  const [timeframe, setTimeframe] = useState<'all' | 'daily' | 'monthly' | 'yearly'>('all')
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)

  // Expense form
  const [category, setCategory] = useState<Expense['category']>('Botanical Supplies')
  const [amount, setAmount] = useState(5000)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [description, setDescription] = useState('')

  // Calculate filtered financials based on selected timeframe
  const financialSummary = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0]
    const currentMonth = todayStr.substring(0, 7)
    const currentYear = todayStr.substring(0, 4)

    const validBookings = bookings.filter((b) => b.status !== 'cancelled')

    const filterDateMatch = (dateStr: string) => {
      if (timeframe === 'daily') return dateStr === todayStr
      if (timeframe === 'monthly') return dateStr.startsWith(currentMonth)
      if (timeframe === 'yearly') return dateStr.startsWith(currentYear)
      return true
    }

    const filteredB = validBookings.filter((b) => filterDateMatch(b.bookingDate))
    const filteredE = expenses.filter((e) => filterDateMatch(e.date))

    const totalRevenue = filteredB.reduce((sum, b) => sum + (b.totalPrice || 0), 0)
    const totalExpenses = filteredE.reduce((sum, e) => sum + (e.amount || 0), 0)
    const netProfitLoss = totalRevenue - totalExpenses

    return {
      revenue: totalRevenue,
      expenses: totalExpenses,
      profitLoss: netProfitLoss,
      bookingsCount: filteredB.length,
      expensesList: filteredE,
    }
  }, [bookings, expenses, timeframe])

  const handleRecordExpense = (e: React.FormEvent) => {
    e.preventDefault()
    saveExpense({
      category,
      amount: Number(amount),
      date,
      description,
    })
    setIsAddExpenseOpen(false)
    setDescription('')
    onRefresh()
  }

  const handleConfirmDeleteExpense = () => {
    if (deleteTargetId) {
      deleteExpense(deleteTargetId)
      setDeleteTargetId(null)
      onRefresh()
    }
  }

  return (
    <div className="space-y-8">
      {/* Header & Timeframe Filter */}
      <div className="p-6 rounded-3xl bg-[#FCFBF8] border border-[#C7A76C]/25 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#111614]">Financial Ledger & Profit/Loss</h2>
          <p className="text-xs text-[#4A6358]">Track treatment revenue streams, operating costs, and net margins.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Timeframe Filter Tabs */}
          <div className="flex items-center p-1 rounded-full bg-[#F8F5F0] border border-[#C7A76C]/20 text-xs">
            {(['all', 'daily', 'monthly', 'yearly'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 rounded-full capitalize font-semibold transition-all ${
                  timeframe === tf
                    ? 'bg-[#A8B59A] text-white shadow-xs'
                    : 'text-[#4A6358] hover:text-[#111614]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsAddExpenseOpen(true)}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C7A76C] to-[#9A7A3B] text-white text-xs font-semibold shadow-md transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Record New Expense</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-[#FCFBF8] border border-[#C7A76C]/25 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[#4A6358] font-semibold uppercase tracking-wider">Total Revenue</span>
            <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-serif text-3xl font-bold text-[#111614]">
            ₹{financialSummary.revenue.toLocaleString('en-IN')}
          </h3>
          <p className="text-xs text-[#8C857B] mt-2">
            Generated from {financialSummary.bookingsCount} spa appointments
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#FCFBF8] border border-[#C7A76C]/25 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[#4A6358] font-semibold uppercase tracking-wider">Total Expenses</span>
            <div className="w-9 h-9 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-serif text-3xl font-bold text-red-600">
            ₹{financialSummary.expenses.toLocaleString('en-IN')}
          </h3>
          <p className="text-xs text-[#8C857B] mt-2">
            From {financialSummary.expensesList.length} recorded line items
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#FCFBF8] border border-[#C7A76C]/25 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[#4A6358] font-semibold uppercase tracking-wider">
              Net Profit / Deficit
            </span>
            <div
              className={`w-9 h-9 rounded-2xl flex items-center justify-center ${
                financialSummary.profitLoss >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
              }`}
            >
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <h3
            className={`font-serif text-3xl font-bold ${
              financialSummary.profitLoss >= 0 ? 'text-[#111614]' : 'text-red-600'
            }`}
          >
            ₹{financialSummary.profitLoss.toLocaleString('en-IN')}
          </h3>
          <p className="text-xs text-[#8C857B] mt-2">
            Margin Rate:{' '}
            <strong className="text-[#111614]">
              {financialSummary.revenue > 0
                ? Math.round((financialSummary.profitLoss / financialSummary.revenue) * 100)
                : 0}
              %
            </strong>
          </p>
        </div>
      </div>

      {/* Expenses Ledger Table */}
      <div className="rounded-3xl bg-[#FCFBF8] border border-[#C7A76C]/25 shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between pb-2 border-b border-[#EEE6DA]">
          <h3 className="font-serif text-xl font-bold text-[#111614]">Operating Expenses Register</h3>
          <span className="text-xs text-[#4A6358]">{financialSummary.expensesList.length} entries</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F5F0] border-b border-[#EEE6DA] text-[11px] font-semibold text-[#4A6358] uppercase tracking-wider">
                <th className="py-3 px-4">Expense Category</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEE6DA] text-xs">
              {financialSummary.expensesList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#8C857B]">
                    No expense records registered for this timeframe filter.
                  </td>
                </tr>
              ) : (
                financialSummary.expensesList.map((e) => (
                  <tr key={e.id} className="hover:bg-[#F8F5F0]/60 transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#3A4D41]">
                      <span className="px-3 py-1 rounded-full bg-[#A8B59A]/15 text-[#3A4D41] text-[11px]">
                        {e.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#111614] font-medium">{e.description}</td>
                    <td className="py-3 px-4 text-[#8C857B] font-mono">{e.date}</td>
                    <td className="py-3 px-4 font-bold text-red-600">
                      - ₹{e.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setDeleteTargetId(e.id)}
                        className="p-1.5 rounded-full hover:bg-red-100 text-red-600 transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Expense Modal */}
      {isAddExpenseOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FCFBF8] border border-[#C7A76C]/30 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsAddExpenseOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-[#4A6358] hover:text-[#111614]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-[#111614] mb-1">Record Operational Expense</h3>
            <p className="text-xs text-[#4A6358] mb-6">Enter expense category, amount, and details.</p>

            <form onSubmit={handleRecordExpense} className="space-y-4 text-xs">
              <div>
                <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Expense['category'])}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
                >
                  <option value="Botanical Supplies">Botanical Supplies</option>
                  <option value="Medical Sterilization">Medical Sterilization</option>
                  <option value="Staff Payroll">Staff Payroll</option>
                  <option value="Utilities & Suites">Utilities & Suites</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">Amount (INR ₹)</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">Expense Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">Description</label>
                <input
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Organic lavender oil purchase"
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#EEE6DA]">
                <button
                  type="button"
                  onClick={() => setIsAddExpenseOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-[#C7A76C]/30 text-xs font-semibold text-[#3A4D41]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-[#C7A76C] text-white font-semibold text-xs shadow-md"
                >
                  Save Expense Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Expense Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Expense Record?"
        message="Are you sure you want to remove this expense record from the ledger?"
        confirmText="Yes, Delete Record"
        onConfirm={handleConfirmDeleteExpense}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  )
}
