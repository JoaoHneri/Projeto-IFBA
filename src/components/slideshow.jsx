"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    title: "Gestão Inteligente de Projetos",
    description: "Organize e gerencie seus projetos com ferramentas intuitivas e poderosas",
    image: "🚀"
  },
  {
    id: 2,
    title: "Colaboração em Tempo Real",
    description: "Mantenha sua equipe alinhada com comunicação eficiente e transparente",
    image: "👥"
  },
  {
    id: 3,
    title: "Relatórios e Analytics",
    description: "Tome decisões baseadas em dados com insights detalhados e precisos",
    image: "📊"
  },
  {
    id: 4,
    title: "Automação Inteligente",
    description: "Automatize tarefas repetitivas e foque no que realmente importa",
    image: "⚡"
  }
]

export function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <div 
      className="relative bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20 overflow-hidden"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Slide Content */}
        <div className="text-center min-h-[300px] flex flex-col justify-center">
          <div className="text-8xl mb-6 animate-bounce">
            {slides[currentSlide].image}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">
            {slides[currentSlide].title}
          </h2>
          <p className="text-xl md:text-2xl text-indigo-100 animate-fadeIn">
            {slides[currentSlide].description}
          </p>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30"
        >
          ←
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30"
        >
          →
        </Button>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index 
                  ? "bg-white" 
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>

        {/* Auto-play indicator */}
        <div className="absolute top-4 right-4 flex items-center space-x-2 text-sm">
          <span>{isAutoPlay ? "⏸️" : "▶️"}</span>
          <span>Auto-play {isAutoPlay ? "ativo" : "pausado"}</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}