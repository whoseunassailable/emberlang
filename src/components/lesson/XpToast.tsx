import { useEffect, useState } from 'react'

interface Props {
  sparks: number
  visible: boolean
}

export function XpToast({ sparks, visible }: Props) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (visible) {
      setShow(true)
    } else {
      const t = setTimeout(() => setShow(false), 400)
      return () => clearTimeout(t)
    }
  }, [visible])

  if (!show) return null

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="flex items-center gap-3 rounded-xl border border-ember-orange/30 bg-ember-surface px-6 py-4 shadow-2xl shadow-ember-orange/10">
        <span className="text-2xl">🔥</span>
        <div>
          <div className="font-semibold text-ember-success">Ember earned!</div>
          <div className="text-sm text-ember-muted">+{sparks} Sparks</div>
        </div>
      </div>
    </div>
  )
}
