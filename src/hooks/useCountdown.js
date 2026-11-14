import { useCallback, useEffect, useState } from 'react'

/**
 * عدّاد تنازلي تجريبي قابل للإيقاف والتشغيل وإعادة الضبط.
 * لا يحفظ أي قيمة، ويعود للمدة الأصلية عند إعادة تحميل الصفحة.
 */
export function useCountdown(totalSeconds) {
  const [remaining, setRemaining] = useState(totalSeconds)
  const [isRunning, setIsRunning] = useState(true)

  useEffect(() => {
    if (!isRunning) return undefined

    const timer = window.setInterval(() => {
      setRemaining((current) => Math.max(0, current - 1))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [isRunning])

  useEffect(() => {
    if (remaining === 0 && isRunning) setIsRunning(false)
  }, [remaining, isRunning])

  const toggle = useCallback(() => {
    setIsRunning((current) => !current)
  }, [])

  const reset = useCallback(() => {
    setRemaining(totalSeconds)
    setIsRunning(true)
  }, [totalSeconds])

  const safeRemaining = Math.max(0, remaining)
  const hours = String(Math.floor(safeRemaining / 3600)).padStart(2, '0')
  const minutes = String(Math.floor((safeRemaining % 3600) / 60)).padStart(2, '0')
  const seconds = String(safeRemaining % 60).padStart(2, '0')

  return { hours, minutes, seconds, isRunning, toggle, reset }
}
