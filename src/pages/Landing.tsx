import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
}

const courses = [
  {
    id: 'sql',
    flame: 'Flame I',
    name: 'SQL',
    description: 'Tables, queries, filtering, sorting, and mutation — master the language of data.',
    status: 'available',
    href: '/forge',
    icon: '🗄️',
  },
  {
    id: 'python',
    flame: 'Flame II',
    name: 'Python',
    description: 'Variables, functions, loops, and objects — your first real general-purpose language.',
    status: 'coming-soon',
    href: null,
    icon: '🐍',
  },
  {
    id: 'javascript',
    flame: 'Flame III',
    name: 'JavaScript',
    description: 'Make the web interactive with the language that runs in every browser.',
    status: 'coming-soon',
    href: null,
    icon: '⚡',
  },
  {
    id: 'dsa',
    flame: 'Flame IV',
    name: 'DSA',
    description: 'Arrays, trees, graphs, sorting — think algorithmically and ace any technical interview.',
    status: 'coming-soon',
    href: null,
    icon: '🌳',
  },
]

export function Landing() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number
    const particles: Particle[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const spawn = () => {
      if (particles.length > 60) return
      const x = canvas.width * 0.3 + Math.random() * canvas.width * 0.4
      const y = canvas.height * 0.7 + Math.random() * 60
      particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -(0.6 + Math.random() * 1.2),
        life: 0,
        maxLife: 80 + Math.random() * 60,
        size: 1.5 + Math.random() * 3,
      })
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (Math.random() < 0.4) spawn()

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life++
        p.x += p.vx
        p.y += p.vy
        p.vx += (Math.random() - 0.5) * 0.06
        p.vy *= 0.995

        if (p.life > p.maxLife) { particles.splice(i, 1); continue }

        const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.7
        const pct = p.life / p.maxLife
        const r = Math.round(249 - pct * 60)
        const g = Math.round(115 + pct * 20)
        const b = Math.round(22)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * (1 - pct * 0.5), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
        ctx.fill()
      }

      animId = requestAnimationFrame(tick)
    }

    tick()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-ember-bg">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl w-full py-16">
        <div className="mb-6 text-5xl select-none">🔥</div>

        <h1 className="mb-3 text-6xl font-bold tracking-tight text-ember-text sm:text-7xl">
          Ember<span className="text-ember-orange">lang</span>
        </h1>

        <p className="mb-2 text-xl text-ember-muted font-light">
          Kindle your craft.
        </p>
        <p className="mb-10 text-base text-ember-muted/70 max-w-sm">
          SQL, Python, JavaScript, DSA — one skill at a time, no fluff.
        </p>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {courses.map((course) => {
            const available = course.status === 'available'

            const card = (
              <div
                className={`relative rounded-xl border p-5 text-left transition-all ${
                  available
                    ? 'border-ember-orange/40 bg-ember-surface hover:border-ember-orange/70 hover:-translate-y-0.5'
                    : 'border-ember-border bg-ember-surface/50 opacity-55'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-xs font-mono text-ember-muted uppercase tracking-widest mb-0.5">
                      {course.flame}
                    </div>
                    <div className="text-lg font-bold text-ember-text flex items-center gap-2">
                      <span>{course.icon}</span>
                      {course.name}
                    </div>
                  </div>
                  {available ? (
                    <span className="shrink-0 text-xs font-semibold text-ember-orange bg-ember-orange/10 border border-ember-orange/20 px-2 py-0.5 rounded-full">
                      Available
                    </span>
                  ) : (
                    <span className="shrink-0 text-xs font-semibold text-ember-muted bg-ember-surface-2 border border-ember-border px-2 py-0.5 rounded-full">
                      Soon
                    </span>
                  )}
                </div>
                <p className="text-sm text-ember-muted leading-relaxed">{course.description}</p>
                {available && (
                  <div className="mt-3 text-sm font-medium text-ember-orange flex items-center gap-1">
                    Start learning <span>→</span>
                  </div>
                )}
              </div>
            )

            return available ? (
              <Link key={course.id} to={course.href!}>
                {card}
              </Link>
            ) : (
              <div key={course.id}>{card}</div>
            )
          })}
        </div>

        <div className="flex gap-8 text-center">
          {[
            { value: '63', label: 'Lessons' },
            { value: '4', label: 'Tracks' },
            { value: '0', label: 'BS' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="text-2xl font-bold text-ember-orange">{value}</div>
              <div className="text-xs text-ember-muted uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
