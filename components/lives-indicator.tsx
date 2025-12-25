import { Heart } from "lucide-react"

interface LivesIndicatorProps {
  lives: number
  maxLives: number
}

export function LivesIndicator({ lives, maxLives }: LivesIndicatorProps) {
  return (
    <div className="flex items-center gap-2 md:gap-3 bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full border border-white/60 shadow-sm">
      <span className="text-slate-500 font-bold text-sm mr-2 uppercase tracking-wider">Lives</span>
      {Array.from({ length: maxLives }).map((_, index) => (
        <div
          key={index}
          className={`transition-all duration-300 transform ${index < lives ? "scale-100" : "scale-90 opacity-40 grayscale"}`}
        >
          <Heart
            className={`w-6 h-6 md:w-7 md:h-7 ${index < lives
                ? "text-rose-500 fill-rose-500 drop-shadow-sm animate-in zoom-in spin-in-12"
                : "text-slate-300"
              }`}
            strokeWidth={2.5}
          />
        </div>
      ))}
    </div>
  )
}
