import { Cat, Rocket, Cherry, Waves, Mountain, Trophy, type LucideIcon } from "lucide-react"

interface Category {
  id: string
  label: string
}

interface CategorySelectorProps {
  categories: Category[]
  onSelect: (categoryId: string) => void
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  animals: Cat,
  space: Rocket,
  fruits: Cherry,
  ocean: Waves,
  nature: Mountain,
  sports: Trophy,
}

const CATEGORY_COLORS: Record<string, string> = {
  animals: "text-orange-500 group-hover:text-orange-600",
  space: "text-purple-500 group-hover:text-purple-600",
  fruits: "text-red-500 group-hover:text-red-600",
  ocean: "text-blue-500 group-hover:text-blue-600",
  nature: "text-green-500 group-hover:text-green-600",
  sports: "text-yellow-500 group-hover:text-yellow-600",
}

export function CategorySelector({ categories, onSelect }: CategorySelectorProps) {
  return (
    <div className="w-full max-w-2xl space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-6xl font-extrabold text-slate-800 tracking-tight drop-shadow-sm">
          Choose a Category
        </h2>
        <p className="text-slate-500 text-lg md:text-xl font-medium">Pick a topic to start your adventure</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {categories.map((category) => {
          const Icon = CATEGORY_ICONS[category.id] || Mountain
          const colorClass = CATEGORY_COLORS[category.id] || "text-slate-500"

          return (
            <button
              key={category.id}
              onClick={() => onSelect(category.id)}
              className="group relative flex items-center gap-4 px-6 py-5 bg-white/60 backdrop-blur-md border border-white/60 rounded-2xl text-slate-700 text-lg md:text-xl font-bold hover:bg-white/80 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-200 transition-all duration-300 shadow-sm text-left overflow-hidden"
            >
              <div className={`p-3 rounded-xl bg-white shadow-sm ring-1 ring-slate-100 ${colorClass} transition-colors duration-300`}>
                <Icon size={28} strokeWidth={2.5} />
              </div>
              <span className="relative z-10 flex-grow group-hover:text-slate-900 transition-colors">
                {category.label}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
