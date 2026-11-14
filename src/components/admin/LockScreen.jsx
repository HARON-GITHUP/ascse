import { useEffect, useRef, useState } from 'react'
import { CheckIcon, EyeIcon, EyeOffIcon, LockIcon } from '../Icons'

export const LOCK_CODE = '2134'

export function LockScreen({ onUnlock }) {
  const [code, setCode] = useState('')
  const [showCode, setShowCode] = useState(false)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const inputRef = useRef(null)
  const unlockTimer = useRef(null)

  useEffect(
    () => () => {
      window.clearTimeout(unlockTimer.current)
    },
    [],
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    if (status === 'unlocking') return

    if (code.trim() === LOCK_CODE) {
      setStatus('unlocking')
      setError('')
      unlockTimer.current = window.setTimeout(() => {
        onUnlock()
      }, 700)
      return
    }

    setStatus('error')
    setError('الرمز غير صحيح — جرّب ٢١٣٤ مرة أخرى.')
    window.clearTimeout(unlockTimer.current)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event)
    }
  }

  return (
    <div className="lock-screen">
      <form
        className={`lock-card${status === 'error' ? ' has-error' : ''}`}
        onSubmit={handleSubmit}
        noValidate
      >
        <span className="lock-card__mark" aria-hidden="true">
          L
        </span>

        <h1 className="lock-card__title">لوحة تحكم لونو</h1>
        <p className="lock-card__subtitle">
          أدخل رمز الوصول التجريبي للدخول إلى إدارة المتجر.
        </p>

        <label className="lock-field">
          <span className="visually-hidden">رمز الدخول</span>
          <span className="lock-field__control">
            <LockIcon size={17} />
            <input
              ref={inputRef}
              type="password"
              inputMode="numeric"
              value={code}
              onChange={(event) => {
                setCode(event.target.value.replace(/[^0-9]/g, '').slice(0, 4))
                setError('')
              }}
              onKeyDown={handleKeyDown}
              placeholder="••••"
              autoComplete="one-time-code"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'lock-error' : undefined}
            />
            <button
              type="button"
              className="lock-field__peek"
              onClick={() => setShowCode((current) => !current)}
              aria-label={showCode ? 'إخفاء الرمز' : 'إظهار الرمز'}
              aria-pressed={showCode}
            >
              {showCode ? <EyeOffIcon size={17} /> : <EyeIcon size={17} />}
            </button>
          </span>
          {error && (
            <span className="lock-field__error" id="lock-error" role="alert">
              {error}
            </span>
          )}
        </label>

        <button
          type="submit"
          className="button button--primary lock-card__submit"
          disabled={status === 'unlocking'}
        >
          {status === 'unlocking' ? (
            <>
              <span className="auth-spinner" aria-hidden="true" />
              <span>جارٍ فتح اللوحة...</span>
            </>
          ) : (
            <>
              <span>فتح لوحة التحكم</span>
              <CheckIcon size={16} />
            </>
          )}
        </button>

        <button
          type="button"
          className="lock-card__demo"
          onClick={() => {
            setCode(LOCK_CODE)
            setError('')
          }}
        >
          استخدام الرمز التجريبي
        </button>

        <p className="lock-card__note">
          واجهة تجريبية — الرمز محفوظ في الجلسة الحالية فقط.
        </p>
      </form>
    </div>
  )
}
