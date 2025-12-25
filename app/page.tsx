"use client"

import { useState } from "react"
import { WordPuzzle } from "@/components/word-puzzle"
import { Keyboard } from "@/components/keyboard"
import { LivesIndicator } from "@/components/lives-indicator"
import { GameOverModal } from "@/components/game-over-modal"
import { CategorySelector } from "@/components/category-selector"
import { WORD_BANK } from "@/lib/word-bank"


const CATEGORIES = [
  { id: "animals", label: "Animals" },
  { id: "space", label: "Space" },
  { id: "fruits", label: "Fruits" },
  { id: "ocean", label: "Ocean" },
  { id: "nature", label: "Nature" },
  { id: "sports", label: "Sports" },
]

const MAX_LIVES = 6

export default function WordGuessGame() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentWord, setCurrentWord] = useState<string>("")
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set())
  const [lives, setLives] = useState(MAX_LIVES)
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing")
  const [streak, setStreak] = useState(0)
  const [usedWords, setUsedWords] = useState<Set<string>>(new Set())

  const pickWord = (category: string, currentUsed: Set<string>) => {
    const words = WORD_BANK[category] || []

    // Get unused words
    const availableWords = words.filter((word) => !currentUsed.has(word))

    let nextWord = ""
    let nextUsed = new Set(currentUsed)

    // If all words used, reset used words (loop mode)
    if (availableWords.length === 0) {
      if (words.length > 0) {
        nextUsed = new Set() // Clear history
        const randomIndex = Math.floor(Math.random() * words.length)
        nextWord = words[randomIndex]
        nextUsed.add(nextWord)
      }
    } else {
      const randomIndex = Math.floor(Math.random() * availableWords.length)
      nextWord = availableWords[randomIndex]
      nextUsed.add(nextWord)
    }

    return { nextWord, nextUsed }
  }

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setStreak(0)

    const { nextWord, nextUsed } = pickWord(categoryId, new Set())

    setCurrentWord(nextWord)
    setUsedWords(nextUsed)
    setGuessedLetters(new Set())
    setLives(MAX_LIVES)
    setGameStatus("playing")
  }

  // Simplified next word handler
  const handleNextWord = () => {
    if (selectedCategory) {
      const { nextWord, nextUsed } = pickWord(selectedCategory, usedWords)
      setCurrentWord(nextWord)
      setUsedWords(nextUsed)
      setGuessedLetters(new Set())
      setLives(MAX_LIVES)
      setGameStatus("playing")
    } else {
      handleReset()
    }
  }

  const handleLetterGuess = (letter: string) => {
    if (guessedLetters.has(letter) || gameStatus !== "playing") return

    const newGuessedLetters = new Set(guessedLetters)
    newGuessedLetters.add(letter)
    setGuessedLetters(newGuessedLetters)

    // Check if letter is in word
    if (!currentWord.includes(letter)) {
      const newLives = lives - 1
      setLives(newLives)
      if (newLives === 0) {
        setGameStatus("lost")
        setStreak(0)
      }
    } else {
      // Check if word is complete
      const allLettersGuessed = currentWord.split("").every((char) => newGuessedLetters.has(char))
      if (allLettersGuessed) {
        setGameStatus("won")
        setStreak((prev) => prev + 1)
      }
    }
  }



  // Reset game
  const handleReset = () => {
    setSelectedCategory(null)
    setCurrentWord("")
    setGuessedLetters(new Set())
    setLives(MAX_LIVES)
    setGameStatus("playing")
    setStreak(0)
    setUsedWords(new Set())
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col relative overflow-hidden transition-colors duration-500">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* Header */}
      <header className="px-6 py-6 md:py-8 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-800 flex items-center gap-2 drop-shadow-sm">
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Word</span>Guess
            </h1>
            {streak > 0 && (
              <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-500">
                <span className="text-sm text-slate-500 font-bold uppercase tracking-wider hidden md:block">Streak</span>
                <div className="flex items-center justify-center min-w-[3rem] bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold px-4 py-1.5 rounded-full text-sm shadow-md ring-2 ring-white transform hover:scale-105 transition-transform duration-200">
                  {streak}
                  <span className="ml-1">🔥</span>
                </div>
              </div>
            )}
            {streak === 0 && <div className="w-8"></div>}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-12 z-10">
        {!selectedCategory ? (
          <CategorySelector categories={CATEGORIES} onSelect={handleCategorySelect} />
        ) : (
          <div className="w-full max-w-2xl space-y-12 backdrop-blur-sm bg-white/30 p-8 rounded-3xl border border-white/40 shadow-xl">
            {/* Lives Indicator */}
            <div className="flex justify-center">
              <LivesIndicator lives={lives} maxLives={MAX_LIVES} />
            </div>

            {/* Word Puzzle */}
            <WordPuzzle word={currentWord} guessedLetters={guessedLetters} />

            {/* Keyboard */}
            <Keyboard
              guessedLetters={guessedLetters}
              correctLetters={new Set(currentWord.split(""))}
              onLetterClick={handleLetterGuess}
              disabled={gameStatus !== "playing"}
            />

            {/* Change Category Button */}
            <div className="flex justify-center pt-6">
              <button
                onClick={handleReset}
                className="group relative px-6 py-3 font-semibold text-slate-600 transition-all duration-200 ease-in-out hover:text-indigo-600"
              >
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                Change Category
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Game Over Modal */}
      {gameStatus !== "playing" && (
        <GameOverModal status={gameStatus} word={currentWord} onNextWord={handleNextWord} onReset={handleReset} />
      )}
    </div>
  )
}
