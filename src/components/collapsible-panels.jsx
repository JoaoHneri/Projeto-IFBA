"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const faqData = [
  {
    id: 1,
    question: "Como funciona o sistema de gestão de projetos?",
    answer: "Nosso sistema permite criar, organizar e monitorar projetos de forma intuitiva. Você pode definir tarefas, atribuir responsáveis, estabelecer prazos e acompanhar o progresso em tempo real através de dashboards personalizáveis."
  },
  {
    id: 2,
    question: "Quantos usuários podem usar o sistema simultaneamente?",
    answer: "Isso depende do plano escolhido. O plano Starter suporta até 5 usuários, o Professional até 25 usuários, e o Enterprise oferece usuários ilimitados. Todos os usuários podem trabalhar simultaneamente sem perda de performance."
  },
  {
    id: 3,
    question: "É possível integrar com outras ferramentas?",
    answer: "Sim! Oferecemos integrações nativas com mais de 50 ferramentas populares, incluindo Slack, Google Workspace, Microsoft Teams, Trello, GitHub, e muitas outras. Também disponibilizamos APIs para integrações customizadas."
  },
  {
    id: 4,
    question: "Como funciona a segurança dos dados?",
    answer: "Levamos a segurança muito a sério. Utilizamos criptografia SSL/TLS, armazenamento em servidores seguros, backups automáticos diários, autenticação de dois fatores e controles de acesso granulares. Somos compliance com LGPD e ISO 27001."
  },
  {
    id: 5,
    question: "Posso migrar dados de outras ferramentas?",
    answer: "Absolutamente! Oferecemos assistência gratuita para migração de dados de ferramentas como Asana, Monday.com, Jira, e muitas outras. Nossa equipe técnica ajuda em todo o processo para garantir uma transição suave."
  },
  {
    id: 6,
    question: "Qual é o tempo de implementação?",
    answer: "Para a maioria das empresas, a implementação leva entre 1 a 3 dias úteis. Isso inclui configuração inicial, importação de dados, treinamento da equipe e customizações básicas. Empresas maiores podem levar até uma semana."
  },
  {
    id: 7,
    question: "Oferecem suporte técnico em português?",
    answer: "Sim! Todo nosso suporte é em português, com equipe técnica especializada disponível durante horário comercial. Clientes Enterprise têm acesso a suporte 24/7 e gerente de conta dedicado."
  },
  {
    id: 8,
    question: "Posso cancelar a assinatura a qualquer momento?",
    answer: "Sim, não há fidelidade. Você pode cancelar sua assinatura a qualquer momento através do painel administrativo. Continuará tendo acesso até o final do período pago e poderá exportar todos os seus dados."
  }
]

export function CollapsiblePanels() {
  const [openPanels, setOpenPanels] = useState(new Set([1])) // Primeiro painel aberto por padrão

  const togglePanel = (panelId) => {
    const newOpenPanels = new Set(openPanels)
    
    if (newOpenPanels.has(panelId)) {
      newOpenPanels.delete(panelId)
    } else {
      newOpenPanels.add(panelId)
    }
    
    setOpenPanels(newOpenPanels)
  }

  const openAllPanels = () => {
    setOpenPanels(new Set(faqData.map(item => item.id)))
  }

  const closeAllPanels = () => {
    setOpenPanels(new Set())
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Encontre respostas para as dúvidas mais comuns sobre nossa plataforma
          </p>
          
          {/* Controles */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={openAllPanels}
              className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
            >
              Expandir Todas
            </button>
            <button
              onClick={closeAllPanels}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Recolher Todas
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openPanels.has(item.id)
            
            return (
              <Card 
                key={item.id} 
                className={`transition-all duration-300 ${
                  isOpen ? 'shadow-lg border-blue-200' : 'hover:shadow-md'
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'slideInLeft 0.6s ease-out forwards'
                }}
              >
                <CardHeader 
                  className="cursor-pointer select-none"
                  onClick={() => togglePanel(item.id)}
                >
                  <CardTitle className="flex justify-between items-center text-lg">
                    <span className="text-left pr-4">{item.question}</span>
                    <span 
                      className={`text-2xl transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      ▼
                    </span>
                  </CardTitle>
                </CardHeader>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <CardContent className="pt-0">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </CardContent>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Estatísticas dos painéis */}
        <div className="mt-8 text-center text-sm text-gray-500">
          {openPanels.size} de {faqData.length} painéis expandidos
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Não encontrou sua resposta?
          </h3>
          <p className="text-gray-600 mb-4">
            Nossa equipe de suporte está pronta para ajudar você
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Falar com Suporte
            </button>
            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              Agendar Demo
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  )
}