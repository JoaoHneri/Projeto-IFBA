"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const servicesData = [
  {
    id: 1,
    title: "Gestão de Projetos",
    category: "gerenciamento",
    price: 149,
    rating: 4.9,
    clients: 250,
    description: "Planejamento, execução e monitoramento completo de projetos",
    features: ["Cronogramas", "Dashboards", "Relatórios", "Controle de marcos"]
  },
  {
    id: 2,
    title: "Gestão de Equipes",
    category: "recursos-humanos",
    price: 99,
    rating: 4.8,
    clients: 180,
    description: "Organize e gerencie sua equipe de forma eficiente",
    features: ["Alocação", "Comunicação", "Performance", "Colaboração"]
  },
  {
    id: 3,
    title: "Automação de Processos",
    category: "automacao",
    price: 199,
    rating: 4.7,
    clients: 120,
    description: "Automatize tarefas repetitivas e ganhe eficiência",
    features: ["Workflows", "Notificações", "Integrações", "Templates"]
  },
  {
    id: 4,
    title: "Análise e Relatórios",
    category: "analytics",
    price: 129,
    rating: 4.6,
    clients: 200,
    description: "Insights poderosos para tomada de decisões",
    features: ["KPIs", "Tendências", "Previsões", "Relatórios"]
  },
  {
    id: 5,
    title: "Consultoria Especializada",
    category: "consultoria",
    price: 299,
    rating: 5.0,
    clients: 50,
    description: "Orientação personalizada para sua empresa",
    features: ["Análise", "Implementação", "Treinamento", "Suporte"]
  },
  {
    id: 6,
    title: "Segurança Enterprise",
    category: "seguranca",
    price: 399,
    rating: 4.9,
    clients: 80,
    description: "Proteção avançada para dados corporativos",
    features: ["Criptografia", "Controle", "Auditoria", "Backup"]
  }
]

export function SortableServices() {
  const [services, setServices] = useState(servicesData)
  const [sortBy, setSortBy] = useState("title")
  const [sortOrder, setSortOrder] = useState("asc")
  const [filterCategory, setFilterCategory] = useState("all")

  const categories = [
    { value: "all", label: "Todos os Serviços" },
    { value: "gerenciamento", label: "Gerenciamento" },
    { value: "recursos-humanos", label: "Recursos Humanos" },
    { value: "automacao", label: "Automação" },
    { value: "analytics", label: "Analytics" },
    { value: "consultoria", label: "Consultoria" },
    { value: "seguranca", label: "Segurança" }
  ]

  const sortOptions = [
    { value: "title", label: "Nome" },
    { value: "price", label: "Preço" },
    { value: "rating", label: "Avaliação" },
    { value: "clients", label: "Clientes" }
  ]

  const handleSort = (field) => {
    const newOrder = sortBy === field && sortOrder === "asc" ? "desc" : "asc"
    setSortBy(field)
    setSortOrder(newOrder)
    sortServices(field, newOrder, filterCategory)
  }

  const handleFilter = (category) => {
    setFilterCategory(category)
    sortServices(sortBy, sortOrder, category)
  }

  const sortServices = (field, order, category) => {
    let filteredServices = category === "all" 
      ? [...servicesData] 
      : servicesData.filter(service => service.category === category)

    filteredServices.sort((a, b) => {
      let aValue = a[field]
      let bValue = b[field]

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (order === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setServices(filteredServices)
  }

  const getSortIcon = (field) => {
    if (sortBy !== field) return "↕️"
    return sortOrder === "asc" ? "↑" : "↓"
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nossos Serviços
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Organize e filtre nossos serviços conforme sua necessidade
          </p>
        </div>

        {/* Controles de Filtro e Ordenação */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Filtros por Categoria */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Filtrar por Categoria</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category.value}
                    variant={filterCategory === category.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilter(category.value)}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Ordenação */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Ordenar por</h3>
              <div className="flex flex-wrap gap-2">
                {sortOptions.map(option => (
                  <Button
                    key={option.value}
                    variant={sortBy === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSort(option.value)}
                    className="flex items-center space-x-1"
                  >
                    <span>{option.label}</span>
                    <span className="text-xs">{getSortIcon(option.value)}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Informações do Filtro */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>
              Mostrando {services.length} de {servicesData.length} serviços
              {filterCategory !== "all" && (
                <> na categoria "{categories.find(c => c.value === filterCategory)?.label}"</>
              )}
            </span>
            <span>
              Ordenado por {sortOptions.find(o => o.value === sortBy)?.label} 
              ({sortOrder === "asc" ? "crescente" : "decrescente"})
            </span>
          </div>
        </div>

        {/* Lista de Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card 
              key={service.id} 
              className="hover:shadow-lg transition-all duration-300"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <span className="text-2xl font-bold text-blue-600">
                    R$ {service.price}
                  </span>
                </div>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Métricas */}
                <div className="flex justify-between items-center mb-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <span>⭐</span>
                    <span>{service.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>👥</span>
                    <span>{service.clients} clientes</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {service.features.map((feature, idx) => (
                      <span 
                        key={idx}
                        className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Categoria */}
                <div className="mb-4">
                  <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    {categories.find(c => c.value === service.category)?.label}
                  </span>
                </div>

                <Button className="w-full">
                  Saiba Mais
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Botões de Ação Rápida */}
        <div className="mt-12 text-center">
          <div className="inline-flex space-x-4">
            <Button 
              variant="outline" 
              onClick={() => {
                setSortBy("price")
                setSortOrder("asc")
                setFilterCategory("all")
                sortServices("price", "asc", "all")
              }}
            >
              💰 Menor Preço
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                setSortBy("rating")
                setSortOrder("desc")
                setFilterCategory("all")
                sortServices("rating", "desc", "all")
              }}
            >
              ⭐ Mais Avaliados
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                setSortBy("clients")
                setSortOrder("desc")
                setFilterCategory("all")
                sortServices("clients", "desc", "all")
              }}
            >
              👥 Mais Populares
            </Button>
          </div>
        </div>
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