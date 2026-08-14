'use client'

import { useState, useMemo } from 'react'
import { Search, UserCheck, Calendar, Phone, Mail, FileText, Edit3, X } from 'lucide-react'
import { Customer, saveCustomer } from '@/lib/adminData'

interface AdminCustomersTabProps {
  customers: Customer[]
  onRefresh: () => void
}

export default function AdminCustomersTab({ customers, onRefresh }: AdminCustomersTabProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)
  const [notes, setNotes] = useState('')

  const filteredCustomers = useMemo(() => {
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm)
    )
  }, [customers, searchTerm])

  const handleOpenEditNotes = (c: Customer) => {
    setEditingCustomer(c)
    setNotes(c.notes || '')
  }

  const handleSaveNotes = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingCustomer) {
      saveCustomer({ id: editingCustomer.id, notes })
      setEditingCustomer(null)
      onRefresh()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="p-6 rounded-3xl bg-[#FCFBF8] border border-[#C7A76C]/25 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#111614]">Customer Directory</h2>
          <p className="text-xs text-[#4A6358]">Manage guest profiles, total lifetime spending, and health notes.</p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C857B]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, phone..."
            className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-xs text-[#111614] placeholder:text-gray-400 focus:outline-none focus:border-[#C7A76C]"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="rounded-3xl bg-[#FCFBF8] border border-[#C7A76C]/25 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F5F0] border-b border-[#EEE6DA] text-[11px] font-semibold text-[#4A6358] uppercase tracking-wider">
                <th className="py-4 px-6">Customer Name</th>
                <th className="py-4 px-6">Contact Info</th>
                <th className="py-4 px-6">Visits</th>
                <th className="py-4 px-6">Reward Balance</th>
                <th className="py-4 px-6">Lifetime Spend</th>
                <th className="py-4 px-6">Last Visit</th>
                <th className="py-4 px-6">Notes</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEE6DA] text-xs">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#8C857B]">
                    No registered spa customers found.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-[#F8F5F0]/60 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#A8B59A]/15 text-[#3A4D41] flex items-center justify-center font-bold font-serif text-sm">
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-[#111614]">{c.name}</p>
                          <p className="text-[10px] text-[#8C857B]">Member since {c.registeredAt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-[#111614]">{c.email}</p>
                      <p className="text-[11px] text-[#4A6358]">{c.phone}</p>
                    </td>
                    <td className="py-4 px-6 font-semibold text-[#111614]">
                      {c.totalBookings} visits
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold text-[11px]">
                        ₹{c.rewardBalance !== undefined ? c.rewardBalance : c.totalBookings * 100}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-bold text-[#C7A76C]">
                      ₹{c.totalSpent.toLocaleString('en-IN')}
                    </td>
                    <td className="py-4 px-6 font-mono text-[#4A6358]">{c.lastVisit}</td>
                    <td className="py-4 px-6 text-[#4A6358] italic max-w-xs truncate">
                      {c.notes || 'No special notes recorded.'}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleOpenEditNotes(c)}
                        className="p-2 rounded-full hover:bg-[#C7A76C]/15 text-[#9A7A3B] transition-colors"
                        title="Edit Health / Care Notes"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Customer Notes Modal */}
      {editingCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FCFBF8] border border-[#C7A76C]/30 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setEditingCustomer(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-[#4A6358] hover:text-[#111614]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-[#111614] mb-1">Customer Preferences & Notes</h3>
            <p className="text-xs text-[#4A6358] mb-6">Update care instructions for {editingCustomer.name}.</p>

            <form onSubmit={handleSaveNotes} className="space-y-4 text-xs">
              <div>
                <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">Care Notes</label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Preferences, allergies, tea choice, or special physical conditions..."
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#EEE6DA]">
                <button
                  type="button"
                  onClick={() => setEditingCustomer(null)}
                  className="px-5 py-2.5 rounded-full border border-[#C7A76C]/30 text-xs font-semibold text-[#3A4D41]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-[#A8B59A] text-white font-semibold text-xs shadow-md"
                >
                  Save Notes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
