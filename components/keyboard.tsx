"use client"

interface KeyboardProps {
  guessedLetters: Set<string>
  correctLetters: Set<string>
  onLetterClick: (letter: string) => void
  disabled: boolean
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

export function Keyboard({ guessedLetters, correctLetters, onLetterClick, disabled }: KeyboardProps) {
  const getButtonStyle = (letter: string) => {
    if (!guessedLetters.has(letter)) {
      return "bg-white text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 shadow-[0_2px_0_0_rgba(203,213,225,1)] active:shadow-none active:translate-y-[2px]"
    }
    if (correctLetters.has(letter)) {
      return "bg-indigo-500 text-white border-indigo-600 shadow-[0_2px_0_0_rgba(67,56,202,1)]"
    }
    return "bg-slate-100 text-slate-300 border-slate-200 shadow-none opacity-50 cursor-not-allowed"
  }

  return (
    <div className="grid grid-cols-7 md:grid-cols-9 gap-1.5 md:gap-2 max-w-2xl mx-auto p-4 bg-slate-50/50 backdrop-blur-sm rounded-2xl border border-white/40">
      {ALPHABET.map((letter) => {
        const isGuessed = guessedLetters.has(letter)
        const isDisabled = disabled || isGuessed

        return (
          <button
            key={letter}
            onClick={() => onLetterClick(letter)}
            disabled={isDisabled}
            className={`
              aspect-square rounded-lg md:rounded-xl text-sm md:text-lg font-bold border-b-2
              transition-all duration-150 flex items-center justify-center
              ${getButtonStyle(letter)}
            `}
          >
            {letter}
          </button>
        )
      })}
    </div>
  )
}
