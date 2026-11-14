import { useEffect, useRef, useState } from 'react'
import { useFocusTrap } from '../hooks/useFocusTrap'
import {
  ArrowLeftIcon,
  CheckIcon,
  CloseIcon,
  EyeIcon,
  EyeOffIcon,
  GoogleIcon,
  LockIcon,
  MailIcon,
  SparkleIcon,
  UserIcon,
} from './Icons'
import { SmartImage } from './SmartImage'

const emptyForm = {
  name: '',
  email: '',
  password: '',
  remember: true,
  terms: false,
}

const modeCopy = {
  login: {
    title: 'أهلًا بعودتك',
    subtitle: 'سجّل الدخول لمتابعة المفضلة والسلة بسهولة.',
    submit: 'تسجيل الدخول',
  },
  register: {
    title: 'أنشئ حسابك',
    subtitle: 'احفظ قطعك المفضلة، وعُد إليها في أي وقت.',
    submit: 'إنشاء الحساب',
  },
  reset: {
    title: 'استعادة كلمة المرور',
    subtitle: 'أدخل بريدك الإلكتروني وسنجهّز رابط استعادة تجريبيًا.',
    submit: 'إرسال رابط الاستعادة',
  },
}

const successCopy = {
  login: {
    title: 'تم تسجيل الدخول تجريبيًا',
    text: 'أهلًا بك من جديد. هذه واجهة عرض فقط؛ لم تُنشأ جلسة حقيقية ولم تُحفظ أي بيانات.',
  },
  register: {
    title: 'تم إنشاء الحساب التجريبي',
    text: 'لم يُنشأ حساب حقيقي ولم تُحفظ كلمة المرور. يمكنك متابعة استعراض المتجر.',
  },
  reset: {
    title: 'تم تجهيز رابط الاستعادة',
    text: 'هذا إجراء تجريبي فقط؛ لن يُرسل بريد فعلي إلى عنوانك.',
  },
}

function validate(values, mode) {
  const nextErrors = {}

  if (mode === 'register' && values.name.trim().length < 2) {
    nextErrors.name = 'اكتب اسمًا من حرفين على الأقل.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    nextErrors.email = 'أدخل بريدًا إلكترونيًا صحيحًا.'
  }

  if (mode !== 'reset' && values.password.length < 8) {
    nextErrors.password = 'كلمة المرور يجب أن تكون ٨ أحرف على الأقل.'
  }

  if (mode === 'register' && !values.terms) {
    nextErrors.terms = 'يلزم تأكيد الموافقة على الشروط للمتابعة.'
  }

  return nextErrors
}

export function AuthModal({ isOpen, onClose }) {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState('idle')
  const [notice, setNotice] = useState('')

  const panelRef = useRef(null)
  const closeButtonRef = useRef(null)
  const submitTimer = useRef(null)
  const focusTimer = useRef(null)

  useFocusTrap(panelRef, isOpen)

  useEffect(() => {
    if (!isOpen) {
      window.clearTimeout(submitTimer.current)
      return undefined
    }

    setMode('login')
    setForm(emptyForm)
    setErrors({})
    setShowPassword(false)
    setStatus('idle')
    setNotice('')

    focusTimer.current = window.setTimeout(() => {
      panelRef.current
        ?.querySelector('input[name="email"]')
        ?.focus({ preventScroll: true })
    }, 340)

    return () => window.clearTimeout(focusTimer.current)
  }, [isOpen])

  useEffect(
    () => () => {
      window.clearTimeout(submitTimer.current)
      window.clearTimeout(focusTimer.current)
    },
    [],
  )

  const switchMode = (nextMode) => {
    setMode(nextMode)
    setErrors({})
    setNotice('')
    setStatus('idle')
    setShowPassword(false)
    setForm((current) => ({ ...current, password: '' }))

    window.clearTimeout(focusTimer.current)
    focusTimer.current = window.setTimeout(() => {
      panelRef.current
        ?.querySelector('input[name="email"]')
        ?.focus({ preventScroll: true })
    }, 160)
  }

  const handleClose = () => {
    window.clearTimeout(submitTimer.current)
    onClose()
  }

  const updateField = (event) => {
    const { name, value, type, checked } = event.target
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))

    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: undefined }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (status === 'submitting') return

    const nextErrors = validate(form, mode)
    setErrors(nextErrors)
    setNotice('')

    const firstError = Object.keys(nextErrors)[0]
    if (firstError) {
      window.setTimeout(() => {
        panelRef.current
          ?.querySelector(`[name="${firstError}"]`)
          ?.focus({ preventScroll: true })
      }, 0)
      return
    }

    setStatus('submitting')
    submitTimer.current = window.setTimeout(() => {
      setStatus('success')
    }, 900)
  }

  const copy = modeCopy[mode]
  const success = successCopy[mode]

  return (
    <div className={`auth-layer${isOpen ? ' is-open' : ''}`} inert={!isOpen}>
      <button
        type="button"
        className="overlay-backdrop"
        aria-label="إغلاق نافذة الحساب"
        onClick={handleClose}
      />

      <div
        ref={panelRef}
        id="auth-dialog"
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
      >
        <aside className="auth-visual" aria-hidden="true">
          <SmartImage
            className="auth-visual__image"
            src="/images/category-watches.jpg"
            alt=""
            loading="eager"
          />
          <span className="auth-visual__shade" />

          <div className="auth-visual__content">
            <span className="auth-visual__brand">LUNO</span>
            <p className="auth-visual__quote">
              «الأناقة أن تختار ما يشبهك،
              <br />
              لا ما يلفت الانتباه فقط.»
            </p>

            <ul className="auth-visual__benefits">
              <li>
                <SparkleIcon size={11} />
                حفظ المفضلة في مكان واحد
              </li>
              <li>
                <SparkleIcon size={11} />
                تجربة شراء أسرع في الزيارات القادمة
              </li>
              <li>
                <SparkleIcon size={11} />
                متابعة العروض والقطع الجديدة
              </li>
            </ul>

            <span className="auth-visual__note">
              واجهة تجريبية · لا مصادقة حقيقية
            </span>
          </div>
        </aside>

        <div className="auth-panel">
          <header className="auth-panel__head">
            <div className="brand brand--small">
              <span className="brand__word">LUNO</span>
              <span className="brand__sub">حسابك في لونو</span>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              className="icon-button icon-button--bordered"
              onClick={handleClose}
              aria-label="إغلاق نافذة الحساب"
            >
              <CloseIcon />
            </button>
          </header>

          <div className="auth-panel__body">
            {status === 'success' ? (
              <div className="auth-success" role="status" aria-live="polite">
                <span className="auth-success__icon" aria-hidden="true">
                  <CheckIcon size={26} />
                </span>
                <h2 id="auth-title">{success.title}</h2>
                <p>{success.text}</p>

                <button
                  type="button"
                  className="button button--primary auth-submit"
                  onClick={handleClose}
                >
                  <span>العودة إلى المتجر</span>
                  <ArrowLeftIcon size={17} />
                </button>

                {mode === 'reset' && (
                  <button
                    type="button"
                    className="button button--text auth-back"
                    onClick={() => switchMode('login')}
                  >
                    العودة لتسجيل الدخول
                  </button>
                )}
              </div>
            ) : (
              <>
                {mode !== 'reset' && (
                  <div
                    className={`auth-tabs${mode === 'register' ? ' is-register' : ''}`}
                    role="group"
                    aria-label="اختيار نوع الحساب"
                  >
                    <span className="auth-tabs__indicator" aria-hidden="true" />
                    <button
                      type="button"
                      className={mode === 'login' ? 'is-active' : ''}
                      aria-pressed={mode === 'login'}
                      onClick={() => switchMode('login')}
                    >
                      تسجيل الدخول
                    </button>
                    <button
                      type="button"
                      className={mode === 'register' ? 'is-active' : ''}
                      aria-pressed={mode === 'register'}
                      onClick={() => switchMode('register')}
                    >
                      إنشاء حساب
                    </button>
                  </div>
                )}

                <div className="auth-swap" key={mode}>
                  <h2 id="auth-title">{copy.title}</h2>
                  <p className="auth-panel__subtitle">{copy.subtitle}</p>

                  <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                    aria-busy={status === 'submitting'}
                    noValidate
                  >
                    {mode === 'register' && (
                      <label className="auth-field" htmlFor="auth-name">
                        <span className="auth-field__label">الاسم الكامل</span>
                        <span
                          className={`auth-field__control${
                            errors.name ? ' has-error' : ''
                          }`}
                        >
                          <UserIcon size={17} />
                          <input
                            id="auth-name"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={updateField}
                            placeholder="مثال: نورة العتيبي"
                            autoComplete="name"
                            aria-invalid={Boolean(errors.name)}
                            aria-describedby={
                              errors.name ? 'auth-name-error' : undefined
                            }
                          />
                        </span>
                        {errors.name && (
                          <span
                            className="auth-field__error"
                            id="auth-name-error"
                            role="alert"
                          >
                            {errors.name}
                          </span>
                        )}
                      </label>
                    )}

                    <label className="auth-field" htmlFor="auth-email">
                      <span className="auth-field__label">البريد الإلكتروني</span>
                      <span
                        className={`auth-field__control${
                          errors.email ? ' has-error' : ''
                        }`}
                      >
                        <MailIcon size={17} />
                        <input
                          id="auth-email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={updateField}
                          placeholder="name@example.com"
                          autoComplete="email"
                          inputMode="email"
                          dir="ltr"
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={
                            errors.email ? 'auth-email-error' : undefined
                          }
                        />
                      </span>
                      {errors.email && (
                        <span
                          className="auth-field__error"
                          id="auth-email-error"
                          role="alert"
                        >
                          {errors.email}
                        </span>
                      )}
                    </label>

                    {mode !== 'reset' && (
                      <label className="auth-field" htmlFor="auth-password">
                        <span className="auth-field__label">كلمة المرور</span>
                        <span
                          className={`auth-field__control${
                            errors.password ? ' has-error' : ''
                          }`}
                        >
                          <LockIcon size={17} />
                          <input
                            id="auth-password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={form.password}
                            onChange={updateField}
                            placeholder="٨ أحرف على الأقل"
                            autoComplete={
                              mode === 'login'
                                ? 'current-password'
                                : 'new-password'
                            }
                            dir="ltr"
                            aria-invalid={Boolean(errors.password)}
                            aria-describedby={
                              errors.password
                                ? 'auth-password-error'
                                : 'auth-password-hint'
                            }
                          />
                          <button
                            type="button"
                            className="auth-field__peek"
                            onClick={() => setShowPassword((current) => !current)}
                            aria-label={
                              showPassword
                                ? 'إخفاء كلمة المرور'
                                : 'إظهار كلمة المرور'
                            }
                            aria-pressed={showPassword}
                          >
                            {showPassword ? (
                              <EyeOffIcon size={17} />
                            ) : (
                              <EyeIcon size={17} />
                            )}
                          </button>
                        </span>
                        {errors.password ? (
                          <span
                            className="auth-field__error"
                            id="auth-password-error"
                            role="alert"
                          >
                            {errors.password}
                          </span>
                        ) : (
                          <span
                            className="auth-field__hint"
                            id="auth-password-hint"
                          >
                            ٨ أحرف على الأقل — لن تُحفظ كلمة المرور.
                          </span>
                        )}
                      </label>
                    )}

                    {mode === 'login' && (
                      <div className="auth-row">
                        <label className="auth-check">
                          <input
                            type="checkbox"
                            name="remember"
                            checked={form.remember}
                            onChange={updateField}
                          />
                          <span>تذكرني</span>
                        </label>

                        <button
                          type="button"
                          className="auth-link"
                          onClick={() => switchMode('reset')}
                        >
                          نسيت كلمة المرور؟
                        </button>
                      </div>
                    )}

                    {mode === 'register' && (
                      <div className="auth-terms">
                        <label className="auth-check">
                          <input
                            type="checkbox"
                            name="terms"
                            checked={form.terms}
                            onChange={updateField}
                            aria-invalid={Boolean(errors.terms)}
                            aria-describedby={
                              errors.terms ? 'auth-terms-error' : undefined
                            }
                          />
                          <span>
                            أوافق على الشروط وسياسة الخصوصية — نسخة تجريبية
                            للعرض فقط.
                          </span>
                        </label>
                        {errors.terms && (
                          <span
                            className="auth-field__error"
                            id="auth-terms-error"
                            role="alert"
                          >
                            {errors.terms}
                          </span>
                        )}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="button button--primary auth-submit"
                      disabled={status === 'submitting'}
                    >
                      {status === 'submitting' ? (
                        <span className="auth-spinner" aria-hidden="true" />
                      ) : (
                        <ArrowLeftIcon size={17} />
                      )}
                      <span>
                        {status === 'submitting' ? 'جارٍ المعالجة...' : copy.submit}
                      </span>
                    </button>

                    {mode !== 'reset' && (
                      <>
                        <div className="auth-divider">
                          <span>أو</span>
                        </div>

                        <button
                          type="button"
                          className="auth-google"
                          onClick={() =>
                            setNotice(
                              'تسجيل Google خيار شكلي فقط — غير مربوط بأي خدمة حقيقية.',
                            )
                          }
                        >
                          <GoogleIcon size={18} />
                          <span>المتابعة عبر Google</span>
                          <span className="auth-google__demo">تجريبي</span>
                        </button>
                      </>
                    )}

                    {notice && (
                      <p className="auth-notice" role="status">
                        {notice}
                      </p>
                    )}

                    <p className="auth-demo-note">
                      واجهة تجريبية — لا يتم إنشاء حساب أو إرسال بريد أو تخزين
                      كلمة مرور.
                    </p>
                  </form>

                  {mode === 'login' && (
                    <p className="auth-switch">
                      ليس لديك حساب؟{' '}
                      <button
                        type="button"
                        onClick={() => switchMode('register')}
                      >
                        أنشئ حسابًا
                      </button>
                    </p>
                  )}

                  {mode === 'register' && (
                    <p className="auth-switch">
                      لديك حساب بالفعل؟{' '}
                      <button
                        type="button"
                        onClick={() => switchMode('login')}
                      >
                        سجّل الدخول
                      </button>
                    </p>
                  )}

                  {mode === 'reset' && (
                    <button
                      type="button"
                      className="button button--text auth-back"
                      onClick={() => switchMode('login')}
                    >
                      العودة لتسجيل الدخول
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
