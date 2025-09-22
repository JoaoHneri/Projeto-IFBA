"use client";

import { notFound } from 'next/navigation';
import { use } from 'react';
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const servicos = {
  'gestao-projetos': {
    nome: 'Gestão de Projetos',
    categoria: 'Essencial',
    preco: 'R$ 49',
    cor: 'blue',
    descricao: 'Planejamento, execução e monitoramento completo de projetos',
    descricaoDetalhada: 'Nossa solução de gestão de projetos oferece todas as ferramentas necessárias para planejar, executar e monitorar seus projetos do início ao fim. Com interface intuitiva e recursos avançados, sua equipe pode focar no que realmente importa: entregar resultados excepcionais.',
    funcionalidades: [
      { emoji: '📅', titulo: 'Cronogramas Inteligentes', descricao: 'Crie cronogramas detalhados com dependências entre tarefas, marcos importantes e recursos automaticamente otimizados.' },
      { emoji: '🎯', titulo: 'Controle de Marcos', descricao: 'Defina e monitore marcos importantes do projeto com notificações automáticas e acompanhamento de progresso em tempo real.' },
      { emoji: '📊', titulo: 'Dashboards em Tempo Real', descricao: 'Visualize o status de todos os projetos em dashboards personalizáveis com métricas e KPIs importantes.' },
      { emoji: '📈', titulo: 'Relatórios Personalizados', descricao: 'Gere relatórios detalhados sobre progresso, recursos, custos e performance para stakeholders e gerência.' },
      { emoji: '🔄', titulo: 'Gestão de Mudanças', descricao: 'Controle alterações no escopo, cronograma e recursos com aprovações e histórico completo de modificações.' },
      { emoji: '⚠️', titulo: 'Gestão de Riscos', descricao: 'Identifique, analise e mitigue riscos do projeto com ferramentas dedicadas e planos de contingência.' }
    ],
    beneficios: [
      { emoji: '⏱️', titulo: '30% Mais Rápido', descricao: 'Entregue projetos 30% mais rápido com processos otimizados' },
      { emoji: '💰', titulo: '25% Economia', descricao: 'Reduza custos com melhor gestão de recursos e processos' },
      { emoji: '📊', titulo: '90% Precisão', descricao: 'Melhore a precisão das estimativas e previsões' }
    ]
  },
  'colaboracao-equipe': {
    nome: 'Colaboração em Equipe',
    categoria: 'Popular',
    preco: 'R$ 79',
    cor: 'green',
    descricao: 'Potencialize a colaboração e comunicação entre membros da equipe',
    descricaoDetalhada: 'Nossa solução de colaboração em equipe oferece todas as ferramentas necessárias para conectar sua equipe de forma eficiente. Com interface intuitiva e recursos de comunicação avançados, sua equipe pode focar no que realmente importa: trabalhar juntos para alcançar resultados excepcionais.',
    funcionalidades: [
      { emoji: '💬', titulo: 'Chat Integrado', descricao: 'Comunicação instantânea entre membros da equipe com histórico completo e busca avançada.' },
      { emoji: '📁', titulo: 'Compartilhamento de Arquivos', descricao: 'Compartilhe documentos, imagens e qualquer tipo de arquivo de forma segura e organizada.' },
      { emoji: '🔔', titulo: 'Notificações Inteligentes', descricao: 'Receba alertas personalizados sobre atividades importantes sem sobrecarregar.' },
      { emoji: '🎥', titulo: 'Videoconferência', descricao: 'Reuniões virtuais integradas com gravação e compartilhamento de tela.' },
      { emoji: '✅', titulo: 'Gestão de Tarefas Colaborativa', descricao: 'Atribua tarefas, acompanhe progresso e colabore em tempo real.' },
      { emoji: '📊', titulo: 'Dashboard da Equipe', descricao: 'Visualize o desempenho e a produtividade da equipe em tempo real.' }
    ],
    beneficios: [
      { emoji: '⚡', titulo: '40% Mais Produtivo', descricao: 'Aumente a produtividade da equipe com comunicação eficiente' },
      { emoji: '🤝', titulo: '90% Colaboração', descricao: 'Melhore a colaboração entre membros remotos e presenciais' },
      { emoji: '📈', titulo: '60% Menos Reuniões', descricao: 'Reduza reuniões desnecessárias com comunicação assíncrona' }
    ]
  },
  'analytics-relatorios': {
    nome: 'Analytics & Relatórios',
    categoria: 'Premium',
    preco: 'R$ 129',
    cor: 'purple',
    descricao: 'Análises avançadas e relatórios detalhados para tomada de decisões',
    descricaoDetalhada: 'Nossa plataforma de analytics oferece insights profundos sobre seus projetos e equipes. Com dashboards personalizáveis e relatórios automáticos, você pode tomar decisões baseadas em dados reais e impulsionar o crescimento do seu negócio.',
    funcionalidades: [
      { emoji: '📊', titulo: 'Dashboards Personalizados', descricao: 'Crie dashboards sob medida com as métricas mais importantes para seu negócio.' },
      { emoji: '📈', titulo: 'Análise de Performance', descricao: 'Monitore KPIs, produtividade e eficiência de projetos e equipes.' },
      { emoji: '🔍', titulo: 'Relatórios Automáticos', descricao: 'Relatórios gerados automaticamente e enviados por email em intervalos personalizados.' },
      { emoji: '📑', titulo: 'Exportação Avançada', descricao: 'Exporte dados para Excel, PDF ou integre via API com outras ferramentas.' },
      { emoji: '🎯', titulo: 'Métricas Customizadas', descricao: 'Defina suas próprias métricas e acompanhe indicadores específicos do negócio.' },
      { emoji: '⏰', titulo: 'Análise de Tempo Real', descricao: 'Acompanhe métricas em tempo real com alertas automáticos para anomalias.' }
    ],
    beneficios: [
      { emoji: '📊', titulo: '85% Precisão', descricao: 'Tome decisões com base em dados precisos e atualizados' },
      { emoji: '💰', titulo: '35% Economia', descricao: 'Identifique gargalos e otimize recursos para reduzir custos' },
      { emoji: '🚀', titulo: '50% Crescimento', descricao: 'Acelere o crescimento com insights estratégicos' }
    ]
  },
  'calendario-integrado': {
    nome: 'Calendário Integrado',
    categoria: 'Produtividade',
    preco: 'R$ 39',
    cor: 'orange',
    descricao: 'Sincronização perfeita com calendários e agenda de compromissos',
    descricaoDetalhada: 'Nossa solução de calendário integrado unifica todas as suas agendas em um só lugar. Com sincronização automática e lembretes inteligentes, você nunca mais perderá um compromisso importante ou deadline de projeto.',
    funcionalidades: [
      { emoji: '📅', titulo: 'Sincronização Universal', descricao: 'Conecte Google Calendar, Outlook, Apple Calendar e outras plataformas.' },
      { emoji: '🔔', titulo: 'Lembretes Inteligentes', descricao: 'Notificações personalizadas com antecedência configurável para cada tipo de evento.' },
      { emoji: '👥', titulo: 'Agendamento de Reuniões', descricao: 'Encontre horários livres automaticamente e envie convites para participantes.' },
      { emoji: '📱', titulo: 'Acesso Mobile', descricao: 'Acesse sua agenda de qualquer dispositivo com sincronização instantânea.' },
      { emoji: '🎯', titulo: 'Bloqueio de Tempo', descricao: 'Reserve blocos de tempo para trabalho focado e atividades importantes.' },
      { emoji: '📊', titulo: 'Análise de Tempo', descricao: 'Relatórios sobre como você usa seu tempo e sugestões de otimização.' }
    ],
    beneficios: [
      { emoji: '⏰', titulo: '30% Pontualidade', descricao: 'Melhore a pontualidade com lembretes inteligentes' },
      { emoji: '📅', titulo: '0 Conflitos', descricao: 'Elimine conflitos de agenda com sincronização automática' },
      { emoji: '🎯', titulo: '25% Foco', descricao: 'Aumente o foco com bloqueios de tempo organizados' }
    ]
  },
  'documentacao': {
    nome: 'Documentação Inteligente',
    categoria: 'Organização',
    preco: 'R$ 59',
    cor: 'indigo',
    descricao: 'Sistema completo para criação e gestão de documentos do projeto',
    descricaoDetalhada: 'Nossa plataforma de documentação inteligente centraliza todo o conhecimento da sua empresa. Com editor colaborativo e versionamento automático, sua equipe pode criar, editar e compartilhar documentos de forma eficiente e organizada.',
    funcionalidades: [
      { emoji: '✏️', titulo: 'Editor Colaborativo', descricao: 'Edite documentos em tempo real com sua equipe, com comentários e sugestões.' },
      { emoji: '📝', titulo: 'Templates Inteligentes', descricao: 'Use templates pré-configurados ou crie seus próprios para agilizar a criação.' },
      { emoji: '🔄', titulo: 'Controle de Versões', descricao: 'Histórico completo de alterações com possibilidade de reverter para versões anteriores.' },
      { emoji: '🔍', titulo: 'Busca Avançada', descricao: 'Encontre qualquer documento ou informação instantaneamente com busca inteligente.' },
      { emoji: '🔒', titulo: 'Controle de Acesso', descricao: 'Defina permissões granulares para visualização e edição de documentos.' },
      { emoji: '📤', titulo: 'Exportação Múltipla', descricao: 'Exporte para PDF, Word, HTML ou outros formatos com um clique.' }
    ],
    beneficios: [
      { emoji: '📚', titulo: '70% Organização', descricao: 'Melhore a organização de documentos e conhecimento' },
      { emoji: '⚡', titulo: '45% Velocidade', descricao: 'Acelere a criação de documentos com templates' },
      { emoji: '🔍', titulo: '90% Encontrabilidade', descricao: 'Encontre informações 90% mais rápido' }
    ]
  },
  'automacao': {
    nome: 'Automação de Processos',
    categoria: 'Avançado',
    preco: 'R$ 149',
    cor: 'yellow',
    descricao: 'Automatize tarefas repetitivas e otimize fluxos de trabalho',
    descricaoDetalhada: 'Nossa solução de automação de processos elimina tarefas manuais repetitivas e otimiza seus fluxos de trabalho. Com workflows personalizados e integrações poderosas, você pode focar no trabalho estratégico enquanto a automação cuida do resto.',
    funcionalidades: [
      { emoji: '⚙️', titulo: 'Workflows Personalizados', descricao: 'Crie fluxos de trabalho automáticos adaptados às necessidades específicas da empresa.' },
      { emoji: '🔗', titulo: 'Integrações Avançadas', descricao: 'Conecte com mais de 100 aplicações e serviços via API ou conectores nativos.' },
      { emoji: '🤖', titulo: 'Triggers Inteligentes', descricao: 'Configure gatilhos automáticos baseados em eventos, tempo ou condições específicas.' },
      { emoji: '📊', titulo: 'Monitoramento de Automações', descricao: 'Acompanhe o desempenho e eficiência de todas as automações em tempo real.' },
      { emoji: '🔄', titulo: 'Processamento em Lote', descricao: 'Execute ações em massa para economizar tempo em tarefas repetitivas.' },
      { emoji: '🛡️', titulo: 'Tratamento de Erros', descricao: 'Sistema inteligente de tratamento de erros com notificações e retry automático.' }
    ],
    beneficios: [
      { emoji: '⚡', titulo: '80% Economia Tempo', descricao: 'Economize até 80% do tempo em tarefas repetitivas' },
      { emoji: '🎯', titulo: '95% Precisão', descricao: 'Elimine erros humanos com automação precisa' },
      { emoji: '💰', titulo: '60% ROI', descricao: 'Retorno sobre investimento comprovado em 6 meses' }
    ]
  }
};

export default function ServicoDetalhado({ params }) {
  const resolvedParams = use(params);
  const servico = servicos[resolvedParams.servico];

  if (!servico) {
    notFound();
  }

  // Função para obter as classes de cor baseadas na cor do serviço
  const getGradientClasses = (cor) => {
    const gradients = {
      blue: "from-emerald-600 to-teal-600",
      green: "from-emerald-600 to-teal-600",
      purple: "from-purple-600 to-violet-600",
      orange: "from-orange-600 to-amber-600",
      indigo: "from-indigo-600 to-blue-600",
      yellow: "from-yellow-600 to-orange-600"
    };
    return gradients[cor] || gradients.blue;
  };

  const getBgClasses = (cor) => {
    const backgrounds = {
      blue: "bg-emerald-100",
      green: "bg-emerald-100",
      purple: "bg-purple-100", 
      orange: "bg-orange-100",
      indigo: "bg-indigo-100",
      yellow: "bg-yellow-100"
    };
    return backgrounds[cor] || backgrounds.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className={`bg-gradient-to-r ${getGradientClasses(servico.cor)} text-white py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-4">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold bg-white/20 text-white border border-white/30`}>
                {servico.categoria}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {servico.nome}
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              {servico.descricao}
            </p>
            <div className="mt-8">
              <span className="text-4xl font-bold">{servico.preco}</span>
              <span className="text-xl ml-2 text-white/80">por mês</span>
            </div>
          </div>
        </div>
      </section>

      {/* Descrição Detalhada */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Transforme sua {servico.nome.toLowerCase()}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {servico.descricaoDetalhada}
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Seja para equipes pequenas ou grandes organizações, nossa plataforma se adapta às 
                necessidades específicas do seu negócio, oferecendo flexibilidade e 
                escalabilidade para crescer junto com sua empresa.
              </p>
            </div>
            <div className={`bg-gradient-to-br ${getGradientClasses(servico.cor)} bg-opacity-10 rounded-lg h-96 flex items-center justify-center`}>
              <span className="text-6xl">📊</span>
            </div>
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Funcionalidades Principais
            </h2>
            <p className="text-xl text-gray-600">
              Tudo que você precisa para maximizar {servico.nome.toLowerCase()}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servico.funcionalidades.map((funcionalidade, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="text-2xl mr-3">{funcionalidade.emoji}</span>
                    {funcionalidade.titulo}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {funcionalidade.descricao}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Benefícios para sua Empresa
            </h2>
            <p className="text-xl text-gray-600">
              Veja como nossa solução pode transformar seus resultados
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servico.beneficios.map((beneficio, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${getBgClasses(servico.cor)} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-2xl">{beneficio.emoji}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{beneficio.titulo}</h3>
                <p className="text-gray-600">
                  {beneficio.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`bg-gradient-to-r ${getGradientClasses(servico.cor)} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para revolucionar sua {servico.nome.toLowerCase()}?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Comece hoje mesmo e veja a diferença em seus resultados
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="cursor-pointer">
              <Link href="/contato">Solicitar Demo</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900 transition-all duration-200 cursor-pointer" asChild>
              <Link href="/servicos">Ver Outros Serviços</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}