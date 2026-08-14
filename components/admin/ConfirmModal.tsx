'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  isDestructive?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = true,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#FCFBF8] border border-[#C7A76C]/30 rounded-3xl max-w-md w-full p-6 shadow-2xl relative"
        >
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 p-2 rounded-full text-[#4A6358] hover:text-[#111614] hover:bg-[#F8F5F0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4 mb-4">
            <div className={`p-3 rounded-2xl ${isDestructive ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-[#A8B59A]/10 text-[#A8B59A]'}`}>
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#111614] mb-1">{title}</h3>
              <p className="text-xs text-[#4A6358] leading-relaxed">{message}</p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#EEE6DA]">
            <button
              onClick={onCancel}
              className="px-5 py-2.5 rounded-full glass-card border border-[#C7A76C]/30 text-xs font-semibold text-[#3A4D41] hover:bg-[#F8F5F0] transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold text-white transition-all shadow-md ${
                isDestructive ? 'bg-red-600 hover:bg-red-700' : 'bg-[#A8B59A] hover:bg-[#C7A76C]'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
