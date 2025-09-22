import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Target, Users, BarChart3, Calendar, FileText, Zap, Shield, Globe, Smartphone } from "lucide-react";
import Link from "next/link";

export default function ServicosPage() {
  const servicos = [
    {
      id: "gestao-projetos",
      titulo: "Gestão de Projetos",
      categoria: "Essencial",
      preco: "R$ 49",
      periodo: "/mês",
      icone: Target,
      cor: "blue",
      descricao: "Ferramenta completa para planejamento, execução e monitoramento de projetos",
      recursos: [
        "Cronogramas visuais com Gantt",
        "Gestão de tarefas e subtarefas",
        "Controle de prazos e dependências",
        "Dashboard executivo",
        "Relatórios de progresso"
      ]
    },
    {
      id: "colaboracao-equipe",
      titulo: "Colaboração em Equipe",
      categoria: "Popular",
      preco: "R$ 79",
      periodo: "/mês",
      icone: Users,
      cor: "green",
      descricao: "Potencialize a colaboração e comunicação entre membros da equipe",
      recursos: [
        "Chat integrado em tempo real",
        "Compartilhamento de arquivos",
        "Comentários e menções",
        "Notificações inteligentes",
        "Videoconferência integrada"
      ]
    },
    {
      id: "analytics-relatorios",
      titulo: "Analytics & Relatórios",
      categoria: "Premium",
      preco: "R$ 129",
      periodo: "/mês",
      icone: BarChart3,
      cor: "purple",
      descricao: "Análises avançadas e relatórios detalhados para tomada de decisões",
      recursos: [
        "Dashboard personalizado",
        "Métricas de performance",
        "Análise de produtividade",
        "Relatórios automatizados",
        "Exportação para Excel/PDF"
      ]
    },
    {
      id: "calendario-integrado",
      titulo: "Calendário Integrado",
      categoria: "Produtividade",
      preco: "R$ 39",
      periodo: "/mês",
      icone: Calendar,
      cor: "orange",
      descricao: "Sincronização perfeita com calendários e agenda de compromissos",
      recursos: [
        "Sincronização Google/Outlook",
        "Agenda de reuniões",
        "Lembretes automáticos",
        "Visualização mensal/semanal",
        "Convites para eventos"
      ]
    },
    {
      id: "documentacao",
      titulo: "Documentação Inteligente",
      categoria: "Organização",
      preco: "R$ 59",
      periodo: "/mês",
      icone: FileText,
      cor: "indigo",
      descricao: "Sistema completo para criação e gestão de documentos do projeto",
      recursos: [
        "Editor colaborativo",
        "Versionamento automático",
        "Templates personalizados",
        "Biblioteca de documentos",
        "Pesquisa avançada"
      ]
    },
    {
      id: "automacao",
      titulo: "Automação de Processos",
      categoria: "Avançado",
      preco: "R$ 149",
      periodo: "/mês",
      icone: Zap,
      cor: "yellow",
      descricao: "Automatize tarefas repetitivas e otimize fluxos de trabalho",
      recursos: [
        "Workflows personalizados",
        "Regras de automação",
        "Integração com APIs",
        "Triggers inteligentes",
        "Processamento em lote"
      ]
    }
  ];

  const getCorClasses = (cor) => {
    const cores = {
      blue: "bg-blue-100 text-blue-600 border-blue-200",
      green: "bg-green-100 text-green-600 border-green-200",
      purple: "bg-purple-100 text-purple-600 border-purple-200",
      orange: "bg-orange-100 text-orange-600 border-orange-200",
      indigo: "bg-indigo-100 text-indigo-600 border-indigo-200",
      yellow: "bg-yellow-100 text-yellow-600 border-yellow-200"
    };
    return cores[cor] || cores.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Nossos 
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {" "}Serviços
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-12 leading-relaxed">
            Descubra nossa gama completa de soluções para gestão de projetos. 
            Cada serviço foi desenvolvido para atender necessidades específicas da sua empresa.
          </p>
        </div>
      </section>

      {/* Serviços Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicos.map((servico) => {
              const IconeServico = servico.icone;
              return (
                <Card key={servico.id} className="group relative overflow-hidden border-0 shadow-clean hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    {/* Badge de Categoria */}
                    <div className="flex justify-between items-start mb-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCorClasses(servico.cor)}`}>
                        {servico.categoria}
                      </span>
                      <div className={`rounded-full w-14 h-14 flex items-center justify-center bg-${servico.cor}-100`}>
                        <IconeServico className={`h-7 w-7 text-${servico.cor}-600`} />
                      </div>
                    </div>

                    {/* Título e Preço */}
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{servico.titulo}</h3>
                    <div className="flex items-baseline mb-4">
                      <span className="text-3xl font-bold text-slate-900">{servico.preco}</span>
                      <span className="text-slate-600 ml-1">{servico.periodo}</span>
                    </div>

                    {/* Descrição */}
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {servico.descricao}
                    </p>

                    {/* Lista de Recursos */}
                    <ul className="space-y-2 mb-8">
                      {servico.recursos.map((recurso, index) => (
                        <li key={index} className="flex items-start text-slate-600">
                          <span className={`text-${servico.cor}-600 mr-2 mt-1`}>✓</span>
                          <span className="text-sm">{recurso}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Botões de Ação */}
                    <div className="space-y-3">
                      <Link href={`/servicos/${servico.id}`}>
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 transition-colors cursor-pointer mb-2">
                          Ver Detalhes
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full border-slate-300 hover:border-emerald-500 hover:text-emerald-600 cursor-pointer">
                        Teste Grátis
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recursos Adicionais */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Recursos Inclusos em Todos os Planos
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Independente do serviço escolhido, você sempre terá acesso a estes recursos essenciais.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center border-0 shadow-clean hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Segurança SSL</h3>
                <p className="text-slate-600 text-sm">Proteção avançada para seus dados</p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center border-0 shadow-clean hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Acesso Global</h3>
                <p className="text-slate-600 text-sm">Disponível 24/7 em qualquer lugar</p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center border-0 shadow-clean hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">App Mobile</h3>
                <p className="text-slate-600 text-sm">Aplicativo nativo para iOS e Android</p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center border-0 shadow-clean hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Suporte 24h</h3>
                <p className="text-slate-600 text-sm">Atendimento especializado sempre</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-emerald-100 mb-10">
            Experimente qualquer um dos nossos serviços gratuitamente por 30 dias. 
            Sem compromisso, sem cartão de crédito.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 bg-white text-emerald-600 hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
            >
              Iniciar Teste Gratuito
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-emerald-600 transition-all duration-200 cursor-pointer"
            >
              Falar com Vendas
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}