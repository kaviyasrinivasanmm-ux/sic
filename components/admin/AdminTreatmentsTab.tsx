'use client'

import { useState } from 'react'
import { Plus, Edit3, Trash2, Clock, IndianRupee, Sparkles, Check, X, ShieldAlert } from 'lucide-react'
import { AdminTreatment, saveTreatment, deleteTreatment } from '@/lib/adminData'
import ConfirmModal from './ConfirmModal'

interface AdminTreatmentsTabProps {
  treatments: AdminTreatment[]
  onRefresh: () => void
}

export default function AdminTreatmentsTab({ treatments, onRefresh }: AdminTreatmentsTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTreatment, setEditingTreatment] = useState<AdminTreatment | null>(null)
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)

  // Form fields
  const [name, setName] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [category, setCategory] = useState('Therapeutic Massage')
  const [priceINR, setPriceINR] = useState(4500)
  const [durationMins, setDurationMins] = useState(60)
  const [description, setDescription] = useState('')
  const [available, setAvailable] = useState(true)

  const handleOpenAdd = () => {
    setEditingTreatment(null)
    setName('')
    setSubtitle('')
    setCategory('Therapeutic Massage')
    setPriceINR(4500)
    setDurationMins(60)
    setDescription('')
    setAvailable(true)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (t: AdminTreatment) => {
    setEditingTreatment(t)
    setName(t.name)
    setSubtitle(t.subtitle)
    setCategory(t.category)
    setPriceINR(t.priceINR)
    setDurationMins(t.durationMins || t.durations?.[0] || 60)
    setDescription(t.description)
    setAvailable(t.available)
    setIsModalOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    saveTreatment({
      id: editingTreatment ? editingTreatment.id : undefined,
      name,
      subtitle,
      category,
      priceINR: Number(priceINR),
      durationMins: Number(durationMins),
      description,
      available,
    })
    setIsModalOpen(false)
    onRefresh()
  }

  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      deleteTreatment(deleteTargetId)
      setDeleteTargetId(null)
      onRefresh()
    }
  }

  const handleToggleAvailable = (t: AdminTreatment) => {
    saveTreatment({ ...t, available: !t.available })
    onRefresh()
  }

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="p-6 rounded-3xl bg-[#FCFBF8] border border-[#C7A76C]/25 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#111614]">Treatment Catalog</h2>
          <p className="text-xs text-[#4A6358]">Manage ritual pricing, durations, categories, and availability.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-full bg-gradient-to-r from-[#A8B59A] to-[#8FA88B] hover:from-[#C7A76C] hover:to-[#9A7A3B] text-white text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Spa Treatment</span>
        </button>
      </div>

      {/* Treatments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {treatments.map((t) => (
          <div
            key={t.id}
            className={`p-6 rounded-3xl bg-[#FCFBF8] border transition-all duration-300 flex flex-col justify-between relative shadow-sm hover:shadow-md ${
              t.available ? 'border-[#C7A76C]/30' : 'border-gray-200 opacity-60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-[#A8B59A]/15 text-[#3A4D41]">
                  {t.category}
                </span>
                <button
                  onClick={() => handleToggleAvailable(t)}
                  title="Toggle Availability"
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 transition-colors ${
                    t.available ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {t.available ? <Check className="w-3 h-3 text-emerald-600" /> : <X className="w-3 h-3" />}
                  <span>{t.available ? 'Active' : 'Disabled'}</span>
                </button>
              </div>

              <h3 className="font-serif text-xl font-bold text-[#111614] mb-1">{t.name}</h3>
              <p className="text-xs text-[#C7A76C] font-medium mb-3">{t.subtitle}</p>
              <p className="text-xs text-[#4A6358] font-light leading-relaxed line-clamp-3 mb-6">
                {t.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[#EEE6DA] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#8C857B] block">Price & Duration</span>
                <span className="font-serif text-lg font-bold text-[#C7A76C]">
                  ₹{t.priceINR.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-[#4A6358] ml-2">({t.durationMins || t.durations?.[0] || 60} mins)</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(t)}
                  title="Edit Treatment"
                  className="p-2 rounded-full hover:bg-[#C7A76C]/15 text-[#9A7A3B] transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteTargetId(t.id)}
                  title="Delete Treatment"
                  className="p-2 rounded-full hover:bg-red-100 text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Treatment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FCFBF8] border border-[#C7A76C]/30 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-[#4A6358] hover:text-[#111614]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-[#111614] mb-1">
              {editingTreatment ? 'Edit Treatment Specifications' : 'Add New Spa Ritual'}
            </h3>
            <p className="text-xs text-[#4A6358] mb-6">Set ritual parameters, pricing, and availability.</p>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">Treatment Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Royal Scandinavian Sauna Ritual"
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">Subtitle / Tagline</label>
                <input
                  type="text"
                  required
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Deep muscle detoxification & hydrotherapy"
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
                  >
                    <option value="Therapeutic Massage">Therapeutic Massage</option>
                    <option value="Deep Tissue & Bodywork">Deep Tissue & Bodywork</option>
                    <option value="Thermal & Hot Stone">Thermal & Hot Stone</option>
                    <option value="Botanical & Facial">Botanical & Facial</option>
                    <option value="Hydrotherapy & Sauna">Hydrotherapy & Sauna</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">Price (INR ₹)</label>
                  <input
                    type="number"
                    required
                    min={500}
                    step={100}
                    value={priceINR}
                    onChange={(e) => setPriceINR(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    required
                    min={15}
                    step={15}
                    value={durationMins}
                    onChange={(e) => setDurationMins(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">Status</label>
                  <select
                    value={available ? 'true' : 'false'}
                    onChange={(e) => setAvailable(e.target.value === 'true')}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
                  >
                    <option value="true">Active & Bookable</option>
                    <option value="false">Disabled / Unavailable</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed description of the spa ritual experience..."
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#EEE6DA]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-[#C7A76C]/30 text-xs font-semibold text-[#3A4D41]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-[#A8B59A] hover:bg-[#C7A76C] text-white font-semibold text-xs shadow-md transition-colors"
                >
                  Save Treatment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Treatment Ritual?"
        message="Are you sure you want to delete this treatment from the spa catalog? This operation cannot be undone."
        confirmText="Yes, Delete Treatment"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  )
}
