interface WordPuzzleProps {
  word: string
  guessedLetters: Set<string>
}

export function WordPuzzle({ word, guessedLetters }: WordPuzzleProps) {
  return (
    <div className="flex justify-center items-center min-h-[140px] py-8">
      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        {word.split("").map((letter, index) => (
          <div
            key={index}
            className="w-14 h-16 md:w-20 md:h-24 flex items-center justify-center bg-white border border-slate-200 border-b-4 border-b-slate-300 rounded-xl shadow-sm text-slate-800 transition-all duration-300 transform hover:-translate-y-1"
          >
            {guessedLetters.has(letter) ? (
              <span className="text-4xl md:text-5xl font-black text-slate-800 animate-in zoom-in spin-in-6 duration-500 drop-shadow-sm">
                {letter}
              </span>
            ) : (
              <div className="w-3 h-3 rounded-full bg-slate-200 animate-pulse"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
