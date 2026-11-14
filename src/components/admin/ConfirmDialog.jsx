import { useEffect, useRef } from 'react'
import { useFocusTrap } from '../../hooks/useFocusTrap'

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'تأكيد',
  cancelLabel = 'إلغاء',
  onConfirm,
  onCancel,
}) {
  const panelRef = useRef(null)
  const closeButtonRef = useRef(null)

  useFocusTrap(panelRef, isOpen)

  useEffect(() => {
    if (!isOpen) return undefined
    const timer = window.setTimeout(() => closeButtonRef.current?.focus(), 240)
    return () => window.clearTimeout(timer)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="confirm-layer">
      <button
        type="button"
        className="overlay-backdrop"
        aria-label="إغلاق التأكيد"
        onClick={onCancel}
      />
      <div
        ref={panelRef}
        className="confirm-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
      >
        <h3 id="confirm-title">{title}</h3>
        <p>{message}</p>
        <div className="confirm-dialog__actions">
          <button type="button" className="button button--outline" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button type="button" className="button button--clay" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
