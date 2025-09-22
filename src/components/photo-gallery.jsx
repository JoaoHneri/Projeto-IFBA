"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const galleryImages = [
  {
    id: 1,
    title: "Dashboard Principal",
    description: "Visão geral de todos os projetos em andamento",
    image: "📊",
    category: "dashboard"
  },
  {
    id: 2,
    title: "Gestão de Tarefas",
    description: "Interface intuitiva para gerenciar tarefas e prazos",
    image: "✅",
    category: "tarefas"
  },
  {
    id: 3,
    title: "Relatórios Avançados",
    description: "Análises detalhadas e métricas de performance",
    image: "📈",
    category: "relatorios"
  },
  {
    id: 4,
    title: "Colaboração em Equipe",
    description: "Ferramentas de comunicação e colaboração",
    image: "👥",
    category: "equipe"
  },
  {
    id: 5,
    title: "Cronogramas Visuais",
    description: "Planejamento visual com cronogramas interativos",
    image: "📅",
    category: "cronograma"
  },
  {
    id: 6,
    title: "Gestão de Recursos",
    description: "Controle completo de recursos e orçamentos",
    image: "💰",
    category: "recursos"
  }
]

export function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [filter, setFilter] = useState("all")

  const categories = ["all", "dashboard", "tarefas", "relatorios", "equipe", "cronograma", "recursos"]
  
  const filteredImages = filter === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter)

  const openModal = (image) => {
    setSelectedImage(image)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'unset'
  }

  const nextImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id)
    const nextIndex = (currentIndex + 1) % filteredImages.length
    setSelectedImage(filteredImages[nextIndex])
  }

  const prevImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id)
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length
    setSelectedImage(filteredImages[prevIndex])
  }

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!selectedImage) return
    
    if (e.key === 'Escape') {
      closeModal()
    } else if (e.key === 'ArrowRight') {
      nextImage()
    } else if (e.key === 'ArrowLeft') {
      prevImage()
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Galeria de Funcionalidades
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Explore as principais telas e recursos da nossa plataforma
          </p>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(category)}
                className="capitalize"
              >
                {category === "all" ? "Todas" : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-lg"
              onClick={() => openModal(image)}
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-6xl">{image.image}</span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {image.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {image.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <div 
              className="bg-white rounded-lg max-w-4xl w-full max-h-full overflow-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-white"
              >
                ✕
              </Button>

              {/* Navigation Buttons */}
              {filteredImages.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white"
                  >
                    ←
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white"
                  >
                    →
                  </Button>
                </>
              )}

              {/* Image and Content */}
              <div className="h-96 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-9xl">{selectedImage.image}</span>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {selectedImage.title}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {selectedImage.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {selectedImage.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {filteredImages.findIndex(img => img.id === selectedImage.id) + 1} de {filteredImages.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}