"use client"

interface GameOverModalProps {
  status: "won" | "lost"
  word: string
  onNextWord: () => void
  onReset: () => void
}

export function GameOverModal({ status, word, onNextWord, onReset }: GameOverModalProps) {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6 z-50 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-8 md:p-12 max-w-md w-full space-y-8 shadow-2xl animate-in zoom-in duration-300 ring-4 ring-white/20">
        {status === "won" ? (
          <>
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">You solved it!</h2>
              <div className="space-y-2">
                <p className="text-slate-500 text-lg font-medium">The word was</p>
                <p className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500 tracking-widest uppercase">
                  {word}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={onNextWord}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-xl text-xl font-bold hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-95 transition-all duration-200"
              >
                Next Word
              </button>
              <button
                onClick={onReset}
                className="w-full bg-slate-100 text-slate-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-200 hover:text-slate-800 active:scale-95 transition-all duration-200"
              >
                Change Category
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">😔</div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">Out of guesses</h2>
              <div className="space-y-2">
                <p className="text-slate-500 text-lg font-medium">The word was</p>
                <p className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600 tracking-widest uppercase">
                  {word}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={onNextWord}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl text-xl font-bold hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-95 transition-all duration-200"
              >
                Try Again
              </button>
              <button
                onClick={onReset}
                className="w-full bg-slate-100 text-slate-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-200 hover:text-slate-800 active:scale-95 transition-all duration-200"
              >
                Change Category
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
