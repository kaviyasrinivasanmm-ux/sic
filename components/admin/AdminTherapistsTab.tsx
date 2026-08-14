'use client'

import { useState } from 'react'
import { Plus, Edit3, Trash2, Star, Check, X, Award, UserCheck } from 'lucide-react'
import { AdminTherapist, saveTherapist, deleteTherapist } from '@/lib/adminData'
import ConfirmModal from './ConfirmModal'

interface AdminTherapistsTabProps {
  therapists: AdminTherapist[]
  onRefresh: () => void
}

export default function AdminTherapistsTab({ therapists, onRefresh }: AdminTherapistsTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTherapist, setEditingTherapist] = useState<AdminTherapist | null>(null)
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)

  // Form State
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [experience, setExperience] = useState('8+ Years')
  const [specialtiesText, setSpecialtiesText] = useState('')
  const [certificationsText, setCertificationsText] = useState('')
  const [bio, setBio] = useState('')
  const [clientRating, setClientRating] = useState(4.9)
  const [available, setAvailable] = useState(true)

  const handleOpenAdd = () => {
    setEditingTherapist(null)
    setName('')
    setTitle('Senior Holistic Specialist')
    setExperience('8+ Years')
    setSpecialtiesText('Aromatherapy, Swedish Massage')
    setCertificationsText('CIDESCO International')
    setBio('')
    setClientRating(4.9)
    setAvailable(true)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (th: AdminTherapist) => {
    setEditingTherapist(th)
    setName(th.name)
    setTitle(th.title)
    setExperience(th.experience || `${th.experienceYears}+ Years`)
    setSpecialtiesText(th.specialties.join(', '))
    setCertificationsText(th.certifications.join(', '))
    setBio(th.bio)
    setClientRating(th.clientRating)
    setAvailable(th.available)
    setIsModalOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    const specialties = specialtiesText.split(',').map((s) => s.trim()).filter(Boolean)
    const certifications = certificationsText.split(',').map((c) => c.trim()).filter(Boolean)

    saveTherapist({
      id: editingTherapist ? editingTherapist.id : undefined,
      name,
      title,
      experience,
      specialties,
      certifications,
      bio,
      clientRating: Number(clientRating),
      available,
    })

    setIsModalOpen(false)
    onRefresh()
  }

  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      deleteTherapist(deleteTargetId)
      setDeleteTargetId(null)
      onRefresh()
    }
  }

  const handleToggleAvailable = (th: AdminTherapist) => {
    saveTherapist({ ...th, available: !th.available })
    onRefresh()
  }

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="p-6 rounded-3xl bg-[#FCFBF8] border border-[#C7A76C]/25 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#111614]">Master Practitioners</h2>
          <p className="text-xs text-[#4A6358]">Manage therapist profiles, specializations, ratings, and shift availability.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-full bg-gradient-to-r from-[#A8B59A] to-[#8FA88B] hover:from-[#C7A76C] hover:to-[#9A7A3B] text-white text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Therapist</span>
        </button>
      </div>

      {/* Therapists Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {therapists.map((th) => (
          <div
            key={th.id}
            className={`p-6 rounded-3xl bg-[#FCFBF8] border transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md ${
              th.available ? 'border-[#C7A76C]/30' : 'border-gray-200 opacity-60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-14 h-14 rounded-full bg-gradient-to-tr ${th.avatarBg} text-white flex items-center justify-center font-serif text-2xl font-bold border-2 border-[#C7A76C] shadow-sm`}
                >
                  {th.name.charAt(0)}
                </div>

                <button
                  onClick={() => handleToggleAvailable(th)}
                  className={`text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1 transition-colors ${
                    th.available ? 'bg-[#A8B59A]/15 text-[#3A4D41]' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {th.available ? <Check className="w-3 h-3 text-[#A8B59A]" /> : <X className="w-3 h-3" />}
                  <span>{th.available ? 'Available' : 'On Leave'}</span>
                </button>
              </div>

              <div className="flex items-center gap-1 text-[#C7A76C] text-xs font-semibold mb-1">
                <Star className="w-3.5 h-3.5 fill-[#C7A76C]" />
                <span>{th.clientRating} Rating</span>
                <span className="text-[#8C857B]">• {th.experience || `${th.experienceYears}+ Years`}</span>
              </div>

              <h3 className="font-serif text-xl font-bold text-[#111614] mb-1">{th.name}</h3>
              <p className="text-xs font-medium text-[#A8B59A] mb-3">{th.title}</p>
              <p className="text-xs text-[#4A6358] font-light leading-relaxed line-clamp-3 mb-4">{th.bio}</p>

              {/* Specializations Badges */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {th.specialties.map((spec, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2.5 py-1 rounded-full bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#3A4D41] font-medium"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#EEE6DA] flex items-center justify-between">
              <span className="text-[11px] text-[#8C857B]">
                Certifications: <strong className="text-[#111614] font-medium">{th.certifications[0] || 'Certified'}</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(th)}
                  title="Edit Therapist Profile"
                  className="p-2 rounded-full hover:bg-[#C7A76C]/15 text-[#9A7A3B] transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteTargetId(th.id)}
                  title="Remove Therapist"
                  className="p-2 rounded-full hover:bg-red-100 text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Therapist Modal */}
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
              {editingTherapist ? 'Edit Therapist Profile' : 'Add New Master Therapist'}
            </h3>
            <p className="text-xs text-[#4A6358] mb-6">Enter practitioner profile details and specializations.</p>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">Therapist Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maya Sundaram"
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">Professional Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior Ayurvedic & Deep Tissue Practitioner"
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">Experience Years</label>
                  <input
                    type="text"
                    required
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="e.g. 10+ Years"
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={clientRating}
                    onChange={(e) => setClientRating(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">
                  Specialties (Comma Separated)
                </label>
                <input
                  type="text"
                  required
                  value={specialtiesText}
                  onChange={(e) => setSpecialtiesText(e.target.value)}
                  placeholder="Swedish Massage, Aromatherapy, Hot Stone"
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">
                  Certifications (Comma Separated)
                </label>
                <input
                  type="text"
                  required
                  value={certificationsText}
                  onChange={(e) => setCertificationsText(e.target.value)}
                  placeholder="CIDESCO International, BPT Physical Therapy"
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">Biography</label>
                <textarea
                  rows={3}
                  required
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Practitioner background, philosophy, and specializations..."
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
                  Save Therapist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Remove Therapist?"
        message="Are you sure you want to remove this therapist profile from the BLOOM master roster?"
        confirmText="Yes, Remove Therapist"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  )
}
