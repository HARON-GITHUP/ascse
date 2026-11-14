import { useEffect, useRef, useState } from 'react'
import { WatchIcon } from './Icons'

/**
 * صورة ذكية: تعرض هيكل تحميل ناعم، وبديلًا أنيقًا إذا تعذّر تحميل الصورة.
 * تُستخدم داخل حاويات نسبية (position: relative) مثل بطاقات المنتجات.
 */
export function SmartImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fallbackLabel = 'صورة قريبًا',
  ...props
}) {
  const imgRef = useRef(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const image = imgRef.current
    if (!image) return
    if (image.complete) {
      setStatus(image.naturalWidth > 0 ? 'loaded' : 'error')
    }
  }, [src])

  return (
    <>
      {status !== 'error' && (
        <img
          ref={imgRef}
          className={className}
          src={src}
          alt={alt}
          loading={loading}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          {...props}
        />
      )}

      {status === 'loading' && (
        <span className="image-skeleton" aria-hidden="true" />
      )}

      {status === 'error' && (
        <span className="image-fallback" role="img" aria-label={alt}>
          <WatchIcon size={28} />
          <span>{fallbackLabel}</span>
        </span>
      )}
    </>
  )
}
